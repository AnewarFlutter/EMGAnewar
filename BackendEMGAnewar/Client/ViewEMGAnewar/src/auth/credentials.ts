import Credential from "next-auth/providers/credentials"
import { getUser } from "./getUser";


export const authenticate = Credential({
    id: "credentials",
    credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Mot de passe", type: "password" }
    },
    async authorize(credentials) {
        const {username, password} = credentials as Record<string, string>;
        if(!username || !password) {
            throw new Error("Email et mot de passe sont requis");
        }

        const user = await getUser(username, password);
        if(!user) {
            throw new Error("Email ou mot de passe incorrect");
        }
        return {id: user.token};
    
    }
})