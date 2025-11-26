"use server" 
import { createSessionClient, createAdminClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";


export const signIn = async () => {
    try{

    } catch(error){
        console.log('Error', error);
    }
}
export const signUp = async (userData: SignUpParams) => {
    const {firstName, lastName, email, password} = userData;
    try{
        const {account} = await createAdminClient();
        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`,
        );
        console.log('New User Account:', newUserAccount);
        const session = await account.createEmailPasswordSession(email,password);

        (await cookies()).set("appwrite-session",session.secret,{
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        })
        return parseStringify(newUserAccount);
    } catch(error){
        console.log('Error', error);
    }
}

export async function getLoggedInUser(){
    try{
        const { account } = await createSessionClient();
        return await  account.get();
    }   catch(error){
        return null;
    }
}