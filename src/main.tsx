import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import theme from "./theme.ts";
import {store, persistor} from "./redux/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

{
  /*Fetches the body of the index page and asks it to render the things inside App.tsx*/
}
createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <App />
      
      </Provider>
      </PersistGate>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
