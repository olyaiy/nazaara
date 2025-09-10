import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { db } from "@/db/drizzle";
import * as schema from "@/db/auth-schema";

console.log("[auth-server] === INITIALIZING BETTER AUTH ===");
console.log("[auth-server] Environment:", process.env.NODE_ENV);
console.log("[auth-server] BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL);
console.log("[auth-server] BETTER_AUTH_SECRET exists:", !!process.env.BETTER_AUTH_SECRET);
console.log("[auth-server] DATABASE_URL exists:", !!process.env.DATABASE_URL);
console.log("[auth-server] ADMIN_USER_IDS:", process.env.ADMIN_USER_IDS);

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),
    emailAndPassword: {
        enabled: true, 
    },
    trustedOrigins: [
        "http://localhost:3000",     // Development
        "http://localhost:3001", 
        "https://localhost:3000",    // HTTPS development
        "https://your-domain.com",   // Production domain
        "https://www.your-domain.com", // WWW version
        "*.your-domain.com",         // All subdomains
        "https://nazaara-git-feature-add-auth-and-db-hightide-digital.vercel.app", // Specific Vercel deployment
        "https://*.vercel.app"       // All Vercel app domains
    ],
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

console.log("[auth-server] === BETTER AUTH INITIALIZED ===");