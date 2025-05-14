import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Monument {
  _id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  ticketPrice: number;
  openingHours: string;
  category: string;
}

function MonumentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [monument, setMonument] = useState<Monument | null>(null);
  const [loading, setLoading] = useState(true);
  const [visitDate, setVisitDate] = useState('');
  const [numberOfTickets, setNumberOfTickets] = useState(1);

  useEffect(() => {
    const fetchMonument = async () => {
      try {
        const response = await axios.get(`/api/monuments/${id}`);
        setMonument(response.data);
      } catch (error) {
        console.error('Error fetching monument:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonument();
  }, [id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await axios.post('/api/bookings', {
        monumentId: id,
        visitDate,
        numberOfTickets,
        totalAmount: monument!.ticketPrice * numberOfTickets
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      
      navigate('/my-bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[500px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!monument) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <p className="text-center text-xl">Monument not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src={monument.imageUrl}
            alt={monument.name}
            className="w-full h-[400px] object-cover"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{monument.name}</h1>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{monument.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>{monument.openingHours}</span>
            </div>
            <div className="text-2xl font-bold text-orange-500">
              ₹{monument.ticketPrice} per ticket
            </div>
          </div>

          <p className="text-gray-700 mb-8">{monument.description}</p>

          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Visit Date</label>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Number of Tickets</label>
              <input
                type="number"
                value={numberOfTickets}
                onChange={(e) => setNumberOfTickets(parseInt(e.target.value))}
                min="1"
                max="10"
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Total Amount</span>
                <span className="font-bold">₹{monument.ticketPrice * numberOfTickets}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors"
            >
              {user ? 'Book Now' : 'Login to Book'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MonumentDetail;