import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin } from 'lucide-react';

interface Monument {
  _id: string;
  name: string;
  location: string;
  imageUrl: string;
  ticketPrice: number;
  category: string;
}

function Monuments() {
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonuments = async () => {
      try {
        const response = await axios.get('/api/monuments');
        setMonuments(response.data);
      } catch (error) {
        console.error('Error fetching monuments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonuments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Explore Monuments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {monuments.map((monument) => (
          <Link
            key={monument._id}
            to={`/monuments/${monument._id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="h-48 overflow-hidden">
              <img
                src={monument.imageUrl}
                alt={monument.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{monument.name}</h2>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{monument.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-orange-500 font-semibold">
                  ₹{monument.ticketPrice}
                </span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {monument.category}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Monuments;