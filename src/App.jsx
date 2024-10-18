import React, { useState } from 'react';
import { Upload, XCircleIcon } from 'lucide-react';

const App = () => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : '');
  };

  const clearFile = () => {
    setFileName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Model Upload</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload your data</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">JSON up to 10MB</p>
            </div>
          </div>
          {fileName && (
            <div className="mt-2 flex items-center justify-between bg-indigo-50 p-2 rounded-md">
              <span className="text-sm text-indigo-700 truncate">{fileName}</span>
              <button onClick={clearFile} className="text-indigo-600 hover:text-indigo-800">
                <XCircleIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        <button className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center">
          Upload Model
        </button>
      </div>
    </div>
  );
};

export default App;