import { BrowserRouter, Routes, Route }  from 'react-router-dom'
//pages and components
import Home from './pages/Home';
import Login from './pages/Signup';
import Signup from './pages/Login';
import NavBar from './components/Navbar';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <div className='pages'>
          <Routes>
            <Route 
               path="/"
               element={<Home/>} 
            />
            <Route 
               path="/signup"
               element={<Signup />} 
            />
            <Route 
               path="/login"
               element={<Login />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
