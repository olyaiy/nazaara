import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";

console.log("[auth-api] === AUTH API ROUTE INITIALIZED ===");

const handlers = toNextJsHandler(auth.handler);

export async function GET(request: NextRequest) {
    console.log("[auth-api] === GET REQUEST ===");
    console.log("[auth-api] URL:", request.url);
    console.log("[auth-api] Current Origin:", request.headers.get("origin") || new URL(request.url).origin);
    console.log("[auth-api] Host:", request.headers.get("host"));
    console.log("[auth-api] Headers:", Object.fromEntries(request.headers.entries()));
    console.log("[auth-api] Cookies:", request.cookies.getAll().map(c => `${c.name}=${c.value?.substring(0, 20)}...`));
    
    try {
        const response = await handlers.GET(request);
        console.log("[auth-api] ✅ GET response status:", response.status);
        console.log("[auth-api] Response Set-Cookie headers:", response.headers.getSetCookie());
        return response;
    } catch (error) {
        console.log("[auth-api] ❌ GET error:", error);
        throw error;
    }
}

export async function POST(request: NextRequest) {
    console.log("[auth-api] === POST REQUEST ===");
    console.log("[auth-api] URL:", request.url);
    console.log("[auth-api] Current Origin:", request.headers.get("origin") || new URL(request.url).origin);
    console.log("[auth-api] Host:", request.headers.get("host"));
    console.log("[auth-api] Headers:", Object.fromEntries(request.headers.entries()));
    console.log("[auth-api] Cookies:", request.cookies.getAll().map(c => `${c.name}=${c.value?.substring(0, 20)}...`));
    
    // Log body (clone request to avoid consuming the body)
    try {
        const clonedRequest = request.clone();
        const body = await clonedRequest.text();
        console.log("[auth-api] Body:", body.substring(0, 200) + (body.length > 200 ? '...' : ''));
    } catch (error) {
        console.log("[auth-api] Could not read body:", error);
    }
    
    try {
        const response = await handlers.POST(request);
        console.log("[auth-api] ✅ POST response status:", response.status);
        console.log("[auth-api] Response Set-Cookie headers:", response.headers.getSetCookie());
        console.log("[auth-api] Response headers:", Object.fromEntries(response.headers.entries()));
        return response;
    } catch (error) {
        console.log("[auth-api] ❌ POST error:", error);
        throw error;
    }
} 