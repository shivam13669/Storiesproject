import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiClient, downloadFile } from '@/lib/api';
import Navigation from '@/components/Navigation';

interface User {
  id: number;
  email: string;
  fullName: string;
  bookingCount: number;
  testimonialAllowed: boolean;
  createdAt: string;
}

const AdminDashboard = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;
      try {
        const data = await apiClient.admin.getUsers(token);
        setUsers(data.users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, [token]);

  const handleExportUsers = async () => {
    if (!token) return;
    try {
      const blob = await apiClient.admin.exportUsers(token);
      downloadFile(blob, 'users.xlsx');
    } catch (error) {
      console.error('Failed to export users:', error);
    }
  };

  const handleToggleTestimonial = async (userId: number, currentStatus: boolean) => {
    if (!token) return;
    try {
      await apiClient.admin.toggleTestimonialPermission(token, userId, !currentStatus);
      setUsers(users.map(u => 
        u.id === userId ? { ...u, testimonialAllowed: !currentStatus } : u
      ));
    } catch (error) {
      console.error('Failed to toggle testimonial permission:', error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleExportUsers}
              className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Export Users
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Bookings</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Testimonial</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-600">
                        Loading users...
                      </td>
                    </tr>
                  ) : users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{user.fullName}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.bookingCount}</td>
                        <td className="px-6 py-4 text-sm">
                          <button
                            onClick={() => handleToggleTestimonial(user.id, user.testimonialAllowed)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              user.testimonialAllowed
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {user.testimonialAllowed ? 'Allowed' : 'Blocked'}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-gray-600">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
