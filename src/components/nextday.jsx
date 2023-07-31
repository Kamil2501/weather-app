export default function NextDay(props) {
	return (
		<section
			className="bg-[#222] rounded-md p-[15%] flex flex-col items-center justify-center"
			aria-labelledby="next-day"
		>
			<h2 className="text-3xl font-bold text-center" id="next-day">
				{props.time}
			</h2>
			<picture className="w-[70%]">
				<source
					srcSet={`static-icons/${props.icon}.svg`}
					media="(prefers-reduced-motion)"
				/>
				<img src={`animated-icons/${props.icon}.svg`} alt="" />
			</picture>
			<p className="">
				{props.msg} | {props.temperature}°C
			</p>
		</section>
	);
}
