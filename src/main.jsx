import React from 'react'
import ReactDOM from 'react-dom/client'
import PlaceholderDots from './PlaceholderDots.jsx'
import App from './App.jsx'
import './normalize.css'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const tempDiv = document.createElement('div')
document.body.appendChild(tempDiv)
tempDiv.classList.add('invisible', 'snippet')
tempDiv.setAttribute('data-title', 'dot-flashing')

ReactDOM.createRoot(tempDiv).render(
  <React.StrictMode>
    <PlaceholderDots />
  </React.StrictMode>,
)

