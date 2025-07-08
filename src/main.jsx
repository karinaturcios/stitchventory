import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage.jsx'
import ProjectsPage from './pages/ProjectsPage.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
)
