import { useState } from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect, useLoaderData, useNavigate } from "@remix-run/react";

import { Like } from "./resources.like";
import { Post } from "~/components/post";
import { Card } from "~/components/ui/card";
import { AppLogo } from "~/components/app-logo";
import { WritePost } from "~/components/write-post";
import { ShowComment } from "~/components/show-comment";
import { ViewComments } from "~/components/view-comments";
import { getPostWithDetailsById } from "~/lib/database.server";
import { getSupabaseWithSessionHeaders } from "~/lib/supabase.server";
import { Dialog, DialogContent, DialogDescription, DialogHeader } from "~/components/ui/dialog";
import { combinePostsWithLikesAndComments, formatToTwitterDate, getUserDataFromSession } from "~/lib/utils";


export let loader = async ({ request, params }: LoaderFunctionArgs) => {
    const { postId } = params;
    console.log("Incoming params ", params);
    const { supabase, headers, serverSession } = await getSupabaseWithSessionHeaders({
      request,
    });
  
    if (!serverSession)  return redirect("/login", { headers });
    if (!postId)  return redirect("/404", { headers });
  
  
    const { data } = await getPostWithDetailsById({
      dbClient: supabase,
      postId,
    });
  
    const { userId: sessionUserId } = getUserDataFromSession(serverSession);
  
    const posts = combinePostsWithLikesAndComments(data, sessionUserId);
  
    return json (
      {
        post: posts[0],
        sessionUserId,
      },
      { headers }
    );
};


export default function CurrentPost() {
    const { post, sessionUserId } = useLoaderData<typeof loader>();
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
  
    return (
        <Dialog
            open={open}
            onOpenChange={(open) => {
            navigate(-1);
            setOpen(open);
            }}
        >
            <DialogContent className="max-w-xl h-[90vh] overflow-y-scroll">
                <DialogHeader>
                    <DialogDescription className="my-2 text-left">
                        <Post
                            avatarUrl={post.author.avatar_url}
                            id={post.id}
                            name={post.author.name}
                            username={post.author.username}
                            dateTimeString={formatToTwitterDate(post.created_at)}
                            title={post.title}
                            userId={post.user_id}
                            key={post.id}
                        >
                            <div className="flex items-center justify-between w-24 md:w-32">
                                <div className="flex items-center w-1/2">
                                    <Like
                                    likedByUser={post.isLikedByUser}
                                    likes={post.likes}
                                    sessionUserId={sessionUserId}
                                    postId={post.id}
                                    />
                                </div>
                                <div className="flex items-center w-1/2">
                                    <ViewComments
                                        comments={post.comments.length}
                                        pathname={`/`}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                        </Post>
                        <WritePost
                            sessionUserId={sessionUserId}
                            // isComment={true}
                            postId={post.id}
                        />
                        {post.comments.length 
                            ? (
                                <div>
                                    {post.comments.map(({ title, author }, index) => (
                                        <Card key={index} className="my-2 min-h-24 p-4">
                                        <ShowComment
                                            title={title}
                                            avatarUrl={author.avatarUrl}
                                            username={author.username}
                                        />
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-center items-center h-full">
                                    <AppLogo className="h-10 w-10 opacity-60" />
                                    <h2 className="ml-2">No comments yet !!</h2>
                                </div>
                            )
                        }
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
  }
  