import "../styles/card.css"

function formatLabel(value) {
  return value
    .toLowerCase()
    .split("_")
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ")
}

export function ProjectCard({ project, onOpen, onEdit, onDelete }) {
  function stop(handler) {
    return event => {
      event.stopPropagation()
      handler()
    }
  }

  return (
    <div
      className="app-card app-card-clickable"
      onClick={onOpen ? () => onOpen(project) : undefined}
    >
      <div className="app-card-header">
        <h3 className="app-card-title">{project.name}</h3>
        <span
          className={`status-badge status-${project.status.toLowerCase()}`}
        >
          {formatLabel(project.status)}
        </span>
      </div>

      <p className="app-card-description">{project.description}</p>

      <div className="app-card-meta">
        <span className={`priority-tag priority-${project.priority.toLowerCase()}`}>
          {formatLabel(project.priority)} priority
        </span>
        <span className="app-card-due">Due {project.dueDate}</span>
      </div>

      <div className="app-card-footer">
        <span className="app-card-members">
          {project.members.length} member
          {project.members.length !== 1 ? "s" : ""}
        </span>

        {(onEdit || onDelete) && (
          <div className="app-card-actions">
            {onEdit && (
              <button onClick={stop(() => onEdit(project))}>Edit</button>
            )}
            {onDelete && (
              <button onClick={stop(() => onDelete(project))}>Delete</button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
  const isDone = task.status === "COMPLETED"

  return (
    <div className={`app-card${isDone ? " app-card-done" : ""}`}>
      <div className="app-card-header">
        <h3 className="app-card-title">{task.title}</h3>
        <span className={`status-badge status-${task.status.toLowerCase()}`}>
          {formatLabel(task.status)}
        </span>
      </div>

      <p className="app-card-description">{task.description}</p>

      <div className="app-card-meta">
        <span className={`priority-tag priority-${task.priority.toLowerCase()}`}>
          {formatLabel(task.priority)} priority
        </span>
        <span className="app-card-due">Due {task.dueDate}</span>
      </div>

      <div className="app-card-footer">
        {onToggleComplete && (
          <button
            className="app-card-complete-btn"
            onClick={() => onToggleComplete(task)}
          >
            {isDone ? "Mark as Todo" : "Mark as Completed"}
          </button>
        )}

        {(onEdit || onDelete) && (
          <div className="app-card-actions">
            {onEdit && <button onClick={() => onEdit(task)}>Edit</button>}
            {onDelete && (
              <button onClick={() => onDelete(task)}>Delete</button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}