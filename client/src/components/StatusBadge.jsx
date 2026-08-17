export default function StatusBadge({ value }) { return <span className={`badge ${value?.toLowerCase().replace('_', '-')}`}>{value?.replace('_', ' ')}</span>; }
