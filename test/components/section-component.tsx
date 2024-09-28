import { FaUser } from 'react-icons/fa';

const SectionTitle = () => {
  return (
    <div className='w-[195px] hover:cursor-pointer'>
      <div className='flex items-center w-auto'>
        <FaUser className='text-customBlue mr-2' size={18} />
        <h3 className='text-customBlue font-semibold'>Personal Information</h3>
      </div>

      <div className='relative mt-1'>
        <div className=' w-full h-[3px] bg-customBlue'></div>
      </div>
    </div>
  );
};

export default SectionTitle;
