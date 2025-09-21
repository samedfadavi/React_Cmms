import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import '@coreui/coreui-pro/dist/css/coreui.min.css';
import "./index.scss";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { DashboardDataProvider } from "@/context/dashboardDataContext.jsx";
const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <BrowserRouter>
     <DashboardDataProvider>
        <App />
        </DashboardDataProvider>
    </BrowserRouter>
);

