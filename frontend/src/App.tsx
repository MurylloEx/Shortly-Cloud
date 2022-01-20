import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import Routes from "./routes";
import "./styles/global.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}
