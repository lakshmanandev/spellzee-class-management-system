export function DashboardSkeleton(){return <div className="page"><div className="skeleton-title"/><div className="stats">{[1,2,3,4].map(x=><div className="skeleton stat" key={x}/>)}</div><div className="skeleton skeleton-panel"/></div>}
export function TableSkeleton(){return <div className="skeleton-table">{[1,2,3,4,5].map(x=><div className="skeleton" key={x}/>)}</div>}
