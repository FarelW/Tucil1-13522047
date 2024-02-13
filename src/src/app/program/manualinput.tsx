import React, { useState } from 'react';

interface Result {
  matrix: string[][];
  opt: { Col: number; Row: number; Token: string }[];
  time: number;
  total: number;
  sequences: {Sequence: string [], Reward: number}[];
}

const ManualInput: React.FC = () => {
  const [uniqueTokenTotal, setUniqueTokenTotal] = useState<number>(0);
  const [uniqueTokenStrings, setUniqueTokenStrings] = useState<string>('');
  const [bufferSize, setBufferSize] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [matrixWeight, setMatrixWeight] = useState<number>(0);
  const [sequenceTotal1, setSequenceTotal1] = useState<number>(0);
  const [sequenceTotal2, setSequenceTotal2] = useState<number>(0);
  const [result, setResult] = useState<Result | null>(null);
  
  const allFieldsFilled = (
    uniqueTokenTotal: number,
    bufferSize: number,
    height: number,
    matrixWeight: number,
    sequenceTotal1: number,
    sequenceTotal2: number
  ): boolean => {
    return (
      uniqueTokenTotal !== 0 &&
      bufferSize !== 0 &&
      height !== 0 &&
      matrixWeight !== 0 &&
      sequenceTotal1 !== 0 &&
      sequenceTotal2 !== 0
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const thedata = {
      uniqueTokenTotal:uniqueTokenTotal,
      uniqueToken:uniqueTokenStrings,
      bufferSize:bufferSize,
      height:height,
      matrixWeight:matrixWeight,
      sequenceTotal1:sequenceTotal1,
      sequenceTotal2:sequenceTotal2
    }

    const tokens = uniqueTokenStrings.split(' ');
    if (tokens.length !== uniqueTokenTotal) {
        alert("The number of unique tokens doesn't match the unique token total.");
        return;
    }
    
    try {
      const response = await fetch('http://localhost:8080/manualinput', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(thedata),
      });
  
      if (response.ok) {
        const data = await response.json();
        setResult(data);
        console.log(data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const downloadTxtFile = () => {
    if (result) {
      let content = `${result.total}\n`;
  
      if (result.opt && result.opt.length > 0) {
        const optTokens = result.opt.map(item => item.Token).join(' ');
        content += `${optTokens}\n`;
        result.opt.forEach(item => {
          content += `${item.Row}, ${item.Col}\n`;
        });
      }

      content += `${result.time} ms`;
  
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'result.txt';
      document.body.appendChild(a);
      a.click();
  
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 md:w-[500px] w-300px flex flex-col justify-center ">
      <label className="text-green-500 mb-2">
          Unique token Total :
          <input
            type="number"
            className="bg-gray-800 text-green-500 px-8 w-full p-2 rounded block mb-1"
            placeholder="Enter unique token total..."
            value={uniqueTokenTotal}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 0) {
                setUniqueTokenTotal(value);
              }
            }}
          />
        </label>
        {uniqueTokenTotal > 1 && (
          <label className="text-green-500 mb-2">
            Unique Token Strings :
            <input
              className="bg-gray-800 text-green-500 px-8 w-full p-2 rounded block mb-1"
              placeholder="input Token here    ( 1C BD 55 )"
              value={uniqueTokenStrings} // Bind value to state
              onChange={(e) => setUniqueTokenStrings(e.target.value)} // Update state onChange
            />
          </label>
        )}
        <label className="text-green-500 mb-2">
          Buffer Size :
          <input
            type="number"
            className="bg-gray-800 text-green-500 px-8 w-full p-2 rounded block mb-1"
            placeholder="Enter unique token total..."
            value={bufferSize}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 0) {
                setBufferSize(value);
              }
            }}
          />
        </label>
        <label className="text-green-500 mb-2">
          Height :
          <input
            type="number"
            className="bg-gray-800 text-green-500 px-8 w-full p-2 rounded block mb-1"
            placeholder="Enter unique token total..."
            value={height}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 0) {
                setHeight(value);
              }
            }}
          />
        </label>
        <label className="text-green-500 mb-2">
          Weight:
          <input
            type="number"
            className="bg-gray-800 text-green-500 px-8 w-full p-2 rounded block mb-1"
            placeholder="Enter unique token total..."
            value={matrixWeight}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 0) {
                setMatrixWeight(value);
              }
            }}
          />
        </label>
        <label className="text-green-500 mb-2">
          Sequence Total :
          <input
            type="number"
            className="bg-gray-800 text-green-500 px-8 w-full p-2 rounded block mb-1"
            placeholder="Enter unique token total..."
            value={sequenceTotal1}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 0) {
                setSequenceTotal1(value);
              }
            }}
          />
        </label>
        <label className="text-green-500 mb-2">
          Longest Sequence :
          <input
            type="number"
            className="bg-gray-800 text-green-500 px-8 w-full p-2 rounded block mb-1"
            placeholder="Enter unique token total..."
            value={sequenceTotal2}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 0) {
                setSequenceTotal2(value);
              }
            }}
          />
        </label>
        {allFieldsFilled(uniqueTokenTotal, bufferSize, height, matrixWeight, sequenceTotal1, sequenceTotal2) && (
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-4">
            Submit
          </button>
        )}
      </form>

      {result && (
      <div className="mt-4 w-full mb-20">
        <h2 className="text-xl font-bold mb-4">Result</h2>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <h3 className="text-lg font-semibold mb-2">Matrix:</h3>
            <table className="table-auto border-collapse border border-gray-500">
              <tbody>
              {result.matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((token, colIndex) => {
                    const isMatchingSequence = result.opt && result.opt.some((item) => item.Row === rowIndex && item.Col === colIndex);
                    const cellClassName = isMatchingSequence ? 'border border-gray-400 p-2 bg-green-200' : 'border border-gray-400 p-2';
                    return (
                      <td key={colIndex} className={cellClassName}>{token}</td>
                    );
                  })}
                </tr>
              ))}
              </tbody>
            </table>
            {result.sequences.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Sequences :</h3>
                <ul className="text-sm">
                  {result.sequences.map((sequence, index) => (
                    <li key={index} className="mb-1">
                      <span className="font-semibold">Sequence:</span> {sequence.Sequence.join(', ')},{' '}
                      <span className="font-semibold">Reward:</span> {sequence.Reward}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-1/2 md:ml-4">
            <h3 className="text-lg font-semibold mb-2">Steps :</h3>
            {result.opt && result.opt.length > 0 && (
              <ul>
                {result.opt.map((item, index) => (
                  <li key={index} className="mb-2">
                    <span className="font-semibold">{index+1}. Row:</span> {item.Row},{' '}
                    <span className="font-semibold">Col:</span> {item.Col},{' '}
                    <span className="font-semibold">Token:</span> {item.Token}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4">
              <span className="font-semibold">Time:</span> {result.time} ms
            </p>
            <p>
              <span className="font-semibold">Total point:</span> {result.total}
            </p>
            <button onClick={downloadTxtFile} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
              Download Result as TXT
            </button>
          </div>
        </div>
      </div>
    )}

    </div>
  );
};

export default ManualInput;
