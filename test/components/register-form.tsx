'use client';

import { useState, useRef } from 'react';
import { z, ZodError } from 'zod';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import CardWrapper from './card-wrapper';
import { formSchema } from '@/schemas/formSchema';

interface FormError {
  isError: boolean;
  message: string[];
}

type formType = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const [formError, setFormError] = useState<FormError>({
    isError: false,
    message: [],
  });

  const formRef = useRef<HTMLFormElement>(null); 

 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const validatedFields = formSchema.parse(formValues);
      console.log(validatedFields);
      setFormError({
        isError: false,
        message: [],
      });

      const response = await fetch('/api/createStudent', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(validatedFields),
      });

      if (!response.ok) {
        throw new Error(response.statusText || 'Failed to create record');
      }

      toast.success('Student registered successfully!');

    
      formRef.current?.reset();
    } catch (err) {
      if (err instanceof ZodError) {
        console.log(err.message);
        setFormError({
          isError: true,
          message: err.errors.map((error) => error.message),
        });
      } else {
        console.error('Error:', err);
        setFormError({
          isError: true,
          message: ['An error occurred while registering the student.'],
        });
      }
    }
  };

  return (
    <CardWrapper title='Register New Student'>
      <form onSubmit={handleSubmit} ref={formRef} className='space-y-4'> 
        <div className='flex space-x-4'>
          <div className='flex-1'>
            <label className='block text-lg font-bold text-gray-700'>
              First Name*
              <input
                type='text'
                name='firstName'
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
                name='contactNo'
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
                required
                className='mt-1 w-full h-14 border border-gray-300 rounded-md p-2 pl-4 text-base font-normal placeholder-gray-500'
                placeholder='Enter department'
              />
            </label>
          </div>
        </div>

        <div className='flex space-x-4'>
          <div className='flex-1'>
            <label className='block text-lg font-bold text-gray-700'>
              Email*
              <input
                type='email'
                name='email'
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

        {formError.isError && (
          <div className='text-red-600'>
            {formError.message.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
        )}

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

     
      <ToastContainer />
    </CardWrapper>
  );
};

export default RegisterForm;
