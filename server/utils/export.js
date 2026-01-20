import XLSX from 'xlsx';

export function createUsersWorkbook(users) {
  const ws_data = [
    ['ID', 'Email', 'Full Name', 'Phone', 'Testimonial Allowed', 'Signup Date', 'Bookings Count']
  ];

  users.forEach(user => {
    ws_data.push([
      user.id,
      user.email,
      user.fullName,
      user.phone || '',
      user.testimonialAllowed ? 'Yes' : 'No',
      user.createdAt,
      user.bookingCount || 0
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Users');

  // Set column widths
  ws['!cols'] = [
    { wch: 8 },
    { wch: 25 },
    { wch: 20 },
    { wch: 15 },
    { wch: 18 },
    { wch: 20 },
    { wch: 15 }
  ];

  return wb;
}

export function createBookingsWorkbook(bookings) {
  const ws_data = [
    ['ID', 'User Email', 'User Name', 'Package Name', 'Amount', 'Currency', 'Status', 'Start Date', 'End Date', 'Booking Date']
  ];

  bookings.forEach(booking => {
    ws_data.push([
      booking.id,
      booking.email || '',
      booking.fullName || '',
      booking.packageName,
      booking.amount,
      booking.currency,
      booking.status,
      booking.tripStartDate || '',
      booking.tripEndDate || '',
      booking.createdAt
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Bookings');

  ws['!cols'] = [
    { wch: 8 },
    { wch: 25 },
    { wch: 20 },
    { wch: 25 },
    { wch: 12 },
    { wch: 10 },
    { wch: 12 },
    { wch: 15 },
    { wch: 15 },
    { wch: 20 }
  ];

  return wb;
}

export function createTestimonialsWorkbook(testimonials) {
  const ws_data = [
    ['ID', 'User Email', 'Name', 'Content', 'Rating', 'Status', 'Date']
  ];

  testimonials.forEach(testimonial => {
    ws_data.push([
      testimonial.id,
      testimonial.email || '',
      testimonial.name,
      testimonial.content,
      testimonial.rating || '',
      testimonial.isPublished ? 'Published' : 'Hidden',
      testimonial.createdAt
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Testimonials');

  ws['!cols'] = [
    { wch: 8 },
    { wch: 25 },
    { wch: 20 },
    { wch: 40 },
    { wch: 8 },
    { wch: 12 },
    { wch: 20 }
  ];

  return wb;
}

export function createCombinedWorkbook(users, bookings, testimonials) {
  const wb = XLSX.utils.book_new();

  // Users sheet
  const usersData = [
    ['ID', 'Email', 'Full Name', 'Phone', 'Testimonial Allowed', 'Signup Date', 'Bookings Count']
  ];
  users.forEach(user => {
    usersData.push([
      user.id,
      user.email,
      user.fullName,
      user.phone || '',
      user.testimonialAllowed ? 'Yes' : 'No',
      user.createdAt,
      user.bookingCount || 0
    ]);
  });
  const usersWs = XLSX.utils.aoa_to_sheet(usersData);
  usersWs['!cols'] = [
    { wch: 8 },
    { wch: 25 },
    { wch: 20 },
    { wch: 15 },
    { wch: 18 },
    { wch: 20 },
    { wch: 15 }
  ];
  XLSX.utils.book_append_sheet(wb, usersWs, 'Users');

  // Bookings sheet
  const bookingsData = [
    ['ID', 'User Email', 'User Name', 'Package Name', 'Amount', 'Currency', 'Status', 'Start Date', 'End Date', 'Booking Date']
  ];
  bookings.forEach(booking => {
    bookingsData.push([
      booking.id,
      booking.email || '',
      booking.fullName || '',
      booking.packageName,
      booking.amount,
      booking.currency,
      booking.status,
      booking.tripStartDate || '',
      booking.tripEndDate || '',
      booking.createdAt
    ]);
  });
  const bookingsWs = XLSX.utils.aoa_to_sheet(bookingsData);
  bookingsWs['!cols'] = [
    { wch: 8 },
    { wch: 25 },
    { wch: 20 },
    { wch: 25 },
    { wch: 12 },
    { wch: 10 },
    { wch: 12 },
    { wch: 15 },
    { wch: 15 },
    { wch: 20 }
  ];
  XLSX.utils.book_append_sheet(wb, bookingsWs, 'Bookings');

  // Testimonials sheet
  const testimonialsData = [
    ['ID', 'User Email', 'Name', 'Content', 'Rating', 'Status', 'Date']
  ];
  testimonials.forEach(testimonial => {
    testimonialsData.push([
      testimonial.id,
      testimonial.email || '',
      testimonial.name,
      testimonial.content,
      testimonial.rating || '',
      testimonial.isPublished ? 'Published' : 'Hidden',
      testimonial.createdAt
    ]);
  });
  const testimonialsWs = XLSX.utils.aoa_to_sheet(testimonialsData);
  testimonialsWs['!cols'] = [
    { wch: 8 },
    { wch: 25 },
    { wch: 20 },
    { wch: 40 },
    { wch: 8 },
    { wch: 12 },
    { wch: 20 }
  ];
  XLSX.utils.book_append_sheet(wb, testimonialsWs, 'Testimonials');

  return wb;
}
