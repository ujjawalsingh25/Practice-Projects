import type { Database } from "database.types";
import type { SupabaseClient } from "@supabase/supabase-js";

type GetAllPostsWithDetailsProps = {
    dbClient: SupabaseClient<Database>;
    searchQuery: string | null;
    page: number;           // Default to page 1
    limit?: number;         // Default to 25 posts per page
};
export async function getAllPostsWithDetails({dbClient, searchQuery, page, limit = 10}: GetAllPostsWithDetailsProps) {
  let postsQuery = dbClient
    .from("posts")
    .select("*, author: profiles(*), likes(user_id), comments(*)", {
      count: "exact",
  })
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  if (searchQuery) {
    postsQuery = postsQuery.ilike("title", `%${searchQuery}%`);
  }

  const { data, error, count } = await postsQuery;

  if (error) {
    console.log("Error occured during getAllPostsWithDetails : ", error);
  }

  return {
    data,
    error,
    totalPages: count ? Math.ceil(count / limit) : 1,
    totalPosts: count,
    limit,
  };
}



type createPostProps = {
  dbClient: SupabaseClient<Database>;
  userId: string;
  title: string;
}
export async function createPost({dbClient, userId, title}: createPostProps) {
  const { error } = await dbClient
    .from("posts")
    .insert({ user_id: userId, title });

  return { error };
}


type getPostsForUserProps = {
  dbClient: SupabaseClient<Database>;
  userId: string;
  page: number;
  limit?: number;
}
export async function getPostsForUser({dbClient, userId, page, limit = 10}: getPostsForUserProps) {
    // await delayAsync(3000);
  let postsQuery = dbClient
    .from("posts")
    .select("*, author: profiles(*), likes(user_id), comments(*)", {
      count: "exact",
    })
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1);

  const { data, error, count } = await postsQuery;

  if (error)  console.log(`Error occured during getPostsForUser ${userId} : `, error);

  return {
    data,
    error,
    totalPages: count ? Math.ceil(count / limit) : 1,
    limit,
  };
}
  


type getProfileForUsernameProps = {
    dbClient: SupabaseClient<Database>;
    username: string;
}
export async function getProfileForUsername({dbClient, username}: getProfileForUsernameProps) {
  const profileQuery = dbClient
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  const { data, error } = await profileQuery;

  if (error) {
    console.log("Error occured during getProfileForUsername : ", error);
  }
  
  return { data, error };
}


type insertLikeProps = {
  dbClient: SupabaseClient<Database>;
  userId: string;
  postId: string;
}
export async function insertLike({dbClient, userId, postId}: insertLikeProps) {
  const { error } = await dbClient
    .from("likes")
    .insert({ user_id: userId, post_id: postId });

  if(error)  console.log("Error occured at insert like", error);

  return { error };
}

type deleteLikeProps = {
  dbClient: SupabaseClient<Database>;
  userId: string;
  postId: string;
}
export async function deleteLike({dbClient, userId, postId}: deleteLikeProps) {
  const { error } = await dbClient
    .from("likes")
    .delete().match({ user_id: userId, post_id: postId });

  if(error)  console.log("Error occured at insert like", error);

  return { error };
}

type insertCommentProps = {
  dbClient: SupabaseClient<Database>;
  userId: string;
  postId: string;
  title: string;
}
export async function insertComment({dbClient, userId, postId, title}: insertCommentProps) {
  const { error } = await dbClient
    .from("comments")
    .insert({ user_id: userId, post_id: postId, title});

  if(error)  console.log("Error occured at insert like", error);

  return { error };
}


type GetPostWithDetailsByIdProps = {
  dbClient: SupabaseClient<Database>;
  postId: string;
}
export async function getPostWithDetailsById({dbClient, postId,}: GetPostWithDetailsByIdProps) {
  let postsQuery = dbClient
    .from("posts")
    .select(
      "*, author: profiles(*), likes(user_id), comments(*, author: profiles(username, avatar_url))"
    )
    .order("created_at", { foreignTable: "comments", ascending: false })
    .eq("id", postId);

  const { data, error } = await postsQuery;  
  if (error)  console.error("Error occurred during getPostWithDetailsById: ", error);

  return { data, error };
}
