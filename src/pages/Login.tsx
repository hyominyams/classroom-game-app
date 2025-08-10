import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginPage: React.FC = () => {
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
      setError('로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl border border-slate-200 bg-white">
        <CardHeader className="text-center p-8">
          <img src="/logo.png" alt="Logo" className="w-24 h-24 mx-auto mb-4 object-contain" />
          <CardTitle className="text-3xl font-bold text-slate-700">로그인</CardTitle>
          <CardDescription className="text-slate-500 mb-6">다시 만나서 반가워요!</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="userId" className="text-slate-700">아이디</Label>
              <Input 
                id="userId" 
                type="text" 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)} 
                placeholder="아이디를 입력하세요"
                required 
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-slate-100 border-0 focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-slate-700">비밀번호</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="비밀번호를 입력하세요"
                required 
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-slate-100 border-0 focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-400 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 transform hover:scale-105 transition-transform"
            >
              로그인
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center block p-8 pt-0">
          <Link to="/signup" className="text-sm text-slate-600 hover:underline">
            아직 계정이 없으신가요? <span className="text-blue-500 font-semibold">회원가입</span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
