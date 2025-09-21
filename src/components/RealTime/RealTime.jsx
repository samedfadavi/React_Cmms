import { Fragment, useState } from "react";
import Card from "@/components/Card/Card";
import ReactApexChart from "react-apexcharts";
import { CardBody } from "react-bootstrap";

const RealTime = () => {
    const [close, setClose] = useState(false);
    const [state, setState] = useState({
        series: [
            {
                name: "آچاربدستی",
                data: [35, 36, 30, 32, 32, 34,28, 30, 32, 32, 34,  35, 36, 30, 32, 32],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: "area",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
            },
            xaxis: {
                type: "string",
                categories: [
                    "جنوب ساری",
                    "شمال ساری",
                    "قائمشهر",
                    "نکا",
                    "سیمرغ",
                    "بهشهر",
                    "گلوگاه",
                    "جویبار",
                    "آمل",
                    "جنوب بابل",
                    "سواد کوه",
                    "شرق آمل",
                    "سوادکوه شمالی",
                    "شمال بابل",
                    "میاندرود",
                    "امیرکلا",
                    "بابلسر",
                    "فریدونکنار",
                ],
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm",
                },
            },
        },
    });
    return (
        <Fragment>
            {!close ? (
                <Card
                    title="(آچار به دست بودن) زمان کار مفید"
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
                        <div className="d-flex justify-content-center align-items-center overflow-hidden">
                            <ReactApexChart
                                options={state.options}
                                series={state.series}
                                type="area"
                                height={446}
                                style={{ width: "100%" }}
                            />
                        </div>
                    </CardBody>
                </Card>
            ) : null}
        </Fragment>
    );
};

export default RealTime;

