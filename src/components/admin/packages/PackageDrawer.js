import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogPanel } from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { createPackage } from "../../../actions/package";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRiskRules } from "../../../actions/riskrule";
import {
  fetchAllBrokers,
  fetchBrokerByPlatforms,
} from "../../../actions/brokers";
const PackageDrawer = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const [isLevel1Checked, setIsLevel1Checked] = useState(false);
  const [isLevel2Checked, setIsLevel2Checked] = useState(false);
  const [isSwapChecked, setIsSwapChecked] = useState(false);
  const [isSwapFreeChecked, setIsSwapFreeChecked] = useState(false);
  const [amountAndFee, setAmountAndFee] = useState([]);
  const [amount, setAmount] = useState("");
  const [fee, setFee] = useState("");
  const [brokersPlatforms, setBrokerplatforms] = useState([]);
  const [broker, setBroker] = useState("");
  const [platform, setPlatform] = useState([]);
  const [refund, setRefund] = useState([]);
  const [refundPer, setRefundPer] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [minTrade, setMinTrade] = useState([]);
  const [minTradeDay, setMinTradeDay] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [weeklyPayout, setWeeklyPayout] = useState({
    mode: "",
    amount: 0,
  });

  const riskRules = useSelector((state) => state.riskrules.riskRules);

  const { brokers, platforms } = useSelector((state) => state.brokers);

  const handleAddBroker = () => {
    if (broker && platform) {
      if (Array.isArray(brokersPlatforms)) {
        setBrokerplatforms([...brokersPlatforms, { broker, platform }]);
      } else {
        console.error("amountAndFee is not an array");
      }
      setBroker("");
      setPlatform("");
    } else {
      console.warn("Amount and fee must be provided");
    }
  };
  const handleAddRefund = () => {
    if (refundAmount && refundPer) {
      if (Array.isArray(refund)) {
        setRefund([...refund, { percentage: refundPer, amount: refundAmount }]);
      } else {
        console.error("amountAndFee is not an array");
      }
      setRefundPer("");
      setRefundAmount("");
    } else {
      console.warn("Amount and fee must be provided");
    }
  };
  const handleAddMinTrade = () => {
    if (minAmount && minTradeDay) {
      if (Array.isArray(minTrade)) {
        setMinTrade([...minTrade, { day: minTradeDay, amount: minAmount }]);
      } else {
        console.error("amountAndFee is not an array");
      }
      setMinTradeDay("");
      setMinAmount("");
    } else {
      console.warn("Amount and fee must be provided");
    }
  };

  const handleRemoveBroker = (id) => {
    setBrokerplatforms(brokersPlatforms.filter((item) => item.id !== id));
  };

  const handlePaymentFeeInput = () => {
    if (amount && fee) {
      // Ensure amountAndFee is an array before spreading
      if (Array.isArray(amountAndFee)) {
        setAmountAndFee([...amountAndFee, { amount, fee }]);
      } else {
        console.error("amountAndFee is not an array");
      }
      setAmount("");
      setFee("");
    } else {
      console.warn("Amount and fee must be provided");
    }
  };

  const validationSchema = Yup.object({
    package_name: Yup.string().required("Required"),
    level_1: Yup.string().required("Required"),
    level_2: Yup.string().required("Required"),
    risk: Yup.string().required("Required"),
    swap: Yup.number().when("swap_check", {
      is: true,
      then: Yup.number().required("Required").positive("Must be positive"),
      otherwise: Yup.number(),
    }),
    swapFree: Yup.number().when("swapFree_check", {
      is: true,
      then: Yup.number().required("Required").positive("Must be positive"),
      otherwise: Yup.number(),
    }),
    broker: Yup.string().required("Required"),
    platform: Yup.string().required("Required"),
    weeklyPayout: Yup.boolean(),
    refund: Yup.boolean(),
    minTrading: Yup.boolean(),
  });

  const initialValues = {
    package_name: "",
    level_1: "",
    level_2: "",
    risk: "",
    swap: null,
    swapFree: null,
    weeklyPayout: false,
    refund: false,
    minTrading: false,
  };

  const onSubmit = (values) => {
    values.brokersPlatforms = brokersPlatforms;
    values.amountAndFee = amountAndFee;
    values.refund = refund;
    values.minTrading = minTrade;
    values.weeklyPayout = weeklyPayout;
    console.log(values);

    dispatch(createPackage(values));
    // setOpen(false);
  };

  const handleRemove = (index) => {
    const newAmountAndFee = amountAndFee.filter((_, i) => i !== index);
    setAmountAndFee(newAmountAndFee);
  };

  const handleRemoveRefund = (index) => {
    const updatedRefunds = refund.filter((_, i) => i !== index);
    setRefund(updatedRefunds);
  };
  const handleRemoveMinTrade = (index) => {
    const updatedTrade = minTrade.filter((_, i) => i !== index);
    setMinTrade(updatedTrade);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "once" || name === "twice" || name === "thrice") {
      setWeeklyPayout({
        mode: name,
        amount: value,
      });
    }
    // Call Formik's handleInputChange if you're using Formik
  };
  useEffect(() => {
    dispatch(fetchAllRiskRules());
    dispatch(fetchAllBrokers());
    if (broker) {
      const foundBroker = brokers.find((br) => br.broker_id === Number(broker));
      if (foundBroker) {
        dispatch(fetchBrokerByPlatforms(foundBroker.broker_name));
      }
    }
  }, [broker]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black bg-opacity-30" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out">
              <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ values, setFieldValue }) => (
                  <Form className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1">
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                              Add package
                            </DialogTitle>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              onClick={() => setOpen(false)}
                              className="relative text-gray-400 hover:text-gray-500"
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                aria-hidden="true"
                                className="h-6 w-6"
                              />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6 py-6 sm:space-y-0  sm:py-0">
                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <label
                            htmlFor="package_name"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                          >
                            Package
                          </label>
                          <div className="sm:col-span-2">
                            <Field
                              id="package_name"
                              name="package_name"
                              type="text"
                              className=" px-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-teal-400 sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage
                              name="package_name"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                            Select Step
                          </label>
                          <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                            <div className="relative flex items-center bg-green-100 rounded-md">
                              <div className="relative w-full">
                                <Field
                                  id="level_1"
                                  name="level_1"
                                  type="text"
                                  placeholder="Level 1 fee"
                                  disabled={!isLevel1Checked}
                                  className="pl-10 pr-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <Field
                                  id="level_1_check"
                                  name="level_1_check"
                                  type="checkbox"
                                  className="absolute top-1/2 left-2 h-5 w-5 text-green-500 transform -translate-y-1/2"
                                  checked={isLevel1Checked}
                                  onChange={() =>
                                    setIsLevel1Checked(!isLevel1Checked)
                                  }
                                />
                              </div>
                              <ErrorMessage
                                name="level_1"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>

                            <div className="relative flex items-center bg-green-100 rounded-md">
                              <div className="relative w-full">
                                <Field
                                  id="level_2"
                                  name="level_2"
                                  type="text"
                                  placeholder="Level 2 fee"
                                  disabled={!isLevel2Checked}
                                  className="pl-10 pr-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <Field
                                  id="level_2_check"
                                  name="level_2_check"
                                  type="checkbox"
                                  className="absolute top-1/2 left-2 h-5 w-5 text-green-500 transform -translate-y-1/2"
                                  checked={isLevel2Checked}
                                  onChange={() =>
                                    setIsLevel2Checked(!isLevel2Checked)
                                  }
                                />
                              </div>
                              <ErrorMessage
                                name="level_2"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <label
                            htmlFor="risk"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                          >
                            Risk
                          </label>
                          <div className="sm:col-span-2">
                            <Field
                              id="risk"
                              name="risk"
                              as="select"
                              className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                              <option value="">Select risk</option>
                              {riskRules.map((rule) => (
                                <option key={rule.rule_id} value={rule.rule_id}>
                                  {rule.rule_name}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="risk"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <label
                            htmlFor="amountAndFee"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                          >
                            Amount and Fee
                          </label>
                          <div className="sm:col-span-2 grid grid-cols-3 gap-4">
                            <div>
                              <Field
                                id="amount"
                                name="amount"
                                type="number"
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              <ErrorMessage
                                name="amount"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                            <div>
                              <Field
                                id="fee"
                                name="fee"
                                type="number"
                                placeholder="Fee"
                                value={fee}
                                onChange={(e) => setFee(e.target.value)}
                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              <ErrorMessage
                                name="fee"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                            <div
                              onClick={handlePaymentFeeInput}
                              className="flex cursor-pointer  justify-center border-dashed border border-green-500 items-center pointer bg-green-200 font-semibold rounded-lg text-green-700 hover:bg-green-100 hover:text-green-600"
                            >
                              Add
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-1/3"></div>
                          <div className="w-1/2 px-3">
                            {amountAndFee.length > 0 && (
                              <ul className="list-disc list-inside flex gap-3 flex-wrap max-w-full m-auto">
                                {amountAndFee.map((af, index) => (
                                  <li
                                    key={index}
                                    className="my-2 relative list-none group"
                                  >
                                    <span className="bg-blue-200 px-2  border-dashed border border-blue-300 rounded text-blue-600 font-semibold tracking-wider inline-block relative">
                                      {af.amount} | {af.fee}
                                      <button
                                        type="button"
                                        onClick={() => handleRemove(index)}
                                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-md font-bold rounded-full text-white w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                                      >
                                        &times;
                                      </button>
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <label
                            htmlFor="swap"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                          >
                            Swap and Swap Free
                          </label>
                          <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                            <div className="relative flex items-center rounded-md">
                              <div className="relative w-full  bg-green-100">
                                <Field
                                  id="swap"
                                  name="swap"
                                  type="number"
                                  placeholder="Swap"
                                  disabled={!isSwapChecked}
                                  className="pl-10 pr-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <Field
                                  id="swap_check"
                                  name="swap_check"
                                  type="checkbox"
                                  className="absolute top-1/2 left-2 h-5 w-5 text-green-500 transform -translate-y-1/2"
                                  checked={isSwapChecked}
                                  onChange={() =>
                                    setIsSwapChecked(!isSwapChecked)
                                  }
                                />
                              </div>
                              <ErrorMessage
                                name="swap"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                            <div className="relative flex items-center rounded-md">
                              <div className="relative  bg-green-100 w-full">
                                <Field
                                  id="swapFree"
                                  name="swapFree"
                                  type="number"
                                  placeholder="Swap Free"
                                  disabled={!isSwapFreeChecked}
                                  className="pl-10 pr-4 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <Field
                                  id="swapFree_check"
                                  name="swapFree_check"
                                  type="checkbox"
                                  className="absolute top-1/2 left-2 h-5 w-5 text-green-500 transform -translate-y-1/2"
                                  checked={isSwapFreeChecked}
                                  onChange={() =>
                                    setIsSwapFreeChecked(!isSwapFreeChecked)
                                  }
                                />
                              </div>
                              <ErrorMessage
                                name="swapFree"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <label
                            htmlFor="broker"
                            className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5"
                          >
                            Broker and Platform
                          </label>
                          <div className="sm:col-span-2 grid grid-cols-3 gap-4">
                            <div>
                              <Field
                                as="select"
                                id="broker"
                                name="broker"
                                onChange={(e) => setBroker(e.target.value)}
                                placeholder="Broker"
                                value={broker}
                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              >
                                <option value="">Select Broker</option>
                                {brokers.map((broker) => (
                                  <option
                                    key={broker.broker_id}
                                    value={broker.broker_id}
                                  >
                                    {broker.broker_name}
                                  </option>
                                ))}
                              </Field>
                              <ErrorMessage
                                name="broker"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                            <div>
                              <Field
                                as="select"
                                id="platform"
                                name="platform"
                                placeholder="Platform"
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              >
                                <option value="" label="Select platform" />
                                {platforms?.map((item, i) => (
                                  <option
                                    key={item.platform_id}
                                    value={item.platform_id}
                                    label={item.platform_name}
                                  />
                                ))}
                              </Field>
                              <ErrorMessage
                                name="platform"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                            <div
                              onClick={handleAddBroker}
                              className="flex cursor-pointer  justify-center border-dashed border border-green-500 items-center pointer bg-green-200 font-semibold rounded-lg text-green-700 hover:bg-green-100 hover:text-green-600"
                            >
                              Add
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="w-1/3"></div>
                          <div className="w-1/2 px-3">
                            <ul className="px-1 list-disc list-inside flex gap-3 flex-wrap max-w-full m-auto">
                              {brokersPlatforms.map((item, index) => {
                                const platform = platforms.find(
                                  (platform) =>
                                    platform.platform_id ===
                                    Number(item.platform)
                                );
                                const broker = brokers.find(
                                  (platform) =>
                                    platform.broker_id === Number(item.broker)
                                );

                                return (
                                  <li
                                    key={index}
                                    className="my-2 relative list-none group"
                                  >
                                    <span className="bg-blue-200 px-3 py-1 border-dashed border border-blue-300 rounded text-blue-600 font-semibold tracking-wider inline-block relative">
                                      {broker.broker_name} |
                                      {platform.platform_name}
                                      <button
                                        onClick={() =>
                                          handleRemoveBroker(item.id)
                                        }
                                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-gray-500 text-md font-bold rounded-full text-white w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all duration-200"
                                      >
                                        &times;
                                      </button>
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>

                        <div className="space-y-2 px-4 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                          <label className="block p-3 rounded-md my-2 bg-gray-300 text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                            Addons
                          </label>
                          <div className=" gap-4">
                            <div>
                              <div className="my-2">
                                <Field
                                  id="weeklyPayout"
                                  name="weeklyPayout"
                                  type="checkbox"
                                  className="h-5 w-5 text-indigo-600"
                                />
                                <label
                                  htmlFor="weeklyPayout"
                                  className="ml-2 text-sm font-medium text-gray-900"
                                >
                                  Weekly Payout
                                </label>
                                <ErrorMessage
                                  name="weeklyPayout"
                                  component="div"
                                  className="text-red-500 text-sm mt-1"
                                />
                              </div>
                              {values.weeklyPayout ? (
                                <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
                                  <Field
                                    id="once"
                                    name="once"
                                    type="number"
                                    placeholder="Once"
                                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleInputChange}
                                    value={
                                      weeklyPayout.mode === "once"
                                        ? weeklyPayout.amount
                                        : ""
                                    }
                                  />
                                  <Field
                                    id="twice"
                                    name="twice"
                                    type="number"
                                    placeholder="Twice"
                                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleInputChange}
                                    value={
                                      weeklyPayout.mode === "twice"
                                        ? weeklyPayout.amount
                                        : ""
                                    }
                                  />
                                  <Field
                                    id="thrice"
                                    name="thrice"
                                    type="number"
                                    placeholder="Thrice"
                                    className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleInputChange}
                                    value={
                                      weeklyPayout.mode === "thrice"
                                        ? weeklyPayout.amount
                                        : ""
                                    }
                                  />
                                </div>
                              ) : null}
                            </div>

                            <div className="my-2">
                              <Field
                                id="refund"
                                name="refund"
                                type="checkbox"
                                className="h-5 w-5 text-indigo-600"
                              />
                              <label
                                htmlFor="refund"
                                className="ml-2 text-sm font-medium text-gray-900"
                              >
                                Refund
                              </label>
                              <ErrorMessage
                                name="refund"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                            {values.refund ? (
                              <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
                                <Field
                                  id="percent"
                                  name="percent"
                                  type="number"
                                  value={refundPer}
                                  onChange={(e) => setRefundPer(e.target.value)}
                                  placeholder="Percentage"
                                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <Field
                                  id="amount"
                                  name="amount"
                                  type="number"
                                  value={refundAmount}
                                  onChange={(e) =>
                                    setRefundAmount(e.target.value)
                                  }
                                  placeholder="Amount"
                                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <button
                                  onClick={handleAddRefund}
                                  type="button"
                                  className="flex cursor-pointer  justify-center border-dashed border border-green-500 items-center pointer bg-green-200 font-semibold rounded-lg text-green-700 hover:bg-green-100 hover:text-green-600"
                                >
                                  Add
                                </button>
                                <div className="flex">
                                  {/* <div className="w-1/3"></div> */}
                                  <div className="w-full  px-3">
                                    {refund.length > 0 && (
                                      <ul className="">
                                        {refund.map((af, index) => (
                                          <li
                                            key={index}
                                            className="my-2 relative list-none group"
                                          >
                                            <span className="bg-blue-200 px-2  border-dashed border border-blue-300 rounded text-blue-600 font-semibold tracking-wider inline-block relative">
                                              {af.percentage}% {af.amount}$
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  handleRemoveRefund(index)
                                                }
                                                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-md font-bold rounded-full text-white w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                                              >
                                                &times;
                                              </button>
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : null}

                            <div className="my-2">
                              <Field
                                id="minTrading"
                                name="minTrading"
                                type="checkbox"
                                className="h-5 w-5 text-indigo-600"
                              />
                              <label
                                htmlFor="minTrading"
                                className="ml-2 text-sm font-medium text-gray-900"
                              >
                                Min Trading Days
                              </label>
                              <ErrorMessage
                                name="minTrading"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                              />
                            </div>
                            {values.minTrading ? (
                              <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
                                <Field
                                  id="day"
                                  name="day"
                                  type="number"
                                  placeholder="Day"
                                  value={minTradeDay}
                                  onChange={(e) =>
                                    setMinTradeDay(e.target.value)
                                  }
                                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <Field
                                  id="amount"
                                  name="amount"
                                  type="number"
                                  placeholder="Amount"
                                  value={minAmount}
                                  onChange={(e) => setMinAmount(e.target.value)}
                                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <button
                                  onClick={handleAddMinTrade}
                                  type="button"
                                  className="flex cursor-pointer  justify-center border-dashed border border-green-500 items-center pointer bg-green-200 font-semibold rounded-lg text-green-700 hover:bg-green-100 hover:text-green-600"
                                >
                                  Add
                                </button>
                                <div className="flex">
                                  <div className="w-full px-3">
                                    {minTrade.length > 0 && (
                                      <ul className="list-disc list-inside flex gap-3 flex-wrap max-w-full m-auto">
                                        {minTrade.map((af, index) => (
                                          <li
                                            key={index}
                                            className="my-2 relative list-none group"
                                          >
                                            <span className="bg-blue-200 px-2  border-dashed border border-blue-300 rounded text-blue-600 font-semibold tracking-wider inline-block relative">
                                              {af.day}-{af.amount}$
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  handleRemoveMinTrade(index)
                                                }
                                                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-md font-bold rounded-full text-white w-4 h-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                                              >
                                                &times;
                                              </button>
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-shrink-0 px-4 py-4">
                      <button
                        type="submit"
                        className=" w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-400 hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        Save
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PackageDrawer;
