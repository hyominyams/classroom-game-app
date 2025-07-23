import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // 로그아웃 후 로그인 페이지로 이동
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">
          <Link to="/game">Classroom Game</Link>
        </div>
        <div>
          <Link to="/game" className="text-gray-800 hover:text-blue-600 px-3 py-2">게임</Link>
          <Link to="/ranking" className="text-gray-800 hover:text-blue-600 px-3 py-2">학교 랭킹</Link>
          {/* TODO: 교사 역할(role)에 따라 조건부 렌더링 필요 */}
          <Link to="/teacher" className="text-gray-800 hover:text-blue-600 px-3 py-2">교사 대시보드</Link>
        </div>
        <div>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            로그아웃
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
