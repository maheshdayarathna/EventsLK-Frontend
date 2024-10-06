import React from 'react';
import { useState } from 'react';
import axios from 'axios';

const AddEvent = () => {
  const [event_name, setEventname] = useState('');
  const [event_type, setEventype] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [noOfPpl, setnoOfPpl] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const url = `http://localhost:8080/event/addEvent`;

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const eventTypes = [
    'Musical Concert',
    'Gender Reveal Party',
    'Birthday Party',
    'Funeral',
    'Wedding',
  ];

  const eventPackages = {
    '0-20': 10000,
    '20-50': 20000,
    '50-100': 30000,
    '100-200': 50000,
    '200+':100000,
  };

  const handlePackageChange = (selectedPackage) => {
    setnoOfPpl(selectedPackage);
    setPrice(eventPackages[selectedPackage] || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contactNo.length !== 10 || isNaN(contactNo)) {
      alert('Contact Number needs to be valid and must be exactly 10 characters');
      return;
    }
    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      await axios.post(url, {
        event_name,
        event_type,
        venue,
        email,
        date,
        contactNo,
        noOfPpl,
        price,
      });

      setEventname('');
      setEventype('');
      setVenue('');
      setEmail('');
      setDate('');
      setContactNo('');
      setnoOfPpl('');
      setPrice('');

      console.log('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-400 rounded-md shadow-lg">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Event Details</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Event Name
          </label>
          <input
            value={event_name}
            onChange={(e) => setEventname(e.target.value)}
            placeholder="Enter event name"
            className="input-field"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Event Type
          </label>
          <select
            value={event_type}
            onChange={(e) => setEventype(e.target.value)}
            className="input-field"
          >
            <option value="" disabled>
              Select Event Type
            </option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Venue
          </label>
          <input
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            placeholder="Enter the Location"
            className="input-field"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ex - someone@gmail.com"
            className="input-field"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Contact No.
          </label>
          <input
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
            placeholder="Ex - 07XXXXXXXX"
            className="input-field"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Event Package
          </label>
          <select
            value={noOfPpl}
            onChange={(e) => handlePackageChange(e.target.value)}
            className="input-field"
          >
            <option value="" disabled>
              Select Event Package
            </option>
            {Object.keys(eventPackages).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-gray-600 mb-1">
            Price
          </label>
          <input
            value={price}
            placeholder="Price"
            className="input-field"
            readOnly
          />
        </div>
        <button
          className="btn-submit bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-md mt-6"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
