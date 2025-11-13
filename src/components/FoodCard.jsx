import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaRegClock } from 'react-icons/fa';

const FoodCard = ({ food, layout = 'grid' }) => {
  const {
    _id,
    food_name,
    food_image,
    donator_name,
    donator_image,
    food_quantity,
    pickup_location,
    expired_datetime,
  } = food;

  // --- NEW LINE ---
  // Create a new variable with the first letter capitalized
  const capitalizedFoodName = food_name ? food_name.charAt(0).toUpperCase() + food_name.slice(1) : '';

  // For list view
  if (layout === 'list') {
    return (
      <div className="card lg:card-side bg-base-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <figure className="lg:w-1/3">
          <img
            src={food_image}
            alt={food_name}
            className="w-full h-full object-contain bg-base-200" 
          />
        </figure>
        <div className="card-body lg:w-2/3">
          <div className="flex items-center space-x-3 mb-2">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={donator_image} alt={donator_name} />
              </div>
            </div>
            <div>
              <div className="font-bold">{donator_name}</div>
            </div>
          </div>
          
          {/* --- UPDATED --- */}
          <h2 className="card-title text-2xl">{capitalizedFoodName}</h2>
          
          <p className="font-semibold text-lg">Serves: {food_quantity} people</p>
          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt /> {pickup_location}
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaRegClock /> Expires: {new Date(expired_datetime).toLocaleDateString()}
          </div>
          <div className="card-actions justify-end mt-4">
            <Link to={`/food/${_id}`} className="btn btn-primary">
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // For grid view (default)
  return (
    <div className="card w-full bg-base-100 shadow-xl flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      {/* Image with "object-contain" */}
      <figure className="relative h-56 w-full bg-base-200">
        <img
          src={food_image}
          alt={food_name}
          className="object-contain w-full h-full"
        />
        {/* Quantity Badge */}
        <div className="badge badge-primary absolute top-4 right-4 p-3 font-bold">
          Serves: {food_quantity}
        </div>
      </figure>

      <div className="card-body flex-grow">
        {/* Donator Info */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={donator_image} alt={donator_name} />
            </div>
          </div>
          <div>
            <div className="font-bold">{donator_name}</div>
          </div>
        </div>

        {/* --- UPDATED --- */}
        <h2 className="card-title text-2xl h-16">{capitalizedFoodName}</h2>

        <div className="divider my-0"></div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" />
            <span className="font-semibold">Location:</span> {pickup_location}
          </div>
          <div className="flex items-center gap-2">
            <FaRegClock className="text-primary" />
            <span className="font-semibold">Expires:</span> {new Date(expired_datetime).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* View Details Button */}
      <div className="card-actions p-4 pt-0">
        <Link to={`/food/${_id}`} className="btn btn-primary w-full">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default FoodCard;