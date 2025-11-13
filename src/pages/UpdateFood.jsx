import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../api/axiosPublic';

const UpdateFood = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();


  const { data: food, isLoading } = useQuery({
    queryKey: ['food', id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/food/${id}`);
      return res.data;
    },
  });


  useEffect(() => {
    if (food) {
      reset({
        food_name: food.food_name,
        food_image: food.food_image,
        food_quantity: food.food_quantity,
        pickup_location: food.pickup_location,
       
        expired_datetime: new Date(food.expired_datetime).toISOString().split('T')[0],
        additional_notes: food.additional_notes,
      });
    }
  }, [food, reset]);


  const onSubmit = async (data) => {
    const updatedFoodItem = {
      ...data,
      food_quantity: parseInt(data.food_quantity), 
    };

    try {
      const res = await axiosPublic.put(`/food/${id}`, updatedFoodItem);
      if (res.data.modifiedCount > 0) {
        toast.success('Food item updated successfully!');
        navigate('/manage-my-foods');
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-340px)]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-10 bg-base-200">
      <h1 className="text-3xl font-bold text-center mb-8">Update Food Item</h1>
    
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg space-y-4"
      >
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text">Food Name*</span></label>
            <input
              type="text"
              {...register('food_name', { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Food Image URL*</span></label>
            <input
              type="text"
              {...register('food_image', { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label"><span className="label-text">Food Quantity*</span></label>
            <input
              type="number"
              {...register('food_quantity', { required: true, min: 1 })}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Pickup Location*</span></label>
            <input
              type="text"
              {...register('pickup_location', { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

     
        <div className="form-control">
          <label className="label"><span className="label-text">Expiry Date*</span></label>
          <input
            type="date"
            {...register('expired_datetime', { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        
        <div className="form-control">
          <label className="label"><span className="label-text">Additional Notes</span></label>
          <textarea
            {...register('additional_notes')}
            className="textarea textarea-bordered h-24"
          ></textarea>
        </div>

        
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary btn-block">
            Update Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFood;