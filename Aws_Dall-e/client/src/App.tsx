import Register from "./components/Register"
import Login from "./components/Login"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Confirm from "./components/Confirm"
import Dashboard from "./components/Dashboard"

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/confirm" element={<Confirm/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard/:id" element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
}

export default App