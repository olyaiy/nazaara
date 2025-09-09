import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { db } from "@/db/drizzle";
import * as schema from "@/db/auth-schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),
    emailAndPassword: {
        enabled: true, 
    }, 
    plugins: [
        nextCookies(),
        admin({
            defaultRole: "user",
            adminRoles: ["admin"],
            adminUserIds: process.env.ADMIN_USER_IDS ? process.env.ADMIN_USER_IDS.split(",") : [],
            impersonationSessionDuration: 60 * 60, // 1 hour
            defaultBanReason: "Violation of terms of service",
            bannedUserMessage: "Your account has been suspended. Please contact support if you believe this is an error."
        })
    ]
});