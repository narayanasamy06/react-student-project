import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const intId = parseInt(params.id);

  try {
    const data = await req.json();

    const studentData = await prisma.student.update({
      where: {
        id: intId,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        contact: data.contact,
        gender: data.gender,
        department: data.department,
      },
    });

    return NextResponse.json(studentData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to update student' },
      { status: 500 },
    );
  }
};
