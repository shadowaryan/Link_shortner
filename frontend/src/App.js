import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import LinkStats from './components/DailyStats';
import {BrowserRouter as Router,Routes ,Route} from "react-router-dom";
import Dashboard from './pages/Dashboard';




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
          <Route exact path="dashboard" element={<Dashboard/>}>
          </Route>
     </Routes>
    </Router>
  );
}

export default App;
