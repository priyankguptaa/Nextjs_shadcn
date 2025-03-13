'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z  from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceCallback } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader, Loader2 } from 'lucide-react';


function page() {
  const [username,setUsername]= useState('')
  const [usernameMessage,setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const debounced= useDebounceCallback(setUsername, 300)
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues:{
      username:'',
      email:'',
      password:''
    }
  })
  useEffect(()=>{
    const checkUsernameUnique = async()=>{
      if(username){
        setIsCheckingUsername(true)
        setUsernameMessage("")
        try {
          const response = await axios.get(`/api/check-username-unique?username=${username}`)
          // console.log (response)
          // let message = response.data.message
          // setUsernameMessage(message)
          setUsernameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message?? "Error checking username"
          )
        }
        finally{
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsernameUnique()
  },[username])

  const onSubmit = async (data:z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('/api/signup', data)
      toast("Success",{
        description: response.data.message
      })
      router.replace(`verify/${username}`)
      setIsSubmitting(false)

    } catch (error) {
        console.error("Error in signup of user",error)
        const axiosError = error as AxiosError<ApiResponse>;
        let errorMessage = axiosError.response?.data.message
        toast('signupfailed',{
          description: errorMessage,
        })
        setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md py-8 space-y-8 bg-white rounded-lg">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-light">Join Mystery Message</h1>
          <p>Signup for adventure message</p>
        </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} 
            className="space-y-6">
              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="username"
                        {...field} 
                        onChange = {(e)=> {
                          field.onChange(e)
                              debounced(e.target.value)
                        }}
                        />
                    </FormControl>
                       {isCheckingUsername && <Loader2 className="animate-spin"/>}
                       <p className={`text-sm ${usernameMessage === "username is unique"? "text-green-500" : "text-red-500" }`}>test:{usernameMessage}</p>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input placeholder="email"
                        {...field}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="password"
                        {...field} 
                        onChange = {(e)=> {
                          field.onChange(e)
                          setUsername(e.target.value)
                        }}
                       />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> 
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please wait
                  </>
                ) : ("signup")}
              </Button>
            </form>
        </Form>  
        <div>
          <p>
            Already a member?
            <Link href="/signin" className="text-blue-600 hover:text-blue-800">
                Signin
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default page
