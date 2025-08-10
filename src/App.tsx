import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 컴포넌트를 React.lazy를 사용해 동적으로 import 합니다.
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const GameDashboard = lazy(() => import('./pages/GameDashboard'));
const TeacherDashboard = lazy(() => import('./pages/TeacherDashboard'));
const Ranking = lazy(() => import('./pages/Ranking'));

function App() {
  return (
    <Router>
      {/* Suspense로 Routes를 감싸고, 로딩 중에 보여줄 fallback UI를 설정합니다. */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/game" element={<GameDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;