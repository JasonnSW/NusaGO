export const VALID_PATHS = {
  HOME: "/",
  PROFILE: "/profile",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  PETA: "/peta",
} as const;

export const validPathsList: string[] = Object.values(VALID_PATHS);
