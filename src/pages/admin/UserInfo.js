// src/components/UserInfo.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getUserById } from '../../actions/user';
import Spinner from '../../BaseFiles/Spinner'; // A simple loading spinner component

const UserInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const [activeTab, setActiveTab] = useState('Personal Information');

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [id, dispatch]);

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'failed') {
    return <div className="text-red-600 text-center mt-4">{error}</div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Personal Information':
        return (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Personal Information</h2>
            <div className="space-y-2">
              <p className="text-gray-600"><strong className="font-medium">Username:</strong> {user.username}</p>
              <p className="text-gray-600"><strong className="font-medium">Email:</strong> {user.email}</p>
              <p className="text-gray-600"><strong className="font-medium">First Name:</strong> {user.first_name}</p>
              <p className="text-gray-600"><strong className="font-medium">Last Name:</strong> {user.last_name}</p>
              <p className="text-gray-600"><strong className="font-medium">Phone:</strong> {user.phone}</p>
            </div>
          </div>
        );
      case 'Change Password':
        return (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-300">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Change Password</h2>
            <Formik
              initialValues={{
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
              }}
              validationSchema={Yup.object({
                currentPassword: Yup.string()
                  .required('Current Password is required'),
                newPassword: Yup.string()
                  .min(6, 'New Password must be at least 6 characters')
                  .required('New Password is required'),
                confirmPassword: Yup.string()
                  .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                  .required('Confirm Password is required')
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  // Submit the form values to the backend or handle them as needed
                  console.log(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                    <Field
                      type="password"
                      name="currentPassword"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                    <Field
                      type="password"
                      name="newPassword"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={isSubmitting}
                    >
                      Change Password
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        );
      case 'Verification Center':
        return <div className="p-6">Verification Center Content</div>;
      case 'Email Notifications':
        return <div className="p-6">Email Notifications Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 mx-3">
      {user ? (
        <>
          <h1 className="text-3xl font-extrabold mb-6 text-gray-800">User Profile</h1>
          <div className="mb-4 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {['Personal Information', 'Change Password', 'Verification Center', 'Email Notifications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-6 border-b-2 font-medium text-sm ${
                    activeTab === tab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderContent()}
          </div>
        </>
      ) : (
        <div className="text-gray-500 text-center mt-4">No user found</div>
      )}
    </div>
  );
};

export default UserInfo;
