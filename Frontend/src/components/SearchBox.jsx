import React from 'react'
import { Input } from './ui/input'

export default function SearchBox() {
  return (
    <>
    <form action="">
        <Input placeholder="search here...." className="font-roboto font-medium h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50" />
    </form>
    </>
  )
}