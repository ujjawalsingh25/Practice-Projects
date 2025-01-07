import { CombinedPostsWithAuthorAndLikes } from "~/lib/types";
import { useInfinitePosts } from "~/lib/use-infinite-posts";
import { Virtuoso } from 'react-virtuoso';
import { MemoizedPostListItem } from "./memoized-post-list-item";
import { PostSkeleton } from "./post";
import { AppLogo } from "./app-logo";

type InfiniteVirtualListProps = {
    totalPages: number;
    incomingPosts: CombinedPostsWithAuthorAndLikes;
}

export function InfiniteVirtualList({totalPages, incomingPosts}: InfiniteVirtualListProps) {
    const {posts, hasMorePages, loadMore} = useInfinitePosts({incomingPosts, totalPages});
    if(!posts.length) {
        return <div className="flex items-center justify-center h-[50vh] ">
            <AppLogo className="h-10 w-10"></AppLogo>
            <h2 className="ml-2">No post found!</h2>
        </div>
    }

    return (
        <Virtuoso
            data={posts}
            useWindowScroll
            initialTopMostItemIndex={0}
            endReached={loadMore}
            initialItemCount={5}
            overscan={500}
            itemContent={(index, post) => {
                if(!post) {
                    return <div></div>
                }
                return <MemoizedPostListItem post={post} index={index} />
            }}
            components={{
                Footer: () => {
                    if(!hasMorePages)   return null;
                    return <PostSkeleton />
                }
            }}
        ></Virtuoso>
    )
}