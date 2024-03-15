import React, { useState } from 'react';
import AddGraduationForm from './AddGraduationForm';
import AddSeniorSecondaryForm from './AddSeniorSecondaryForm';
import AddSecondary from './AddSecondary';
import AddDiploma from "./AddDiploma"

const AddEducationForm = ({ onClose }) => {

  const [educationType, setEducationType] = useState('');

  const handleAddEducation = (type) => {
    setEducationType(type);
  };

  const renderEducationForm = () => {
    // Render the related form based on the selected education type
    switch (educationType) {
      case 'graduation':
        return <GraduationForm onClose={onClose} />;
      case 'senior_secondary':
        return <SeniorSecondaryForm onClose={onClose} />;
      case 'secondary':
        return <SecondaryForm onClose={onClose} />;
      case 'diploma':
        return <DiplomaForm onClose={onClose} />;
      case 'phd':
        return <PhdForm onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-[60vw] mx-auto mt-5 p-6 bg-white rounded-md shadow-md relative">
      <button
        type="button"
        className="absolute right-5 top-5 bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:border-gray-300"
        onClick={onClose}
      >
        Close Form
      </button>
      {educationType && (
        <button
          type="button"
          className="absolute right-5 top-5 bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500 focus:outline-none focus:ring focus:border-gray-300"
          onClick={() => setEducationType('')}
        >
          Close Form
        </button>
      )}
      <h2 className="text-2xl font-semibold mb-5">Add Education</h2>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => handleAddEducation('graduation')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Add Graduation/Post Graduation
        </button>
        <button
          onClick={() => handleAddEducation('senior_secondary')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-green-300"
        >
          Add Senior Secondary (XII)
        </button>
        <button
          onClick={() => handleAddEducation('secondary')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-green-300"
        >
          Add Secondary (X)
        </button>
        <button
          onClick={() => handleAddEducation('diploma')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-green-300"
        >
          Add Diploma
        </button>
        <button
          onClick={() => handleAddEducation('phd')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-green-300"
        >
          Add PhD
        </button>
        {/* Add buttons for other education types */}
      </div>
      {/* Render the related education form */}
      {renderEducationForm()}
    </div>
  );
};

export default AddEducationForm;

const GraduationForm = ({ onClose }) => {
  // Implement your graduation form here
  return (
    <div className='absolute top-16 left-0 min-h-[60vh] bg-slate-100 w-full border'>
      <AddGraduationForm onClose={() => onClose()} />
    </div>
  );
};


const SeniorSecondaryForm = ({ onClose }) => {
  // Implement your senior secondary form here
  return (
    <div className='ADD absolute top-16 left-0 min-h-[60vh] bg-slate-100 w-full border'>
      <AddSeniorSecondaryForm onClose={() => onClose()} />
    </div>
  );
};

const SecondaryForm = ({ onClose }) => {
  // Implement your  secondary form here
  return (
    <div className='ADD absolute top-16 left-0 min-h-[60vh] bg-slate-100 w-full border'>
      <AddSecondary onClose={() => onClose()} />
    </div>
  );
};

const DiplomaForm = ({ onClose }) => {
  return (
    <div className='ADD absolute top-16 left-0 min-h-[60vh] bg-slate-100 w-full border'>
      <AddDiploma onClose={() => onClose()} />
    </div>
  );
};

const PhdForm = ({ onClose }) => {
  // Implement your PhD form here
  return <div>PhD Form</div>;
};
