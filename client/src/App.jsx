import Landing from './page/Landing'
import {  
  BrowserRouter as Router,  
  Routes,  
  Route,  
  Link  
}   
from 'react-router-dom';  

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>DashBoard</div>} />
        <Route path="/register" element={<div>Register</div>} />
        <Route path="/landing" element={<Landing/>} />
        <Route path="*" element={<div>404</div>}/>
      </Routes>

    </BrowserRouter>
  )
}

export default App
