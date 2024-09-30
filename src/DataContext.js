import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const fetchData = async () => {
    try {
      const id = localStorage.getItem("id");
      const response = await axios.get(`${apiBaseUrl}/homepageapi/${id}`);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
     console.log(error);
    } finally {
      console.log(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
};
