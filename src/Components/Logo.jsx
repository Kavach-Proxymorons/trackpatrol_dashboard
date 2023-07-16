import logo from '../Assests/logo.png'

export default function Logo() {
    return <>
    <div className='flex justify-center items-center my-6 mx-4 drop-shadow-md'>
        <img className="w-12 mr-2" src={logo} alt="logo" />
        <span className="text-3xl font-normal">TrackPatrol</span>
    </div>
    </>;
}