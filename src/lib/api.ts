const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
    fullName: string;
  };
}

export interface SignupResponse {
  message: string;
  userId: number;
  token: string;
  user: {
    id: number;
    email: string;
    fullName: string;
  };
}

export const apiClient = {
  // Auth endpoints
  auth: {
    login: async (email: string, password: string): Promise<LoginResponse> => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }
      return response.json();
    },

    signup: async (
      email: string,
      fullName: string,
      password: string,
      phone?: string
    ): Promise<SignupResponse> => {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, fullName, password, phone })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Signup failed');
      }
      return response.json();
    },

    adminLogin: async (email: string, password: string): Promise<LoginResponse> => {
      const response = await fetch(`${API_BASE_URL}/auth/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Admin login failed');
      }
      return response.json();
    },

    changePassword: async (
      email: string,
      oldPassword: string,
      newPassword: string,
      token: string
    ): Promise<{ message: string }> => {
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email, oldPassword, newPassword })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Password change failed');
      }
      return response.json();
    }
  },

  // User endpoints
  user: {
    getProfile: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      return response.json();
    },

    getBookings: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/user/bookings`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      return response.json();
    },

    createBooking: async (
      token: string,
      bookingData: {
        destinationSlug: string;
        packageSlug: string;
        packageName: string;
        amount: number;
        currency?: string;
        tripStartDate?: string;
        tripEndDate?: string;
      }
    ) => {
      const response = await fetch(`${API_BASE_URL}/user/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create booking');
      }
      return response.json();
    }
  },

  // Testimonial endpoints
  testimonials: {
    getPublic: async () => {
      const response = await fetch(`${API_BASE_URL}/testimonials`);
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }
      return response.json();
    },

    submit: async (
      token: string,
      testimonialData: {
        content: string;
        rating?: number;
        image?: string;
      }
    ) => {
      const response = await fetch(`${API_BASE_URL}/testimonials/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(testimonialData)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit testimonial');
      }
      return response.json();
    },

    getMyTestimonials: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/testimonials/my-testimonials`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }
      return response.json();
    }
  },

  // Admin endpoints
  admin: {
    getUsers: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    },

    getUser: async (token: string, userId: number) => {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return response.json();
    },

    toggleTestimonialPermission: async (
      token: string,
      userId: number,
      allowed: boolean
    ) => {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/testimonial-permission`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ allowed })
      });
      if (!response.ok) {
        throw new Error('Failed to update testimonial permission');
      }
      return response.json();
    },

    resetUserPassword: async (
      token: string,
      userId: number,
      newPassword: string
    ) => {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ newPassword })
      });
      if (!response.ok) {
        throw new Error('Failed to reset password');
      }
      return response.json();
    },

    getBookings: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/admin/bookings`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      return response.json();
    },

    cancelBooking: async (token: string, bookingId: number) => {
      const response = await fetch(`${API_BASE_URL}/admin/bookings/${bookingId}/cancel`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }
      return response.json();
    },

    getTestimonials: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/admin/testimonials`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }
      return response.json();
    },

    removeTestimonial: async (token: string, testimonialId: number) => {
      const response = await fetch(`${API_BASE_URL}/admin/testimonials/${testimonialId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Failed to remove testimonial');
      }
      return response.json();
    },

    exportUsers: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/admin/export/users`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Failed to export users');
      }
      return response.blob();
    },

    exportBookings: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/admin/export/bookings`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Failed to export bookings');
      }
      return response.blob();
    },

    exportTestimonials: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/admin/export/testimonials`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Failed to export testimonials');
      }
      return response.blob();
    },

    exportAll: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/admin/export/all`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        throw new Error('Failed to export data');
      }
      return response.blob();
    }
  }
};

// Helper function to download files
export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
