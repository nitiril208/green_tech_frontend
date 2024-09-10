import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import ReactGA from "react-ga4";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.tsx";
import { AssessmentProvider } from "./context/assesmentContext.tsx";
import { PermissionProvider } from "./context/PermissionContext.tsx";
import { RegisterProvider } from "./context/RegisterContext.tsx";
import { SidebarProvider } from "./context/Sidebarcontext.tsx";
import "./index.css";
import { persistor, store } from "./redux/store";

ReactGA.initialize("G-SV4CBBR4ER");
ReactGA.send({
  hitType: "pageview",
  page: window.location.pathname,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("../public/firebase-messaging-sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <PermissionProvider>
      <AssessmentProvider>
        <SidebarProvider>
          <RegisterProvider>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <QueryClientProvider client={queryClient}>
                  <App />
                </QueryClientProvider>
              </PersistGate>
            </Provider>
          </RegisterProvider>
        </SidebarProvider>
      </AssessmentProvider>
    </PermissionProvider>
  </BrowserRouter>
);
