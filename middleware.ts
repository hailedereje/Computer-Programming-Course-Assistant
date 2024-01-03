import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import {
    publicRoutes,
    apiRoutePrefix,
    authRoutes,
    DEFAULT_LOGIN_REDIRECT_PATH
} from "@/route"

const {auth} = NextAuth(authConfig)

export default auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
     
    const isApiRoute = nextUrl.pathname.startsWith(apiRoutePrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname); 

    if(isApiRoute) return null;

    if(isAuthRoute) {
     if(isLoggedIn) return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT_PATH,nextUrl));
     return null;
    }

    if(!isLoggedIn && !isPublicRoute) return Response.redirect(new URL("/auth/login",nextUrl));

})  

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
  }