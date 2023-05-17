import React from 'react';
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
const sortOptions = [
  { name: 'Recent uploads', href: '#', current: false },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function SearchBar({onSearch}) {
  const [searchValue, setSearchValue] = useState('');
  const handleInputChange = (event) => {
    var lowerCase = event.target.value.toLowerCase();
    setSearchValue(lowerCase);
  };
  const handleSearch = () => {
    onSearch(searchValue); 
  };
    return (
<div className=" mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-baseline justify-between border-b border-gray-200 ">
            <h1 className="w-1/10 text-4xl font-bold tracking-tight text-gray-900">RCCA Archive</h1>
            
        
        <form class="pb-3 pt-6 w-3/5 bg-white-200" onSubmit={(e) => {e.preventDefault();}}>   
                <label for="default-search" class="mb-2 text-sm font-medium text-white-900 sr-only dark:text-white">Search</label>
                <div class="relative ">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                     <svg aria-hidden="true" class="w-5 h-5 text-white-500 dark:text-white-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
            <input type="text" id="default-search" class="block w-full p-4 pl-10 text-sm text-white-900 border border-white-300 rounded-lg bg-white-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-700 dark:border-white-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rover 75 CDTi Diesel"
              value={searchValue} onChange={handleInputChange}
              required/>
                    <button onClick={handleSearch} type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>              
            
        
        
        
          </div>
  );
}

export default SearchBar;
