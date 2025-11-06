import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Chats from './Pages/Chats'
function App() {
  return (
   <div>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/chats' element={<Chats/>}/>
    </Routes>
   </div>
  )
}

export default App
