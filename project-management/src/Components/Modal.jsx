export default function Modal({ title, onClose, children }) {
  return (

      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        {children}
      </div>
  
  )
}