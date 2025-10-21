// Arquivo: src/App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
// (Vamos criar estas páginas na próxima etapa)
// import LoginPage from './pages/LoginPage';
// import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      {/* <Route path="/admin" element={<AdminDashboard />} /> */}
    </Routes>
  );
}

export default App;