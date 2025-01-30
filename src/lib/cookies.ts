export const getTokenFromCookies = (): string | null => {
  if (typeof window === "undefined") return null;

  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken="));
  return cookies ? cookies.split("=")[1] : null;
};

export const clearAuthToken = () => {
  document.cookie = "authToken=; path=/; max-age=0";
};
