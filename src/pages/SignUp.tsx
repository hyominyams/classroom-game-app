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
import { Alert, AlertDescription } from "@/components/ui/alert";

import { Listbox } from '@headlessui/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // User Type State
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');

  // Student Specific States
  const [grade, setGrade] = useState('1');
  const [classNum, setClassNum] = useState('1');
  const [school, setSchool] = useState('완도초등학교');

  // Teacher Specific States (currently empty, but ready for future fields)
  // const [teacherId, setTeacherId] = useState('');

  const grades = Array.from({ length: 6 }, (_, i) => String(i + 1));
  const classNums = Array.from({ length: 20 }, (_, i) => String(i + 1));
  const schools = ['완도초등학교', '완도SW교육체험센터'];

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
      const userData: any = {
        uid: user.uid,
        email,
        userId,
        name,
        userType,
        createdAt: serverTimestamp(),
      };

      if (userType === 'student') {
        Object.assign(userData, {
          school,
          grade: parseInt(grade),
          class: parseInt(classNum),
          avatarConfig: {},
          warnCount: 0,
        });
      } else if (userType === 'teacher') {
        // Add teacher specific data here if needed
        // Object.assign(userData, { teacherId });
      }

      await setDoc(doc(db, 'users', user.uid), userData);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200 p-4">
      <Card className="w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 bg-white">
        <CardHeader className="text-center p-8">
          <CardTitle className="text-3xl font-bold text-slate-700">회원가입</CardTitle>
          <CardDescription className="text-slate-500 mb-6">새로운 계정을 생성합니다.</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSignUp} className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <Label htmlFor="email" className="text-slate-700">이메일</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-slate-100 border-0 focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="userId" className="text-slate-700">아이디</Label>
              <Input id="userId" type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required 
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-slate-100 border-0 focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="password" className="text-slate-700">비밀번호</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-slate-100 border-0 focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="confirmPassword" className="text-slate-700">비밀번호 확인</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required 
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-slate-100 border-0 focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="name" className="text-slate-700">이름</Label>
              <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required 
                className="mt-1 block w-full px-4 py-3 rounded-lg bg-slate-100 border-0 focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div className="col-span-2 border-t border-slate-200 pt-6 mt-6">
              <h3 className="text-lg font-semibold text-slate-700 mb-4">회원 유형 선택</h3>
              <Tabs value={userType} onValueChange={(value) => setUserType(value as 'student' | 'teacher')} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="student">학생</TabsTrigger>
                  <TabsTrigger value="teacher">교사</TabsTrigger>
                </TabsList>
                <TabsContent value="student" className="mt-4 grid grid-cols-2 gap-6">
                  <div>
                    <Label className="text-slate-700">학교</Label>
                    <Listbox value={school} onChange={setSchool}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-100 py-3 pl-4 pr-10 text-left shadow-sm border-0 focus:ring-2 focus:ring-blue-300">
                          <span className="block truncate text-slate-700">{school}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            ▼
                          </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {schools.map((s, sIdx) => (
                            <Listbox.Option
                              key={sIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}`
                              }
                              value={s}
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                    {s}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                      ✓
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>
                  <div>
                    <Label className="text-slate-700">학년</Label>
                    <Listbox value={grade} onChange={setGrade}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-100 py-3 pl-4 pr-10 text-left shadow-sm border-0 focus:ring-2 focus:ring-blue-300">
                          <span className="block truncate text-slate-700">{grade}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            ▼
                          </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {grades.map((g, gIdx) => (
                            <Listbox.Option
                              key={gIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}`
                              }
                              value={g}
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                    {g}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                      ✓
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>
                  <div>
                    <Label className="text-slate-700">반</Label>
                    <Listbox value={classNum} onChange={setClassNum}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-100 py-3 pl-4 pr-10 text-left shadow-sm border-0 focus:ring-2 focus:ring-blue-300">
                          <span className="block truncate text-slate-700">{classNum}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            ▼
                          </span>
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {classNums.map((c, cIdx) => (
                            <Listbox.Option
                              key={cIdx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}`
                              }
                              value={c}
                            >
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                    {c}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                      ✓
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    </Listbox>
                  </div>
                </TabsContent>
                <TabsContent value="teacher" className="mt-4">
                  {/* Teacher specific fields can be added here */}
                  <p className="text-slate-700">교사 전용 필드를 여기에 추가하세요.</p>
                </TabsContent>
              </Tabs>
            </div>

            <div className="col-span-2 mt-4">
              <Button 
                type="submit" 
                className="w-full bg-blue-400 text-white font-semibold py-3 rounded-lg hover:bg-blue-500 transform hover:scale-105 transition-transform"
              >
                가입하기
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-center block p-8 pt-0">
          <Link to="/" className="text-sm text-slate-600 hover:underline">
            이미 계정이 있으신가요? <span className="text-blue-500 font-semibold">로그인</span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
