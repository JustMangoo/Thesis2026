export function useStatusColor() {
  const statusClasses = {
    active:       { text: 'text-success', bg: 'bg-success-light', border: 'border-success', dot: 'bg-success' },
    draft:        { text: 'text-neutral-500', bg: 'bg-neutral-100', border: 'border-neutral-300', dot: 'bg-neutral-400' },
    archived:     { text: 'text-neutral-400', bg: 'bg-neutral-50', border: 'border-neutral-200', dot: 'bg-neutral-300' },
    inactive:     { text: 'text-neutral-400', bg: 'bg-neutral-100', border: 'border-neutral-300', dot: 'bg-neutral-400' },
    signed:       { text: 'text-success', bg: 'bg-success-light', border: 'border-success', dot: 'bg-success' },
    pending:      { text: 'text-neutral-500', bg: 'bg-neutral-100', border: 'border-neutral-300', dot: 'bg-neutral-400' },
    rejected:     { text: 'text-danger', bg: 'bg-danger-light', border: 'border-danger', dot: 'bg-danger' },
    needs_review: { text: 'text-warning', bg: 'bg-warning-light', border: 'border-warning', dot: 'bg-warning' },
  }

  function getClasses(status) {
    return statusClasses[status] || statusClasses.draft
  }

  function getBadgeClass(status) {
    const c = getClasses(status)
    return `${c.text} ${c.bg} ${c.border}`
  }

  return { getClasses, getBadgeClass }
}
