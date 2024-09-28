'use client';
import UpdateForm from '@/components/update-form';
import { useEffect, useState } from 'react';
import {URL} from '@/lib/links'
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

const UpdatePage = ({ params }: { params: { id: string } }) => {
  
  const [studentData, setStudentData] = useState<Student | null>(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/api/getStudent/${params.id}`);
        const data = await response.json();
        setStudentData(data);
      } catch (err: any) {
        console.log(err.message, err.stack);
      }
    };
    fetchData();
  }, [params.id]); 

  return (
    <div>
      {studentData ? (
        <UpdateForm student={studentData} />
      ) : (
        <p>Loading...</p> 
      )}
    </div>
  );
};

export default UpdatePage;
