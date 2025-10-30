import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './shared/components/Nav'
import Footer from './shared/components/Footer'
import Home from './features/home/Home';
import Header from './shared/components/Header'
import User from './features/user/User'
import AppRouter from './router/Router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppRouter />
    </>
  )
};

export default App;