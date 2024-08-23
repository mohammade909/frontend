import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UserProfile = () => {
  // Get user details from Redux state
  const user = useSelector((state) => state.auth.auth);

  // Formik setup for form handling and validation
  const formik = useFormik({
    initialValues: {
      username: user.username || '',
      email: user.email || '',
      first_name: user.first_name || '',
      last_name: user.last_name || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log('Form values', values);
    },
  });

  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg overflow-hidden">
      {/* Profile Picture Section */}
      <div className=" w-full md:w-1/3 bg-gray-100 flex  items-center justify-center">

        <img
          src={user.profilePicture || '/default_user.jpg'}
          alt="User Avatar"
          className="w-64 h-64 object-cover rounded-full border-4 border-gray-200"
        />
      </div>
      {/* Form Section */}
      <div className="flex-1 w-full md:w-2/3 p-6 shadow-custom">
        <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={`mt-1 block w-full border-gray-300 rounded-md p-3 shadow-custom  ${
                formik.errors.username && formik.touched.username ? 'border-red-500' : ''
              }`}
            />
            {formik.errors.username && formik.touched.username ? (
              <p className="text-red-500 text-xs mt-1">{formik.errors.username}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`mt-1 block w-full border-gray-300  rounded-md p-3 shadow-custom focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${
                formik.errors.email && formik.touched.email ? 'border-red-500' : ''
              }`}
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.first_name}
              className={`mt-1 block w-full border-gray-300 rounded-md p-3 shadow-custom focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${
                formik.errors.first_name && formik.touched.first_name ? 'border-red-500' : ''
              }`}
            />
            {formik.errors.first_name && formik.touched.first_name ? (
              <p className="text-red-500 text-xs mt-1">{formik.errors.first_name}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.last_name}
              className={`mt-1 block w-full border-gray-300 rounded-md p-3 shadow-custom focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 ${
                formik.errors.last_name && formik.touched.last_name ? 'border-red-500' : ''
              }`}
            />
            {formik.errors.last_name && formik.touched.last_name ? (
              <p className="text-red-500 text-xs mt-1">{formik.errors.last_name}</p>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-custom p-3 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
