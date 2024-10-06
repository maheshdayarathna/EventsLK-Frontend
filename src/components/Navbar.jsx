import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navigation = [
    {
      id: 1,
      link: 'home',
      name: 'Home',
    },
    {
      id: 2,
      link: 'addevent',
      name: 'Add Event',
    },
    {
      id: 3,
      link: 'viewevents',
      name: 'View Event',
    },
  ];

  return (
    <div>
      <nav className="border-gray-500 bg-gray-300 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">EventsLK</span>
          </Link>
          <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link to={item.link} className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
