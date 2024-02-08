import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
const Admin = () => {
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/statistics')
      .then(response => {
        setStatistics(response.data);
      })
      .catch(error => {
        console.error('Error fetching statistics:', error);
      });
  }, []);

  const chartData = {
    labels: statistics.map(room => room.name),
    datasets: [
      {
        label: 'Broj korisnika',
        data: statistics.map(room => room.participants_count),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
  
  
  return (
    <div className="container">
      <h2>Admin Panel - Statistike</h2>
      <div className="chart-container">
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                },
              }],
            },
          }}
        />
      </div>
    </div>
  );
};

export default Admin;
