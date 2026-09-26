import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TripFinder } from './components/ui/TripFinder'
import { ConversionPrompt } from './components/ui/ConversionPrompt'

import { initMetrikaTracking } from './utils/metrika'

document.documentElement.classList.add('js')
initMetrikaTracking()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <TripFinder />
    <ConversionPrompt />
  </StrictMode>,
)
