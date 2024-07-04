import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css'

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const domain = import.meta.env.VITE_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_APP_AUTH0_CLIENT_ID;

console.log("domain", domain, "clientId", clientId);



const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        redirectUri={
          typeof window !== "undefined" ? window.location.origin : ""
        }
        
        useRefreshTokens={true} 
        cacheLocation="localstorage" 
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </StrictMode>
  );
}
