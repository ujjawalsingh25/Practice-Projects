import { useState } from "react";
import { Link, Outlet, useOutletContext } from "@remix-run/react";
import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Button } from "~/components/ui/button";
import { AppLogo } from "~/components/app-logo";
import { SupabaseOutletContext } from "~/lib/supabase";
import { Avatar, AvatarImage } from "~/components/ui/avatar";

export default function Home() {
    const [isNavOpen, setNavOpen] = useState(false);
    const {supabase} = useOutletContext<SupabaseOutletContext>();

    const handleSignOut = async() => {
        await supabase.auth.signOut();
    }

    return (
        <section className="w-full bg-white min-h-screen flex flex-col items-center">
            <nav className="sticky top-0 z-50 flex w-full items-center justify-between 
            p-4 border-b border-zinc-200 flex-wrap md:flex-nowrap">
            <Link to="/" className="flex items-center space-x-2">
                <AppLogo className="h-8 w-8 md:h-10 md:w-10" />
                <h1 className="text-xl font-semibold">SocialSphere</h1>
            </Link>
            <button onClick={() => setNavOpen(!isNavOpen)} className="md:hidden">
                {isNavOpen ? <Cross2Icon /> : <HamburgerMenuIcon />}
            </button>

            <div className={`
                flex md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 
                ${ isNavOpen ? "flex-col order-last w-full md:w-auto": "hidden md:flex"}`
            }>
                <Link to={`/profile/username`}>
                    username
                </Link>
                <Avatar className="w-12 h-12">
                    <AvatarImage
                        className="rounded-full"
                        alt="User avatar"
                        src={"https://avatars.githubusercontent.com/u/128883851?v=4"}
                    ></AvatarImage>
                </Avatar>
                <Button onClick={handleSignOut}>Logout</Button>
            </div>
            </nav>
            <Outlet />
        </section>
    );
}