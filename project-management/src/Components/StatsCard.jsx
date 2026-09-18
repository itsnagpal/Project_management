export default function StatsCard({ label, value }) {
  return (
    <div className="stats-card">
      <span className="stats-card-value">{value}</span>
      <span className="stats-card-label">{label}</span>
    </div>
  )
}