import logo from '../Assests/logo.png'

export default function Logo() {
    return <>
    <div className='flex justify-center items-center my-6 drop-shadow-md'>
        <img className="w-8 mr-2" src={logo} alt="logo" />
        <span className="text-2xl font-normal">TrackPatrol</span>
    </div>
    </>;
}