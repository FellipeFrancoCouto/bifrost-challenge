import { refactorReactCode } from './Refactor';

const reactCode = `function ChooseStation() {
	return (
		<div className="flex h-fit flex-col gap-5 rounded-lg bg-[#190c1b] px-3 py-3">
			<div className="flex items-center gap-3">
				<div className="flex flex-col items-center justify-center rounded-lg bg-[#ae2a3f] px-1 py-1">
					<div className="font-Inter text-base font-medium leading-[22px] text-white">LIVE</div>
				</div>
				<div className="font-Inter text-lg font-semibold text-white">Choose a station</div>
			</div>
			<div className="flex gap-5">
				<div className="flex flex-col gap-3">
					<img
						src="/images/ChooseStation/image-7.png"
						className="h-[192px] w-[192px] object-cover"
						alt="image 7"
					/>
					<div className="font-Inter text-base font-semibold leading-[22px] text-white">
						Smooth Jazz
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<img
						src="/images/ChooseStation/image-7.png"
						className="h-[192px] w-[192px] object-cover"
						alt="image 7"
					/>
					<div className="font-Inter text-base font-semibold leading-[22px] text-white">
						Smooth Jazz
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<img
						src="/images/ChooseStation/image-7.png"
						className="h-[192px] w-[192px] object-cover"
						alt="image 7"
					/>
					<div className="font-Inter text-base font-semibold leading-[22px] text-white">
						Smooth Jazz
					</div>
				</div>
				<div className="flex flex-col gap-3">
					<img
						src="/images/ChooseStation/image-7.png"
						className="h-[192px] w-[192px] object-cover"
						alt="image 7"
					/>
					<div className="font-Inter text-base font-semibold leading-[22px] text-white">
						Smooth Jazz
					</div>
				</div>
			</div>
		</div>
	);
}

export default ChooseStation`;

// function printLine() {
// 	console.log('----------------------------------------');
// }

// printLine();

const updatedCode = refactorReactCode(reactCode);
console.log(updatedCode);
