import type { Database } from "database.types";
import { combinePostsWithLikes } from "./utils";

type Post = Database["public"]["Tables"]["posts"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Comment = Database["public"]["Tables"]["comments"]["Row"];

type Likes = {user_id: string;};

type CommentWithAuthor = Comment & {
  author: {
    avatar_url: string;
    username: string;
  } | null;
};

export type PostWithDetails = Post & {
  author: Profile | null;
  likes: Likes[];
  comments: Comment[];
};

export type PostWithCommentDetails = Omit<PostWithDetails, "comments"> & {
  comments: CommentWithAuthor[];
};

export type CombinedPostsWithAuthorAndLikes = ReturnType<
  typeof combinePostsWithLikes
>;

export type CombinedPostWithAuthorAndLikes =
  CombinedPostsWithAuthorAndLikes[number];