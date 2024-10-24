'use client'

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
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

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useMediaQuery from '@mui/material/useMediaQuery';

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

interface ApiResponse {
  errorCode: number;
  totaL_CNT: number;
  totalPages: number;
  errorMessage: string;
  resultList: Post[];
}

interface PostsParams {
  Usercode: number;
  Order: string;
  Page: number;
  perPage: number;
}

function getPosts(params: PostsParams) {
  return axios.post<ApiResponse>('https://apitest.mindcity.co.kr/api/bbs/getbbs_home', params)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching posts:', error);
      return { resultList: [], totaL_CNT: 0, totalPages: 0 };
    });
}

export default function PostList() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const postsPerPage = 2;
  const isMobile = useMediaQuery('(max-width:600px)');

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);

    const params: PostsParams = {
      Usercode: 0,
      Order: "NEW",
      Page: currentPage,
      perPage: postsPerPage
    };

    const data = await getPosts(params);
    setPosts(data.resultList);
    setTotalPages(data.totalPages);
    setIsLoading(false);
  }, [currentPage]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handlePostClick = useCallback((postNo: number) => {
    router.push(`/board/free/${postNo}`);
  }, [router]);

  if (isLoading) {
    return <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>;
  }

  return (
    <Box>
      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: '16px', 
          padding: '30px 30px',
          boxShadow: '0 5px 10px rgba(104, 165, 254, 0.3)'
        }}
      >

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>제목</TableCell>
              <TableCell>작성자</TableCell>
              {!isMobile && <TableCell>작성일</TableCell>}
              {!isMobile && <TableCell>좋아요</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow
                key={post.No}
                onClick={() => handlePostClick(post.No)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell component="th" scope="row">
                  {isMobile ? truncateText(post.Title, 10) : post.Title}
                </TableCell>
                <TableCell>{post.Nickname}</TableCell>
                {!isMobile && <TableCell>{new Date(post.Wdate).toLocaleDateString()}</TableCell>}
                {!isMobile && <TableCell>{post.Like}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIosIcon sx={{ fontSize: '13px' }} />}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          sx={{
            mr: 1,
            '& .MuiButton-startIcon': {
              '& > *:first-of-type': {
                fontSize: '13px',
              },
            },
          }}
        >
          이전
        </Button>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => setCurrentPage(page)}
          hidePrevButton
          hideNextButton
          renderItem={(item) => (
            <PaginationItem
              {...item}

            />
          )}
        />
        <Button
          variant="outlined"
          endIcon={<ArrowForwardIosIcon />}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          sx={{
            ml: 1,
            '& .MuiButton-endIcon': {
              '& > *:first-of-type': {
                fontSize: '13px',
              },
            },
          }}
        >
          다음
        </Button>
      </Box>
    </Box>
  );
}