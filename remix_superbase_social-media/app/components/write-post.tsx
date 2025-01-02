import { useEffect, useRef, useState } from "react";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

type WritePostProps = {
    sessionUserId: string;
    postId?: string;
};

export function WritePost({ sessionUserId, postId,}: WritePostProps) {
    const [title, setTitle] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const postTitle = () => console.log("Posting to server");

    useEffect(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = "inherit"; // Reset height - important to shrink on delete
          const computed = window.getComputedStyle(textareaRef.current);
          const height =
            textareaRef.current.scrollHeight +
            parseInt(computed.getPropertyValue("border-top-width")) +
            parseInt(computed.getPropertyValue("border-bottom-width"));
          textareaRef.current.style.height = `${height}px`;
        }
    }, [title]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Write Post</CardTitle>
                <CardDescription>You can write in Markdown</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea
                    placeholder="Type your gitpost here!!"
                    value={title}
                    ref={textareaRef}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-2"
                />
            </CardContent>
            <CardFooter>
                <Button onClick={postTitle}>
                    Post
                </Button>
            </CardFooter>
        </Card>
    );
}