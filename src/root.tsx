import { component$, useContextProvider, useStore } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { ThemeLoader } from "./components/theme-switcher/theme-loader";
import type { SiteStore } from "./context";
import { GlobalStore } from "./context";

import "./global.css";
import "leaflet.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */

  const store = useStore<SiteStore>({
    theme: "auto",
  });
  useContextProvider(GlobalStore, store);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        {/* <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
          integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
          crossorigin=""
        /> */}
        {/* <!-- Make sure you put this AFTER Leaflet's CSS --> */}
        {/* <script
          src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
          integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
          crossorigin=""
        ></script> */}

        <RouterHead />
      </head>
      <body lang="en">
        <ThemeLoader />
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
