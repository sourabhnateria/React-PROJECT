// src/components/Dashboard.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { fetchData } from '../redux/actions/dataActions';

const Dashboard = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.metrics);

  useEffect(() => {
    dispatch(fetchData()); // Fetch data from Firebase
  }, [dispatch]);

  const chartData = {
    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'],
    datasets: [
      {
        label: 'Engagement',
        data: data, // Replace with your data
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h1>Social Media Dashboard</h1>
      <Line data={chartData} />
    </div>
  );
};

export default Dashboard;