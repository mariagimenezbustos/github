import './App.css';
import Profile from './pages/Profile';
import Home from "./pages/Home";
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;

