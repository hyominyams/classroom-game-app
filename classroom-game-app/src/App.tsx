import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import GameDashboard from './pages/GameDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import Ranking from './pages/Ranking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/game" element={<GameDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/ranking" element={<Ranking />} />
      </Routes>
    </Router>
  );
}

export default App;