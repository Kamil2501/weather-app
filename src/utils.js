export function getWeatherForecast(code, isDay = 1) {
	const dayTime = () => {
		if (isDay === 1) return true;
		return false;
	};

	const weather = () => {
		if (code === 0 || code === 1)
			return { msg: 'Bezchmurnie', icon: isDay ? 'clear-day' : 'clear-night' };
		if (code === 2)
			return {
				msg: 'Niewielkie zachmurzenie',
				icon: isDay ? 'partly-cloudy-day' : 'partly-cloudy-night',
			};
		if (code === 3) return { msg: 'Zachmurzenie', icon: 'cloudy' };
		if (code === 45 || code === 48) return { msg: 'Mgliście', icon: 'fog' };
		if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57)
			return { msg: 'Mżawka', icon: 'drizzle' };
		if (code === 61) return { msg: 'Niewielki deszcz', icon: 'rain' };
		if (code === 63) return { msg: 'Umiarkowany deszcz', icon: 'rain' };
		if (code === 65) return { msg: 'Intensywny deszcz', icon: 'rain' };
		if (code === 66)
			return { msg: 'Niewielki deszcz ze śniegiem', icon: 'sleet' };
		if (code === 67) return { msg: 'Deszcz ze śniegiem', icon: 'sleet' };
		if (code === 71) return { msg: 'Lekki śnieg', icon: 'snow' };
		if (code === 73) return { msg: 'Umiarkowany śnieg', icon: 'snow' };
		if (code === 75) return { msg: 'Intensywny śnieg', icon: 'snow' };
		if (code === 77) return { msg: 'Ziarnisty śnieg', icon: 'snow' };
		if (code === 80)
			return {
				msg: 'Lekkie przelotne opady',
				icon: isDay ? 'partly-cloudy-day-rain' : 'partly-cloudy-night-rain',
			};
		if (code === 81)
			return {
				msg: 'Umiarkowane przelotne opady',
				icon: isDay ? 'partly-cloudy-day-rain' : 'partly-cloudy-night-rain',
			};
		if (code === 82)
			return {
				msg: 'Intensywne przelotne opady',
				icon: isDay ? 'partly-cloudy-day-rain' : 'partly-cloudy-night-rain',
			};
		if (code === 85)
			return {
				msg: 'Przelotny śnieg',
				icon: isDay ? 'partly-cloudy-day-rain' : 'partly-cloudy-night-rain',
			};
		if (code === 86)
			return {
				msg: 'Intensywny przelotny śnieg',
				icon: isDay ? 'partly-cloudy-day-snow' : 'partly-cloudy-night-snow',
			};
		if (code === 95) return { msg: 'Burza', icon: 'thunderstorms-extreme' };
		if (code === 96 || code === 97) return { msg: 'Grad', icon: 'hail' };
	};

	return { weather, dayTime, code };
}

export function getHourlyWeather(timeArr, tempArr, codeArr, dayArr) {
	let hourlyWeather = [];
	timeArr.map((dateString, index) => {
		let obj = {
			date: new Date(dateString),
			temperature: tempArr[index],
			weathercode: codeArr[index],
			is_day: dayArr[index],
		};

		hourlyWeather = [...hourlyWeather, obj];
	});
	return hourlyWeather;
}

export function getDailyWeather(timeArr, tempArr, codeArr) {
	let dailyWeather = [];
	timeArr.map((dateString, index) => {
		let obj = {
			time: new Date(dateString),
			temperature: tempArr[index],
			weathercode: codeArr[index],
		};
		dailyWeather = [...dailyWeather, obj];
	});
	return dailyWeather;
}
