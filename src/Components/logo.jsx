import logo from "../Assests/logo.png";

export default function Logo() {
    return (
        <>
            <div className="flex justify-center items-center py-6 border-b-3">
                <img className="w-8 mr-2" src={logo} alt="logo" />
                <span className="text-2xl font-normal text-primary">
                    TrackPatrol
                </span>
            </div>
        </>
    );
}
