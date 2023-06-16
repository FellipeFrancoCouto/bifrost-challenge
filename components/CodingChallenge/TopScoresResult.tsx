function TopScores() {
	return (
		<div className="flex h-fit flex-col gap-3 bg-white px-3 py-3">
			<div className="font-Inter text-base font-semibold text-black">Top Scores</div>
			<div className="flex w-[354px] items-center gap-8">
				<Top />
				<Top />
			</div>
			<div className="flex w-[354px] items-center gap-6">
				<Top />
				<Top />
			</div>
		</div>
	);
}

export default TopScores;

function Top() {
	return (
		<div className="flex w-[165px] flex-col items-center gap-4 rounded-lg border border-[#c3d7d0] bg-[#dde9e5] px-4 py-4">
			<img
				src="/images/TopScores/rectangle-243.png"
				className="h-16 w-16 rounded-lg object-cover"
				alt="Rectangle 243"
			/>
			<div className="text-center font-Inter text-sm font-semibold leading-[14px] text-[#27292a]">
				Name
			</div>
			<div className="flex flex-col items-center gap-1">
				<div className="flex justify-center gap-2.5">
					<div className="font-GoodHeadlinePro text-center text-2xl font-medium leading-[24px] text-[#27292a]">
						91
					</div>
				</div>
				<div className="flex gap-2.5 px-2.5">
					<div className="text-center font-Inter text-[10pt] font-medium leading-[10px] text-[#6b6f72]">
						Score
					</div>
				</div>
			</div>
		</div>
	);
}
