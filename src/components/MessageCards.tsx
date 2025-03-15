'use client'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { Message } from '@/model/User'
import { toast } from 'sonner'
import { ApiResponse } from '@/types/ApiResponse'
import axios from 'axios'
  
type MessageCardsProps ={
    message: Message;
    onMessageDelete:(messageId: string) => void
}

function MessageCards({message, onMessageDelete}:MessageCardsProps) {
    const handleDeleteConfirm = async()=>{
    const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
        toast(response.data.message,{
            description:response.data.message
        })
        
    }
  return (
    <Card>
        <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="destructive">X</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Card Content</p>
        </CardContent>
        <CardFooter>
            <p>Card Footer</p>
        </CardFooter>
    </Card>

  )
}

export default MessageCards
