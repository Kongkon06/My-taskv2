import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Todos } from './Pages/Todos'
import { Subtodo } from './Pages/Subtodo'
import { RecoilRoot } from 'recoil'
import { Info } from './Pages/Info'

function App() {


  return <div>
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Todos/>}/>
      <Route path='/subtodo/:id' element={<Subtodo/>}/>
      <Route path='/info' element={<Info/>}/>
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
  </div>
}

export default App
