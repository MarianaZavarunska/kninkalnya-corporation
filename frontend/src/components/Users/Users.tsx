import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAll } from '../../store';
import 'react-calendar/dist/Calendar.css';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { IUser } from '../../interfaces';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);

const Users: FC = () => {
  const { allUser } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAll());
  }, []);

  const res = [
    { month: 'Січень', elems: [] },
    { month: 'Лютий', elems: [] },
    { month: 'Березень', elems: [] },
    { month: 'Квітень', elems: [] },
    { month: 'Травень', elems: [] },
    { month: 'Червень', elems: [] },
    { month: 'Липень', elems: [] },
    { month: 'Серпень', elems: [] },
    { month: 'Вересень', elems: [] },
    { month: 'Жовтень', elems: [] },
    { month: 'Листопад', elems: [] },
    { month: 'Грудень', elems: [] },
  ];

  allUser.forEach((e: IUser) => {
    const month = parseInt(e.createdAt.substring(5, 7)) - 1;
    // eslint-disable-next-line
    // @ts-ignore
    res[month].elems.push(e);
  });
  res.forEach(function (e) {
    if (e.elems.length > 0) {
      e.elems.forEach((n) => {
        console.log(e);
      });
    }
  });
  const arrOfMonth = res.map((res) => res.month);
  const arrOfElement = res.map((res) => res.elems.length);

  const finalObj: any = {};
  allUser.forEach((games) => {
    const date = games.createdAt.split('T')[0];
    if (finalObj[date]) {
      finalObj[date].push(games);
    } else {
      finalObj[date] = [games];
    }
  });
  for (const finalObjKey in finalObj) {
    console.log(finalObjKey);
  }

  const countOfDays = [];
  const arrOfDays = [];
  for (const finalObjElement in finalObj) {
    arrOfDays.push(finalObjElement);
    countOfDays.push(finalObjElement[0].length);
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 600, height: 400 }}>
        <h1>Статистика зa рік нових юзерів</h1>
        <Pie
          data={{
            labels: arrOfMonth,
            datasets: [
              {
                label: '# кількість нових користувачів',
                data: arrOfElement,
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

      <div style={{ width: 600, height: 400 }}>
        <h1>Статистика зa кожен день нових юзерів</h1>
        <Line
          data={{
            labels: arrOfDays.sort(),
            datasets: [
              {
                label: '# кількість нових користувачів',
                data: countOfDays,
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
      {/*<Calendar calendarType={"US"} locale={'uk'} selectRange={true} onChange={onChange}  />*/}
    </div>
  );
};

export { Users };
