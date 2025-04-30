import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import React from 'react';

function About() {
  return (
    <main className="min-h-screen h-auto flex flex-col items-center mt-5 md:mt-18 px-5 md:px-32">
      <div className="max-w-full md:max-w-3xl my-10">
        <div className="flex flex-col md:justify-between">
          <section>
            <h1 className="text-xl md:text-2xl font-bold">
              A propos de moi <span className='text-[#41806C]'>.</span>
            </h1>
            <hr className="border-b-2 border-[#41806C] w-36 my-2" />
            <h2>Tout ce qui est bon à savoir, sur mes compétences, ce qui m'animent dans la vie etc...</h2>
          </section>
          <div className="flex items-center space-x-5">
            <Card className="w-full mt-8">
              <CardHeader>
                
              </CardHeader>
              <CardContent>
              
              </CardContent>
              <CardFooter className="flex justify-center space-x-4">
                
              </CardFooter>
            </Card>
            <p>fsdfdsfds</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default About;