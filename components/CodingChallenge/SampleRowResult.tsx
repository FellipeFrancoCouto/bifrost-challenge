function ChallengeRow() {
	return (
		<div className="flex h-fit items-center gap-3 bg-white px-3 py-3">
			<Sample />
			<Sample />
			<Sample />
			<Sample />
		</div>
	);
}

export default ChallengeRow;

function Sample() {
	return (
		<div className="flex h-[100px] w-[100px] items-center justify-center rounded-lg bg-[#754545]">
			<div className="font-Inter text-base font-semibold text-white">Sample</div>
		</div>
	);
}
