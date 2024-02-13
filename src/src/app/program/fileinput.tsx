import React, { useCallback, useState } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';

interface Result {
  matrix: string[][];
  opt: { Col: number; Row: number; Token: string }[];
  time: number;
  total: number;
  sequences: {Sequence: string [], Reward: number}[];
}

const FileInput: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    console.log('Accepted files:', acceptedFiles);
    console.log('Rejected files:', fileRejections);

    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        const response = await fetch('http://localhost:8080/fileinput', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          setResult(data);
          console.log(data);
        } else {
          console.error('Error uploading file:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.log('No file selected!');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop
  });

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
    <div className="md:flex md:flex-col md:items-center">
    {selectedFile ? (
      <div className="mt-4 md:w-[500px] w-full p-4 border border-green-500 rounded">
        <p>Selected file: {selectedFile.name}</p>
      </div>
    ) : (
      <div
        {...getRootProps()}
        className="mt-4 p-4 w-full border border-green-500 rounded cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="w-full text-center text-lg">
          {getRootProps().isDragActive
            ? 'Drop the .txt file here...'
            : 'Drag \'n\' drop a .txt file here or click to select'}
        </p>
      </div>
    )}
    {selectedFile && (
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 w-full text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    )}

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

export default FileInput;
