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
            request_date,
            pickup_location: food.pickup_location,
            expired_datetime: food.expired_datetime,
            additional_notes,
            status: 'pending',
        };

        try {
            const res = await axiosPublic.post('/requests', requestData);
            if (res.data.insertedId) {
                toast.success(' Food requested successfully!');
                navigate('/my-food-requests');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            document.getElementById('request_modal').close();
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-340px)] bg-gradient-to-br from-orange-500 via-pink-500 to-red-500">
                <span className="loading loading-spinner loading-lg text-white"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-500 via-pink-500 to-red-500 py-12 px-6 flex justify-center items-center">
            <div className="card lg:card-side bg-white/20 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden w-full max-w-6xl animate-fadeIn">
                <figure className="lg:w-1/2 h-full overflow-hidden relative">
                    <img
                        src={food.food_image}
                        alt={food.food_name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <h1 className="absolute top-6 left-10 text-5xl font-extrabold bg-gradient-to-r from-amber-300 via-yellow-400 to-pink-400 text-transparent bg-clip-text drop-shadow-[0_2px_10px_rgba(255,255,255,0.6)]">
                        {food.food_name}
                    </h1>
                </figure>
                <div className="card-body lg:w-1/2 text-white space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-2"> Food Details</h2>
                        <p><span className="font-semibold">Quantity:</span> {food.food_quantity} servings</p>
                        <p><span className="font-semibold">Pickup Location:</span> {food.pickup_location}</p>
                        <p><span className="font-semibold">Expires On:</span> {new Date(food.expired_datetime).toLocaleDateString()}</p>
                        <p><span className="font-semibold">Notes:</span> {food.additional_notes || 'None'}</p>
                    </div>

                    <div className="divider divider-accent"></div>
                    <div>
                        <h2 className="text-2xl font-bold mb-2"> Donator Information</h2>
                        <div className="flex items-center gap-4 bg-white/10 p-3 rounded-xl backdrop-blur-md hover:bg-white/20 transition">
                            <div className="avatar">
                                <div className="w-16 rounded-full ring ring-pink-300 ring-offset-2 ring-offset-transparent">
                                    <img src={food.donator_image} alt={food.donator_name} />
                                </div>
                            </div>
                            <div>
                                <p className="font-bold text-lg">{food.donator_name}</p>
                                <p className="text-sm text-gray-200">{food.donator_email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="card-actions justify-end mt-6">
                        <button
                            className="btn bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 border-none text-white font-semibold shadow-lg hover:scale-105 hover:shadow-yellow-400/50 transition-all duration-300"
                            onClick={() => document.getElementById('request_modal').showModal()}
                        >
                            Request Food 🍴
                        </button>
                    </div>
                </div>
            </div>
            <dialog id="request_modal" className="modal">
                <div className="modal-box bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl text-white animate-fadeIn">
                    <h3 className="font-bold text-2xl mb-4 text-center text-yellow-300">✨ Make a Request</h3>

                    <form onSubmit={handleRequestSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div><strong>Food:</strong> {food.food_name}</div>
                            <div><strong>Donator:</strong> {food.donator_name}</div>
                            <div><strong>Pickup:</strong> {food.pickup_location}</div>
                            <div><strong>Expires:</strong> {new Date(food.expired_datetime).toLocaleDateString()}</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-white/10 rounded-xl">
                            <div><strong>Your Name:</strong> {user.displayName}</div>
                            <div><strong>Your Email:</strong> {user.email}</div>
                        </div>
                        <div className="form-control">
                            <label className="label"><span className="label-text text-white">Additional Notes</span></label>
                            <textarea
                                name="notes"
                                className="textarea bg-white/20 text-white placeholder-gray-300 textarea-bordered h-24 focus:ring-2 focus:ring-pink-400"
                                placeholder="e.g., I can pick this up tomorrow at 5 PM."
                            ></textarea>
                        </div>
                        <div className="form-control mt-4">
                            <label className="label"><span className="label-text text-white">Request Date</span></label>
                            <input
                                type="date"
                                name="request_date"
                                className="input bg-white/20 text-white input-bordered focus:ring-2 focus:ring-pink-400"
                                defaultValue={new Date().toISOString().split('T')[0]}
                                readOnly
                            />
                        </div>
                        <div className="modal-action mt-6">
                            <form method="dialog">
                                <button className="btn bg-gray-400/40 hover:bg-gray-300/60 text-white border-none">Cancel</button>
                            </form>
                            <button type="submit" className="btn bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 border-none text-white font-semibold hover:scale-105 hover:shadow-yellow-400/50 transition-all duration-300">
                                Submit Request
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default FoodDetails;