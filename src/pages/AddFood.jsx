import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth'; 
import useAxiosPublic from '../api/axiosPublic'; 

const AddFood = () => {
  const { user } = useAuth(); 
  const axiosPublic = useAxiosPublic(); 
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    
    defaultValues: {
      donator_name: user?.displayName,
      donator_email: user?.email,
    },
  });

  const onSubmit = async (data) => {
    console.log('Form data:', data);

    const foodItem = {
      food_name: data.food_name,
      food_image: data.food_image,
      food_quantity: parseInt(data.food_quantity), 
      pickup_location: data.pickup_location,
      expired_datetime: data.expired_datetime,
      additional_notes: data.additional_notes,
      donator_name: data.donator_name,
      donator_email: data.donator_email,
      donator_image: user.photoURL,
    };

    
    try {
      const res = await axiosPublic.post('/foods', foodItem);
      console.log('Server response:', res.data);
      if (res.data.insertedId) {
        toast.success('Food added successfully!');
        reset(); 
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-10 bg-base-200">
      <h1 className="text-3xl font-bold text-center mb-8">Add a New Food Item</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg space-y-4"
      >
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Food Name*</span>
            </label>
            <input
              type="text"
              {...register('food_name', { required: true })}
              placeholder="e.g., Apple Pie"
              className="input input-bordered w-full"
            />
            {errors.food_name && <span className="text-red-600">This field is required</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Food Image URL*</span>
            </label>
            <input
              type="text"
              {...register('food_image', { required: true })}
              placeholder="http://example.com/image.png"
              className="input input-bordered w-full"
            />
            {errors.food_image && <span className="text-red-600">This field is required</span>}
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Food Quantity*</span>
            </label>
            <input
              type="number"
              {...register('food_quantity', { required: true, min: 1 })}
              placeholder="e.g., 5 (servings)"
              className="input input-bordered w-full"
            />
            {errors.food_quantity && <span className="text-red-600">Must be at least 1</span>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Pickup Location*</span>
            </label>
            <input
              type="text"
              {...register('pickup_location', { required: true })}
              placeholder="e.g., 123 Main St, Anytown"
              className="input input-bordered w-full"
            />
            {errors.pickup_location && <span className="text-red-600">This field is required</span>}
          </div>
        </div>

       
        <div className="form-control">
          <label className="label">
            <span className="label-text">Expiry Date*</span>
          </label>
          <input
            type="date"
            {...register('expired_datetime', { required: true })}
            className="input input-bordered w-full"
          />
          {errors.expired_datetime && <span className="text-red-600">This field is required</span>}
        </div>

      
        <div className="form-control">
          <label className="label">
            <span className="label-text">Additional Notes</span>
          </label>
          <textarea
            {...register('additional_notes')}
            className="textarea textarea-bordered h-24"
            placeholder="e.g., Contains nuts, available after 5 PM"
          ></textarea>
        </div>

        <hr className="my-6" />

        
        <h2 className="text-xl font-semibold">Your Information (Donator)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register('donator_name')}
              className="input input-bordered w-full"
              readOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register('donator_email')}
              className="input input-bordered w-full"
              readOnly
            />
          </div>
        </div>

        
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary btn-block">
            Add Food
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFood;
