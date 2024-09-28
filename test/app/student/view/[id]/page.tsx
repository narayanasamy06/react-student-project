'use client';

import React, { useEffect, useState } from 'react';
import CardWrapper from '@/components/card-wrapper';
import { URL } from '@/lib/links';
interface Student {
  id: number;
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  gender: 'MALE' | 'FEMALE';
  department: string;
}

const ViewPage = ({ params }: { params: { id: string } }) => {
  const [studentData, setStudentData] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`${URL}/api/getStudent/${params.id}`);
        const data = await response.json();
        setStudentData(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudentData();
  }, [params.id]);

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <CardWrapper title='View Student Details'>
      <form className='space-y-4'>
        <div className='flex space-x-4'>
          <div className='flex-1'>
            <label className='block text-lg font-bold text-gray-700'>
              First Name
              <input
                type='text'
                name='firstName'
                value={studentData.firstName}
                readOnly
                className='mt-1 w-full h-14 border-b border-gray-300 rounded-none p-2 text-base font-normal placeholder-gray-500'
              />
            </label>
          </div>

          <div className='flex-1'>
            <label className='block text-lg font-bold text-gray-700'>
              Last Name
              <input
                type='text'
                name='lastName'
                value={studentData.lastName}
                readOnly
                className='mt-1 w-full h-14 border-b border-gray-300 rounded-none p-2 text-base font-normal placeholder-gray-500'
              />
            </label>
          </div>
        </div>

        <div className='flex space-x-4'>
          <div className='flex-1'>
            <label className='block text-lg font-bold text-gray-700'>
              Contact Number
              <input
                type='text'
                name='contact'
                value={studentData.contact}
                readOnly
                className='mt-1 w-full h-14 border-b border-gray-300 rounded-none p-2 text-base font-normal placeholder-gray-500'
              />
            </label>
          </div>

          <div className='flex-1'>
            <label className='block text-lg font-bold text-gray-700'>
              Department
              <input
                type='text'
                name='department'
                value={studentData.department}
                readOnly
                className='mt-1 w-full h-14 border-b border-gray-300 rounded-none p-2 text-base font-normal placeholder-gray-500'
              />
            </label>
          </div>
        </div>

        <div className='flex space-x-4'>
          <div className='flex-1'>
            <label className='block text-lg font-bold text-gray-700'>
              Email
              <input
                type='email'
                name='email'
                value={studentData.email}
                readOnly
                className='mt-1 w-full h-14 border-b border-gray-300 rounded-none p-2 text-base font-normal placeholder-gray-500'
              />
            </label>
          </div>

          <div className='flex-1'>
            <label className='block text-lg font-bold text-gray-700'>
              Gender
              <select
                name='gender'
                value={studentData.gender}
              
                className='mt-1 w-full h-14 border-b border-gray-300 rounded-none p-2 text-base font-normal placeholder-gray-500'
                disabled
              >
                <option value='MALE'>Male</option>
                <option value='FEMALE'>Female</option>
              </select>
            </label>
          </div>
        </div>
      </form>
    </CardWrapper>
  );
};

export default ViewPage;
