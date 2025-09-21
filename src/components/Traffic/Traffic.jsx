import { Fragment, useState } from "react";
import { CardBody, CardFooter, Col, Row } from "react-bootstrap";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Card from "@/components/Card/Card";
import styles from "@/assets/scss/Traffic.module.scss";

const Traffic = () => {
    const [close, setClose] = useState(false);
    const data = [
        {
            name: "سواد کوه",
            uv: 25000,
        
        },
        {
            name: "سواد کوه شمالی",
            uv: 23200,
        
        },
        {
            name: " فریدونکنار",
            uv: 28300,
        
        },
        {
            name: "جنوب ساری",
            uv: 22000,
        
        },
       
        {
            name: " بابلسر",
            uv: 27400,
        
        },
        {
            name: " آمل",
            uv: 23000,
        
        },
        {
            name: "شمال ساری",
            uv: 25000,
        
        },
     
        {
            name: "سیمرغ",
            uv: 37000,
           
        },
        {
            name: "نکا",
            uv: 25000,
         
        },
        {
            name: "گلوگاه",
            uv: 15000,
          
        },
        {
            name: "جویبار",
            uv: 20000,
          
        },
        {
            name: "قایمشهر",
            uv: 30000,
           
        },
        {
            name: "بهشهر",
            uv: 25000,
          
        },
        {
            name: "شرق آمل",
            uv: 18000,
            
        },
        {
            name: "جنوب بابل",
            uv: 35000,
          
        },
        {
            name: "شمال بابل",
            uv: 17000,
          
        },
        {
            name: "میاندرود",
            uv: 14000,
          
        },
        {
            name: "امیرکلا ",
            uv: 22400,
        
        },
    ];
    return (
        <Fragment>
            {!close ? (
                <Card
                    title="کارهای مانده یا معوقه"
                    icons={[
                        {
                            icon: "fa fa-cog",
                            dropdown: [
                                {
                                    label: "Edit",
                                    icon: "fa fa-cog",
                                    method: () => alert("Cog"),
                                },
                                {
                                    label: "Delete",
                                    icon: "fa-solid fa-trash",
                                    method: () => alert("Delete"),
                                },
                                {
                                    label: "Update",
                                    icon: "fa-solid fa-recycle",
                                    method: () => alert("Update"),
                                },
                            ],
                        },
                        { icon: "fa fa-angle-down" },
                    ]}
                    dismissible={true}
                    onClose={() => setClose(!close)}
                >
                    <CardBody className="p-3">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                width={1000}
                                height={400}
                                data={data}
                                fontSize="11px"
                                color="#999999"
                                margin={{
                                    top: 10,
                                    right: 10,
                                    left: -10,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    connectNulls
                                    type="monotone"
                                    dataKey="amt"
                                    stroke="#93CF96"
                                    fill="#93CF96"
                                />
                                <Area
                                    connectNulls
                                    type="monotone"
                                    dataKey="pv"
                                    stroke="#D47765"
                                    fill="#D47765"
                                />
                                <Area
                                    connectNulls
                                    type="monotone"
                                    
                                    dataKey="uv"
                                    stroke="#5C6BC0"
                                    fill="#5C6BC0"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardBody>
                
                  
                </Card>
            ) : null}
        </Fragment>
    );
};

export default Traffic;

export const TrafficVisitor = () => {
    return (
        <div className={styles.visitor_wrapper}>
            <span className={`${styles.title} text-center d-block`}>
                Visits
            </span>
            <h4
                className={`${styles.counter} counter text-center m-0 text-uppercase`}
            >
                29.703 Users (40%)
            </h4>
            <div className={styles.progress}>
                <div
                    className={styles.progress_bar}
                    role="progressbar"
                    aria-valuenow=""
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
            </div>
        </div>
    );
};

