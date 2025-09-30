import { UTApi } from "uploadthing/server";

// Server-side UTApi instance for file management
// This should only be used in server actions or API routes
let utapi: UTApi | null = null;

export function getUTApi() {
  if (!utapi) {
    utapi = new UTApi();
  }
  return utapi;
}