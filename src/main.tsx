import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Agentation } from 'agentation'
import './index.css'
import App from './App.tsx'
import { TripFinder } from './components/ui/TripFinder'
import { ConversionPrompt } from './components/ui/ConversionPrompt'

document.documentElement.classList.add('js')

createRoot(document.getElementById('root')!).render(
  <>
    <StrictMode>
      <App />
      <TripFinder />
      <ConversionPrompt />
    </StrictMode>
    {import.meta.env.DEV && <Agentation endpoint="http://localhost:4747" />}
  </>,
)
