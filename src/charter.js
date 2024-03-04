import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const statMappings = {
  "defenseRating": {
    "Below Average": 0,
    "Average": 1,
    "Good": 2,
    "Excellent": 3
  },
  "driverSkill": {
    "Not Effective": 0,
    "Average": 1,
    "Very Effective": 2
  },
  "leaveStartingZone": {
    "false": 0,
    "true": 1
  },
  "teleopPickupFrom": {
    "not attempted": 0,
    "source": 1,
    "floor": 2,
    "both": 3
    
  }
};


const Dashboard = () => {
  // State definitions for graph rendering and stat mean calculation
  const [firstDataSet, setFirstDataSet] = useState({ labels: [], datasets: [] });
  const [secondDataSet, setSecondDataSet] = useState({ labels: [], datasets: [] });
  const [xAxisInput1, setXAxisInput1] = useState('');
  const [yAxisInput1, setYAxisInput1] = useState('');
  const [xAxisInput2, setXAxisInput2] = useState('');
  const [yAxisInput2, setYAxisInput2] = useState('');
  const [teamNumber, setTeamNumber] = useState('');
  const [teamNumber1, setTeamNumber1] = useState('');
  const [teamNumber2, setTeamNumber2] = useState('');
  const [statName, setStatName] = useState('');
  const [meanValue, setMeanValue] = useState(null);
  const [standardDeviation, setStandardDeviation] = useState(null);
  const [median, setMedian] = useState(null);


  useEffect(() => {
    const fetchDataForTeam = async (teamNumber, xAxisInput, yAxisInput, setColor) => {
      if (!xAxisInput || !yAxisInput || !teamNumber) return null;
      try {
        const response = await axios.get("http://localhost:3001/chart-data");
        let apiData = response.data.filter(data => data.teamNumber.toString() === teamNumber);

        const sortedData = apiData.sort((a, b) => {
          const xCompare = a[xAxisInput] - b[xAxisInput];
          return xCompare === 0 ? a[yAxisInput] - b[yAxisInput] : xCompare;
        });

        return {
          label: `Team ${teamNumber}`,
          data: sortedData.map(data => ({ x: data[xAxisInput], y: data[yAxisInput] })),
          borderColor: setColor,
          backgroundColor: setColor,
          fill: false,
          tension: 0.1,
        };
      } catch (err) {
        console.error('Error fetching data:', err);
        return null;
      }
    };

    const fetchAndSetDataForFirstGraph = async () => {
      const dataSet = await fetchDataForTeam(teamNumber, xAxisInput1, yAxisInput1, 'rgb(75, 192, 192)');
      if (dataSet) {
        setFirstDataSet({
          labels: dataSet.data.map(d => d.x),
          datasets: [dataSet],
        });
      }
    };

    const fetchAndSetDataForSecondGraph = async () => {
      const dataSet1 = await fetchDataForTeam(teamNumber1, xAxisInput2, yAxisInput2, 'rgb(75, 192, 192)');
      const dataSet2 = await fetchDataForTeam(teamNumber2, xAxisInput2, yAxisInput2, 'rgb(192, 75, 75)');
      setSecondDataSet({
        labels: [...new Set([...(dataSet1?.data.map(d => d.x) || []), ...(dataSet2?.data.map(d => d.x) || [])])].sort((a, b) => a - b),
        datasets: [dataSet1, dataSet2].filter(Boolean),
      });
    };

    if (teamNumber) fetchAndSetDataForFirstGraph();
    fetchAndSetDataForSecondGraph();
  }, [teamNumber, teamNumber1, teamNumber2, xAxisInput1, yAxisInput1, xAxisInput2, yAxisInput2]);

  useEffect(() => {
    const calculateStatistics = async () => {
      if (!statName) {
        setMeanValue(null);
        setStandardDeviation(null);
        setMedian(null);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3001/chart-data");
        const data = response.data;

        const isQualitative = Object.keys(statMappings).includes(statName);
        let statValues = data.map(item => {
          if (isQualitative && statMappings[statName][item[statName]] !== undefined) {
            return statMappings[statName][item[statName]];
          } else if (!isNaN(item[statName])) {
            return parseFloat(item[statName]);
          }
          return null;
        }).filter(val => val !== null);

        // Calculate mean
        const mean = statValues.reduce((acc, cur) => acc + cur, 0) / statValues.length || 0;
        setMeanValue(mean);

        // Calculate standard deviation
        const variance = statValues.reduce((acc, cur) => acc + (cur - mean) ** 2, 0) / statValues.length;
        setStandardDeviation(Math.sqrt(variance));

        // Calculate median
        statValues.sort((a, b) => a - b);
        const mid = Math.floor(statValues.length / 2);
        setMedian(statValues.length % 2 !== 0 ? statValues[mid] : (statValues[mid - 1] + statValues[mid]) / 2);
      } catch (err) {
        console.error('Error calculating statistics:', err);
        setMeanValue(null);
        setStandardDeviation(null);
        setMedian(null);
      }
    };

    calculateStatistics();
  }, [statName]);


  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'black',
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'black',
        },
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'black',
        }
      },
      title: {
        display: true,
        text: 'Team Comparison',
        color: 'black',
      },
    },
    elements: {
      point: {
        backgroundColor: 'black',
      }
    },
  };

  return (
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Inputs and Graph for the 1st Team */}
      <input
        type="text"
        placeholder="X-Axis Data Field for Graph 1"
        value={xAxisInput1}
        onChange={(e) => setXAxisInput1(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        placeholder="Y-Axis Data Field for Graph 1"
        value={yAxisInput1}
        onChange={(e) => setYAxisInput1(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        placeholder="Team Number for Graph 1"
        value={teamNumber}
        onChange={(e) => setTeamNumber(e.target.value)}
        style={{ marginRight: '10px', marginBottom: '20px' }}
      />
      <div style={{ height: '500px', marginBottom: '20px' }}>
        <Line data={firstDataSet} options={{...chartOptions, title: { ...chartOptions.plugins.title, text: `Graph 1: Team ${teamNumber}` }}} />
      </div>

      {/* Inputs for the 2nd Graph */}
      <input
        type="text"
        placeholder="X-Axis Data Field for Graph 2"
        value={xAxisInput2}
        onChange={(e) => setXAxisInput2(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        placeholder="Y-Axis Data Field for Graph 2"
        value={yAxisInput2}
        onChange={(e) => setYAxisInput2(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        placeholder="Team Number 1 for Graph 2"
        value={teamNumber1}
        onChange={(e) => setTeamNumber1(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <input
        type="text"
        placeholder="Team Number 2 for Graph 2"
        value={teamNumber2}
        onChange={(e) => setTeamNumber2(e.target.value)}
        style={{ marginRight: '10px', marginBottom: '20px' }}
      />
      {/* Graph for the 2nd and 3rd Teams */}
      <div style={{ height: '500px' }}>
        <Line data={secondDataSet} options={{...chartOptions, title: { ...chartOptions.plugins.title, text: `Graph 2: Team ${teamNumber1} vs Team ${teamNumber2}` }}} />
      </div>
      <input
        type="text"
        placeholder="Enter Stat Name"
        value={statName}
        onChange={(e) => setStatName(e.target.value)}
        style={{ margin: '10px 0', padding: '10px', width: 'calc(100% - 20px)', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <div>
        {meanValue !== null && <p>Mean: {meanValue.toFixed(2)}</p>}
        {standardDeviation !== null && <p>Standard Deviation: {standardDeviation.toFixed(2)}</p>}
        {median !== null && <p>Median: {median.toFixed(2)}</p>}
      </div>
    </div>
  );
};

export default Dashboard;