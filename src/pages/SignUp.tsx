import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('1');
  const [classNum, setClassNum] = useState('1');
  const [school, setSchool] = useState('완도초등학교');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // 아이디 중복 확인
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setError('이미 사용중인 아이디입니다.');
        return;
      }

      // Firebase Auth를 통해 이메일 기반 계정 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore에 추가 정보 저장
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email,
        userId,
        name,
        school,
        grade: parseInt(grade),
        class: parseInt(classNum),
        avatarConfig: {},
        warnCount: 0,
        createdAt: serverTimestamp(),
      });

      // 회원가입 성공 후 로그인 페이지로 이동
      navigate('/');

    } catch (err: unknown) {
      let errorMessage = '회원가입에 실패했습니다. 다시 시도해주세요.';
      if (typeof err === 'object' && err !== null && 'code' in err) {
        const firebaseError = err as { code: string };
        if (firebaseError.code === 'auth/email-already-in-use') {
          errorMessage = '이미 사용중인 이메일입니다.';
        } else if (firebaseError.code === 'auth/weak-password') {
          errorMessage = '비밀번호는 6자리 이상이어야 합니다.';
        }
      }
      setError(errorMessage);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSignUp} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label>이메일</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2 border rounded" />
          </div>
          <div className="col-span-2">
            <label>아이디</label>
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required className="w-full p-2 border rounded" />
          </div>
          <div className="col-span-2">
            <label>비밀번호</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-2 border rounded" />
          </div>
          <div className="col-span-2">
            <label>이름</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label>학교</label>
            <select value={school} onChange={(e) => setSchool(e.target.value)} className="w-full p-2 border rounded">
              <option>완도초등학교</option>
              <option>완도SW교육체험센터</option>
            </select>
          </div>
          <div>
            <label>학년</label>
            <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full p-2 border rounded">
              {[...Array(6)].map((_, i) => <option key={i + 1}>{i + 1}</option>)}
            </select>
          </div>
          <div>
            <label>반</label>
            <select value={classNum} onChange={(e) => setClassNum(e.target.value)} className="w-full p-2 border rounded">
              {[...Array(20)].map((_, i) => <option key={i + 1}>{i + 1}</option>)}
            </select>
          </div>
          <div className="col-span-2 mt-4">
            <button type="submit" className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded relative z-10">
              가입하기
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-800">
            이미 계정이 있으신가요? 로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;