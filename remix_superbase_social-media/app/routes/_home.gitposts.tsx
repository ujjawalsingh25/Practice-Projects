import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, redirect, useLoaderData, useNavigation } from "@remix-run/react";

import { Post } from "~/components/post";
import { ViewLikes } from "~/components/view-likes";
import { WritePost } from "~/components/write-post";
import { Separator } from "@radix-ui/react-separator";
import { PostSearch } from "~/components/post-search";
import { ViewComments } from "~/components/view-comments";
import { getAllPostsWithDetails } from "~/lib/database.server";
import { getSupabaseWithSessionHeaders } from "~/lib/supabase.server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { combinePostsWithLikes, formatToTwitterDate, getUserDataFromSession } from "~/lib/utils";

export const loader = async({ request }: LoaderFunctionArgs) => {  
    const { supabase, headers, serverSession } = await getSupabaseWithSessionHeaders({
        request,
    });
    if (!serverSession) {
    return redirect("/login", { headers });
    }

    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const query = searchParams.get("query");
    const page = Number(searchParams.get("page")) || 1;

    const { data} = await getAllPostsWithDetails({
        dbClient: supabase,
    });

    const {
        userId: sessionUserId,
        // userAvatarUrl,
        // username,
    } = getUserDataFromSession(serverSession);
    
    const posts = combinePostsWithLikes(data, sessionUserId);
  
    return json({ query,  posts }, { headers });
};


export default function GitPosts() {
    const {query, posts} = useLoaderData<typeof loader>();
    const post = posts[0];
    console.log("posts: ", post);
    const navigation = useNavigation();
    // When nothing is happening, navigation.location will be undefined,
    // but when the user navigates it will be populated with the next
    // location while data loads. Then we check if they're searching with
    // location.search.
    const isSearching = Boolean(
    navigation.location &&
        new URLSearchParams(navigation.location.search).has("query")
    );
    // console.log("isSearching ", true, query);
    
    return (
        <div className="w-full max-w-xl px-4 flex flex-col">
            <Tabs defaultValue="view-posts" className="my-2">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="view-posts">View Posts</TabsTrigger>
                    <TabsTrigger value="write-post">Write Post</TabsTrigger>
                </TabsList>
                <TabsContent value="view-posts"> 
                    {/* <Outlet /> */}
                    <Separator />
                    <PostSearch searchQuery={query} isSearching={isSearching} />
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
                </TabsContent>
                <TabsContent value="write-post">
                    <WritePost sessionUserId="123" postId="1234" />
                </TabsContent>
            </Tabs>
        </div>
    );
  }