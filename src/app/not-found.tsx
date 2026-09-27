import Link from 'next/link';
import React from 'react';

const notfound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4 text-center">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-6">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/" 
        className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg transition-all"
      >
        Go Back Home
      </Link>
    </div>
    );
};

export default notfound;