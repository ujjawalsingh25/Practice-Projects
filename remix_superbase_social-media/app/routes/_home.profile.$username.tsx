import { json, redirect } from "@remix-run/node";
import { type LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

import { Separator } from "~/components/ui/separator";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { getSupabaseWithSessionHeaders } from "~/lib/supabase.server";
import { InfiniteVirtualList } from "~/components/infinite-virtual-list";
import { combinePostsWithLikes, getUserDataFromSession } from "~/lib/utils";
import { getPostsForUser, getProfileForUsername } from "~/lib/database.server";


export let loader = async ({ request, params }: LoaderFunctionArgs) => {
    const { username } = params;
    const { supabase, headers, serverSession } = await getSupabaseWithSessionHeaders({
        request,
    });
    if (!serverSession)  return redirect("/login", { headers });
    if (!username)  return redirect("/404", { headers });

    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const page = Number(searchParams.get("page")) || 1;

    const { data: profile } = await getProfileForUsername({
        dbClient: supabase,
        username,
    });
    // const profile = profiles ? profiles[0] : null;
    if (!profile)  return redirect("/404", { headers });    // User not found

    const { data: rawPosts, totalPages} = await getPostsForUser({
        dbClient: supabase,
        userId: profile.id,
        page: isNaN(page) ? 1 : page,
    });

//     const sessionUserId = serverSession.user.id;
//     const posts = combinePostsWithLikes(rawPosts, sessionUserId);

//   return json(
//     {
//       profile,
//       sessionUserId: session.user.id,
//       posts,
//       limit,
//       totalPages,
//     },
//     { headers }
//   );
    const {userId: sessionUserId} = getUserDataFromSession(serverSession);
    const posts = combinePostsWithLikes(rawPosts, sessionUserId);
  
    return json(
        { 
            posts, 
            totalPages, 
            profile,
            userDetails: {sessionUserId} 
        }, 
        { headers }
    );
};



export default function Profile() {
    const {
        profile: { avatar_url, name, username },
        posts,
        totalPages,
    } = useLoaderData<typeof loader>();

    return (
        <div className="flex flex-col w-full max-w-xl px-4 my-2">
            <Outlet />
            <div className="flex flex-col justify-center items-center m-4">
                <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage alt="User avatar" src={avatar_url} />
                </Avatar>
                <h1 className="text-2xl font-bold">{name}</h1>
                <Link to={`https://github.com/${username}`}>
                    <p className="text-zinc-500">@{username}</p>
                </Link>
            </div>
            <br />
            <Separator />
            <br />
            <h2 className="text-xl font-heading font-semibold">{"User posts"}</h2>
            <br />
            <InfiniteVirtualList incomingPosts={posts} totalPages={totalPages} />
        </div>
    );
}

