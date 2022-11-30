import {  
  Routes,  
  Route, 
}   
from 'react-router-dom';  
import { Error, Landing, Register } from './page'
import {Profile,AllJob,AddJob,ShareLayout,Stats} from './page/DashBoard'
function App() {

  return (
    <Routes>
        <Route path="/">
        <Route path="stats" element={<Stats />} />
        <Route path="all-jobs" element={<AllJob />} />
        <Route path="add-job" element={<AddJob />} />
        <Route path="profile" element={ <Profile/>} />
        </Route>
        <Route path="/register" element={<Register/>} />
        <Route path="/landing" element={<Landing/>} />
        <Route path="*" element={<Error/>}/>
      </Routes>
  )
}

export default App
