import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, redirect, ShouldRevalidateFunctionArgs, useLoaderData, useNavigation } from "@remix-run/react";

import { WritePost } from "~/components/write-post";
import { Separator } from "@radix-ui/react-separator";
import { PostSearch } from "~/components/post-search";
import { getAllPostsWithDetails } from "~/lib/database.server";
import { getSupabaseWithSessionHeaders } from "~/lib/supabase.server";
import { InfiniteVirtualList } from "~/components/infinite-virtual-list";
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

    const { data, totalPages } = await getAllPostsWithDetails({
        dbClient: supabase,
        page: isNaN(page) ? 1 : page,
        searchQuery: query,
    });

    const {
        userId: sessionUserId,
        // userAvatarUrl,
        // username,
    } = getUserDataFromSession(serverSession);
    
    const posts = combinePostsWithLikes(data, sessionUserId);
  
    return json(
        { 
            query,  
            posts, 
            totalPages, 
            userDetails: {sessionUserId} 
        }, 
        { headers }
    );
};


export default function GitPosts() {
    const {query, posts, totalPages, userDetails: {sessionUserId} } = useLoaderData<typeof loader>();
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
            <Outlet />
            <Tabs defaultValue="view-posts" className="my-2">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="view-posts">View Posts</TabsTrigger>
                    <TabsTrigger value="write-post">Write Post</TabsTrigger>
                </TabsList>
                <TabsContent value="view-posts"> 
                    <Outlet />
                    <Separator />
                    <PostSearch searchQuery={query} isSearching={isSearching} />
                    <InfiniteVirtualList incomingPosts={posts} totalPages={totalPages} />
                </TabsContent>
                <TabsContent value="write-post">
                    <WritePost sessionUserId={sessionUserId}/>
                </TabsContent>
            </Tabs>
        </div>
    );
}

  
export function shouldRevalidate({ actionResult, defaultShouldRevalidate}: ShouldRevalidateFunctionArgs) {
    const skipRevalidation =
      actionResult?.skipRevalidation &&
      actionResult?.skipRevalidation?.includes("/gitposts");
  
    if (skipRevalidation) {
      console.log("Skipped revalidation");
      return false;
    }
  
    console.log("Did not skip revalidation");
    return defaultShouldRevalidate;
}