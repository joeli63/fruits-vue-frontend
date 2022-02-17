import { AxiosRequestConfig } from "axios"

export const baseUrl = (hostname: string) => {
  const host = (import.meta.env.VITE_APP_ENDPOINT || "").toString()

  switch (hostname) {
    case "localhost":
      return host
    /* Demo */
    case "vite-vue3-tailwindcss-typescript-demo.surge.sh" ||
      "ironwebstar-Vite-Vue3-TailwindCSS-Typescript.netlify.app":
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
