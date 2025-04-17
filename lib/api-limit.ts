import { auth } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";

import { Max_FREE_COUNTS } from "@/constance";

export const creatApiLimit = async () => {
    const { userId } = await auth();

    if(!userId){
        return null;
    }

    const userApiLimit = await prismadb.userAPILimit.findUnique({
        where:{
            userId
        }
    });

    if(userApiLimit){
        await prismadb.userAPILimit.update({
            where:{
                userId: userId
            },
            data:{
                count: userApiLimit.count + 1
            }
        });
    }else{
        await prismadb.userAPILimit.create({
            data:{
                userId,
                count: 1
            }
        });
    }
}

export const checkApiLimit = async () => { 
    const { userId } = await auth();

    if(!userId){
        return false;
    }

    const userApiLimit = await prismadb.userAPILimit.findUnique({
        where:{
            userId: userId
        }
    });

    if(!userApiLimit || userApiLimit.count < Max_FREE_COUNTS){
        return true;
    }else{
        return false;
    }
}