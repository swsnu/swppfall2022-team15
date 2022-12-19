import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { ProSidebarProvider } from "react-pro-sidebar";

import App from "./App";
import { store } from "./store";

test("renders App.tsx", () => {
  render(
    <ProSidebarProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ProSidebarProvider>
  );
});
