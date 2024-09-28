import React, { useState, useEffect } from 'react';
import CardWrapper from './card-wrapper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
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

const UpdateForm = ({ student }: { student: Student }) => {
  const [formState, setFormState] = useState<Student>(student);
  const router = useRouter();

  useEffect(() => {
    if (student) {
      setFormState(student);
    }
  }, [student]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/api/updateStudent/${student.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Get error message from the server if available
        toast.error(`Error: ${errorMessage || 'Something went wrong!'}`);
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      toast.success('Update successful!');
      console.log('Form submitted', result);

      // router.push('/student');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <CardWrapper title='Edit Student Details'>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex space-x-4'>
          <div className='flex-1'>
            <label className='block text-lg font-bold text-gray-700'>
              First Name*
              <input
                type='text'
                name='firstName'
                value={formState.firstName}
                onChange={handleChange}
                required
                className='mt-1 w-full h-14 border border-gray-300 rounded-md p-2 pl-4 text-base font-normal placeholder-gray-500'
                placeholder='Enter first name'
              />
            </label>
          </div>

          <div className='flex-1'>
            <label className='block text-lg font-bold text-gray-700'>
              Last Name*
              <input
                type='text'
                name='lastName'
                value={formState.lastName}
                onChange={handleChange}
                required
                className='mt-1 w-full h-14 border border-gray-300 rounded-md p-2 pl-4 text-base font-normal placeholder-gray-500'
                placeholder='Enter last name'
              />
            </label>
          </div>
        </div>

        <div className='flex space-x-4'>
          <div className='flex-1'>
            <label className='block text-lg font-bold text-gray-700'>
              Contact Number*
              <input
                type='text'
                name='contact'
                value={formState.contact}
                onChange={handleChange}
                required
                className='mt-1 w-full h-14 border border-gray-300 rounded-md p-2 pl-4 text-base font-normal placeholder-gray-500'
                placeholder='Enter contact number'
                maxLength={10}
              />
            </label>
          </div>

          <div className='flex-1'>
            <label className='block text-lg font-bold text-gray-700'>
              Department*
              <input
                type='text'
                name='department'
                value={formState.department}
                onChange={handleChange}
                required
                className='mt-1 w-full h-14 border border-gray-300 rounded-md p-2 pl-4 text-base font-normal placeholder-gray-500'
                placeholder='Enter department'
              />
            </label>
          </div>
        </div>
        <ToastContainer />
        <div className='flex space-x-4'>
          <div className='flex-1'>
            <label className='block text-lg font-bold text-gray-700'>
              Email*
              <input
                type='email'
                name='email'
                value={formState.email}
                onChange={handleChange}
                required
                className='mt-1 w-full h-14 border border-gray-300 rounded-md p-2 pl-4 text-base font-normal placeholder-gray-500'
                placeholder='Enter email'
              />
            </label>
          </div>

          <div className='flex-1'>
            <label className='block text-lg font-bold text-gray-700'>
              Gender*
              <select
                name='gender'
                value={formState.gender}
                onChange={handleChange}
                required
                className='mt-1 w-full h-14 border border-gray-300 rounded-md p-2 pl-4 text-base font-normal placeholder-gray-500'
              >
                <option value=''>Select Gender</option>
                <option value='MALE'>Male</option>
                <option value='FEMALE'>Female</option>
              </select>
            </label>
          </div>
        </div>

        <div className='flex justify-end gap-3'>
          <button
            type='button'
            className='flex items-center bg-white text-black font-semibold py-3 px-4 rounded'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='flex items-center bg-customBlue text-white font-semibold py-3 px-4 rounded-lg'
          >
            Submit
          </button>
        </div>
      </form>
    </CardWrapper>
  );
};

export default UpdateForm;
