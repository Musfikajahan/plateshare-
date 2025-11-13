import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../api/axiosPublic';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const FoodDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

  
    const { data: food, isLoading } = useQuery({
        queryKey: ['foodDetails', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/food/${id}`);
            return res.data;
        },
    });

   
    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const additional_notes = form.notes.value;
        const request_date = form.request_date.value;

       
        const requestData = {
            food_id: food._id,
            food_name: food.food_name,
            food_image: food.food_image,
            donator_email: food.donator_email,
            donator_name: food.donator_name,
            requester_email: user.email,
            requester_name: user.displayName,
            request_date: request_date,
            pickup_location: food.pickup_location,
            expired_datetime: food.expired_datetime,
            additional_notes: additional_notes,
            status: 'pending' // Default status
        };

        
        try {
            const res = await axiosPublic.post('/requests', requestData);
            if (res.data.insertedId) {
                toast.success('Food requested successfully!');
                navigate('/my-food-requests'); // Go to "My Food Requests" page
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
           
            document.getElementById('request_modal').close();
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
        <div className="container mx-auto p-4 md:p-10">
            <div className="card lg:card-side bg-base-100 shadow-xl">
                <figure className="lg:w-1/2">
                    <img src={food.food_image} alt={food.food_name} className="w-full h-full object-contain bg-base-200" />
                </figure>
                <div className="card-body lg:w-1/2">
                    <h1 className="card-title text-4xl font-bold">{food.food_name}</h1>

                    <div className="divider"></div>

                    <div className="space-y-2">
                        <p><strong>Quantity:</strong> {food.food_quantity} servings</p>
                        <p><strong>Pickup Location:</strong> {food.pickup_location}</p>
                        <p><strong>Expires On:</strong> {new Date(food.expired_datetime).toLocaleDateString()}</p>
                        <p><strong>Notes:</strong> {food.additional_notes || 'None'}</p>
                    </div>

                    <div className="divider"></div>

                    {/* Donator Info */}
                    <h2 className="text-xl font-semibold">Donator Information</h2>
                    <div className="flex items-center gap-4">
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                                <img src={food.donator_image} alt={food.donator_name} />
                            </div>
                        </div>
                        <div>
                            <p className="font-bold">{food.donator_name}</p>
                            <p className="text-sm text-gray-600">{food.donator_email}</p>
                        </div>
                    </div>

                    <div className="card-actions justify-end mt-6">
                       
                        <button
                            className="btn btn-primary"
                            onClick={() => document.getElementById('request_modal').showModal()}
                        >
                            Request Food
                        </button>
                    </div>
                </div>
            </div>

          
            <dialog id="request_modal" className="modal">
                <div className="modal-box w-11/12 max-w-3xl">
                    <h3 className="font-bold text-2xl mb-4">Make a Request</h3>

                    <form onSubmit={handleRequestSubmit}>
                      
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div><strong>Food:</strong> {food.food_name}</div>
                            <div><strong>Donator:</strong> {food.donator_name}</div>
                            <div><strong>Pickup:</strong> {food.pickup_location}</div>
                            <div><strong>Expires:</strong> {new Date(food.expired_datetime).toLocaleDateString()}</div>
                        </div>

                       
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-base-200 rounded-lg">
                            <div><strong>Your Name:</strong> {user.displayName}</div>
                            <div><strong>Your Email:</strong> {user.email}</div>
                        </div>

                       
                        <div className="form-control">
                            <label className="label"><span className="label-text">Additional Notes</span></label>
                            <textarea
                                name="notes"
                                className="textarea textarea-bordered h-24"
                                placeholder="e.g., I can pick this up tomorrow at 5 PM."
                            ></textarea>
                        </div>

                        <div className="form-control mt-4">
                            <label className="label"><span className="label-text">Request Date</span></label>
                            <input
                                type="date"
                                name="request_date"
                                className="input input-bordered"
                                defaultValue={new Date().toISOString().split('T')[0]} // Today's date
                                readOnly
                            />
                        </div>

                      
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn btn-ghost mr-2">Cancel</button>
                            </form>
                            <button type="submit" className="btn btn-primary">Submit Request</button>
                        </div>
                    </form>
                </div>
            </dialog>

        </div>
    );
};

export default FoodDetails;