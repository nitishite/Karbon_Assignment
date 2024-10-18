import React, { useState } from 'react';
import { Upload, XCircleIcon } from 'lucide-react';

const App = () => {
  const [fileName, setFileName] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      try {
        const content = await readFileContent(file);
        const parsedData = JSON.parse(content);
        setJsonData(parsedData);
        setError('');
      } catch (err) {
        setError('Error parsing JSON file. Please ensure it\'s a valid JSON.');
        setJsonData(null);
      }
    } else {
      setFileName('');
      setJsonData(null);
      setError('');
    }
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const clearFile = () => {
    setFileName('');
    setJsonData(null);
    setError('');
  };

  const handleSubmit = async () => {
    if (!jsonData) {
      setError('Please upload a valid JSON file before submitting.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.example.com/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Upload successful:', result);
      // Handle successful upload (e.g., show a success message)
    } catch (err) {
      setError('Error uploading data: ' + err.message);
    } finally {
      setIsLoading(false);
    }
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
                  <input id="file-upload" name="file-upload" type="file" accept=".json" className="sr-only" onChange={handleFileChange} />
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
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>
        <button 
          onClick={handleSubmit}
          disabled={isLoading || !jsonData}
          className={`w-full px-4 py-2 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center
            ${isLoading || !jsonData 
              ? 'bg-indigo-300 text-white cursor-not-allowed' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
        >
          {isLoading ? 'Uploading...' : 'Upload Model'}
        </button>
      </div>
    </div>
  );
};

export default App;