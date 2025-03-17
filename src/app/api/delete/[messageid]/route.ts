import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";


export async function DELETE(request:Request, {params}:{params:{messageid:string}}){
    const messageId = params.messageid
    await dbConnect()
    const session = await getServerSession(authOptions)
    const user:User =  session?.user as User

    if(!session || session.user){
        return Response.json(
            {
                success:false,
                message:'not aunthenicated'
            },{status:401}
        )
    }
    try {
        const updateResult = await UserModel.updateOne(
            {_id: user._id},
            {$pull: {messages:{_id:messageId}}}
        )
        if(updateResult.modifiedCount == 0){
            return Response.json(
                {
                    success:false,
                    message:'Message not found or already deleted'
                },{status:404}
            )   
        }
        return Response.json(
            {
                success:true,
                message:'Message deleted'
            },{status:404}
        )   
    } catch (error) {
        console.log("Error is deleting route", error)
        return Response.json(
            {
                success:false,
                message:'Error deleting message '
            },{status:500}
        )   
    }
   
}