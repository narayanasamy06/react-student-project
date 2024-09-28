'use client';

import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { IoChevronBackSharp } from 'react-icons/io5';
import SectionTitle from '@/components/section-component';
import { Spacer } from '@nextui-org/spacer';
import Link from 'next/link';

interface CardWrapperProps {
  title: string;
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ title, children }) => {
  return (
    <Card shadow='none'>
      <Link href={'/student'}>
        <CardHeader className='flex text-[40px] font-semibold hover:cursor-pointer  '>
          <IoChevronBackSharp />
          <div>{title}</div>
        </CardHeader>
      </Link>
      <CardBody className='flex pt-5 pl-10'>
        <SectionTitle />
        <Spacer y={5} />
        {children}
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default CardWrapper;
