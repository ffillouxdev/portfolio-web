'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const CvPage = () => {
  const [montpellierCV, setMontpellierCV] = useState(false);

  const handleCVchoiceClick = (location: string) => {
    setMontpellierCV(location === 'Montpellier');
  };

  return (
    <main className="w-full min-h-screen flex flex-col items-center mt-10 px-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
        <Button
          className="px-9"
          variant={montpellierCV ? 'outline' : 'default'}
          onClick={() => handleCVchoiceClick('Lyon')}
        >
          CV - Lyon
        </Button>
        <Button
          variant={montpellierCV ? 'default' : 'outline'}
          onClick={() => handleCVchoiceClick('Montpellier')}
        >
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
      <section className='w-full flex items-start flex-col max-w-3xl my-10'>
        <h1 className="text-xl md:text-2xl font-bold ml-1">
        Pour me contacter personnelement : 
        </h1>
        <hr className="border-b-2 border-[#41806C] w-36 my-4" />
        <p className="text-sm">
          Vous pouvez m’envoyer un mail à {" "}
          <a href="mailto:fillouxflorian56@gmail.com" className="underline">fillouxflorian56@gmail.com</a>.
        </p>
      </section>
    </main>
  );
};

export default CvPage;
