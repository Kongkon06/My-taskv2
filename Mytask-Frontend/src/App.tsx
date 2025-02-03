import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Subtodo } from './Pages/Subtodo'
import { RecoilRoot } from 'recoil'
import { Completed } from './Pages/Completed'
import { Home } from './Pages/Home'
import { Signin } from './Pages/Signin'
import { Signup } from './Pages/Signup'
import { NewHome } from './Pages/NewHome'
import GitHubContributions from './Components/GitContri'
import WeeklyProgressTracker from './Components/WeeklyTracker'
import { CalendarView } from './Components/CalenderView'
function App() {


  return <div className='bg-indigo-slate-950'>
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path='/goals' element={<Home/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/subtodo/:id' element={<Subtodo/>}/>
      <Route path='/completed' element={<Completed/>}/>
      <Route path='/calendar' element={<CalendarView/>}/>
      <Route path='/' element={<NewHome/>}/>
      <Route path='/contri' element={<GitHubContributions/>}/>
      <Route path='/area' element={<WeeklyProgressTracker/>}/>
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
  </div>
}

export default App
