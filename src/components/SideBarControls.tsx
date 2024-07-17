import Instructions from "./Instructions";

type SideBarControlsProps = {
	handleShowInstructions: (event: React.MouseEvent<HTMLDivElement>) => void;
	handleEquilateral: (event: React.MouseEvent<HTMLDivElement>) => void;
	handleScalene: (event: React.MouseEvent<HTMLDivElement>) => void;
	showInstructions: boolean;
};

export default function SideBarControls({
	handleShowInstructions,
	handleEquilateral,
	handleScalene,
	showInstructions,
}: SideBarControlsProps) {
	return (
		<>
			<div className="relative">
				<div className="bg-neutral-800 pt-4 absolute">
					<div
						className="p-4 m-2 w-28 bg-orange-500 opacity-90 rounded-lg font-semibold text-white hover:bg-orange-600 text-center cursor-pointer"
						onClick={handleEquilateral}
					>
						<p>Equilateral</p>
					</div>
					<div
						className="p-4 m-2 w-28 bg-orange-500 opacity-90 rounded-lg font-semibold text-white hover:bg-orange-600 text-center cursor-pointer"
						onClick={handleScalene}
					>
						<p>Scalene</p>
					</div>
					<div
						className="p-4 m-2 w-28 text-orange-500 bg-neutral-600 opacity-90 rounded-lg font-semibold  hover:bg-neutral-700 text-center cursor-pointer"
						onClick={handleShowInstructions}
					>
						<p>Instructions</p>
					</div>
					
				</div>
			</div>
			<Instructions showInstructions={showInstructions} handleShowInstructions={handleShowInstructions} />
		</>
	);
};