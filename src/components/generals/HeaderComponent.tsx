import React from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HeaderComponent() {
  return (
    <header className='py-3 px-5 flex items-center justify-between w-full border-b-2 border-gray-100'>
      <div className="flex items-center flex-row space-x-2">
        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/117982823?v=4" />
          <AvatarFallback>FF</AvatarFallback>
        </Avatar>
        <span>|</span>
        <button className='hover:underline font-semibold'>Menu</button>
      </div>
      <Button variant={"default"} className='hover:scale-95 transition-colors duration-200'>
        Me recruter
      </Button>
    </header>
  )
}
