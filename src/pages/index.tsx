import { Pagination } from "@mui/material";
import ContentCard from "../app/components/contentFeed/ContentCard";
import axios from "axios";
import useSWR from "swr";
import styles from '../styles.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from "next";
import { getPaginationParams } from "../utils/pagination";

const BASE_URL = 'http://localhost:3000';
const PER_PAGE = 20;

type AppProps = {
  posts : Post[];
  totalPages: number;
};

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function App({ posts: content, totalPages: initialTotalPages }: AppProps) {
  const [page, setPage] = useState<number>(1);
  const router = useRouter();

  const { data, error } = useSWR(`${BASE_URL}/api/data?page=${page}&limit=${PER_PAGE}`, fetcher, {
    fallbackData: { posts: content, totalPages: initialTotalPages }
  });

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;


  const handlePageChange = (_e: unknown, pageNumber: number) => {
    setPage(pageNumber);
    router.push({ query: { page: pageNumber } }, undefined, { shallow: true });
  };

  return (
    <div className={styles.content_feed}>
      {data.content?.map((card: Post) => (
        <div key={card.id} className={styles.content_card}>
          <ContentCard
            cardData={card}
          />
        </div>
      ))}
      <div className={styles.content_grid_pagination}>
        <Pagination
          count={data.totalPages}
          page={page}
          variant="outlined"
          size="large"
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query.page ? parseInt(query.page as string, 10) : 1;

  const res = await axios.get(`${BASE_URL}/api/data`, {
    params: getPaginationParams(page, PER_PAGE)
  });

  const posts: Post[] = res.data.content;
  const totalPages = res.data.totalPages;

  return {
    props: {
      posts,
      totalPages
    }
  };
};
