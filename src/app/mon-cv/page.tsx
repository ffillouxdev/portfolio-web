'use client';
import React from 'react';

const CvPage = () => {
  return (
    <div className="w-full min-h-screen flex items-start mt-10 justify-center">
      <iframe
        src="/cv-filloux-florian.pdf"
        className="w-[90%] md:w-[60%] h-[80vh] border-none rounded-md bg-gray-100"
        title="CV de Florian Filloux"
      />
    </div>
  );
};

export default CvPage;
