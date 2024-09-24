import React from "react";
import { TfiAlarmClock } from "react-icons/tfi";
import { SiCcleaner } from "react-icons/si";
import { GiAchievement } from "react-icons/gi";
import { BsFillUmbrellaFill } from "react-icons/bs";

const Privileges = () => {
  const PrivilegesList = [
    {
      icon: <TfiAlarmClock className="w-full text-center  text-6xl " />,
      title: "Fast",
      description:
        "We pride ourselves on completing every job on time and on budget",
    },

    {
      icon: <SiCcleaner className="w-full text-center  text-6xl " />,
      title: "Clean",
      description:
        "Your home or office will look clean and tidy, from top to bottom",
    },
    {
      icon: <GiAchievement className="w-full text-center  text-6xl " />,
      title: "Quality",
      description: "Your satisfaction is guaranteed for every project",
    },
    {
      icon: <BsFillUmbrellaFill className="w-full text-center  text-6xl " />,
      title: "Insurance",
      description: "Our painters are fully bonded, for service you can trust ",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {PrivilegesList.map((item)=>(

      <div className="text-center w-full px-2">
        <div className=" border-b-4 text-gray-30 px-10 flex flex-col gap-y-2 items-center font-bold">
         {item.icon}
          {item.title}
        </div>
        <p className="text-sm w-1/2 md:w-full text-center mx-auto text-gray-400 mt-5 ">
          {item.description}
        </p>
      </div>
      ))}
    </div>
  );
};

export default Privileges;
