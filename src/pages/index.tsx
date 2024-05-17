import { Pagination } from "@mui/material";
import ContentCard from "../app/components/ContentCard";
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
    contentCards: ContentCard[], 
    totalPages: number, 
}

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function App({ contentCards, totalPages: initialTotalPages }: AppProps) {
    const [page, setPage] = useState<number>(1);
    const router = useRouter();

    const { data, error } = useSWR(`${BASE_URL}/api/data?page=${page}&limit=${PER_PAGE}`, fetcher, {
        fallbackData: { content: contentCards, totalPages: initialTotalPages }
    });

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    const { content, totalPages } = data;

    const handlePageChange = (_e: any, pageNumber: number) => {
        setPage(pageNumber);
        router.push({ query: { page: pageNumber } }, undefined, { shallow: true });
    };
    return (
        <div className={styles.content_feed}>
            {content.map((card: ContentCard) => (
                <div key={card.id} className={styles.content_card}>
                    <ContentCard
                        imageUri={card.imageUri}
                        textData={card.textData}
                        comments={card.comments}
                        priority={card.metadata.priority}
                        publishDate={card.metadata.publishDate}
                    />
                </div>
            ))}
            <div className={styles.content_feed_pagination}>
                <Pagination
                    count={totalPages}
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

    const contentCards: ContentCard[] = res.data.content;
    const totalPages = res.data.totalPages;

    return {
        props: {
            contentCards,
            totalPages
        }
    };
};
