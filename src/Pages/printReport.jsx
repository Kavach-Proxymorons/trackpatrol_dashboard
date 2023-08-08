import { ScrollArea } from "./../Components/ui-components/scroll-area";
import smvLogo from "../Assests/smvLogo.svg";
import Logo from "../Assests/logo.svg";

const PrintReport = () => {
    return (
        // <ScrollArea className="100vh">
        <div className="p-4 bg-red-100">
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
                <div className="border-3 border-black m-4">
                    <div className="bg-sky-100 grid grid-cols-3 grid-rows-5 justify-between">
                        {/* body */}
                        <p className="order-1">
                            <span> Duty name:</span> Kumbh Mela
                        </p>
                        <p className="order-4">
                            <span> Address:</span>Address: River Bank
                        </p>
                        <p className="order-7">
                            <span> Start Time:</span> 9:00 AM
                        </p>
                        <p className="order-11">
                            <span> End time:</span> 5: 00 PM
                        </p>
                        <p className="order-5">
                            <span> Duty Radius:</span> 100m
                        </p>
                        <p className="order-6">
                            <span> No. of Hardware:</span> 5
                        </p>
                        <p className="order-7">
                            <span> No. of Personnel: </span> 3
                        </p>
                    </div>
                    <div className="bg-green-100">a{/* Graph */}</div>
                    <div className="bg-indigo-500 ">b{/* absent */}</div>
                    <div className="bg-orange-400">c{/* personnel */}</div>
                    <div className="bg-green-800 ">d{/* hardware */}</div>
                </div>
            </div>
        </div>
        // </ScrollArea>
    );
};

export default PrintReport;
