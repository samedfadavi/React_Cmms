import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import '@coreui/coreui-pro/dist/css/coreui.min.css';
import "./index.scss";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DashboardDataProvider } from "@/context/dashboardDataContext.jsx";
const container = document.getElementById("root");
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const root = createRoot(container);
root.render(
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <DashboardDataProvider>
        <App />
      </DashboardDataProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

