"use client";

import { useSession, signOut } from "next-auth/react"
import { LoginForm } from "./LoginForm"
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
    const {data: session} = useSession()
    const pathname = usePathname()
    const navLinks = [
        {
            name: "Accueil",
            href: "/"
        },
        ...(session?.user  
            ? [
                {
                    name: "Admin",
                    href: "/admin"
                }] 
            : []
        ),
    ]

    const handleSignout = () => {
        signOut({callbackUrl: "/"})
    }

    return (
        <div className="border-b p-3 flex justify-between items-center bg-background">
            <Link href="/" className="font-bold text-xl">
                EMGVoitures
            </Link>
            
            <nav>
                <ul className="flex gap-5">
                    {navLinks.map((link, index) => (
                        <li key={index}>
                            <Link 
                                href={link.href}
                                className={`text-base ${pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground"}`}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div>
                {session?.user ? (
                    <Button onClick={handleSignout}>
                        Déconnexion
                    </Button>
                ) : (
                    <LoginForm />
                )}
            </div>
        </div>
    )
}