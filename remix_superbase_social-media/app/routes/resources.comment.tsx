import { insertComment } from "~/lib/database.server";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { getSupabaseWithSessionHeaders } from "~/lib/supabase.server";

export async function action({ request }: ActionFunctionArgs) {
    const { supabase, headers, serverSession } = await getSupabaseWithSessionHeaders({
        request,
    });
    if (!serverSession)  return redirect("/login", { headers });
  
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    const postId = formData.get("postId")?.toString();
    const userId = formData.get("userId")?.toString();

    if (!userId || !postId || !title) {
      return json(
        { error: "User or Tweet Id missing"},
        { status: 400, headers }
      );
    }
  
    const { error } = await insertComment({dbClient: supabase, userId, postId, title});
    
    if (error) { 
        return json( { error: "Failed to comment"}, { status: 500, headers })
    }
  
    return json({ ok: true, error: null}, { headers });
}