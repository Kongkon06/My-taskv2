import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Todos } from './Pages/Todos'
import { Subtodo } from './Pages/Subtodo'
import { RecoilRoot } from 'recoil'
import DrawerNavigation from './Components/Sidebar'
import { Completed } from './Pages/Completed'

function App() {


  return <div className='bg-indigo-slate-950'>
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Todos/>}/>
      <Route path='/subtodo/:id' element={<Subtodo/>}/>
      <Route path='/info' element={<DrawerNavigation/>}/>
      <Route path='/completed' element={<Completed/>}/>
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
  </div>
}

export default App
