import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../api/axiosPublic';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const MyFoodRequests = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();


  const { data: myRequests = [], isLoading } = useQuery({
    queryKey: ['myRequests', user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/my-food-requests/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/requests/${id}`);
          if (res.data.deletedCount > 0) {
           
            queryClient.invalidateQueries({ queryKey: ['myRequests'] });
            Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
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
    <div className="container mx-auto p-4 md:p-10 bg-base-200">
      <h1 className="text-3xl font-bold text-center mb-8">My Food Requests ({myRequests.length})</h1>

      {myRequests.length === 0 ? (
        <div className="text-center p-10 bg-base-100 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold">You have not made any requests yet.</h2>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow-lg rounded-lg">
          <table className="table w-full">
            {/* head */}
            <thead className="bg-neutral text-neutral-content uppercase">
              <tr>
                <th>Donator</th>
                <th>Food Name</th>
                <th>Pickup Location</th>
                <th>Expiry Date</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {myRequests.map((req) => (
                <tr key={req._id} className="hover">
                  <td>{req.donator_name}</td>
                  <td>{req.food_name}</td>
                  <td>{req.pickup_location}</td>
                  <td>{new Date(req.expired_datetime).toLocaleDateString()}</td>
                  <td>{req.request_date}</td>
                  <td>
                    <span className={`badge ${
                      req.status === 'pending' ? 'badge-warning' : 'badge-success'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                   
                    {req.status === 'pending' ? (
                      <button 
                        onClick={() => handleCancel(req._id)}
                        className="btn btn-error btn-sm"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-success font-bold">Delivered</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFoodRequests;