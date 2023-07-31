export default function NextHour(props) {
	return (
		<div className="rounded-lg flex flex-col gap-[10px] place-content-center bg-[#222] p-[10%] mb-2">
			<h3 className="text-center">{props.time}</h3>
			<picture className="w-[100%]">
				<source
					srcSet={`static-icons/${props.icon}.svg`}
					media="(prefers-reduced-motion)"
				/>
				<img src={`animated-icons/${props.icon}.svg`} alt="" />
			</picture>
			<p className="text-center">{props.temperature}°C</p>
		</div>
	);
}
