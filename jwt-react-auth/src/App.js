import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './components/Login';
import TestFile from './components/TestFile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/test' element ={<TestFile/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
