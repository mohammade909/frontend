import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createBroker } from '../../../actions/brokers'; // Adjust the path as necessary
import { fetchAllPlatforms } from '../../../actions/platform';
import { clearErrors, clearMessage } from '../../../redux/brokerSlice';
import SuccessAlert from '../../../BaseFiles/SuccessAlert';
import ErrorAlert from '../../../BaseFiles/ErrorAlert';

const BrokerForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const { platforms } = useSelector((state) => state.platforms);
  const { error, message } = useSelector((state) => state.brokers);

  useEffect(() => {
    dispatch(fetchAllPlatforms());
  }, [dispatch]);

  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        dispatch(clearErrors());
        dispatch(clearMessage());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [dispatch, error, message]);

  const formik = useFormik({
    initialValues: {
      broker_name: '',
      platform_id: '', 
    },
    validationSchema: Yup.object({
      broker_name: Yup.string()
        .max(50, 'Broker name must be 50 characters or less')
        .required('Broker name is required'),
      platform_id: Yup.string().required('Platform is required'),
    }),
    onSubmit: (values) => {
      dispatch(createBroker(values));
      onClose();
    },
  });

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Broker</h2>

      {message && <SuccessAlert message={message} />}
      {error && <ErrorAlert error={error} />}

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="broker_name" className="block text-sm font-medium text-gray-700">
            Broker Name
          </label>
          <input
            id="broker_name"
            name="broker_name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.broker_name}
            className={`mt-1 block w-full px-3 py-2 border ${
              formik.touched.broker_name && formik.errors.broker_name
                ? 'border-red-500'
                : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          />
          {formik.touched.broker_name && formik.errors.broker_name ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.broker_name}</p>
          ) : null}
        </div>

        <div className="mb-4">
          <label htmlFor="platform_id" className="block text-sm font-medium text-gray-700">
            Platform
          </label>
          <select
            id="platform_id"
            name="platform_id"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.platform_id}
            className={`mt-1 block w-full px-3 py-2 border ${
              formik.touched.platform_id && formik.errors.platform_id
                ? 'border-red-500'
                : 'border-gray-300'
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          >
            <option value="" label="Select platform" />
            {platforms.map((platform) => (
              <option key={platform.platform_id} value={platform.platform_id}>
                {platform.platform_name}
              </option>
            ))}
          </select>
          {formik.touched.platform_id && formik.errors.platform_id ? (
            <p className="text-red-500 text-sm mt-1">{formik.errors.platform_id}</p>
          ) : null}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Broker
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrokerForm;
