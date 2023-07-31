export default function Today(props) {
	return (
		<section
			className="bg-[#222] rounded-md w-[85%] p-[10%] flex items-center justify-center flex-col gap-10 mr-auto ml-auto md:w-[95%] md:min-w-0 md:gap-5 md:mr-0 md:ml-0"
			aria-labelledby="location-name"
		>
			<form
				className="flex gap-5 justify-center items-center flex-wrap"
				onSubmit={(e) => props.getLocation(e)}
			>
				<label htmlFor="location">Miejscowość</label>
				<input
					type="text"
					placeholder="np. Wrocław"
					id="location"
					className="p-[8px] rounded-md text-[1rem] bg-[#333]"
					value={props.userLoc}
					onInput={(e) => props.setUserLoc(e.target.value)}
				/>
			</form>
			<h1 className="text-3xl font-bold text-center" id="location-name">
				{props.location?.name || 'Lokalizacja'}
			</h1>
			<picture className="w-[70%] md:w-[50%]">
				<source
					srcSet={`static-icons/${props.icon}.svg`}
					media="(prefers-reduced-motion)"
				/>
				<img src={`animated-icons/${props.icon}.svg`} alt="" />
			</picture>
			<p>
				{props.msg || 'Bezchmurnie'} |{' '}
				{props.weather?.current_weather.temperature || ' 0'}°C
			</p>
		</section>
	);
}
