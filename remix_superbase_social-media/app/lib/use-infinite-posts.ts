import { useEffect, useState } from "react";
import { FetcherWithComponents, useFetcher, useLocation } from "@remix-run/react";

import { CombinedPostsWithAuthorAndLikes } from "./types";
import { loader as postsLoader } from "~/routes/_home.gitposts";

type UseInfinitePostsProps = {
    incomingPosts: CombinedPostsWithAuthorAndLikes;
    totalPages: number;
}

export const useInfinitePosts = ({incomingPosts, totalPages}: UseInfinitePostsProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const [posts, setPosts] = useState<CombinedPostsWithAuthorAndLikes>(incomingPosts);
    // const fetcher = useFetcher<typeof postsLoader>() as FetcherWithComponents<typeof postsLoader>; 
    const fetcher = useFetcher<typeof postsLoader>() as FetcherWithComponents<{
        query: string | null;
        posts: CombinedPostsWithAuthorAndLikes;
    }>;

    const hasMorePages = currentPage < totalPages;

    const [prevPost, setPrevPost] = useState(incomingPosts);
    if(incomingPosts !== prevPost) {
        setPrevPost(incomingPosts);
        setPosts(incomingPosts);
        setCurrentPage(1);
    }

    const loadMore = () => {
        if(hasMorePages && fetcher.state === 'idle'){
            let fullSearchQueryParams = "";
            if(location.search) {
                fullSearchQueryParams = `${location.search}&page=${currentPage+1}`
            } else {
                fullSearchQueryParams = `?page=${currentPage+1}`
            }
            fetcher.load(`${location.pathname}/${fullSearchQueryParams}`);
        }
    }

    useEffect(() => {
        if(fetcher.data?.posts) {
            setPosts((prevPosts) => [...prevPosts, ...(fetcher.data?.posts || [])]);
            setCurrentPage((currentPage) => currentPage + 1);
        }
    }, [fetcher.data]);

    return { posts, hasMorePages, loadMore};
}