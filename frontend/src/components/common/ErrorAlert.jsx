import React from 'react'

const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null

  return (
    <div className="error-alert" style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>❌ {message}</span>
      {onClose && (
        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>×</button>
      )}
    </div>
  )
}

export default ErrorAlert