import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase.js'

const POLICIES_QUERY = `
  *,
  owner:org_members(*),
  versions:policy_versions(
    *,
    sections:policy_sections(*),
    signing_records:version_signing_records(*, org:organizations(*))
  ),
  receivers:policy_receivers(*, org:organizations(*))
`

function sortSections(policies) {
  for (const pol of policies) {
    for (const ver of pol.versions ?? []) {
      ver.sections?.sort((a, b) => a.order_index - b.order_index)
    }
  }
}

export const usePoliciesStore = defineStore('policies', () => {
  const policies = ref([])
  const organizations = ref([])
  const members = ref([])
  const loading = ref(false)

  const kpis = computed(() => {
    let pendingSignatures = 0
    let needReview = 0
    let rejections = 0
    for (const policy of policies.value) {
      const activeVersion = policy.versions?.find(v => v.status === 'active')
      if (activeVersion) {
        for (const sr of activeVersion.signing_records ?? []) {
          if (sr.status === 'pending') pendingSignatures++
          if (sr.status === 'needs_review') needReview++
          if (sr.status === 'rejected') rejections++
        }
      }
    }
    return { totalPolicies: policies.value.length, pendingSignatures, needReview, rejections }
  })

  async function fetchAll() {
    loading.value = true
    const [{ data: orgs, error: orgsErr }, { data: mems, error: memsErr }, { data: pols, error: polsErr }] = await Promise.all([
      supabase.from('organizations').select('*').order('name'),
      supabase.from('org_members').select('*').order('name'),
      supabase.from('policies').select(POLICIES_QUERY).order('created_at', { ascending: false }),
    ])
    if (orgsErr) console.error('fetchAll orgs:', orgsErr)
    if (memsErr) console.error('fetchAll members:', memsErr)
    if (polsErr) console.error('fetchAll policies:', polsErr)
    organizations.value = orgs ?? []
    members.value = mems ?? []
    sortSections(pols ?? [])
    policies.value = pols ?? []
    loading.value = false
  }

  // ── Read helpers (synchronous, work on local state) ───────────────────

  function getPolicyById(id) {
    return policies.value.find(p => p.id === id)
  }

  function getVersionById(id) {
    for (const policy of policies.value) {
      const ver = policy.versions?.find(v => v.id === id)
      if (ver) return { version: ver, policy }
    }
    return null
  }

  function getPolicyForVersion(versionId) {
    for (const policy of policies.value) {
      if (policy.versions?.find(v => v.id === versionId)) return policy
    }
    return null
  }

  // ── Mutations (optimistic update + background DB write) ───────────────

  async function createPolicy(title) {
    const policyId = crypto.randomUUID()
    const versionId = crypto.randomUUID()
    const now = new Date().toISOString()
    const newPolicy = {
      id: policyId,
      title,
      owner_id: null,
      reminder_period_days: null,
      created_at: now,
      updated_at: now,
      versions: [{
        id: versionId,
        policy_id: policyId,
        version_number: 'v.1.00',
        status: 'draft',
        require_esignature: false,
        numbered_sections: false,
        alternative_documentation: 'none',
        styled_pdf_url: null,
        created_at: now,
        published_at: null,
        sections: [],
        signing_records: [],
      }],
      receivers: [],
    }
    policies.value.unshift(newPolicy)

    const { error: pErr } = await supabase.from('policies').insert({
      id: policyId, title, created_at: now, updated_at: now,
    })
    if (pErr) { console.error('createPolicy:', pErr); return }

    const { error: vErr } = await supabase.from('policy_versions').insert({
      id: versionId,
      policy_id: policyId,
      version_number: 'v.1.00',
      status: 'draft',
      require_esignature: false,
      numbered_sections: false,
      alternative_documentation: 'none',
      created_at: now,
    })
    if (vErr) console.error('createPolicy version:', vErr)
  }

  async function updatePolicy(policyId, updates) {
    const policy = policies.value.find(p => p.id === policyId)
    if (policy) Object.assign(policy, updates)

    const { error } = await supabase.from('policies').update(updates).eq('id', policyId)
    if (error) console.error('updatePolicy:', error)
  }

  async function updateVersion(versionId, updates) {
    for (const policy of policies.value) {
      const ver = policy.versions?.find(v => v.id === versionId)
      if (ver) { Object.assign(ver, updates); break }
    }

    const { error } = await supabase.from('policy_versions').update(updates).eq('id', versionId)
    if (error) console.error('updateVersion:', error)
  }

  async function publishVersion(versionId) {
    for (const policy of policies.value) {
      const ver = policy.versions?.find(v => v.id === versionId)
      if (ver) {
        const now = new Date().toISOString()
        const prevActive = policy.versions.filter(v => v.status === 'active')
        prevActive.forEach(v => { v.status = 'archived' })
        ver.status = 'active'
        ver.published_at = now

        if (prevActive.length) {
          await supabase.from('policy_versions')
            .update({ status: 'archived' })
            .in('id', prevActive.map(v => v.id))
        }
        const { error } = await supabase.from('policy_versions')
          .update({ status: 'active', published_at: now })
          .eq('id', versionId)
        if (error) console.error('publishVersion:', error)
        return
      }
    }
  }

  async function addReceiver(policyId, org) {
    const policy = policies.value.find(p => p.id === policyId)
    if (!policy) return
    if (policy.receivers.find(r => r.organization_id === org.id)) return

    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    policy.receivers.push({ id, policy_id: policyId, organization_id: org.id, added_at: now, org })

    const { error } = await supabase.from('policy_receivers')
      .insert({ id, policy_id: policyId, organization_id: org.id, added_at: now })
    if (error) console.error('addReceiver:', error)
  }

  async function removeReceiver(policyId, receiverId) {
    const policy = policies.value.find(p => p.id === policyId)
    if (!policy) return
    policy.receivers = policy.receivers.filter(r => r.id !== receiverId)

    const { error } = await supabase.from('policy_receivers').delete().eq('id', receiverId)
    if (error) console.error('removeReceiver:', error)
  }

  async function addSection(versionId) {
    for (const policy of policies.value) {
      const ver = policy.versions?.find(v => v.id === versionId)
      if (ver) {
        const id = crypto.randomUUID()
        const orderIndex = ver.sections.length
        ver.sections.push({
          id,
          version_id: versionId,
          order_index: orderIndex,
          title: '',
          content: { type: 'doc', content: [{ type: 'paragraph' }] },
          footnote: null,
        })

        const { error } = await supabase.from('policy_sections').insert({
          id, version_id: versionId, order_index: orderIndex,
          title: '', content: { type: 'doc', content: [{ type: 'paragraph' }] },
        })
        if (error) console.error('addSection:', error)
        return
      }
    }
  }

  async function updateSection(versionId, sectionId, updates) {
    for (const policy of policies.value) {
      const ver = policy.versions?.find(v => v.id === versionId)
      if (ver) {
        const sec = ver.sections.find(s => s.id === sectionId)
        if (sec) Object.assign(sec, updates)
        break
      }
    }

    const { error } = await supabase.from('policy_sections').update(updates).eq('id', sectionId)
    if (error) console.error('updateSection:', error)
  }

  async function removeSection(versionId, sectionId) {
    for (const policy of policies.value) {
      const ver = policy.versions?.find(v => v.id === versionId)
      if (ver) {
        ver.sections = ver.sections.filter(s => s.id !== sectionId)
        ver.sections.forEach((s, i) => { s.order_index = i })

        const { error } = await supabase.from('policy_sections').delete().eq('id', sectionId)
        if (error) console.error('removeSection:', error)

        // rewrite order_index for remaining sections
        if (ver.sections.length) {
          await supabase.from('policy_sections').upsert(
            ver.sections.map(s => ({ id: s.id, version_id: versionId, order_index: s.order_index })),
            { onConflict: 'id' }
          )
        }
        return
      }
    }
  }

  return {
    policies, organizations, members, loading, kpis,
    fetchAll,
    getPolicyById, getVersionById, getPolicyForVersion,
    updateVersion, updatePolicy, publishVersion,
    addReceiver, removeReceiver,
    addSection, updateSection, removeSection,
    createPolicy,
  }
})
