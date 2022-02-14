import { AxiosRequestConfig } from "axios"

export const baseUrl = (hostname: string) => {
  const host = (import.meta.env.VITE_APP_ENDPOINT || "").toString()

  switch (hostname) {
    case "localhost":
      return host
    /* Demo */
    case "mvpf-frontend-3-test-demo.surge.sh" || "ironwebstar-mvpf-test.netlify.app":
      return host
    default:
      throw new Error(`${host} api domain is not supported`)
  }
}

export const axiosRequestConfiguration: AxiosRequestConfig = {
  baseURL: baseUrl(process.env.NODE_ENV === "test" ? "localhost" : window.location.hostname),
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
}
