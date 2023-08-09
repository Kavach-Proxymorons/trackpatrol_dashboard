import { ScrollArea } from "./../Components/ui-components/scroll-area";
import { Badge } from "./../Components/ui-components/badge";
import smvLogo from "../Assests/smvLogo.svg";
import Logo from "../Assests/logo.svg";
import DataTable from "../Components/report";
import { hardwareHeader } from "../Components/report/skeleton/hardware";
import { personnelHeader } from "../Components/report/skeleton/personnel";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

const PrintReport = () => {
    const { id } = useParams();
    const { response } = useFetch(`/api/v1/admin/shift/${id}/report`);
    console.log(response); 

    return (response &&
        <ScrollArea className="100vh">
            <div className="p-4">
                <div className="border border-black p-4">
                    {/* header */}
                    <div className="flex justify-between items-center">
                        {/* <div className="w-40 h-40 bg-red-700"> */}
                        <img src={smvLogo} alt="smvLogo" className="h-32" />
                        {/* </div> */}
                        {/* logo */}
                        <div className="flex flex-col justify-center items-center gap-y-6">
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                Police Department
                            </h1>
                            <h3 className="scroll-m-20 text-3xl font-semibold tracking-tight border-b border-black px-2">
                                Shift Report
                            </h3>
                        </div>{" "}
                        {/* title */}
                        <img src={Logo} alt="smvLogo" className="h-24" />
                    </div>
                    <div className="flex justify-end mr-8 mt-4">
                        <Badge
                            variant="outline"
                            className="bg-green-100 text-green-950 px-4 py-2 border-green-900"
                        >
                            Rating: {response.duty_score}
                        </Badge>
                    </div>
                    <div className="border border-black mx-2 my-4 px-4">
                        <div className="grid grid-cols-3p grid-rows-5p grid-flow-col justify-between py-2">
                            {/* body */}
                            <p className="">
                                <span className="scroll-m-20 text-lg font-medium tracking-tight">Duty name: </span>
                                {response.duty_name}
                            </p>
                            <p className="">
                                <span className="scroll-m-20 text-lg font-medium tracking-tight">Address: </span>
                                {response.venue}
                            </p>
                            <p className="">
                                <span className="scroll-m-20 text-lg font-medium tracking-tight">Start time: </span>
                                {new Date(response.start_time).toLocaleString()}
                            </p>
                            <p className="">
                                <span className="scroll-m-20 text-lg font-medium tracking-tight">End time: </span>
                                {new Date(response.end_time).toLocaleString()}
                            </p>
                            <p className="">
                                <span className="scroll-m-20 text-lg font-medium tracking-tight">Duty Radius: </span>
                                {response.range}m
                            </p>
                            <p className="">
                                <span className="scroll-m-20 text-lg font-medium tracking-tight">No. of Hardware: </span>
                                {response.no_of_hardwares_attached}
                            </p>
                            <p className="">
                                <span className="scroll-m-20 text-lg font-medium tracking-tight">No. of Personnel: </span>
                                {response.no_of_personnel_assigned}
                            </p>
                            <div className="row-span-5 col-span-1 border border-black rounded">
                                <iframe
                                    src={`https://maps.google.com/maps?q=${response.location}&z=15&output=embed`}
                                    width="100%"
                                    height="100%"
                                ></iframe>
                            </div>
                        </div>
                        <br />
                        <DataTable
                            columns={personnelHeader}
                            data={response.alloted_personnel_table.filter(personnel => personnel.status === "Absent")}
                            className="p-4"
                        />
                        <br />
                        <DataTable
                            columns={personnelHeader}
                            data={response.alloted_personnel_table}
                            className="p-4"
                        />
                        <br />
                        <DataTable
                            columns={hardwareHeader}
                            data={response.no_of_hardwares_attached}
                            className="p-4"
                        />
                    </div>
                </div>
            </div>
        </ScrollArea>
    );
};

export default PrintReport;
