import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {createRiskRule} from '../../../actions/riskrule'
import { useDispatch, useSelector } from "react-redux";
const RiskRuleDrawer = ({ isOpen, setIsOpen }) => {
  const [isDailyChecked, setIsDailyChecked] = useState(true);
  const [isWeeklyChecked, setIsWeeklyChecked] = useState(true);
  const [isMonthlyChecked, setIsMonthlyChecked] = useState(true);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    riskName: Yup.string().required("Required"),
    calculationType: Yup.string().required("Required"),
    dailyPercentage: Yup.number().when("isDailyChecked", {
      is: true,
      then: Yup.number().required("Required"),
      otherwise: Yup.number().nullable(),
    }),
    weeklyPercentage: Yup.number().when("isWeeklyChecked", {
      is: true,
      then: Yup.number().required("Required"),
      otherwise: Yup.number().nullable(),
    }),
    monthlyPercentage: Yup.number().when("isMonthlyChecked", {
      is: true,
      then: Yup.number().required("Required"),
      otherwise: Yup.number().nullable(),
    }),
    profitShare: Yup.number().required("Required"),
    maxOpenLot: Yup.number().required("Required"),
    leverage: Yup.string().required("Required"),
    addons: Yup.array().of(Yup.string()),
    isDailyChecked: Yup.boolean(),
    isWeeklyChecked: Yup.boolean(),
    isMonthlyChecked: Yup.boolean(),
  });

  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } ease-in-out duration-300 w-[50vw] overflow-y-auto`}
    >
      <div className="p-6">
        <div className="bg-gray-800 p-4 text-white rounded-t-lg shadow-md mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Risk Rule</h2>
            <button
              className="text-white hover:text-gray-300"
              onClick={() => setIsOpen(false)}
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
        </div>
        <Formik
          initialValues={{
            riskName: "",
            calculationType: "",
            dailyPercentage: "",
            weeklyPercentage: "",
            monthlyPercentage: "",
            profitShare: "",
            maxOpenLot: "",
            leverage: "",
            addons: [],
            isDailyChecked: true,
            isWeeklyChecked: true,
            isMonthlyChecked: true,
          }}
          // validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            
             dispatch(createRiskRule(values))
            setIsOpen(false);
          }}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium">
                    Risk
                  </label>
                  <Field
                    name="riskName"
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-1"
                  />
                  {errors.riskName && touched.riskName ? (
                    <div className="text-red-600 mt-1">{errors.riskName}</div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Calculation Type
                  </label>
                  <Field
                    as="select"
                    name="calculationType"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-1"
                  >
                    <option value="">Select...</option>
                    <option value="initial_balance">Initial Balance</option>
                    <option value="max_equity_per_day">
                      MaxEquity Per Day
                    </option>
                    <option value="daily_balance">Daily Balance</option>
                    <option value="high_equity">High Equity</option>
                    <option value="high_balance">High Balance</option>
                  </Field>
                  {errors.calculationType && touched.calculationType ? (
                    <div className="text-red-600 mt-1">
                      {errors.calculationType}
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Drawdown Section */}
              <div className="border p-3  my-3 rounded-lg border-gray-300 pt-4">
                <h3 className="text-lg font-semibold mb-2">Drawdown</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center">
                    <label className="mr-4 flex items-center">
                      <Field
                        type="checkbox"
                        name="isDailyChecked"
                        checked={values.isDailyChecked}
                        onChange={(e) => {
                          setFieldValue("isDailyChecked", e.target.checked);
                          setIsDailyChecked(e.target.checked);
                        }}
                        className="mr-2"
                      />
                      Daily
                    </label>
                    <div className="relative w-full">
                      <Field
                        name="dailyPercentage"
                        type="text"
                        disabled={!values.isDailyChecked}
                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-1 pl-10" // Adjust padding to make room for the button
                      />
                      <button
                        type="button"
                        disabled
                        className="absolute right-0 top-0 h-full px-4 py-1 bg-yellow-500 text-white rounded-r-md hover:bg-yellow-600"
                      >
                        %
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="mr-4 flex items-center">
                      <Field
                        type="checkbox"
                        name="isWeeklyChecked"
                        checked={values.isWeeklyChecked}
                        onChange={(e) => {
                          setFieldValue("isWeeklyChecked", e.target.checked);
                          setIsWeeklyChecked(e.target.checked);
                        }}
                        className="mr-2"
                      />
                      Weekly
                    </label>
                    <div className="relative w-full">
                      <Field
                        name="weeklyPercentage"
                        type="text"
                        disabled={!values.isWeeklyChecked}
                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-1 pl-10" // Adjust padding to make room for the button
                      />
                      <button
                        type="button"
                        disabled
                        className="absolute right-0 top-0 h-full px-4 py-1 bg-yellow-500 text-white rounded-r-md hover:bg-yellow-600"
                     
                      >
                        %
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="mr-4 flex items-center">
                      <Field
                        type="checkbox"
                        name="isMonthlyChecked"
                        checked={values.isMonthlyChecked}
                        onChange={(e) => {
                          setFieldValue("isMonthlyChecked", e.target.checked);
                          setIsMonthlyChecked(e.target.checked);
                        }}
                        className="mr-2"
                      />
                      Monthly
                    </label>
                    <div className="relative w-full">
                      <Field
                        name="monthlyPercentage"
                        type="text"
                        disabled={!values.isMonthlyChecked}
                        className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-1 pl-10" // Adjust padding to make room for the button
                      />
                      <button
                        type="button"
                        className="absolute right-0 top-0 h-full px-4 py-1 bg-yellow-500 text-white rounded-r-md hover:bg-yellow-600"
                        // Add your button functionality here
                      >
                        %
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-medium">
                    Profit Share
                  </label>
                  <Field
                    name="profitShare"
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-1"
                  />
                  {errors.profitShare && touched.profitShare ? (
                    <div className="text-red-600 mt-1">
                      {errors.profitShare}
                    </div>
                  ) : null}
                </div>
                <div>
                  <label className="block text-gray-700 font-medium">
                    Max Open Lot
                  </label>
                  <Field
                    name="maxOpenLot"
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-1"
                  />
                  {errors.maxOpenLot && touched.maxOpenLot ? (
                    <div className="text-red-600 mt-1">{errors.maxOpenLot}</div>
                  ) : null}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Leverage
                </label>
                <Field
                  as="select"
                  name="leverage"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-1"
                >
                  <option value="">Select...</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
                  <option value="800">800</option>
                  <option value="1000">1000</option>
                  <option value="2000">2000</option>
                </Field>
                {errors.leverage && touched.leverage ? (
                  <div className="text-red-600 mt-1">{errors.leverage}</div>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Addons
                </label>
                <div className="flex flex-wrap">
                  {[
                    "News trade",
                    "Extension",
                    "Carry forward",
                    "Repetition",
                    "EA allowed",
                    "HFT allowed",
                    "Scalping",
                  ].map((addon, index) => (
                    <label key={index} className="mr-4 mb-2 flex items-center">
                      <Field
                        type="checkbox"
                        name="addons"
                        value={addon}
                        className="mr-2"
                      />
                      {addon}
                    </label>
                  ))}
                </div>
                {errors.addons && touched.addons ? (
                  <div className="text-red-600 mt-1">{errors.addons}</div>
                ) : null}
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  className="bg-gray-300 w-1/2 text-gray-700 px-4 py-1 rounded-md mr-2 hover:bg-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className=" w-1/2 bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RiskRuleDrawer;
