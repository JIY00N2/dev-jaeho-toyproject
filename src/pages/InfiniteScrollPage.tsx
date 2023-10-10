import { UnorderedList, ListItem } from '@chakra-ui/layout';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroller';

interface Props {
  id: string;
  title: string;
  content: string;
}

const InfiniteScrollPage = () => {
  const [, setPosts] = useState<Props[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get('/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('데이터 가져오기 실패', error);
      }
    };
    fetchPost();
  }, []);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'posts',
    async ({ pageParam = 0 }) => {
      // 페이지마다 5개의 게시물을 가져오도록 수정
      const res = await axios.get(`/posts?page=${pageParam}&view=5`);
      return res.data;
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.page + 1; // 다음 페이지 번호를 계산
      },
    },
  );

  return (
    <div>
      <UnorderedList>
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            {page.map((post: Props) => (
              <ListItem key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </ListItem>
            ))}
          </div>
        ))}
      </UnorderedList>
      {hasNextPage && (
        <InfiniteScroll
          hasMore={hasNextPage}
          loadMore={() => fetchNextPage()}
          loader={<span>Loading...</span>}
        />
      )}
    </div>
  );
};

export default InfiniteScrollPage;
