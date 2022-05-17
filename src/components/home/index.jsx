// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import style from './style.module.css';
import Image from 'next/image';
import moment from 'moment';
import 'moment/locale/vi';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import {FORECAST_KEY} from '../../constants/queryKeys';
import {getForecast} from '../../api/apis';

moment.locale('vi');

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([FORECAST_KEY], () => getForecast());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}


const HomePage = () => {
  // eslint-disable-next-line no-unused-vars
  const [now, setNow] = useState({
    date: '',
    time: ''
  });

  const {data} = useQuery(
    [FORECAST_KEY],
    () => getForecast(),
    {keepPreviousData: true, staleTime: Infinity}
  );
  console.log(data);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow({
        date: `${moment().format('dddd')}, ${moment().format('[ngày] DD [tháng] MM [năm] YYYY')}`,
        time: moment().format('HH:mm:ss')
      });
    }, 1000);
    return () => { clearInterval(timer); };
  },[]);
  
  const replaceDimension = (url = '') => {
    return url.replace('64x64', '128x128');
  };

  return(
    <>
      <div className={ `w-full md:flex items-center justify-between py-2 mb-4 text-slate-600 ${style.trackingInExpand}` }>
        <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start">
          <Image src='/assets/images/weather_icon.png' width={ 70 } height={ 70 } alt='icon' />
          <p className='text-[18px] ml-2 pt-1 font-bold text-green-600'>Thời tiết Hà Nội</p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">

        </div>
      </div>
      <div className={ `w-full md:flex bg-white px-4 md:px-6 pt-4 pb-8 text-slate-600 rounded-md text-center mb-6 ${style.boxToday}` }>
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
          <p className='text-[30px]'>Thời tiết hiện tại</p>
          <p className={ `${style.timer} text-xl pt-2` }>{ now.date }</p>
          <p className='text-2xl pt-2'>{ now.time }</p>
        </div>
        <div className="w-full md:w-1/2 text-[15px]">
          <Image src={ data ? `https:${ replaceDimension(data.current.condition.icon)}` : '/assets/images/weather_icon.png' } width={ 96 } height={ 96 } alt='icon' />
          <p className='font-bold mb-1'>{ data ? data.current.condition.text : '' }</p>
          <p className='font-bold text-green-500 mb-1'> {data ? `${data.current.temp_c}°C` : '' } / {data ? `${data.current.temp_f}°F` : '' } </p>
          <p className='mb-1'>Mây che phủ: { data ? `${data.current.cloud}%` : '' }</p>
          <p>Dữ liệu cập nhật lúc <span className='font-bold'>{ data ? moment(data.current.last_updated, 'YYYY-MM-DD HH:mm').format('DD/MM/YYYY HH:mm') : '' }</span></p>
        </div>
      </div>
      <div className={ `w-full bg-white px-4 md:px-6 pt-4 pb-8 text-slate-600 rounded-md mb-6 ${style.boxToday}` }>
        <p className='text-[16px] font-bold'>Thời tiết trong ngày</p>
        <div className="w-full flex">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            <Image src={ data ? `https:${ replaceDimension(data.forecast.forecastday[0].day.condition.icon)}` : '/assets/images/weather_icon.png' } width={ 96 } height={ 96 } alt='icon' />
            <p className='font-bold mb-1'>{ data ? data.forecast.forecastday[0].day.condition.text : '' }</p>
            <p>Khả năng có mưa: <span className='text-red-500 font-bold'>{ data ? `${data.forecast.forecastday[0].day.daily_will_it_rain}%` : '' }</span></p>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-[15px]">
            <p className='mb-1'>Nhiệt độ thấp nhất: <span className='text-green-500 font-bold'>{ data ? `${data.forecast.forecastday[0].day.mintemp_c}°C / ${data.forecast.forecastday[0].day.mintemp_f}°F` : '' }</span></p>
            <p className='mb-1'>Nhiệt độ cao nhất: <span className='text-red-500 font-bold'>{ data ? `${data.forecast.forecastday[0].day.maxtemp_c}°C / ${data.forecast.forecastday[0].day.maxtemp_f}°F` : '' }</span></p>
            <p className='mb-1'>Nhiệt độ trung bình: <span className='font-bold'>{ data ? `${data.forecast.forecastday[0].day.avgtemp_c}°C / ${data.forecast.forecastday[0].day.avgtemp_f}°F` : '' }</span></p>
            <p>Chỉ số UV: <span className='font-bold'>{ data ? `${data.forecast.forecastday[0].day.uv}` : '' }</span></p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-wrap">
        {
          data && data.forecast.forecastday[0].hour.map((item, index) => {
            return(
              <div className='w-full md:w-1/6 mb-3 px-2 text-center text-slate-600' key={ index }>
                <div className={ `bg-white px-4 py-4 rounded-md ${style.boxToday}` }>
                  <p className='font-bold text-[15px]'>{ moment(item.time, 'YYYY-MM-DD HH:mm').format('HH:mm') }</p>
                  <Image src={ data ? `https:${ replaceDimension(item.condition.icon)}` : '/assets/images/weather_icon.png' } width={ 74 } height={ 74 } alt='icon' />
                  <p className='font-bold mb-1'>{ item.condition.text }</p>
                  <p className='font-bold text-green-500 mb-1'> { `${item.temp_c}°C` } / { `${item.temp_f}°F` } </p>
                  <p className='mb-1'>Khả năng có mưa: <span className='font-bold'>{ item.will_it_rain }%</span></p>
                  <p>Chỉ số UV: <span className='font-bold'>{ item.uv }</span></p>
                </div>
              </div>
            );
          })
        }
      </div>
    </>
  );
};

export default HomePage;