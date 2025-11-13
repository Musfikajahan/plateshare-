import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion'; 
import useAxiosPublic from '../api/axiosPublic';
import FoodCard from '../components/FoodCard';
import { FaHandHoldingHeart, FaSearch, FaUsers } from 'react-icons/fa';

const Home = () => {
  const axiosPublic = useAxiosPublic();

  
  const { data: featuredFoods = [], isLoading } = useQuery({
    queryKey: ['featuredFoods'],
    queryFn: async () => {
      const res = await axiosPublic.get('/featured-foods');
      return res.data;
    },
  });

  return (
    <div className="bg-base-100">

     
      <div className="hero min-h-[calc(100vh-100px)]" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=2070)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <motion.div
            className="max-w-md"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-5 text-5xl font-bold">Share More, Waste Less</h1>
            <p className="mb-5 text-lg">Join our community to share surplus food and fight hunger. Every plate you share makes a difference.</p>
            <Link to="/available-foods" className="btn btn-primary">See Available Foods</Link>
          </motion.div>
        </div>
      </div>


      <div className="container mx-auto py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">Featured Foods</h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            Check out the largest donations currently available from our generous community.
          </p>
        </motion.div>

       
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredFoods.map((foodItem) => (
            <motion.div
              key={foodItem._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <FoodCard food={foodItem} />
            </motion.div>
          ))}
        </div>

        
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Link to="/available-foods" className="btn btn-primary btn-wide">
            Show All Foods
          </Link>
        </motion.div>
      </div>

      
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <motion.div
              className="card bg-base-100 shadow-xl p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <FaHandHoldingHeart className="text-6xl text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">1. Add Your Food</h3>
              <p>Have surplus food? Post it in seconds. Add details, quantity, and a pickup location.</p>
            </motion.div>
           
            <motion.div
              className="card bg-base-100 shadow-xl p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <FaSearch className="text-6xl text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">2. Find What You Need</h3>
              <p>Browse available listings, search for specific items, and sort by what's expiring soonest.</p>
            </motion.div>
          
            <motion.div
              className="card bg-base-100 shadow-xl p-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <FaUsers className="text-6xl text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">3. Share with Community</h3>
              <p>Request food you need. Donators can manage requests and share with those in their area.</p>
            </motion.div>
          </div>
        </div>
      </div>

    
      <div className="hero min-h-[400px] bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          <motion.img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649414?q=80&w=2070"
            className="max-w-sm rounded-lg shadow-2xl"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="max-w-lg"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold">Our Mission</h2>
            <p className="py-6">We believe that no good food should go to waste, especially when there are people in our community who need it. PlateShare connects neighbors to help neighbors, building a stronger, more sustainable, and more caring community for everyone.</p>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default Home;