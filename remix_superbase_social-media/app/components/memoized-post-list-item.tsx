import { CombinedPostWithAuthorAndLikes } from "~/lib/types"
import { Post } from "./post"
import { formatToTwitterDate } from "~/lib/utils"
import { memo } from "react"
import { ViewLikes } from "./view-likes"
import { ViewComments } from "./view-comments"

type MemoizedPostListItemProps = {
    post: CombinedPostWithAuthorAndLikes, 
    index: number
}

export const MemoizedPostListItem = memo(({post, index}: MemoizedPostListItemProps) => {
    return (
       <Post 
            avatarUrl={post.author.avatar_url}
            name={post.author.name}
            username={post.author.username}
            title={post.title}
            userId={post.author.id}
            id={post.id}
            dateTimeString={formatToTwitterDate(post.created_at)}
        >
            <ViewLikes 
                likes={post.likes} 
                likedByUser={post.isLikedByUser} 
                pathname={`/profile/ujjawalsingh25`} 
            /> 
            <ViewComments 
                comments={post.comments.length} 
                pathname={'`/profile/ujjawalsingh25`'} 
            /> 
        </Post>
    );
});
MemoizedPostListItem.displayName = "MemoizedPostListItem";