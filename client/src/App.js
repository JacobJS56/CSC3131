import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './containers/HomePageBuilder';

export default function App() {
  return (
    <Router>

      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/404" ></Route>
      </Routes>
    </Router>
  );
}
