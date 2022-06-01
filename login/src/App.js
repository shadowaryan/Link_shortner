import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import {BrowserRouter as Router,Routes ,Route} from "react-router-dom";



function App() {
  return (
    <Router>
      <Routes>
          <Route exact path="login" element={<Login/>}>
          </Route>
          <Route exact path="signup" element={<Signup/>}>
            
          </Route>
     </Routes>
    </Router>
  );
}

export default App;
