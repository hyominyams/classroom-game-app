import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';


const Login: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!userId || !password) {
      setError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      // 1. Firestore에서 userId로 사용자 정보 찾기
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('존재하지 않는 아이디입니다.');
        return;
      }

      // 2. 찾은 사용자의 이메일로 Firebase Auth 로그인
      const userDoc = querySnapshot.docs[0];
      const userEmail = userDoc.data().email;

      await signInWithEmailAndPassword(auth, userEmail, password);

      // 3. 로그인 성공 시 게임 대시보드로 이동
      navigate('/game');

    } catch (err) {
      setError('로그인에 실패했습니다. 비밀번호를 확인해주세요.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <div className="flex justify-center mb-8">
          <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain" />
        </div>
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">로그인</h2>
        {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="userId">
              아이디
            </label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200"
              placeholder="아이디를 입력하세요"
            />
          </div>
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition duration-200"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              로그인
            </button>
          </div>
        </form>
        <div className="text-center mt-6 text-sm">
          <Link to="/signup" className="text-blue-500 hover:text-blue-700 font-medium mx-2">
            회원가입
          </Link>
          <span className="text-gray-400">|</span>
          <Link to="/find-id" className="text-blue-500 hover:text-blue-700 font-medium mx-2">
            아이디찾기
          </Link>
          <span className="text-gray-400">|</span>
          <Link to="/find-password" className="text-blue-500 hover:text-blue-700 font-medium mx-2">
            비밀번호찾기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;