import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function SearchBar() {
    return (
<div class="flex w-3/4">
   
        <div className="min-h-screen flex flex-col  items-center">
        <h1 className="text-5xl font-bold mb-8">RCCA archive</h1>
        <form className="flex items-center justify-center mt-8">
      <input
        type="text"
        placeholder="Search"
        className="border-2 border-gray-400 rounded-full py-2 px-80 mr-2 focus:outline-none focus:border-purple-500 text-lg w-1/2"
        />
      <button type="submit" className="bg-purple-500 text-white rounded-full py-2 px-4 hover:bg-purple-700">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </form>
        
                </div>
</div> 
  );
}

export default SearchBar;
