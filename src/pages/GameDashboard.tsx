import React, { useState } from 'react';


// 임시 데이터
const dummyGames = [
  { id: 1, name: '블럭깨기', url: 'about:blank' },
  { id: 2, name: '숫자게임', url: 'about:blank' },
  { id: 3, name: '카드뒤집기', url: 'about:blank' },
  { id: 4, name: '타자연습', url: 'about:blank' },
];

const dummyRanking = [
  { rank: 1, name: '김민준', score: 12500 },
  { rank: 2, name: '이서연', score: 11800 },
  { rank: 3, name: '박도윤', score: 11200 },
  { rank: 4, name: '최지우', score: 9800 },
  { rank: 5, name: '강하은', score: 9500 },
  { rank: 6, name: '조은서', score: 9100 },
  { rank: 7, name: '윤채원', score: 8800 },
  { rank: 8, name: '임시원', score: 8500 },
  { rank: 9, name: '한유나', score: 8200 },
  { rank: 10, name: '정서준', score: 7900 },
];

const GameDashboard: React.FC = () => {
  const [selectedGameUrl, setSelectedGameUrl] = useState(dummyGames[0].url);

  const getBorderColor = (rank: number) => {
    if (rank === 1) return 'border-yellow-400'; // Gold
    if (rank === 2) return 'border-gray-400'; // Silver
    if (rank === 3) return 'border-orange-400'; // Bronze
    return 'border-cyan-400'; // Emerald
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 1단: 학급별 랭킹 */}
      <div className="w-1/5 bg-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center">학급별 랭킹</h2>
        <ul>
          {dummyRanking.map((player) => (
            <li key={player.rank} className={`p-2 mb-2 rounded-lg border-4 ${getBorderColor(player.rank)} flex items-center`}>
              <span className="font-bold mr-2">
                {player.rank === 1 && '🥇'}
                {player.rank === 2 && '🥈'}
                {player.rank === 3 && '🥉'}
                {player.rank > 3 && `${player.rank}.`}
              </span>
              <span>{player.name}</span>
              <span className="ml-auto text-sm text-gray-600">{player.score}점</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 2단: 게임 실행 창 */}
      <div className="w-3/5 bg-gray-300 flex-grow">
        <iframe
          src={selectedGameUrl}
          title="Game Window"
          className="w-full h-full border-none"
        ></iframe>
      </div>

      {/* 3단: 게임 선택창 */}
      <div className="w-1/5 bg-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center">게임 선택</h2>
        <ul>
          {dummyGames.map((game) => (
            <li
              key={game.id}
              onClick={() => setSelectedGameUrl(game.url)}
              className="p-3 mb-2 bg-gray-200 rounded-lg hover:bg-blue-400 hover:text-white cursor-pointer text-center"
            >
              {game.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GameDashboard;