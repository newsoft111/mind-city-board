'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 페이지가 로드될 때 /board/free로 리다이렉트
    router.push('/board/free');
  }, [router]);

  return (
    <></>
  );
}
