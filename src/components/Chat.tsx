import React, { useState } from 'react';

// 임시 데이터
const dummyMessages = [
  { id: 1, sender: '김민준', text: '안녕하세요! 다들 게임 뭐하고 계세요?' },
  { id: 2, sender: '이서연', text: '저는 블럭깨기 하는 중이에요. 꽤 재밌네요 ㅎㅎ' },
  { id: 3, sender: '박도윤', text: '오 저도 그거 할래요!' },
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const msg = {
      id: messages.length + 1,
      sender: '나', // 실제 구현 시 현재 사용자 이름으로 변경
      text: newMessage,
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-white border-t-2">
      <h3 className="text-lg font-bold p-3 text-center border-b">학급 채팅</h3>
      <div className="flex-grow p-3 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-3">
            <span className="font-bold">{msg.sender}: </span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-3 border-t flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg focus:outline-none"
          placeholder="메시지 입력..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600">
          전송
        </button>
      </form>
    </div>
  );
};

export default Chat;
