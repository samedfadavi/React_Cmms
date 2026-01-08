import React, { useEffect, useState,useRef } from 'react';
import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbars/Navbar";
import config from '@/config'; // Adjust the path as necessary
import { useDashboardDataContext } from "../context/dashboardDataContext";
import {
    Logo,
    Menu,
    MenuItem,
    Sidebar,
    SubMenu,
    SearchBar,
    SidenavUser,
} from "../components/Sidebar/Sidebar";
import lightLogo from "../assets/image/dima.png";
import lightMini from "../assets/image/dima.png";
import userImg from "../assets/image/admin.jpg";
import style from "@/assets/scss/Layouts.module.scss";
import axios from 'axios'; // Import axios for HTTP requests

const Layouts = () => {
    const [menuData, setMenuData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
         
            const response = axios.get(`${config.API_URL}/BPM/List_Farayand`)
            .then((response) => {
             setMenuData(response.data);  // Set data from response
      
          })
          .catch((err) => {
            console.error('Error fetching data:', err);
          })
          .finally(() => {
       
          });
           
        };
    
        fetchData();
      }, []); 
    const { sidebarMini } = useDashboardDataContext();
    const {userInfo}=useDashboardDataContext();
    return (
        <div className={style.layout_wrapper}>
            <Sidebar>
                <Logo>
                    <Link to="/">
                        <img data-logo="mini-logo" style={{width:'50px',height:'50px'}} src={lightMini} alt="logo" />
                        <img data-logo="logo" src={lightLogo} style={{width:'80px',height:'80px'}} alt="logo" />
                 
                    </Link>
                </Logo>
                <SearchBar />
               
                <Menu>
                <MenuItem routeLink=".">
                            <i className="fa fa-home" />
                            <span> پیش خوان</span>
                        </MenuItem>
                        <SubMenu
                        label="کارتابل"
                        icon={<i class="fa-solid fa-envelope-circle-check"></i>}
                    >
                        <MenuItem routeLink="/components/inbox">
                            <i className="fa fa-inbox" />
                            <span>وارده</span>
                        </MenuItem>
                        
                        <MenuItem routeLink="/components/socials">
                        <i class="fa-solid fa-arrow-up-from-bracket"></i>
                            <span>صادره</span>
                        </MenuItem>
                     
                    </SubMenu>
                   
                    <SubMenu
                        label="مدیریت کار"
                        icon={<i class="fa-solid fa-screwdriver-wrench"></i>}
                    >
                                    {menuData?.map((menu, i) => (
        
                 <MenuItem  key={i} routeLink={`/components/shenasaei?id=${menu.FilePath}`} >
                 
                 <i className="fa fa-pencil-square" />
                 <span> {menu.Onvan}</span>
             </MenuItem>
            ))}
                        {/* <MenuItem  routeLink="/forms/basic-form">
                            <i className="fa fa-pencil-square" />
                            <span>شناسایی</span>
                        </MenuItem>
                        <MenuItem   routeLink="/components/shenasaei?id=1">
                            <i className="fa fa-pencil-square" />
                            <span>برنامه ریزی</span>
                        </MenuItem> */}
                    </SubMenu>
              
                    <SubMenu
                        label=" فرایندهای سازمان"
                        icon={<i class="fa fa-diagram-project"></i>}
                    >
                        <MenuItem routeLink="/charts/chartjs">
                            <i className="fa fa-line-chart" />
                            <span>مدیریت فرایندها</span>
                        </MenuItem>
                        <MenuItem routeLink="/charts/recharts">
                            <i className="fa fa-line-chart" />
                            <span>Recharts</span>
                        </MenuItem>
                    </SubMenu>
                    <SubMenu
                        label="مدیریت سیستم"
                        icon={<i class="fa-solid fa-sliders"></i>}
                    >
                        <MenuItem routeLink="/maps/google-map">
                            <i className="fa fa-map" />
                            <span>Google Map</span>
                        </MenuItem>
                        <MenuItem routeLink="/maps/leaflet-maps">
                            <i className="fa fa-street-view" />
                            <span>Leaflet Maps</span>
                        </MenuItem>
                    </SubMenu>
                    <SubMenu
                        label="بازخورد"
                        
                        icon={<i class="fa-solid fa-square-poll-vertical"></i>}
                    >
                        <MenuItem routeLink="/login">
                            <i className="fa fa-sign-in" />
                            <span>Login</span>
                        </MenuItem>
                        <MenuItem routeLink="/register">
                            <i className="fa fa-sign-in" />
                            <span>Register</span>
                        </MenuItem>
                        <MenuItem routeLink="/page404">
                            <i className="fa fa-paper-plane" />
                            <span>Page 404</span>
                        </MenuItem>
                        <MenuItem routeLink="/page500">
                            <i className="fa fa-paper-plane" />
                            <span>Page 500</span>
                        </MenuItem>
                    </SubMenu>
                   
                {/*     <SubMenu
                        label="مدیرت کار"
                        icon={<i class="fa-solid fa-screwdriver-wrench"></i>}
                    >
                        <MenuItem routeLink="/forms/basic-form">
                            <i className="fa fa-pencil-square" />
                            <span>Forms</span>
                        </MenuItem>
                        <MenuItem   routeLink="/forms/advanced-form">
                            <i className="fa fa-pencil-square" />
                            <span>Advanced Form</span>
                        </MenuItem>
                    </SubMenu>
              
                    <SubMenu
                        label=" فرایندهای سازمان"
                        icon={<i class="fa fa-diagram-project"></i>}
                    >
                        <MenuItem routeLink="/charts/chartjs">
                            <i className="fa fa-line-chart" />
                            <span>Chart Js</span>
                        </MenuItem>
                        <MenuItem routeLink="/charts/recharts">
                            <i className="fa fa-line-chart" />
                            <span>Recharts</span>
                        </MenuItem>
                    </SubMenu>
                    <SubMenu
                        label="مدیریت سیستم"
                        icon={<i class="fa-solid fa-sliders"></i>}
                    >
                        <MenuItem routeLink="/maps/google-map">
                            <i className="fa fa-map" />
                            <span>Google Map</span>
                        </MenuItem>
                        <MenuItem routeLink="/maps/leaflet-maps">
                            <i className="fa fa-street-view" />
                            <span>Leaflet Maps</span>
                        </MenuItem>
                    </SubMenu>
                    <SubMenu
                        label="بازخورد"
                        
                        icon={<i class="fa-solid fa-square-poll-vertical"></i>}
                    >
                        <MenuItem routeLink="/login">
                            <i className="fa fa-sign-in" />
                            <span>Login</span>
                        </MenuItem>
                        <MenuItem routeLink="/register">
                            <i className="fa fa-sign-in" />
                            <span>Register</span>
                        </MenuItem>
                        <MenuItem routeLink="/page404">
                            <i className="fa fa-paper-plane" />
                            <span>Page 404</span>
                        </MenuItem>
                        <MenuItem routeLink="/page500">
                            <i className="fa fa-paper-plane" />
                            <span>Page 500</span>
                        </MenuItem>
                    </SubMenu> */}
              
                </Menu>
            
            </Sidebar>
            <div
                className={`${style.content} p-4`}
                style={{
                    width: `${
                        sidebarMini ? "calc(100% - 80px)" : "calc(100% - 280px)"
                    }`,
                }}
            >
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default Layouts;

