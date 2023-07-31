import { useEffect, useState } from 'react';
import NextDay from './components/nextday';
import NextHour from './components/nexthour';
import Today from './components/today';
import { getDailyWeather, getHourlyWeather, getWeatherForecast } from './utils';

function App() {
	const [userLoc, setUserLoc] = useState('');
	const [location, setLocation] = useState(null);
	const [weather, setWeather] = useState(null);
	const [icon, setIcon] = useState('clear-day');
	const [msg, setMsg] = useState('Bezchmurnie');
	const [nextHours, setNextHours] = useState([
		{ time: '12:00', icon: 'clear-day', temperature: 0 },
		{ time: '13:00', icon: 'clear-day', temperature: 0 },
		{ time: '14:00', icon: 'clear-day', temperature: 0 },
		{ time: '15:00', icon: 'clear-day', temperature: 0 },
	]);
	const [nextDays, setNextDays] = useState([
		{ time: 'Jutro', icon: 'clear-day', temperature: 0, msg: 'Bezchmurnie' },
		{ time: 'Pojutrze', icon: 'clear-day', temperature: 0, msg: 'Bezchmurnie' },
		{ time: 'Za 3 dni', icon: 'clear-day', temperature: 0, msg: 'Bezchmurnie' },
		{ time: 'Za 4 dni', icon: 'clear-day', temperature: 0, msg: 'Bezchmurnie' },
	]);

	async function getLocation(e) {
		e.preventDefault();
		const res = await fetch(
			`https://geocoding-api.open-meteo.com/v1/search?name=${userLoc}&count=1&language=pl&format=json`
		);
		const data = await res.json();
		setLocation(data.results[0]);
		return data;
	}

	useEffect(() => {
		if (!location) return;
		async function getWeather() {
			const res = await fetch(
				`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,weathercode,is_day&daily=weathercode,temperature_2m_max&current_weather=true&timezone=Europe%2FWarsaw&forecast_days=5`
			);
			const data = await res.json();
			console.log(data);
			setWeather(data);

			const { msg: todayMsg, icon: todayIcon } =
				getWeatherForecast(
					data.current_weather.weathercode,
					data.current_weather.is_day
				).weather() || {};
			setIcon(todayIcon);
			setMsg(todayMsg);

			setNextHours([]);
			const d = new Date();
			const currentHour = d.getHours();
			const hourlyWeather = getHourlyWeather(
				data.hourly.time.slice(currentHour, -96),
				data.hourly.temperature_2m.slice(currentHour, -96),
				data.hourly.weathercode.slice(currentHour, -96),
				data.hourly.is_day.slice(currentHour, -96)
			);

			hourlyWeather.map((hour) => {
				const time = () => {
					const h =
						hour.date.getHours() < 10
							? `0${hour.date.getHours()}`
							: `${hour.date.getHours()}`;
					const m = `${hour.date.getMinutes()}0`;

					return `${h}:${m}`;
				};

				const { icon: hourIcon } =
					getWeatherForecast(hour.weathercode, hour.is_day).weather() || {};
				setNextHours((prevHours) => [
					...prevHours,
					{
						time: time(),
						icon: hourIcon,
						temperature: hour.temperature,
					},
				]);
			});

			setNextDays([]);
			const dailyWeather = getDailyWeather(
				data.daily.time.slice(1),
				data.daily.temperature_2m_max.slice(1),
				data.daily.weathercode.slice(1)
			);

			dailyWeather.map((day, index) => {
				const { msg: dayMsg, icon: dayIcon } =
					getWeatherForecast(day.weathercode).weather() || {};

				const rtf = new Intl.RelativeTimeFormat('pl', { numeric: 'auto' });
				setNextDays((prevDays) => [
					...prevDays,
					{
						time: rtf.format(index + 1, 'day'),
						icon: dayIcon,
						temperature: day.temperature,
						msg: dayMsg,
					},
				]);
			});
		}

		getWeather();
	}, [location]);

	const todayProps = {
		userLoc,
		setUserLoc,
		getLocation,
		location,
		weather,
		icon,
		msg,
	};

	return (
		<main
			className="flex justify-center items-center min-h-screen flex-col pt-[30px] pb-[30px] text-white text-[1.2rem] md:text-[clamp(1rem,_2vw,_1.25rem)]
		md:grid md:place-content-center"
		>
			<div className="w-[100vw] md:w-[60vw] md:grid md:grid-cols-2 md:grid-rows-[1fr_0.5fr]">
				<Today {...todayProps} />
				<div className="grid gap-x-3 mr-auto ml-auto w-[85%] mt-[10px] grid-flow-col auto-cols-[50%] overflow-x-auto md:row-[2] md:col-[1/3] md:flex md:mt-[30px] md:w-[100%] md:ml-0 md:mr-0 overflow-y-hidden">
					{nextHours.map((nextHour) => {
						return <NextHour {...nextHour} key={nextHour.time} />;
					})}
				</div>
				<div className="flex flex-col w-[85%] mt-[30px] ml-auto mr-auto gap-5 md:grid md:grid-cols-[1fr_1fr] md:grid-rows-[1fr_1fr] md:mt-0 md:w-[95%] md:mr-0">
					{nextDays.map((nextDay) => {
						return <NextDay {...nextDay} key={nextDay.time} />;
					})}
				</div>
			</div>
		</main>
	);
}

export default App;
