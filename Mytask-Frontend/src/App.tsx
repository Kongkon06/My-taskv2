import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Subtodo } from './Pages/Subtodo'
import { RecoilRoot } from 'recoil'
import { Completed } from './Pages/Completed'
import { Home } from './Pages/Goals'
import { Signin } from './Pages/Signin'
import { Signup } from './Pages/Signup'
import { NewHome } from './Pages/Home'
import GitHubContributions from './Components/GitContri'
import WeeklyProgressTracker from './Components/WeeklyTracker'
import { CalendarView } from './Components/CalenderView'
import TaskPlanner from './Pages/TaskStats'
function App() {


  return <div className='font-dm-sans bg-indigo-slate-950'>
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
      <Route path='/area' element={<TaskPlanner/>}/>
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
  </div>
}

export default App
