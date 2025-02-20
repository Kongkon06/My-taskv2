import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Completed } from './Pages/Completed'
import { GoalsList } from './Pages/Goals'
import { Signin } from './Pages/Signin'
import { Signup } from './Pages/Signup'
import { Home } from './Pages/Home'
import { CalendarView } from './Pages/CalenderView'
import { PlanView } from './Pages/PlanView'
import { Info } from './Pages/Landing'
function App() {


  return <div className='font-dm-sans bg-indigo-slate-950'>
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path='/goals' element={<GoalsList/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/completed' element={<Completed/>}/>
      <Route path='/calendar' element={<CalendarView/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/area' element={<PlanView/>}/>
      <Route path='/landing' element={<Info/>}/>
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
  </div>
}

export default App
