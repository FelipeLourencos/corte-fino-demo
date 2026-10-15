import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { conteudo } from './conteudo.ts'

// Cores principais do tema, definidas em conteudo.ts
const { cores } = conteudo
const raiz = document.documentElement.style
raiz.setProperty('--gold', cores.dourado)
raiz.setProperty('--gold-soft', cores.douradoClaro)
raiz.setProperty('--forest', cores.verde)
raiz.setProperty('--forest-deep', cores.verdeEscuro)
raiz.setProperty('--graphite', cores.grafite)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
