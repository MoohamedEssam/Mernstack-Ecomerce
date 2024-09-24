import React from "react";
import { featureList } from "./FeatureList";
import {motion} from 'framer-motion'

const Features = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 ,delay:.5 }}
     className="my-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 px-14 gap-4">
        {featureList.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-neutral-50 drop-shadow-sm hover:shadow-sm rounded-md transition-all duration-75 flex items-center justify-center flex-col p-2 border border-gray-100 py-3 px-4"
            >
              <img src={item.img} alt="img" className="flex items-center justify-center " />
              <h3 className="text-slate-400 mt-3 text-sm my-3">{item.name}</h3>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Features;
