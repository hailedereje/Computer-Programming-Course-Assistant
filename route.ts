export const publicRoutes = [
    "/",
    "/auth/new-varification",
    "/auth/new-password",
    "/auth/two-factor"
]

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
]

export const apiRoutePrefix = "/api/auth"
/**
 * this is the where the loggedin user redirected to
 */
export const   DEFAULT_LOGIN_REDIRECT_PATH = "/settings"

export const SIGN_IN = "/auth/login"
export const SIGN_UP = "/auth/register"