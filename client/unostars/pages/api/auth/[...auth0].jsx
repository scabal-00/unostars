import { handleAuth } from "@auth0/nextjs-auth0";

console.log("the AUTH0_SECRET env var is set: ", !!process.env.AUTH0_SECRET);

export default handleAuth();

// this file manages this routes

// /api/auth/login
// /api/auth/callback
// /api/auth/logout
// /api/auth/me
