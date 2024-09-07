'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Memo {
  id: number;
  title: string;
  content: string;
}

const ViewMemo = () => {
  const params = useParams();
  const router = useRouter();
  const [memo, setMemo] = useState<Memo | null>(null);
  const id = params.id as string;

  useEffect(() => {
    if (id) {
      const memos: Memo[] = JSON.parse(localStorage.getItem('memos') || '[]');
      const currentMemo = memos.find((memo) => memo.id === parseInt(id));
      setMemo(currentMemo || null);
    }
  }, [id]);

  if (!memo) return <p>メモが見つかりません。</p>;

  return (
    <div>
      <h1>{memo.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: memo.content }} />
      <button onClick={() => router.back()}>戻る</button>
    </div>
  );
};

export default ViewMemo;
