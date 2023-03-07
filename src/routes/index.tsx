import {
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Loader } from "~/components/loader/loader";
import { handleShortener } from "~/components/shortener-input/handleShortener";
import { ShortenerInput } from "~/components/shortener-input/shortener-input";
import { ThemeSwitcher } from "~/components/theme-switcher/theme-switcher";
import { Tooltip } from "~/components/tooltip/tooltip";
import { copyToClipboard, openUrl } from "~/utils";
import styles from "./index.css?inline";

export const InputContext = createContextId("input");

export interface Store {
  inputValue: string;
  reducedUrl: string;
  loading: boolean;
  showResult: boolean;
  urlError: string;
}

export const clearValues = (state: Store) => {
  state.reducedUrl = "";
  state.showResult = false;
  state.urlError = "";
};

export default component$(() => {
  useStylesScoped$(styles);

  const tooltipCopyRef = useSignal(false);

  const state = useStore<Store>({
    inputValue: "",
    reducedUrl: "",
    loading: false,
    showResult: false,
    urlError: "",
  });

  useContextProvider(InputContext, state);

  return (
    <div class="h-screen overflow-x-hidden overflow-y-auto md:overflow-hidden">
      <div class="min-h-screen flex flex-col">
        <div class="mx-auto container grid grid-cols-12 flex-1">
          <div class="col-start-2 col-end-12 md:col-start-3 md:col-end-11">
            <div class="flex flex-col">
              <div class="flex justify-end my-5">
                <div class="flex">
                  <div class="grid  flex-grow place-items-center">
                    <span class="h-5">Logo</span>
                  </div>
                  <div class="divider divider-horizontal"></div>
                  <div class="grid  flex-grow place-items-center">
                    <ThemeSwitcher></ThemeSwitcher>
                  </div>
                </div>
              </div>
              <article class="prose mx-auto max-w-4xl pb-16">
                <div class="mx-auto">
                  <img class="mx-auto w-40 h-20" src="favicon.svg" alt="Logo" />
                </div>
                <p>
                  QwikCity with <b>TailwindCSS</b> and <b>DaisyUI</b>
                </p>
              </article>
              <ShortenerInput
                onKeyUp$={(event) => {
                  if (
                    event.key.toLowerCase() === "enter" &&
                    state.inputValue.length > 0
                  ) {
                    clearValues(state);
                    handleShortener(state);
                  }
                }}
                onInput$={(event) =>
                  (state.inputValue = (event.target as HTMLInputElement).value)
                }
                onSubmit$={() => {
                  clearValues(state);
                  handleShortener(state);
                }}
              />
              <Loader visible={state.loading} />
              <div id="result" class={state.showResult ? "" : "hidden"}>
                <p id="error" class="fade-in">
                  {state.urlError}
                </p>
                <span
                  id="text"
                  class="fade-in cursor-pointer block"
                  onClick$={() => copyToClipboard(state.reducedUrl)}
                >
                  {state.reducedUrl}
                </span>
                <div
                  id="action"
                  class={`${
                    state.reducedUrl ? "" : "hidden"
                  } btn-group p-4 relative [&>:first-child>.btn]:rounded-l-lg [&>:last-child>.btn]:rounded-r-lg [&>*>.btn]:rounded-none`}
                >
                  <button
                    type="button"
                    title="Copy"
                    class="btn relative"
                    onClick$={() => {
                      copyToClipboard(state.reducedUrl);
                      tooltipCopyRef.value = true;
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width={1.5}
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                      />
                    </svg>
                  </button>
                  <Tooltip
                    label="Copied!"
                    position="bottom"
                    open={tooltipCopyRef}
                  ></Tooltip>
                  <button
                    type="button"
                    title="Open in new tab"
                    class="btn"
                    onClick$={() => openUrl(state.reducedUrl)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width={1.5}
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "The FREE Open-Source URL Shortener | Reduced.to",
  meta: [
    {
      name: "title",
      content: "Reduced.to | The FREE Open-Source URL Shortener",
    },
    {
      name: "description",
      content:
        "Reduced.to is the FREE, Modern, and Open-Source URL Shortener. Convert those ugly and long URLs into short, easy to manage links and QR-Codes.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://reduced.to",
    },
    {
      property: "og:title",
      content: "Reduced.to | The FREE Open-Source URL Shortener",
    },
    {
      property: "og:description",
      content:
        "Reduced.to is the FREE, Modern, and Open-Source URL Shortener. Convert those ugly and long URLs into short, easy to manage links and QR-Codes.",
    },
    {
      property: "twitter:card",
      content: "summary",
    },
    {
      property: "twitter:title",
      content: "Reduced.to | The FREE Open-Source URL Shortener",
    },
    {
      property: "twitter:description",
      content:
        "Reduced.to is the FREE, Modern, and Open-Source URL Shortener. Convert those ugly and long URLs into short, easy to manage links and QR-Codes.",
    },
  ],
};
