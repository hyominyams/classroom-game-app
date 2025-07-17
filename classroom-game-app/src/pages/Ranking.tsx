import React from 'react';
import Header from '../components/Header';

// 임시 데이터
const dummySchoolRanking = [
  { rank: 1, name: '김민준', school: '완도초등학교', score: 12500 },
  { rank: 2, name: '이서연', school: '완도SW교육체험센터', score: 11800 },
  { rank: 3, name: '박도윤', school: '완도초등학교', score: 11200 },
  { rank: 4, name: '최지우', school: '완도초등학교', score: 9800 },
  { rank: 5, name: '강하은', school: '완도SW교육체험센터', score: 9500 },
  { rank: 6, name: '조은서', school: '완도초등학교', score: 9100 },
  { rank: 7, name: '윤채원', school: '완도SW교육체험센터', score: 8800 },
  { rank: 8, name: '임시원', school: '완도초등학교', score: 8500 },
  { rank: 9, name: '한유나', school: '완도SW교육체험센터', score: 8200 },
  { rank: 10, name: '정서준', school: '완도초등학교', score: 7900 },
];

const Ranking: React.FC = () => {
  const getBorderColor = (rank: number) => {
    if (rank === 1) return 'border-yellow-400'; // Gold
    if (rank === 2) return 'border-gray-400'; // Silver
    if (rank === 3) return 'border-orange-400'; // Bronze
    return 'border-cyan-400'; // Emerald
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">학교 통합 랭킹</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul>
            {dummySchoolRanking.map((player) => (
              <li key={player.rank} className={`p-3 mb-3 rounded-lg border-4 ${getBorderColor(player.rank)} flex items-center`}>
                <span className="font-bold text-lg mr-4 w-10 text-center">
                  {player.rank === 1 && '🥇'}
                  {player.rank === 2 && '🥈'}
                  {player.rank === 3 && '🥉'}
                  {player.rank > 3 && `${player.rank}`}
                </span>
                <div className="flex-grow">
                  <span className="font-semibold text-lg">{player.name}</span>
                  <span className="text-sm text-gray-500 ml-2">({player.school})</span>
                </div>
                <span className="text-lg font-bold text-blue-600">{player.score}점</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Ranking;