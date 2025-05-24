import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { signJwt, verifyJwt } from "@/lib/session";
import { cookies } from "next/headers";

export const authRouter = createTRPCRouter({
    createAccount: publicProcedure.input(
        z.object({
            email: z.string().email(),
            name: z.string().min(3),
            password: z.string().min(7),
        })
    ).mutation(async ({ ctx, input }) => {
        const { email, name, password } = input;

        const user = await ctx.db.user.create({
            data: {
                email,
                name, 
                password,
            }
        })

        if (!user) {
            throw new Error("Failed to create a user");
            return null;
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name,
        }

    }),


    login: publicProcedure.input(
        z.object({
            email: z.string().email(),
            password: z.string(),
        })
    ).mutation(async ({ ctx, input }) => {
        const { email, password } = input;
        
        const user = await ctx.db.user.findFirst({
            where: {
                email,
                
            }
        })

        if (!user) {
            throw new Error("User not found");
            return null;
        }

        if (user.password !== password) {
            throw new Error("Invalid password");
            return null;
        }
        const token = signJwt({ userId: user.id });
        
        console.log("JWT Token:", token); // Log the JWT token
        return {
            id: user.id,
            email: user.email,
            name: user.name,
            token: token,
        }
    }),

    getSession: publicProcedure.query(async ({ ctx }) => {
        if (!ctx.token) {
            return null;
        }
        const mainToken = ctx.token;
        console.log("Token from context: ", ctx.token);
        const payload = verifyJwt(ctx.token);;
        if (!payload) {
            return null;
        }

        return { payload, success: true, mainToken };
    })
})