// app/page.tsx
'use client';
import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
//import '../styles/globals.css'; // ここでスタイルをインポート

interface Memo {
  id: number;
  title: string;
  content: string;
}

const MemoApp = () => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    const savedMemos: Memo[] = JSON.parse(localStorage.getItem('memos') || '[]');
    setMemos(savedMemos);
  }, []);

  const saveMemos = (updatedMemos: Memo[]) => {
    localStorage.setItem('memos', JSON.stringify(updatedMemos));
    setMemos(updatedMemos);
  };

  const addMemo = (e: FormEvent) => {
    e.preventDefault();
    const newMemo: Memo = { id: Date.now(), title, content };
    const updatedMemos = [...memos, newMemo];
    saveMemos(updatedMemos);
    setTitle('');
    setContent('');
  };

  const deleteMemo = (id: number) => {
    const updatedMemos = memos.filter((memo) => memo.id !== id);
    saveMemos(updatedMemos);
  };

  return (
    <div>
      <h1>メモアプリ</h1>
      <form onSubmit={addMemo}>
        <input
          type="text"
          placeholder="タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="内容"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">追加</button>
      </form>
      <ul>
        {memos.map((memo) => (
          <li key={memo.id}>
            <h3>{memo.title}</h3>
            <Link href={`/view/${memo.id}`}>
              <button>閲覧</button>
            </Link>
            <Link href={`/edit/${memo.id}`}>
              <button>編集</button>
            </Link>
            <button onClick={() => deleteMemo(memo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoApp;

