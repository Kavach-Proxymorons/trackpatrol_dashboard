import { useEffect } from 'react';
import { Logo } from '../Components';
import { HiUsers } from "react-icons/hi";
import { HiMiniCpuChip } from 'react-icons/hi2';
import { BsFillCarFrontFill } from 'react-icons/bs';
import { BiSolidDashboard } from 'react-icons/bi';
import { AiOutlineSetting } from 'react-icons/ai';
import { MdAdminPanelSettings } from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';
import { useStateContext } from '../Contexts/ContextProvider';


export default function Sidebar() {
    const { screenSize, setScreenSize, activeMenu, setActiveMenu } = useStateContext();

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(() => { return window.innerWidth; });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize >= 1200) setActiveMenu(() => { return true; });
        else setActiveMenu(() => { return false; });
    }, [screenSize])

    return <>
        <div className={`w-72 md:overflow-hidden overflow-auto md:hover:overflow-auto fixed ${activeMenu? 'shadow-xl' : ''}`}>
            {activeMenu &&
                <div className='h-screen drop-shadow-md'>
                    <Logo />
                    <div className='bg-[#DBDBDB] w-full h-[2px] my-6'></div>
                    <div className='flex flex-col gap-y-1 ml-6 mt-20 mr-6 '>
                        <div className='flex gap-x-2 px-2 py-3 rounded-md'>
                            <BiSolidDashboard color='#7B7D92' size={25} />
                            <span className="text-lg text-[#7B7D92] font-medium">Dashboard</span>
                        </div>

                        <div className='flex items-center gap-x-2 bg-[#F4F6FA] px-2 py-3 rounded-xl'>
                            <HiUsers size={25} color='rgb(30, 41, 59)' />
                            <span className="text-lg font-medium text-slate-800">Register Personnel</span>
                        </div>
                        <div className='flex items-center gap-x-2 px-2 py-3 rounded-md'>
                            <BsFillCarFrontFill color='#7B7D92' size={25} />
                            <span className="text-lg font-medium text-[#7B7D92]">Create Bandobast</span>
                        </div>
                        <div className='flex items-center gap-x-2 px-2 py-3 rounded-md'>
                            <HiMiniCpuChip color='#7B7D92' size={25} />
                            <span className="text-lg font-medium text-[#7B7D92]">Register Hardware</span>
                        </div>
                        <div className='bg-[#DBDBDB] w-full h-[2px] my-6'></div>

                        <div className='flex items-center justify-between pl-4 pr-10 py-3 rounded-md'>
                            <span className="text-lg font-medium text-[#7B7D92]">SETTINGS</span>
                            <AiOutlineSetting size={22} color='#7B7D92' />
                        </div>
                        <div className='flex items-center gap-x-2 px-2 py-3 rounded-md'>
                            <MdAdminPanelSettings color='#7B7D92' size={25} />
                            <span className="text-lg font-medium text-[#7B7D92]">Manage Admin</span>
                        </div>
                        {/* <div className='flex items-center gap-x-2 px-2 py-3 rounded-md my-4 mx-8'> */}
                        <div className="flex items-center gap-x-2 px-2 py-3 rounded-md">
                            <IoLogOut size={25} color='#7B7D92' />
                            <span className="text-lg font-medium text-[#7B7D92]">Logout</span>
                        </div>
                    </div>
                    
                </div>
            }
        </div>
    </>;
}