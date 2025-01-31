import { BACKEND_URL } from "@/constants";

type User = { 
    token: string;
    expiration: string;
}  
export async function getUser(username: string, password: string) {
    const response = await fetch(`${BACKEND_URL}/api/Auth/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        const data =  await response.json() as User;
        return data;
    } 
        return null;
    
    }