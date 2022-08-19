import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store, { wrapper } from "../redux/store";
import Layout from "../components/Layout";

import "swiper/css";
import "swiper/css/navigation";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
