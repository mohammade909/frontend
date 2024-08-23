// PackageCard.js

// Packages.js
import React, { useState, useEffect } from "react";
import PackageDrawer from "./PackageDrawer";
import { fetchAllPackages } from "../../../actions/package";
import { useSelector, useDispatch } from "react-redux";
import PackageCard from "./PackageCard";


const Packages = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
 const {packages} = useSelector((state)=>state.packages)
  useEffect(()=>{
   dispatch(fetchAllPackages())
  },[])
  // Array of data objects representing packages1
console.log(packages);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold">Packages</h1>
          <button
            onClick={() => setOpen(!open)}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
          >
            Add Package
          </button>
        </div>
        {packages.map((pkg, index) => (
          <PackageCard key={index} {...pkg} />
        ))}
      </div>
      <PackageDrawer open={open} setOpen={setOpen} />
    </div>
  );
};

export default Packages;
