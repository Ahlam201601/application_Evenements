import { BrowserRouter,Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/admin/Dashboard'
import AddEvent from './pages/admin/AddEvent'
import EventsList from './pages/admin/EventsList'
import Orders from './pages/admin/Orders'
import { Toaster } from "react-hot-toast";
import './App.css'

function App() {

  return (
    <BrowserRouter>
    <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home/>} /> 
        <Route path="/admin" element={<Dashboard/>} /> 
        <Route path="/admin/add" element={<AddEvent/>} /> 
        <Route path="/admin/eventslist" element={<EventsList/>} /> 
        <Route path="/admin/orders" element={<Orders/>} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
