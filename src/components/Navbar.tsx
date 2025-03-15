'use client'
import { useSession,signOut } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { User} from "next-auth"
import { Button } from './ui/button'


function Navbar() {
    const {data: session} = useSession()
    const user: User = session?.user as User

  return (

      <nav className='p-4 md:p-6 shadow-md'>
        <div>
          <a href="#">Message</a>
            {
                session ? (
                <>
                    <span>Welcome,{user.username || user.email}</span>
                    <Button onClick={() => signOut()}>Logout</Button>
                </>
                ) : (
                    <Link href='/signin'>
                      <Button>Login</Button>
                    </Link>
                )
            }
        </div>
      </nav>
  )
}

export default Navbar
