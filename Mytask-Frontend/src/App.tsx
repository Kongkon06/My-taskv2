import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Subtodo } from './Pages/Subtodo'
import { RecoilRoot } from 'recoil'
import { Completed } from './Pages/Completed'
import { Home } from './Pages/Home'

function App() {


  return <div className='bg-indigo-slate-950'>
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/subtodo/:id' element={<Subtodo/>}/>
      <Route path='/completed' element={<Completed/>}/>
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
  </div>
}

export default App
