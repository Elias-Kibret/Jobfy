import {  
  Routes,  
  Route, 
}   
from 'react-router-dom';  
import {Dashboard,Error,Landing,Register} from './page'
function App() {

  return (
    <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/landing" element={<Landing/>} />
        <Route path="*" element={<Error/>}/>
      </Routes>
  )
}

export default App
