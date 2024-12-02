import { wrapper } from "@/store";
import "@/styles/globals.scss";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            
        </>
    );
}

export default wrapper.withRedux(App);
