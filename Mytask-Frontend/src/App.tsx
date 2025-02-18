import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { Completed } from './Pages/Completed'
import { Home } from './Pages/Goals'
import { Signin } from './Pages/Signin'
import { Signup } from './Pages/Signup'
import { NewHome } from './Pages/Home'
import { CalendarView } from './Components/CalenderView'
import { GoalView } from './Pages/Editpanel'
import { Info } from './Pages/Info'
function App() {


  return <div className='font-dm-sans bg-indigo-slate-950'>
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path='/goals' element={<Home/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/completed' element={<Completed/>}/>
      <Route path='/calendar' element={<CalendarView/>}/>
      <Route path='/' element={<NewHome/>}/>
      <Route path='/area' element={<GoalView/>}/>
      <Route path='/landing' element={<Info/>}/>
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
  </div>
}

export default App
