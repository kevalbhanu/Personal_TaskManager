import {BrowserRouter as Router , Route,Routes} from 'react-router-dom'
import './App.css';
import Nav from './components/Nav';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <div>
      <Router>
        <Nav/>
        <Routes>
          <Route path='/' element={<Dashboard/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
