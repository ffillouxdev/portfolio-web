"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';


function Blog() {
  const router = useRouter();
  return (
    <main className="min-h-screen h-auto flex flex-col items-center mt-5 md:mt-18 px-5 md:px-32">
      <div className="w-full md:w-3xl my-10">
        <div className="flex flex-col md:justify-between">
          <section>
              <div className="flex items-center">
                <Button onClick={()=> router.back()} variant="default" className="bg-transparent hover:scale-95 shadow-none text-black text-base hover:text-white">
                    <ChevronLeft />
                </Button>
                <h1 className="text-xl md:text-2xl font-bold ml-1">
                 Mes articles de blog<span className='text-[#41806C]'>.</span>
                </h1>
              </div>
              <hr className="border-b-2 border-[#41806C] w-36 my-4" />
            </section>  
            <div className="articles">
              {/* {} */}
            </div>
        </div>
      </div>
    </main>
  );
}

export default Blog;