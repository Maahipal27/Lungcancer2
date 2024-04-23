import React from "react";

const Front = () => {
    return (
        

<div className=" bg-black  flex-col flex md:flex-row  justify-between items-center h-full md:h-screen py-5 ">
     <div className=" px-20 flex flex-col justify-evenly">
        <h1 className="text-blue-300 text-5xl m-3 font-bold text-center">Lung Cancer Detection</h1>
        <p className="text-white text-xl text-center">Welcome to our Advanced Lung Cancer Detection Platform, driven by state-of-the-art machine learning technology. Experience unparalleled precision in early detection and personalized diagnostics for a proactive approach to your lung health.</p>
        </div>
      <img src="./images/lungss.png" className="max-w-1/2 h-full pr-5" />
    </div>
      
     
        

    );
};
export default Front;