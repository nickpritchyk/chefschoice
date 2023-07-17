import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


export const options: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
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

                if(credentials?.password !== user.password) {
                    return null
                } else {
                    return {
                        name: user.username,
                    }
                }
            }
        })
    ],
    
}