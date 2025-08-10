import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, collection, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('1');
  const [classNum, setClassNum] = useState('1');
  const [school, setSchool] = useState('완도초등학교');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">회원가입</CardTitle>
          <CardDescription>새로운 계정을 생성합니다.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSignUp} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="email">이메일</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="col-span-2">
              <Label htmlFor="userId">아이디</Label>
              <Input id="userId" type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
            </div>
            <div className="col-span-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="col-span-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            <div className="col-span-2">
              <Label htmlFor="name">이름</Label>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label>학교</Label>
              <Select value={school} onValueChange={setSchool}>
                <SelectTrigger>
                  <SelectValue placeholder="학교를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="완도초등학교">완도초등학교</SelectItem>
                  <SelectItem value="완도SW교육체험센터">완도SW교육체험센터</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>학년</Label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="학년" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(6)].map((_, i) => <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>반</Label>
              <Select value={classNum} onValueChange={setClassNum}>
                <SelectTrigger>
                  <SelectValue placeholder="반" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(20)].map((_, i) => <SelectItem key={i + 1} value={String(i + 1)}>{i + 1}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 mt-4">
              <Button type="submit" className="w-full">
                가입하기
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-center block">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
            이미 계정이 있으신가요? 로그인
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
