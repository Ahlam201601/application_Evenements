import { BrowserRouter , Routes , Route , useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/admin/Dashboard';
import AddEvent from './pages/admin/AddEvent';
import { Toaster } from "react-hot-toast";
import './App.css';
import Events from './pages/Events';
import Navbar from './components/Navbar';
import Checkout from './pages/Checkout';
import Login from './pages/admin/Login';
import Contact from './pages/Contact';
import Footer from './components/Footer';



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
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/contact' element={<Contact/>} />
        
      </Routes>
      <Footer/>
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
