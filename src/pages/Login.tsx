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
      setError('로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src="/logo.png" alt="Logo" className="w-24 h-24 mx-auto mb-4 object-contain" />
          <CardTitle className="text-2xl font-bold">로그인</CardTitle>
          <CardDescription>계정에 로그인합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="userId">아이디</Label>
              <Input 
                id="userId" 
                type="text" 
                value={userId} 
                onChange={(e) => setUserId(e.target.value)} 
                placeholder="아이디를 입력하세요"
                required 
              />
            </div>
            <div>
              <Label htmlFor="password">비밀번호</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="비밀번호를 입력하세요"
                required 
              />
            </div>
            <Button type="submit" className="w-full">
              로그인
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center block">
          <Link to="/signup" className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
            아직 계정이 없으신가요? 회원가입
          </Link>
          {/* TODO: 아이디/비밀번호 찾기 페이지 링크 추가 */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
