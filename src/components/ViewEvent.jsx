import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { TiDocumentText } from 'react-icons/ti';
import { MdOutlineModeEdit, MdDeleteOutline } from 'react-icons/md';

const ViewEvent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8080/event/getAll');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (eventId) => {
    console.log(`Edit event with ID: ${eventId}`);
  };

  const generatePDF = (event) => {
    const doc = new jsPDF();
    doc.text(`Event Name: ${event.event_name}`, 20, 10);
    doc.text(`Event Type: ${event.event_type}`, 20, 20);
    doc.text(`Venue: ${event.venue}`, 20, 30);
    doc.text(`Date: ${event.date}`, 20, 40);
    doc.text(`Email: ${event.email}`, 20, 50);
    doc.text(`Contact No: ${event.contactNo}`, 20, 60);
    doc.text(`No of People: ${event.noOfPpl}`, 20, 70);
    doc.text(`Price: Rs.${event.price}`, 20, 80);

    doc.save(`event_details_${event.id}.pdf`);
  };

  const handleDelete = async (id) => {
    try {
      console.log(await axios.delete(`http://localhost:8080/event/deleteEvent/${id}`));

      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Error deleting event', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-md overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-2 px-4 border-b">Event Name</th>
            <th className="py-2 px-4 border-b">Event Type</th>
            <th className="py-2 px-4 border-b">Venue</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Contact No</th>
            <th className="py-2 px-4 border-b">No of People</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td className="py-2 px-4 border-b">{event.event_name}</td>
              <td className="py-2 px-4 border-b">{event.event_type}</td>
              <td className="py-2 px-4 border-b">{event.venue}</td>
              <td className="py-2 px-4 border-b">{event.date}</td>
              <td className="py-2 px-4 border-b">{event.email}</td>
              <td className="py-2 px-4 border-b">{event.contactNo}</td>
              <td className="py-2 px-4 border-b">{event.noOfPpl}</td>
              <td className="py-2 px-4 border-b">{event.price}</td>
              <td className="py-2 px-4 border-b flex items-center">
                <button
                  onClick={() => handleEdit(event.id)}
                  className="text-blue-500 hover:underline mr-2"
                >
                  <MdOutlineModeEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="text-red-500 hover:underline mr-2"
                >
                  <MdDeleteOutline size={20} />
                </button>
                <button
                  onClick={() => generatePDF(event)}
                  className="text-green-500 hover:underline "
                >
                  <TiDocumentText size={20} className="mr-1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEvent;
