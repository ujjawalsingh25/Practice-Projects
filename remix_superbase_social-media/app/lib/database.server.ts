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