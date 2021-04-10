import React from "react";
import { Header } from "../components/Header";
import { AnalyzerProvider } from "../lib/hooks/AnalyzerContext";
import { Provider } from "../lib/hooks/Context";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <AnalyzerProvider>
        <Header />
        <Component {...pageProps} />
      </AnalyzerProvider>
    </Provider>
  );
}

export default MyApp;
