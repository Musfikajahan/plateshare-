import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../api/axiosPublic';
import FoodCard from '../components/FoodCard';
import { FaSearch, FaList, FaTh } from 'react-icons/fa';

const AvailableFoods = () => {
  const axiosPublic = useAxiosPublic();
  const [layout, setLayout] = useState('grid'); 
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');

 
  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search.value;
    setSearch(searchText);
  };

  
  const { data: foods = [], isLoading, error } = useQuery({
    
    queryKey: ['availableFoods', sort, search],
    queryFn: async () => {
     
      const res = await axiosPublic.get(`/foods?sort=${sort}&search=${search}`);
      return res.data;
    },
  });

  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-340px)]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

 
  if (error) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold text-red-600">Error: {error.message}</h1>
      </div>
    );
  }

  
  return (
    <div className="bg-base-200">
      
    
      <div className="hero min-h-[400px]" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg">
            
           
            <h1 
              className="mb-5 text-6xl font-extrabold text-white" 
              style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
            >
              Find Your Share
            </h1>
            
            <p className="mb-5 text-xl text-gray-200">
              Browse all available food items shared by our community. Find what you need and help reduce food waste.
            </p>
          </div>
        </div>
      </div>

<div className="container mx-auto p-4 md:p-10">
 
  <div className="navbar bg-neutral text-neutral-content rounded-lg shadow-lg mb-8 p-4 flex-col lg:flex-row gap-4">

    
    <div className="flex-1 w-full lg:w-auto">
      <form onSubmit={handleSearch} className="w-full">
        <div className="form-control">
          
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Search by food name..."
              className="input input-bordered input-primary w-full pl-10 bg-base-100 text-base-content" // pl-10 to make space for icon
            />
          
            <button 
              type="submit" 
              className="btn btn-ghost btn-circle absolute top-0 left-0"
              aria-label="Search"
            >
              <FaSearch className="text-lg text-gray-500" />
            </button>
          </div>
        </div>
      </form>
    </div>


    <div className="flex-none flex flex-col md:flex-row gap-4 w-full lg:w-auto">

    
      <div className="form-control w-full lg:w-56">
        <div className="relative">
     
          <select
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered w-full pl-10 bg-base-100 text-base-content" // pl-10 for icon
            value={sort}
          >
            <option value="">Sort By</option>
            <option value="expiry_date">Expiry Date (Soonest)</option>
          </select>
        
          <div className="absolute top-0 left-0 h-full flex items-center justify-center w-12 pointer-events-none">
         
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
          </div>
        </div>
      </div>

   
      <div className="flex-none">
        
        <div className="btn-group shadow-md">
          <button
            onClick={() => setLayout('grid')}
            className={`btn ${layout === 'grid' ? 'btn-primary' : 'btn-ghost'}`}
            aria-label="Grid View"
          >
            <FaTh className="text-lg" />
          </button>
          <button
            onClick={() => setLayout('list')}
            className={`btn ${layout === 'list' ? 'btn-primary' : 'btn-ghost'}`}
            aria-label="List View"
          >
            <FaList className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  </div>

  
        <div
          className={`grid ${
            layout === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
          } gap-6`}
        >
          {foods.map((foodItem) => (
            <FoodCard key={foodItem._id} food={foodItem} layout={layout} />
          ))}
        </div>

       
        {foods.length === 0 && (
          <div className="text-center p-10 col-span-full">
            <h2 className="text-2xl font-semibold">No food found.</h2>
            <p>Try changing your search terms or check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableFoods;
