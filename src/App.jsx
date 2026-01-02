import { BrowserRouter , Routes , Route , useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/admin/Dashboard';
import AddEvent from './pages/admin/AddEvent';
import { Toaster } from "react-hot-toast";
import './App.css';
import Events from './pages/Events';
import Checkout from './pages/Checkout';
import Login from './pages/admin/Login';
import Contact from './pages/Contact';






function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/admin" element={<Dashboard/>} /> 
        <Route path="/admin/add" element={<AddEvent/>} /> 
        <Route path='/events' element={<Events/>}/>
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/admin' element={<Login/>} />
        <Route path='/contact' element={<Contact/>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;
