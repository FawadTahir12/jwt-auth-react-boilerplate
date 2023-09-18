import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './components/Login';
import TestFile from './components/TestFile';
import Register from './components/Register';
import Verify from './components/VerifyOTP';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/test' element ={<TestFile/>}/>
        <Route path='/register' element ={<Register/>}/>
        <Route path='/verify-otp' element ={<Verify/>}/>
        

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
