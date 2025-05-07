'use client';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const CvPage = () => {
  const [montpellierCV, setMontpellierCV] = useState<boolean>(false); 

  function handleCVchoiceClick(location: string) {
    if (location === 'Montpellier') {
      setMontpellierCV(true);
    } else {
      setMontpellierCV(false);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center mt-10">
      <div className="flex space-y-4 md:space-x-4 items-center md:items-start flex-col md:flex-row mb-6">
        <Button className="px-9" variant="default" onClick={() => handleCVchoiceClick('Lyon')}>
          CV - Lyon
        </Button>
        <Button variant="default" onClick={() => handleCVchoiceClick('Montpellier')}>
          CV - Montpellier
        </Button>
      </div>
      <iframe
        src={
          montpellierCV
            ? '/cv-filloux-florian-montpellier.pdf'
            : '/cv-filloux-florian-lyon.pdf'
        }
        className="w-[90%] md:w-[60%] h-[80vh] border-none rounded-md bg-gray-100"
        title="CV de Florian Filloux"
      />
    </div>
  );
};

export default CvPage;
