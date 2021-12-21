import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './containers/HomePageBuilder';
import Admin from './containers/AdminPageBuilder';
import AdminLogin from './containers/AdminLoginPageBuilder';
import Player from './containers/PlayerPageBuilder';

// routes for pages

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/admin" element={<Admin />}></Route>
        <Route exact path="/admin_login" element={<AdminLogin />}></Route>
        <Route exact path="/player/:teamName/:seasonNumber/:gameweekNumber" element={<Player />}></Route>
        <Route exact path="/404" ></Route>
      </Routes>
    </Router>
  );
}
