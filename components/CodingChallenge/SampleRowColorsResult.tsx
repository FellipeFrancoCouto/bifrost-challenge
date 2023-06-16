function ChallengeRowColors() {
	return (
		<div className="flex h-fit items-center gap-3 bg-white px-3 py-3">
			<SampleRed />
			<SampleBlue />
			<SampleRed />
			<SampleBlue />
		</div>
	);
}

export default ChallengeRowColors;

function SampleRed() {
	return (
		<div className="flex h-[100px] w-[100px] items-center justify-center rounded-lg bg-[#754545]">
			<div className="font-Inter text-base font-semibold text-white">Sample</div>
		</div>
	);
}

function SampleBlue() {
	return (
		<div className="flex h-[100px] w-[100px] items-center justify-center rounded-lg bg-[#454d75]">
			<div className="font-Inter text-base font-semibold text-white">Sample</div>
		</div>
	);
}
