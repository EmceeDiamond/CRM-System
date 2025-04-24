import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TodoListPage from './Pages/TodoListPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoListPage />
  </StrictMode>,
)
