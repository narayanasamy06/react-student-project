import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { uid: string } },
) => {
  try {
    const id = parseInt(params.uid);
    console.log('uid is', params.uid);
    const response = await prisma.student.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ response });
  } catch (error:any) {
    console.error('Error deleting student:', error.message, error.stack); 
    return NextResponse.json(
      { message: 'Error deleting student', error: error.message },
      { status: 500 },
    );
  }
};
