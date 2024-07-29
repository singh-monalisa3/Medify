import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LandingPage = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('https://meddata-backend.onrender.com/states');
        setStates(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    if (selectedState) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(`https://meddata-backend.onrender.com/cities/${selectedState}`);
          setCities(response.data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };

      fetchCities();
    }
  }, [selectedState]);

  const handleSearch = () => {
    // Implement search functionality to redirect to SearchResultsPage
  };

  return (
    <div>
      <nav>
        {/* Add Navbar components */}
      </nav>
      <div className="search-section">
        <select onChange={(e) => setSelectedState(e.target.value)}>
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        <select onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default LandingPage;
