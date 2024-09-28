"use server";
import { NextRequest, NextResponse } from 'next/server';

import {prisma} from '@/lib/prisma'


export const GET = async (req: NextRequest) => {
  try {
    const students = await prisma.student.findMany();
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error('Error fetching students:', error);
    return NextResponse.json({ message: 'Error fetching students' }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    console.log('Received Data:', data);   
    const { firstName, lastName, contactNo, department, gender,email } = data;
    
    if (!firstName || !lastName || !contactNo || !department || !gender || !email) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    
    const newStudent = await prisma.student.create({
      data: {
        firstName:firstName,
        lastName:lastName,
        contact:contactNo,
        department:department,
        email:email,
        gender:gender
      },
    });
    
    console.log(newStudent);
    return NextResponse.json({ message: 'Student created', student: newStudent }, { status: 201 });
  } catch (error) {
    console.error('Error creating student:', error);
    return NextResponse.json({ message: 'Error creating student' }, { status: 500 });
  }
};
