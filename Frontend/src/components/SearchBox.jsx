import React from 'react'
import { Input } from './ui/input'
import { useNavigate } from 'react-router-dom';
import { RouteSearch } from '@/helpers/RouteName';
import { useState } from 'react';

export default function SearchBox() {

  const navigate = useNavigate();

  const [query, setQuery] = useState();

  const getInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(RouteSearch(query));
  };
  
  return (
    <>
    <form onSubmit={handleSubmit}>
        <Input onInput={getInput} name="q" placeholder="search here...." className="font-roboto font-medium h-10 rounded-lg focus-visible:ring-darkRed focus:outline-none bg-gray-50" />
    </form>
    </>
  )
}