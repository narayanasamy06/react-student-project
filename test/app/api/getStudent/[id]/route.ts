import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req:NextRequest,{params}:{params:{id:string}})=>{
    const {id} = params;
    const intId = parseInt(id);
    try {
        const data  =await prisma.student.findFirst({where:{
            id:intId,
        }});
        console.log(data);
      return  NextResponse.json(data,{status:200});
    } catch (error) {
      return  NextResponse.json({message:"Failed"},{status:500});
    }
}