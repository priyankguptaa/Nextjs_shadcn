'use client'
import { toast } from 'sonner'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z  from 'zod'
import { verifySchema } from '@/schemas/verifySchema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Form, FormControl , FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'



export default function verifyAccount() {
    const router = useRouter()
    const params = useParams<{username:string}>()
    
    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),
    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        try {
            const response  = await axios.post(`/api/verify-code`,{
                username : params.username, 
                code: data.code
            })
            toast("Success",{
                description:response.data.message
            })
            router.replace('/sign-in')
        } catch (error) {
            console.error("Error in signup of user",error)
            const axiosError = error as AxiosError<ApiResponse>;
            toast('verifycode failed',{
                description: axiosError.response?.data.message,
            })
        }
    }

  return (
    <div className='flex justify-center items-cnter min-h-screen'>
        <div className='w-full bg-white rounded-lg p-8 space-y-8'>
            <div className='text-center'>
                <h1> Verify your account</h1>
                <p>Enter the verification code sent to your email</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
                className="space-y-6">
                    <FormField
                    name="code"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>code</FormLabel>
                        <FormControl>
                            <Input placeholder="code"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    /> 
                    <Button type="submit" >
                        submit
                    </Button>
                </form>
            </Form>  
        </div>
    </div>
  )
}


