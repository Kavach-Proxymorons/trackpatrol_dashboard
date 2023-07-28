import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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
    const { screenSize, setScreenSize, activeMenu, setActiveMenu, isLogged } = useStateContext();

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(() => { return window.innerWidth; });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [screenSize]);


    useEffect(() => {
        if (window.localStorage.getItem('token') === null || window.localStorage.getItem('token') === undefined) {
            setActiveMenu(() => { return false; });
        }
        else if (screenSize >= 1200) setActiveMenu(() => { return true; });
        else setActiveMenu(() => { return false; });
    }, [screenSize]);


    return <>
        <div className={`md:overflow-hidden overflow-auto md:hover:overflow-auto fixed ${activeMenu ? 'shadow-xl w-60' : ''}`}>
            {activeMenu &&
                <div className='flex flex-col justify-between h-screen drop-shadow-md'>
                    <div className=''>
                        <Logo />
                        <div className='bg-[#DBDBDB] w-full h-[2px] my-6'></div>
                        <div className='flex flex-col gap-y-1 ml-6 mt-20 mr-6 '>
                            <NavLink to='/'>
                                <BiSolidDashboard size={25} />
                                <span >Dashboard</span>
                            </NavLink>

                            <NavLink to='/register/personnel'>
                                <HiUsers size={25} />
                                <span >Personnel</span>
                            </NavLink>
                            <NavLink to='/create/bandobast'>
                                <BsFillCarFrontFill size={25} />
                                <span >Bandobast</span>
                            </NavLink>
                            <NavLink to='/register/hardware'>
                                <HiMiniCpuChip size={25} />
                                <span >Hardware</span>
                            </NavLink>
                            <div className='bg-[#DBDBDB] w-full h-[2px] my-6'></div>

                            
                            <NavLink to='/manage/admin'>
                                <MdAdminPanelSettings size={25} />
                                <span>Admin</span>
                            </NavLink>

                        </div>
                    </div>
                    <div className=' ml-6 mr-6 mb-4'> 
                    <NavLink className='' to='/setting'>
                                <AiOutlineSetting size={25} />
                                <span >SETTINGS</span>
                            </NavLink>
                    <NavLink to='/logout'>
                        <IoLogOut size={25} />
                        <span>Logout</span>
                    </NavLink>
                    </div>
                </div>
            }
        </div>
    </>;
}