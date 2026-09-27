const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

export const API_ENDPOINTS = {
  // Auth
  REGISTER: `${BASE_URL}/auth/register`,
  VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
  LOGIN: `${BASE_URL}/auth/login`,
  
  // Users (KYC / Profile)
  GET_ME: `${BASE_URL}/users/me`,
  COMPLETE_PROFILE: `${BASE_URL}/users/complete-profile`,
  UPDATE_PROFILE: `${BASE_URL}/users/profile`,
  
  // Payments (Banks)
  GET_BANKS: `${BASE_URL}/payments/banks`,
  RESOLVE_ACCOUNT: `${BASE_URL}/payments/resolve-account`,
  
  // Links
  GET_LINKS: `${BASE_URL}/links/`,
  CREATE_LINK: `${BASE_URL}/links/`,
  UPDATE_LINK: (id: string) => `${BASE_URL}/links/${id}`,
  GET_PUBLIC_LINK: (slug: string) => `${BASE_URL}/links/public/${slug}`,
  
  // Tips
  INITIALIZE_TIP: `${BASE_URL}/tips/initialize`,
  GET_DASHBOARD: `${BASE_URL}/tips/dashboard`,
  GET_ALL_TIPS: `${BASE_URL}/tips/all`,
};

export async function authFetch(url: string, options: RequestInit = {}) {
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("tippa_token") || "";
  }
  
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(url, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      localStorage.removeItem("tippa_token");
      window.location.href = "/login";
    }
  }

  return res;
}
