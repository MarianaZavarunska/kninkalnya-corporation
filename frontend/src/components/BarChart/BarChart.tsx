import React from 'react';
import { Bar, Pie, Line, Radar, Scatter, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useAppSelector } from '../../hooks/redux';

Chart.register(CategoryScale);

const BarChart = () => {
  const { locality } = useAppSelector((state) => state.localityReducer);
  const arrayOfLocalityDish = [];
  for (let i = 0; i < locality.length; i++) {
    const datum = locality[i];
    if (datum.Dish) {
      const a = datum.Dish.length;
      arrayOfLocalityDish.push(a);
    }
  }
  const nameOfLocality: string[] = [];
  locality.map((value) => nameOfLocality.push(value.name));
  return (
    <div style={{ width: 600, height: 400 }}>
      <h1>Кількість страв на певну позицію приготування</h1>
      <Bar
        data={{
          labels: nameOfLocality,
          datasets: [
            {
              label: '# кількість страв',
              data: arrayOfLocalityDish,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }}
        height={200}
        width={400}
        options={{
          maintainAspectRatio: false,
          scales: {},
        }}
      />
    </div>
  );
};

export { BarChart };
