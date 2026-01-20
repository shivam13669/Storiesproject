import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/lib/api';
import Navigation from '@/components/Navigation';

interface Booking {
  id: number;
  packageName: string;
  amount: number;
  currency: string;
  status: string;
  tripStartDate: string;
  tripEndDate: string;
  createdAt: string;
}

const Dashboard = () => {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState<{ upcomingTrips: Booking[]; pastTrips: Booking[] }>({
    upcomingTrips: [],
    pastTrips: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) return;
      try {
        const data = await apiClient.user.getBookings(token);
        setBookings(data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, [token]);

  return (
    <>
      <Navigation />
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome, {user?.fullName.split(' ')[0]}!
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Upcoming Trips */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Trips</h2>
              {isLoading ? (
                <p className="text-gray-600">Loading...</p>
              ) : bookings.upcomingTrips.length > 0 ? (
                <div className="space-y-4">
                  {bookings.upcomingTrips.map((trip) => (
                    <div key={trip.id} className="border border-gray-200 rounded p-4">
                      <h3 className="font-semibold text-gray-900">{trip.packageName}</h3>
                      <p className="text-sm text-gray-600">Status: {trip.status}</p>
                      <p className="text-sm text-gray-600">
                        {trip.tripStartDate} to {trip.tripEndDate}
                      </p>
                      <p className="text-lg font-bold text-orange-600 mt-2">
                        {trip.currency} {trip.amount}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No upcoming trips</p>
              )}
            </div>

            {/* Past Trips */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Past Trips</h2>
              {isLoading ? (
                <p className="text-gray-600">Loading...</p>
              ) : bookings.pastTrips.length > 0 ? (
                <div className="space-y-4">
                  {bookings.pastTrips.map((trip) => (
                    <div key={trip.id} className="border border-gray-200 rounded p-4">
                      <h3 className="font-semibold text-gray-900">{trip.packageName}</h3>
                      <p className="text-sm text-gray-600">Status: {trip.status}</p>
                      <p className="text-sm text-gray-600">
                        {trip.tripStartDate} to {trip.tripEndDate}
                      </p>
                      <p className="text-lg font-bold text-orange-600 mt-2">
                        {trip.currency} {trip.amount}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No past trips</p>
              )}
            </div>
          </div>

          {/* Account Information */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Full Name</label>
                <p className="text-gray-900">{user?.fullName}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Email</label>
                <p className="text-gray-900">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
