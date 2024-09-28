'use client';

import React, { useEffect, useState } from 'react';
import { FaEye, FaRegEdit, FaTrashAlt, FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { CiCirclePlus } from 'react-icons/ci';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

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

const columns = [
  'FIRST NAME',
  'LAST NAME',
  'DEPARTMENT',
  'EMAIL',
  'CONTACT',
  'GENDER',
  'ACTIONS',
];

export default function StudentTable() {
  const [studentsData, setStudentsData] = useState<Student[]>([]);
  const [filteredData, setFilteredData] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('/api/createStudent');
        const data = await response.json();
        setStudentsData(data);
        setFilteredData(data);
        setIsLoading(false);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async () => {
    if (studentToDelete !== null) {
      try {
        await fetch(`/api/createStudent/${studentToDelete}`, {
          method: 'DELETE',
        });
        setStudentsData((prevStudents) =>
          prevStudents.filter((i) => i.id !== studentToDelete),
        );
        setFilteredData((prevFiltered) =>
          prevFiltered.filter((i) => i.id !== studentToDelete),
        );
      } catch (error) {
        console.error(error);
      }
      setModalOpen(false);
      setStudentToDelete(null);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setFilteredData(studentsData);
    } else {
      const filtered = studentsData.filter(
        (student) =>
          `${student.firstName} ${student.lastName}`
            .toLowerCase()
            .includes(query) ||
          student.email.toLowerCase().includes(query) ||
          student.department.toLowerCase().includes(query) ||
          student.contact.includes(query),
      );
      setFilteredData(filtered);
    }
  };

  return (
    <section className='container mx-auto p-4 flex flex-col'>
      <div className='flex justify-between items-center py-4'>
        <div className='text-4xl font-bold'>Student</div>
        <div className='flex items-center space-x-4'>
          <div className='relative'>
            <input
              type='search'
              value={searchQuery}
              onChange={handleSearch}
              placeholder='Search students'
              className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customBlue'
            />
            <FaSearch className='absolute left-3 top-3 text-gray-500' />
          </div>
          <Link href={'/student/register'}>
            <div className='flex justify-between items-center gap-2 bg-customBlue text-white py-2 px-4 rounded-lg hover:bg-blue-600'>
              <CiCirclePlus size={25} className='font-bold' />
              <button>Add New Student</button>
            </div>
          </Link>
        </div>
      </div>

      <table className='min-w-full rounded-lg border-collapse border border-gray-300'>
        <thead>
          <tr className='bg-gray-200'>
            {columns.map((col, idx) => (
              <th key={idx} className='px-4 py-2 text-left'>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className='text-center px-4 py-2'>
                Loading...
              </td>
            </tr>
          ) : filteredData.length > 0 ? (
            filteredData.map((student) => (
              <tr key={student.id} className='even:bg-gray-100'>
                <td className='px-4 py-2'>{student.firstName}</td>
                <td className='px-4 py-2'>{student.lastName}</td>
                <td className='px-4 py-2'>{student.department}</td>
                <td className='px-4 py-2'>{student.email}</td>
                <td className='px-4 py-2'>{student.contact}</td>
                <td className='px-4 py-2'>{student.gender}</td>
                <td className='px-4 py-2 flex space-x-2'>
                  <Link
                    href={`/student/view/${student.id}`}
                    className='text-blue-500 hover:text-blue-700'
                  >
                    <FaEye />
                  </Link>
                  <Link href={`/student/update/${student.id}`}>
                    <FaRegEdit />
                  </Link>
                  <button
                    className='text-red-500 hover:text-red-700'
                    onClick={() => {
                      setStudentToDelete(student.id);
                      setModalOpen(true);
                    }}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className='text-center px-4 py-2'>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        center
        styles={{
          modal: {
            borderRadius: '12px',
          },
        }}
      >
        <h2 className='text-lg font-semibold'>Confirm Deletion</h2>
        <p>Are you sure you want to delete this student?</p>
        <div className='flex justify-between mt-4'>
          <button
            className='flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
            onClick={handleDelete}
          >
            <FaTrashAlt className='mr-2' /> Delete
          </button>
          <button
            className='flex items-center bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400'
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </section>
  );
}
