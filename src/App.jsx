import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import InventoryPage from './pages/InventoryPage';
import ProjectsPage from './pages/ProjectsPage';

function App() {

  return (
    <>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/inventory"/>} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
