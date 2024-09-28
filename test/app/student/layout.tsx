import { CiSettings, CiBellOn } from 'react-icons/ci';
import { RxAvatar } from 'react-icons/rx';

import {
  TbLayoutDashboardFilled,
  TbUsers,
  TbCalendar,
  TbMessageCircle,
} from 'react-icons/tb';
import { Divider } from '@nextui-org/divider';
import { Spacer } from '@nextui-org/spacer';
import Link from 'next/link';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex w-full h-[800px]'>
      <div className='w-[25%] h-full bg-lightWhite flex flex-col'>
        <div className='w-full h-20'>
          <h3 className='text-customBlue text-center text-2xl mt-5 font-bold'>
            STUDENT PORTAL
          </h3>
          <Spacer y={9} />
          <Divider />
        </div>

        <div className='w-full flex flex-col gap-2 mt-8'>
          <Link href={'/student'}>
            <div
              className='pl-10 flex items-center gap-3 hover:bg-customBlue
                      transition duration-200 rounded-r-full w-[90%] p-2 group'
            >
              <TbLayoutDashboardFilled
                className='text-gray-500 transition duration-200 group-hover:text-white'
                size={24}
              />

              <h3 className='text-lg font-semibold text-gray-500 group-hover:text-white'>
                Dashboard
              </h3>
            </div>
          </Link>

          <div className='pl-10 flex items-center gap-3 hover:bg-customBlue transition duration-200 rounded-r-full w-[90%] p-2 group'>
            <TbUsers
              className='text-gray-500 transition duration-200 group-hover:text-white'
              size={24}
            />
            <h3 className='text-lg font-semibold text-gray-500 group-hover:text-white'>
              Student
            </h3>
          </div>

          <div className='pl-10 flex items-center gap-3 hover:bg-customBlue transition duration-200 rounded-r-full w-[90%] p-2 group'>
            <TbCalendar
              className='text-gray-500 transition duration-200 group-hover:text-white'
              size={24}
            />
            <h3 className='text-lg font-semibold text-gray-500 group-hover:text-white'>
              Calendar
            </h3>
          </div>

          <div className='pl-10 flex items-center gap-3 hover:bg-customBlue transition duration-200 rounded-r-full w-[90%] p-2 group'>
            <TbMessageCircle
              className='text-gray-500 transition duration-200 group-hover:text-white'
              size={24}
            />
            <h3 className='text-lg font-semibold text-gray-500 group-hover:text-white'>
              Messages
            </h3>
          </div>
        </div>
      </div>

      <div>
        <Divider orientation='vertical' />
      </div>

      <div className='w-full flex flex-col h-full bg-white'>
        <div>
          <div className='w-full h-20 flex justify-end items-center'>
            {/* Icons */}

            <div className='flex items-center gap-3 mr-8'>
              <div className='w-10 h-10 rounded-full bg-customGray flex items-center justify-center hover:bg-gray-500 transition duration-200'>
                <CiSettings
                  size={22}
                  className='text-black hover:text-white cursor-pointer transition duration-200'
                />
              </div>
              <div className='w-10 h-10 rounded-full bg-customGray flex items-center justify-center hover:bg-gray-500 transition duration-200'>
                <CiBellOn
                  size={22}
                  className='text-black hover:text-white cursor-pointer transition duration-200'
                />
              </div>
              <div className='w-10 h-10 rounded-full bg-customGray flex items-center justify-center hover:bg-gray-500 transition duration-200'>
                <RxAvatar
                  size={22}
                  className='text-black hover:text-white cursor-pointer transition duration-200'
                />
              </div>
            </div>
          </div>
          <Spacer y={2} />
          <Divider />
        </div>
        <div className='p-5 pt-8'>{children}</div>
      </div>
    </section>
  );
}
