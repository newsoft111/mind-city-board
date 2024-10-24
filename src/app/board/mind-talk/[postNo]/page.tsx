'use client'

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Container,
  Divider,
  Chip,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Pagination,
  PaginationItem,
  Button
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from 'next/image'
import useMediaQuery from '@mui/material/useMediaQuery';

interface ApiResponse {
  errorCode: number;
  totaL_CNT: number;
  totalPages: number;
  errorMessage: string;
  resultList: Post[];
}

interface Post {
  No: number;
  Code: number;
  Usercode: number;
  Wdate: string;
  Moddate: string | null;
  Title: string;
  Content: string;
  Fileurl: string;
  Ref: number;
  Like: number;
  Dcnt: number;
  Bad: number;
  IsLike: number;
  Nickname: string;
  Ismine: number;
}

interface PostsParams {
  Usercode: number;
  No: number;
}

export default function PostDetail() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const postParams: PostsParams = {
          Usercode: 0,
          No: Number(params.postNo), // params.postNo를 숫자로 변환
        };
        const response = await axios.post<ApiResponse>('https://api.mindcity.co.kr/api/mission/readcomment', postParams);

        setPost(response.data.resultList[0]);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [params.postNo]);

  if (isLoading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>;
  }

  if (!post) {
    return (
      <Container maxWidth="lg" disableGutters>
        <Typography>게시글을 찾을 수 없습니다.</Typography>
      </Container>
    );
  }

  return (
    <Box maxWidth="lg" sx={{  }}>
      <Box sx={{ backgroundColor: '#fff',
      borderRadius: '16px', 
      padding: '30px 30px',
      boxShadow: '0 5px 10px rgba(104, 165, 254, 0.3)'}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1">
            {post.Title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FavoriteIcon sx={{ color: '#ff6f99' }} />
            <Typography variant="body2" sx={{ ml: 0.5 }}>
              {post.Like}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: '', mb: 2 }}>
          <Typography sx={{ fontSize: isMobile ? '14px' : '18px', }} color="text.secondary">
            {post.Nickname} 
          </Typography >
          <Typography sx={{ fontSize: isMobile ? '14px' : '18px', mx: 1}} color="text.secondary">
          | 
          </Typography>
          <Typography sx={{ fontSize: isMobile ? '14px' : '18px', }} color="text.secondary">
            {new Date(post.Wdate).toLocaleDateString()}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {post.Fileurl && (
        <Box sx={{ position: 'relative', width: '100%', height: '400px', mb: 3 }}>
          <Image 
            src={`/ui/photo/${post.Fileurl}`}
            alt="Post image"
            layout="fill"
            objectFit="contain"
          />
        </Box>
        )}

        <Box component="pre" sx={{ mb: 3 }}>
          <Typography 
            dangerouslySetInnerHTML={{ __html: post.Content }} 
            sx={{ whiteSpace: 'pre-wrap', fontSize: isMobile ? '14px' : '18px', }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Chip label={`조회수 ${post.Ref}`} variant="outlined" />
        </Box>
      </Box>

      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => router.back()} sx={{ px:2, py:1, fontSize: 17}}>
          목록<MenuIcon sx={{ ml:'5px'}}/> 
        </Button>
      </Box>
    </Box>

  );
}