const PrintReport = () => {
    return (
        <div className="p-4 bg-red-100">
            <div className="border-3 border-black h-full">
                {/* header */}
                <div className="h-40 bg-green-100">
                    <div></div> {/* logo */}
                    <div></div> {/* title */}
                    <div></div> {/* logo */}
                </div>
                <div className="border-3 border-black m-4">
                    <div className="bg-sky-100 h-60">
                        {/* body */}
                        <p>Duty name: Kumbh Mela</p>
                        <p>Address: River Bank</p>
                        <p>Start Time: 9:00 AM</p>
                        <p>End time: 5: 00 PM</p>
                        <p>Duty Radius: 100m</p>
                    </div>
                    <div className="bg-green-100 h-60">a{/* Graph */}</div>
                    <div className="bg-indigo-500 h-60">b{/* absent */}</div>
                    <div className="bg-orange-400 h-60">c{/* personnel */}</div>
                    <div className="bg-green-800 h-60">d{/* hardware */}</div>
                </div>
            </div>
        </div>
    );
};

export default PrintReport;
