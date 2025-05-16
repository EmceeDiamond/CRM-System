import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TodoListPage from './Pages/TodoListPage/TodoListPage.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProfilePage from './Pages/ProfilePage/ProfilePage.tsx';
import LayoutComponent from './Components/Layout/Layout.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> 
      <LayoutComponent>
        <Routes>
          <Route path="/profile" element={<ProfilePage />}/>
          <Route path="/todo-list" element={<TodoListPage />}/>
        </Routes>
      </LayoutComponent>
    </BrowserRouter>
  </StrictMode>,
)
