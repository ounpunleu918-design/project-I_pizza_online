import React from 'react';
import style from './style/Hero.module.css';

const Hero = () => {
  return (
    <div className={style.container}>
      <div 
        className="space-y-12 p-4 md:p-8 rounded-lg"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div 
          className="flex justify-center items-center gap-2 md:gap-4 lg:gap-5"
          style={{ flexWrap: "wrap" }}
        >
          <img 
            className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
            src="https://cdn-icons-png.flaticon.com/128/17673/17673020.png" 
            alt="" 
          />
          <h1 
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white"
            style={{ textAlign: "center" }}
          >
            D-Pizza
          </h1>
        </div>
        <h2 
          className="text-lg md:text-xl lg:text-2xl font-bold text-white"
          style={{ textAlign: "center" }}
        >
          Khám phá thế giới hương vị pizza tại D-Pizza!
        </h2>
      </div>
    </div>
  );
};

export default Hero;