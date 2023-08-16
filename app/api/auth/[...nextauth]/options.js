import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { compare } from "bcrypt"

const prisma = new PrismaClient()


export const options = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            userid: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials) {
                if(!credentials?.username && !credentials?.password) {
                    return null
                }
                const user = await prisma.users.findUnique({
                    where: {
                        username: credentials?.username,
                    }
                })

                if(!user) return null

                const isPasswordValid = await compare(
                    credentials?.password,
                    user.password
                )

                if(!isPasswordValid) {
                    return null
                } else {
                    return {
                        name: user.username,
                        userid: user.userid,
                    }
                }
            },
        })
    ],
    adapter: PrismaAdapter(prisma),
    secret: process.env.SECRET,
    callbacks: {
        async jwt({ token, user }) {
            // Initial sign in
            if (user) {
                token.sub = user.userid
            }
            return token
        },
        async session({ session, token }) {
            // Add property to session, like `userId`
            session.userid = token.sub
            return session
        }
    },

    pages: {
        signIn: '/auth/signIn'
    }
    
}