import Dashboard from "./views/Dashboard";
import Buttons from "./views/Buttons";
import Badges from "./views/Badges";
import Tables from "./views/Tables";
import SocialButtons from "./views/SocialButtons";
import Cards from "./views/Cards";
import Alerts from "./views/Alerts";
import ProgressBars from "./views/ProgressBars";
import Modals from "./views/Modals";
import Grids from "./views/Grids";
import Typography from "./views/Typography";
import BasicForm from "./views/BasicForm";
import AdvancedForm from "./views/AdvancedForm";
import Icons from "./views/Icons";
import Widgets from "./views/Widgets";
import Chartjs from "./views/Chartjs";
import Recharts from "./views/Recharts";
import GoogleMaps from "./views/GoogleMaps";
import LeafletMaps from "./views/LeafletMaps";
import Login from "./views/Login";
import Register from "./views/Register";
import Brandico from "./components/Icon/Brandico";
import Entypo from "./components/Icon/Entypo";
import FontAwesome from "./components/Icon/FontAwesome";
import Fontelico from "./components/Icon/Fontelico";

import Sorathesabha from "./components/Sorathesab/Sorathesabha";
import Sorathesabhakala from "./components/Sorathesab/Sorathesabhakala";
import SabteSorathesab from "./components/Sorathesab/SabteSorathesab";
import Moshtarian from "./components/Moshtari/Moshtarian";
import Kalaha from "./components/Kala/Kalaha";
import UnreadMessages from "./components/UnreadMessages";
import MapComponent from "./components/MapComponents/MapComponent";

import Planning from "./components/WorkManagement/Planning/Planning2";
import Modeler from "./components/Modeler/Modeler";
const routes = [
    {
        path: "/",
        component: Dashboard,
    },
    {
        path: ".",
        component: Dashboard,
    },
    {
        path: "/dashboard",
        component: Dashboard,
    },
    {
        path: "/components/inbox",
        component: UnreadMessages,
    },
    
    {
        path: "/components/shenasaei",
        component: Planning,
    },
    {
        path: "/components/moshtarian",
        component: Moshtarian,
    },
    {
        path: "/components/kalaha",
        component: Kalaha,
    },  
    {
        path: "/components/badges",
        component: Sorathesabha,
    },
    {
        path: "/components/sorathesab",
        component: Sorathesabha,
    },
    {
        path: "/components/sorathesabkala",
        component: Sorathesabhakala,
    },  
    {
        path: "/components/cards",
        component: Cards,
    },

    {
        path: "/components/alerts",
        component: Alerts,
    },
    {
        path: "/components/progressbars",
        component: ProgressBars,
    },
    {
        path: "/components/modals",
        component: Modals,
    },
    {
        path: "/components/grids",
        component: Grids,
    },
    {
        path: "/components/typography",
        component: Typography,
    },
    {
        path: "/tables",
        component: Tables,
    },
    {
        path: "/forms/basic-form",
        component: Modeler,
    },
    {
        path: "/forms/advanced-form",
        component: AdvancedForm,
    },
    {
        path: "/icons",
        component: Icons,
    },
    {
        path: "/icons/brandico",
        component: Brandico,
    },
    {
        path: "/icons/entypo",
        component: Entypo,
    },
    {
        path: "/icons/font-awesome",
        component: FontAwesome,
    },
    {
        path: "/icons/fontelico",
        component: Fontelico,
    },
    {
        path: "/widgets",
        component: Widgets,
    },
    {
        path: "/charts/chartjs",
        component: Chartjs,
    },
    {
        path: "/charts/recharts",
        component: Recharts,
    },
    {
        path: "/maps/google-map",
        component: GoogleMaps,
    },
    {
        path: "/maps/leaflet-maps",
        component: LeafletMaps,
    },
    {
        route: "/login",
        component: Login,
    },
    {
        route: "/register",
        component: Register,
    },
 
 
   
];

export default routes;

