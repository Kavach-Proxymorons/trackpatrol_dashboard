import { useStateContext } from '../Contexts/ContextProvider';
import { HiCalendar } from 'react-icons/hi';
import { HiEnvelope, HiChevronDown } from 'react-icons/hi2';

export default function Navbar() {
    const { activeMenu, name } = useStateContext();
    return <>
        <div className='w-full'>
            <div className='h-[100px] flex justify-between items-center ml-8'>
                <p className='text-xl text-neutral-900'>
                    Hello <span className='font-medium'>Admin</span>, Welcome back!
                </p>
                <div className='flex items-center gap-x-8 drop-shadow-md mr-6'>
                    <HiCalendar size={28} color='#7B7D92' />
                    <HiEnvelope size={29} color='#7B7D92' className='mr-8' />
                    <div className='flex gap-x-4 items-center bg-[#F4F6FA] py-2 px-6 rounded-lg '>
                        <div className='flex flex-col items-end'>
                            <span className='text-lg font-medium text-neutral-900'> {name} </span>
                            <span className='mt-[-2px] text-sm text-[#7B7D92]'> UP, INDIA </span>
                        </div>
                        <div className='w-11 h-11 rounded-full bg-emerald-600'></div>
                        <HiChevronDown size={28} color='#000' />
                    </div>
                </div>
            </div>
            <div className='bg-[#DBDBDB] h-[2px] drop-shadow-md'></div>
        </div>
    </>;
}