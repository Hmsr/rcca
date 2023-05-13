import {React,useState} from 'react';
import Header from '../Components/Header';
import FilterBar from '../Components/FilterBar';
import RecordsList from '../Components/RecordsList';
import SearchBar from '../Components/SearchBar';

export default function Main() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (value) => {
    setSearchValue(value);
  };
    return (
    <div>
        <Header />
        <SearchBar onSearch={handleSearch}/>
        <div className='flex justify-between px-12'>
          <div className="w-1/4" >
            <FilterBar/> 
          </div>
          <div className="w-3/4">
              <RecordsList  searchValue={searchValue}/>
          </div>
        </div>
    </div>
  );
}

