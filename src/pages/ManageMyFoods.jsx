import React from 'react';
// --- FIX: Removed duplicate imports ---
import { FaEdit, FaTrashAlt, FaPlus, FaBoxOpen, FaCheckCircle } from 'react-icons/fa';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../api/axiosPublic';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion'; 

const ManageMyFoods = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

 
  const { data: myFoods = [], isLoading } = useQuery({
    queryKey: ['myFoods', user?.email], 
    queryFn: async () => {
      const res = await axiosPublic.get(`/my-foods/${user.email}`);
      return res.data;
    },
 
    enabled: !!user?.email,
  });

  
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/food/${id}`);
          if (res.data.deletedCount > 0) {
            
            queryClient.invalidateQueries({ queryKey: ['myFoods'] });
            Swal.fire("Deleted!", "Your food item has been deleted.", "success");
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

 
  const handleDeliver = (id) => {
    Swal.fire({
      title: "Mark as Delivered?",
      text: "This will confirm the food has been delivered to the requester.",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, it's delivered!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.patch(`/food/deliver/${id}`);
          if (res.data.message) {
            
            queryClient.invalidateQueries({ queryKey: ['myFoods'] });
            Swal.fire("Success!", "Food marked as delivered.", "success");
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-340px)]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-base-200 min-h-[calc(100vh-340px)]">

      
      <div className="hero h-64" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2070)' }}>
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <motion.div
            className="max-w-md"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="mb-5 text-5xl font-bold">Manage My Foods</h1>
            <p className="mb-5 text-lg">You have added <span className="font-extrabold text-primary">{myFoods.length}</span> item(s). Here you can update or delete your listings.</p>
          </motion.div>
        </div>
      </div>

    
      <div className="container mx-auto p-4 md:p-10">
        {myFoods.length === 0 ? (

     
          <motion.div
            className="text-center p-10 bg-base-100 shadow-xl rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaBoxOpen className="text-8xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No Food Added Yet</h2>
            <p className="text-gray-600 mb-6">It looks like you haven't shared any food. Let's add one!</p>
            <Link to="/add-food" className="btn btn-primary animate-pulse">
              <FaPlus className="mr-2" />
              Add Your First Food
            </Link>
          </motion.div>

        ) : (

       
          <motion.div
           
            className="overflow-x-auto bg-base-100 shadow-xl rounded-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <table className="table table-zebra w-full">
              
              <thead className="bg-neutral text-neutral-content text-sm uppercase">
                <tr>
                  <th>Food Name</th>
                  <th>Servings</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myFoods.map((food) => (
                  <tr key={food._id} className="hover">
                    <td>
                      
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={food.food_image} alt={food.food_name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{food.food_name}</div>
                          <div className="text-sm opacity-50">{food.pickup_location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="font-semibold">{food.food_quantity}</td>
                    <td>
                
                      <span className={`badge ${food.food_status === 'available' ? 'badge-success' :
                        food.food_status === 'requested' ? 'badge-warning' : 'badge-ghost text-gray-500'
                        }`}>
                        {food.food_status}
                      </span>
                    </td>

                    
                    <td className="text-center">
                      {food.food_status === 'available' && (
                       
                        <div className="flex justify-center gap-2">
                          <div className="tooltip" data-tip="Edit">
                            <Link to={`/update-food/${food._id}`} className="btn btn-ghost btn-sm text-blue-600">
                              <FaEdit className="text-lg" />
                            </Link>
                          </div>
                          <div className="tooltip" data-tip="Delete">
                            <button onClick={() => handleDelete(food._id)} className="btn btn-ghost btn-sm text-red-600">
                              <FaTrashAlt className="text-lg" />
                            </button>
                          </div>
                        </div>
                      )}

                      {food.food_status === 'requested' && (
                       
                        <div className="tooltip" data-tip="Mark as Delivered">
                          <button onClick={() => handleDeliver(food._id)} className="btn btn-ghost btn-sm text-success">
                            <FaCheckCircle className="text-lg" />
                          </button>
                        </div>
                      )}

                      {food.food_status === 'delivered' && (
                     
                        <span className="font-bold text-success">Delivered</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ManageMyFoods;