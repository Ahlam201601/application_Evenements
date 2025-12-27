import { BrowserRouter , Routes , Route , useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/admin/Dashboard';
import AddEvent from './pages/admin/AddEvent';
import Orders from './pages/admin/Orders';
import { Toaster } from "react-hot-toast";
import './App.css';
import Events from './pages/Events';
import Navbar from './components/Navbar';
import AdminSidebar from './components/admin/AdminSidebar';

function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* Show Navbar only outside /admin */}
      {!location.pathname.startsWith("/admin") && (
        <>
          <Navbar />
        </>
      )}

      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/admin" element={<Dashboard/>} /> 
        <Route path="/admin/add" element={<AddEvent/>} /> 
        <Route path='/events' element={<Events/>}/>
        <Route path="/admin/orders" element={<Orders/>} /> 
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App;
