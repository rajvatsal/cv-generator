import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.scss'

import { Header } from './components/Header/Header.jsx'
import { Main } from './components/Main/Main.jsx'

function App() {
  return (
    <>
      <Header />
      <Main />
    </>
  )
}

export default App
