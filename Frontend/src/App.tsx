import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Todos } from './Pages/Todos'
import { Subtodo } from './Pages/Subtodo'
import { RecoilRoot } from 'recoil'
import Example from './Components/Example'

function App() {


  return <div>
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Todos/>}/>
      <Route path='/subtodo/:id' element={<Subtodo/>}/>
      <Route path='/info' element={<Example/>}/>
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
  </div>
}

export default App
