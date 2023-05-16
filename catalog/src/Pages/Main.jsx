import {React,useState} from 'react';
import Header from '../Components/Header';
import FilterBar from '../Components/FilterBar';
import RecordsList from '../Components/RecordsList';
import SearchBar from '../Components/SearchBar';

export default function Main() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleSearch = (value) => {
    setSearchValue(value);
  };
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

    return (
    <div>
        <Header />
        <SearchBar onSearch={handleSearch}/>
        <div className='flex justify-between px-12'>
          <div className="w-1/4" >
            <FilterBar onFilterChange={handleFilterChange}/> 
          </div>
          <div className="w-3/4">
              <RecordsList  searchValue={searchValue} filter={selectedFilter}/>
          </div>
        </div>
    </div>
  );
}

