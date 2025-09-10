import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"

console.log("[auth-client] === INITIALIZING AUTH CLIENT ===");
console.log("[auth-client] Environment:", process.env.NODE_ENV);
console.log("[auth-client] Window location:", typeof window !== 'undefined' ? window.location.href : 'server-side');
console.log("[auth-client] Document cookie:", typeof document !== 'undefined' ? document.cookie : 'server-side');

export const authClient = createAuthClient({
    plugins: [adminClient()],
    baseURL: typeof window !== 'undefined' ? window.location.origin : process.env.BETTER_AUTH_URL,
    onSuccess: (ctx) => {
        console.log("[auth-client] ✅ Auth success:", ctx.action, ctx.data);
    },
    onError: (ctx) => {
        console.log("[auth-client] ❌ Auth error:", ctx.action, ctx.error);
    },
    onRequest: (ctx) => {
        console.log("[auth-client] 🔄 Auth request:", ctx.action, {
            url: ctx.url,
            method: ctx.method,
            headers: Object.fromEntries(ctx.headers.entries()),
        });
    },
    onResponse: (ctx) => {
        console.log("[auth-client] 📥 Auth response:", ctx.action, {
            status: ctx.response.status,
            statusText: ctx.response.statusText,
            url: ctx.response.url,
        });
    }
})

// Wrap the exported functions with logging
const originalSignIn = authClient.signIn;
const originalSignUp = authClient.signUp;
const originalSignOut = authClient.signOut;

export const signIn = {
    email: async (data: any, options?: any) => {
        console.log("[auth-client] === SIGN IN EMAIL ===");
        console.log("[auth-client] Email:", data.email);
        console.log("[auth-client] Options:", options);
        try {
            const result = await originalSignIn.email(data, options);
            console.log("[auth-client] ✅ Sign in success:", result);
            return result;
        } catch (error) {
            console.log("[auth-client] ❌ Sign in error:", error);
            throw error;
        }
    }
};

export const signUp = {
    email: async (data: any, options?: any) => {
        console.log("[auth-client] === SIGN UP EMAIL ===");
        console.log("[auth-client] Email:", data.email);
        console.log("[auth-client] Options:", options);
        try {
            const result = await originalSignUp.email(data, options);
            console.log("[auth-client] ✅ Sign up success:", result);
            return result;
        } catch (error) {
            console.log("[auth-client] ❌ Sign up error:", error);
            throw error;
        }
    }
};

export const signOut = async (options?: any) => {
    console.log("[auth-client] === SIGN OUT ===");
    console.log("[auth-client] Options:", options);
    try {
        const result = await originalSignOut(options);
        console.log("[auth-client] ✅ Sign out success:", result);
        return result;
    } catch (error) {
        console.log("[auth-client] ❌ Sign out error:", error);
        throw error;
    }
};

export const { useSession } = authClient;

console.log("[auth-client] === AUTH CLIENT INITIALIZED ===");