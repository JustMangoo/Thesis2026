import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const MOCK_ORGS = [
  { id: 'org-1', name: 'Globex', industry: 'Manufacturing' },
  { id: 'org-2', name: 'Initech', industry: 'Technology' },
  { id: 'org-3', name: 'OmniCorp', industry: 'Retail' },
  { id: 'org-4', name: 'Acme Corp', industry: 'Manufacturing' },
  { id: 'org-5', name: 'Umbrella Ltd', industry: 'Pharmaceutical' },
]

const MOCK_SECTIONS = [
  {
    id: 'sec-1',
    version_id: 'ver-1',
    order_index: 0,
    title: 'Labour Standards',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'All suppliers must ensure working conditions meet national labour law and the standards defined in this policy, including fair compensation, reasonable hours, and a safe working environment. ' },
            { type: 'variableNode', attrs: { variableType: 'supplier', label: 'supplier_name' } },
            { type: 'text', text: ' confirms by signing that these conditions are maintained and reviewed at least once per calendar year.' },
          ],
        },
      ],
    },
    footnote: 'Where multiple jurisdictions apply, the stricter of the applicable national standard or this policy takes precedence.',
  },
  {
    id: 'sec-2',
    version_id: 'ver-1',
    order_index: 1,
    title: 'Environmental Compliance',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            { type: 'text', text: 'Suppliers must comply with all applicable environmental regulations and report any incidents to ' },
            { type: 'variableNode', attrs: { variableType: 'organization', label: 'organization_name' } },
            { type: 'text', text: ' within 48 hours.' },
          ],
        },
      ],
    },
    footnote: null,
  },
]

const MOCK_DATA = [
  {
    id: 'pol-1',
    title: 'OECD - Code of Conduct',
    owner_id: null,
    reminder_period_days: 30,
    created_at: '2026-04-02T09:08:56Z',
    updated_at: '2026-04-02T09:08:56Z',
    versions: [
      {
        id: 'ver-1',
        policy_id: 'pol-1',
        version_number: 'v.4.00',
        status: 'active',
        require_esignature: false,
        numbered_sections: false,
        alternative_documentation: 'none',
        styled_pdf_url: null,
        created_at: '2026-04-02T09:08:56Z',
        published_at: '2026-04-02T09:08:56Z',
        sections: MOCK_SECTIONS,
        signing_records: [
          { id: 'sr-1', version_id: 'ver-1', organization_id: 'org-1', status: 'signed', org: MOCK_ORGS[0] },
          { id: 'sr-2', version_id: 'ver-1', organization_id: 'org-2', status: 'pending', org: MOCK_ORGS[1] },
          { id: 'sr-3', version_id: 'ver-1', organization_id: 'org-3', status: 'rejected', org: MOCK_ORGS[2] },
          { id: 'sr-4', version_id: 'ver-1', organization_id: 'org-4', status: 'needs_review', org: MOCK_ORGS[3] },
          { id: 'sr-5', version_id: 'ver-1', organization_id: 'org-5', status: 'pending', org: MOCK_ORGS[4] },
        ],
      },
      {
        id: 'ver-2',
        policy_id: 'pol-1',
        version_number: 'v.4.01',
        status: 'draft',
        require_esignature: true,
        numbered_sections: false,
        alternative_documentation: 'optional',
        styled_pdf_url: null,
        created_at: '2026-04-02T09:08:56Z',
        published_at: null,
        sections: [],
        signing_records: [],
      },
      {
        id: 'ver-hist-1',
        policy_id: 'pol-1',
        version_number: 'v.3.00',
        status: 'archived',
        require_esignature: false,
        numbered_sections: false,
        alternative_documentation: 'none',
        styled_pdf_url: null,
        created_at: '2026-03-01T00:00:00Z',
        published_at: '2026-03-01T00:00:00Z',
        sections: [],
        signing_records: [],
      },
      {
        id: 'ver-hist-2',
        policy_id: 'pol-1',
        version_number: 'v.2.00',
        status: 'archived',
        require_esignature: false,
        numbered_sections: false,
        alternative_documentation: 'none',
        styled_pdf_url: null,
        created_at: '2026-01-15T00:00:00Z',
        published_at: '2026-01-15T00:00:00Z',
        sections: [],
        signing_records: [],
      },
      {
        id: 'ver-hist-3',
        policy_id: 'pol-1',
        version_number: 'v.1.00',
        status: 'archived',
        require_esignature: false,
        numbered_sections: false,
        alternative_documentation: 'none',
        styled_pdf_url: null,
        created_at: '2025-10-01T00:00:00Z',
        published_at: '2025-10-01T00:00:00Z',
        sections: [],
        signing_records: [],
      },
    ],
    receivers: [
      { id: 'rec-1', policy_id: 'pol-1', organization_id: 'org-1', added_at: '2026-04-02T09:08:56Z', org: MOCK_ORGS[0] },
      { id: 'rec-2', policy_id: 'pol-1', organization_id: 'org-2', added_at: '2026-04-02T09:08:56Z', org: MOCK_ORGS[1] },
      { id: 'rec-3', policy_id: 'pol-1', organization_id: 'org-3', added_at: '2026-04-02T09:08:56Z', org: MOCK_ORGS[2] },
      { id: 'rec-4', policy_id: 'pol-1', organization_id: 'org-4', added_at: '2026-04-02T09:08:56Z', org: MOCK_ORGS[3] },
      { id: 'rec-5', policy_id: 'pol-1', organization_id: 'org-5', added_at: '2026-04-02T09:08:56Z', org: MOCK_ORGS[4] },
    ],
  },
  {
    id: 'pol-2',
    title: 'BSCI - Terms of Implementation for Business Partners',
    owner_id: null,
    reminder_period_days: null,
    created_at: '2026-04-02T09:08:56Z',
    updated_at: '2026-04-02T09:08:56Z',
    versions: [],
    receivers: [],
  },
]

export const usePoliciesStore = defineStore('policies', () => {
  const policies = ref(MOCK_DATA)
  const organizations = ref(MOCK_ORGS)
  const loading = ref(false)

  const kpis = computed(() => {
    let pendingSignatures = 0
    let needReview = 0
    let rejections = 0
    for (const policy of policies.value) {
      const activeVersion = policy.versions.find(v => v.status === 'active')
      if (activeVersion) {
        for (const sr of activeVersion.signing_records) {
          if (sr.status === 'pending') pendingSignatures++
          if (sr.status === 'needs_review') needReview++
          if (sr.status === 'rejected') rejections++
        }
      }
    }
    return {
      totalPolicies: policies.value.length,
      pendingSignatures,
      needReview,
      rejections,
    }
  })

  function getPolicyById(id) {
    return policies.value.find(p => p.id === id)
  }

  function getVersionById(id) {
    for (const policy of policies.value) {
      const ver = policy.versions.find(v => v.id === id)
      if (ver) return { version: ver, policy }
    }
    return null
  }

  function getPolicyForVersion(versionId) {
    for (const policy of policies.value) {
      if (policy.versions.find(v => v.id === versionId)) return policy
    }
    return null
  }

  function updateVersion(versionId, updates) {
    for (const policy of policies.value) {
      const ver = policy.versions.find(v => v.id === versionId)
      if (ver) {
        Object.assign(ver, updates)
        return
      }
    }
  }

  function updatePolicy(policyId, updates) {
    const policy = policies.value.find(p => p.id === policyId)
    if (policy) Object.assign(policy, updates)
  }

  function publishVersion(versionId) {
    for (const policy of policies.value) {
      const ver = policy.versions.find(v => v.id === versionId)
      if (ver) {
        policy.versions.forEach(v => { if (v.status === 'active') v.status = 'archived' })
        ver.status = 'active'
        ver.published_at = new Date().toISOString()
        return
      }
    }
  }

  function addReceiver(policyId, org) {
    const policy = policies.value.find(p => p.id === policyId)
    if (!policy) return
    if (policy.receivers.find(r => r.organization_id === org.id)) return
    policy.receivers.push({
      id: `rec-${Date.now()}`,
      policy_id: policyId,
      organization_id: org.id,
      added_at: new Date().toISOString(),
      org,
    })
  }

  function removeReceiver(policyId, receiverId) {
    const policy = policies.value.find(p => p.id === policyId)
    if (!policy) return
    policy.receivers = policy.receivers.filter(r => r.id !== receiverId)
  }

  function addSection(versionId) {
    for (const policy of policies.value) {
      const ver = policy.versions.find(v => v.id === versionId)
      if (ver) {
        ver.sections.push({
          id: `sec-${Date.now()}`,
          version_id: versionId,
          order_index: ver.sections.length,
          title: '',
          content: { type: 'doc', content: [{ type: 'paragraph' }] },
          footnote: null,
        })
        return
      }
    }
  }

  function updateSection(versionId, sectionId, updates) {
    for (const policy of policies.value) {
      const ver = policy.versions.find(v => v.id === versionId)
      if (ver) {
        const sec = ver.sections.find(s => s.id === sectionId)
        if (sec) Object.assign(sec, updates)
        return
      }
    }
  }

  function removeSection(versionId, sectionId) {
    for (const policy of policies.value) {
      const ver = policy.versions.find(v => v.id === versionId)
      if (ver) {
        ver.sections = ver.sections.filter(s => s.id !== sectionId)
        ver.sections.forEach((s, i) => { s.order_index = i })
        return
      }
    }
  }

  function createPolicy(title) {
    const id = `pol-${Date.now()}`
    policies.value.push({
      id,
      title,
      owner_id: null,
      reminder_period_days: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      versions: [{
        id: `ver-${Date.now()}`,
        policy_id: id,
        version_number: 'v.1.00',
        status: 'draft',
        require_esignature: false,
        numbered_sections: false,
        alternative_documentation: 'none',
        styled_pdf_url: null,
        created_at: new Date().toISOString(),
        published_at: null,
        sections: [],
        signing_records: [],
      }],
      receivers: [],
    })
  }

  return {
    policies, organizations, loading, kpis,
    getPolicyById, getVersionById, getPolicyForVersion,
    updateVersion, updatePolicy, publishVersion,
    addReceiver, removeReceiver,
    addSection, updateSection, removeSection,
    createPolicy,
  }
})
