
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import Player from './pages/Player';


function App() {
  return (
    <div className="App">


      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/homepage' element={<Homepage />} />
          <Route path='/player/:id' element={<Player />} />
        </Routes>

      
      </BrowserRouter>

     
    </div>
  );
}

export default App;
