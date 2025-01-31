import NextAuth from "next-auth"
import {authenticate} from "./credentials"
export const { auth, handlers } = NextAuth(
    { providers: [authenticate],
        trustHost: true,
        session:{
            strategy:"jwt"
        },

    callbacks: {
        async jwt({token, user}) {
            if(user) {
                token.sub = user.id
            }
            return token
            
        },
        async session({session, token}) {
            if(token.sub) {
                session.user.id = token.sub
            }   
            return session
        }
       
    }
 })