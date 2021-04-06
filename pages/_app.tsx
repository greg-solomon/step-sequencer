import { Header } from "../components/Header";
import { Provider } from "../lib/hooks/Context";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
