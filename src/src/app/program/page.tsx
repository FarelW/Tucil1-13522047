"use client"

import React, { useState } from 'react';
import ManualInput from './manualinput';
import FileInput from './fileinput';

const Program: React.FC = () => {
  const [inputOption, setInputOption] = useState<'manual' | 'file'>('manual');

  const handleInputChange = (option: 'manual' | 'file') => {
    setInputOption(option);
  };

  return (
    <div className="bg-black text-green-500 min-h-screen pt-[100px] relative">
      <div className="bg-black text-green-500 py-2 flex justify-center transition-all duration-500 z-10">
        <button
          className={`mr-2 px-4 py-2 rounded-full ${
            inputOption === 'manual' ? 'bg-green-500 text-black' : 'bg-transparent text-green-500'
          }`}
          onClick={() => handleInputChange('manual')}
        >
          Automatic Input
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            inputOption === 'file' ? 'bg-green-500 text-black' : 'bg-transparent text-green-500'
          }`}
          onClick={() => handleInputChange('file')}
        >
          File Input
        </button>
      </div>
      <div className="flex flex-col justify-center items-center pt-16">
        {inputOption === 'manual' ? <ManualInput /> : <FileInput />}
      </div>
    </div>
  );
};

export default Program;