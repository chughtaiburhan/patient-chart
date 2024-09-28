import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register the components globally
Chart.register(...registerables);

function App() {
  const [donationData, setDonationData] = useState(null);

  useEffect(() => {
    const axiosConfig = {
      headers: {
        Accept: 'application/json',
      },
    };

    axios
      .get('https://mocki.io/v1/e83a2edc-f012-491f-b4cd-488eacccfa80', axiosConfig)
      .then((res) => {
        const distributionData = res.data.bloodDistribution;
        console.log('API Response:', distributionData);

        if (distributionData && distributionData.length > 0) {
          setDonationData({
            labels: distributionData.map((individualData) => individualData.year),
            datasets: [
              {
                label: 'Amount of O+ Blood Donated',
                data: distributionData.map((individualData) => individualData.distribution['O+']),
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
              },
            ],
          });
        } else {
          console.log('No data found');
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div 
      className='wrapper'
      style={{
        backgroundColor: '#f5f5f5', // Background color
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      }}
    >
      {donationData ? (
        <div style={{ height: '400px', width: '600px' }}>
          <Line data={donationData} />
        </div>
      ) : (
        <div>Donation Data is loading...</div>
      )}
    </div>
  );
}

export default App;
