import { ScrollArea } from "./../Components/ui-components/scroll-area";
import { Badge } from "./../Components/ui-components/badge";

import smvLogo from "../Assests/smvLogo.svg";
import Logo from "../Assests/logo.svg";
import DataTable from "../Components/report";
import { useStateContext } from "../Contexts/ContextProvider";
import { hardwareHeader } from "../Components/report/skeleton/hardware";
import { personnelHeader } from "../Components/report/skeleton/personnel";

const PrintReport = () => {
    const { hardwares, getHardwares, personnels, getPersonnels } =
        useStateContext();

    return (
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
                            Rating: 4.5{" "}
                        </Badge>
                    </div>
                    <div className="border border-black mx-2 my-4 px-4">
                        <div className="grid grid-cols-3p grid-rows-5p grid-flow-col justify-between py-2">
                            {/* body */}
                            <p className="">
                                <span className="scroll-m-20 text-lg font-medium tracking-tight">
                                    {" "}
                                    Duty name:
                                </span>{" "}
                                Kumbh Mela
                            </p>
                            <p className="">
                                <span className="scroll-m-20 text-lg font-medium tracking-tight">
                                    {" "}
                                    Address:
                                </span>
                                Address: River Bank
                            </p>
                            <p className="">
                                <span className="scroll-m-20 text-lg font-medium tracking-tight">
                                    {" "}
                                    Start Time:
                                </span>{" "}
                                9:00 AM
                            </p>
                            <p className="">
                                <span className="scroll-m-20 text-lg font-medium tracking-tight">
                                    {" "}
                                    End time:
                                </span>{" "}
                                5: 00 PM
                            </p>
                            <p className="">
                                <span className="scroll-m-20 text-lg font-medium tracking-tight">
                                    {" "}
                                    Duty Radius:
                                </span>{" "}
                                100m
                            </p>
                            <p className="">
                                <span className="scroll-m-20 text-lg font-medium tracking-tight">
                                    {" "}
                                    No. of Hardware:
                                </span>{" "}
                                5
                            </p>
                            <p className="">
                                <span className="scroll-m-20 text-lg font-medium tracking-tight">
                                    {" "}
                                    No. of Personnel:{" "}
                                </span>{" "}
                                3
                            </p>
                        </div>

                        <DataTable
                            columns={personnelHeader}
                            data={personnels}
                            className="p-4"
                        />
                        <DataTable
                            columns={hardwareHeader}
                            data={hardwares}
                            className="p-4"
                        />
                    </div>
                </div>
            </div>
        </ScrollArea>
    );
};

export default PrintReport;
