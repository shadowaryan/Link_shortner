import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import LinkStats from './components/LinkStats';
import NavBars from './components/NavBars';
import {BrowserRouter as Router,Routes ,Route} from "react-router-dom";




function App() {
  
  return (
    <Router>
      <Routes>
          <Route exact path="login" element={<Login/>}>
          </Route>
          <Route exact path="signup" element={<Signup/>}>
          </Route>
          <Route exact path="link-stats" element={<LinkStats/>}>
          </Route>
     </Routes>
    </Router>
  );
}

export default App;
