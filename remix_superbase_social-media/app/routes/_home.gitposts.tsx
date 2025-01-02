import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, useLoaderData, useNavigation } from "@remix-run/react";

import { Post } from "~/components/post";
import { ViewLikes } from "~/components/view-likes";
import { WritePost } from "~/components/write-post";
import { Separator } from "@radix-ui/react-separator";
import { PostSearch } from "~/components/post-search";
import { ViewComments } from "~/components/view-comments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export const loader = ({ request }: LoaderFunctionArgs) => {  
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const query = searchParams.get("query");
    const page = Number(searchParams.get("page")) || 1;
  
    return json({ query });
};


export default function GitPosts() {
    const {query} = useLoaderData<typeof loader>();
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
                        avatarUrl={"https://avatars.githubusercontent.com/u/128883851?v=4"}
                        name="Ujjawal Singh"
                        username="ujjawalsingh25"
                        title={"# markdown title"}
                        userId="25"
                        id="025"
                        dateTimeString="22, May 2002"
                    >
                        <ViewLikes likes={103} likedByUser={true} pathname={`/profile/ujjawalsingh25`} /> 
                        <ViewComments comments={25} pathname={'`/profile/ujjawalsingh25`'} /> 
                    </Post>
                </TabsContent>
                <TabsContent value="write-post">
                    <WritePost sessionUserId="123" postId="1234" />
                </TabsContent>
            </Tabs>
        </div>
    );
  }