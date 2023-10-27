import React from 'react'
import ReactDOM from 'react-dom/client'

import { configureEditor } from './RichTextEditor'

import './index.css'
import App from './App'
import { DEFAULT_STYLE } from './constant'

configureEditor({
  defaultStyle: DEFAULT_STYLE,
  clipboard: {
    stripOutsidePastedStyle: false
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)