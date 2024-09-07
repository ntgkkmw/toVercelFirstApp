'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState, FormEvent } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface Memo {
  id: number;
  title: string;
  content: string;
}

const EditMemo = () => {
  const params = useParams();
  const router = useRouter();
  const [memo, setMemo] = useState<Memo | null>(null);
  const [content, setContent] = useState<string>('');
  const id = params.id as string;

  useEffect(() => {
    if (id) {
      const memos: Memo[] = JSON.parse(localStorage.getItem('memos') || '[]');
      const currentMemo = memos.find((memo) => memo.id === parseInt(id));
      setMemo(currentMemo || null);
      setContent(currentMemo ? currentMemo.content : '');
    }
  }, [id]);

  const updateMemo = (e: FormEvent) => {
    e.preventDefault();
    if (memo) {
      const updatedMemos = JSON.parse(localStorage.getItem('memos') || '[]').map((m: Memo) =>
        m.id === memo.id ? { ...m, content } : m
      );
      localStorage.setItem('memos', JSON.stringify(updatedMemos));
      router.push('/');
    }
  };

  if (!memo) return <p>メモが見つかりません。</p>;

  return (
    <div>
      <h1>メモ編集</h1>
      <form onSubmit={updateMemo}>
        <input
          type="text"
          value={memo.title}
          readOnly
          disabled
        />
        <ReactQuill theme="snow" value={content} onChange={setContent} />
        <button type="submit">保存</button>
      </form>
      <button onClick={() => router.back()}>戻る</button>
    </div>
  );
};

export default EditMemo;
