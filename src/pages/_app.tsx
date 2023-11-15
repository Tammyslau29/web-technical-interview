import type { AppProps } from "next/app"
import { AuthProvider } from "../context/AuthContext"
import { HomeContextProvider } from "../context/HomeContext"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <HomeContextProvider>
        <Component {...pageProps} />
      </HomeContextProvider>
    </AuthProvider>
  )
}

export default MyApp
