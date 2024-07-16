

type InstructionsProps = {
	showInstructions: boolean;
	handleShowInstructions: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export default function Instructions({
	showInstructions,
	handleShowInstructions,
}: InstructionsProps) {
	console.log("show: ", showInstructions)
	return (
		<>
			{showInstructions && (
				<div className="absolute bottom-0 left-0 m-5 border-2 p-4 rounded-lg">
					<h2 className="text-white text-center">Instructions:</h2>
					<p className="text-white">
						- Use control points to pull sides to match the trace outlines.
					</p>
					<p className="text-white">
						- When trace lines flash green, release control point to lock it in.
					</p>
					<p className="text-white">
						- Click 'Equilateral' for triangles with equal sides.
					</p>
					<p className="text-white">
						- Click 'Scalene' for triangles with no equal sides.
					</p>
					<div
						onClick={handleShowInstructions}
						className="text-white absolute top-0 right-0 bg-orange-500 opacity-90 p-1 rounded-bl-md rounded-tr-md cursor-pointer"
					>
						close
					</div>
				</div>
			)}
		</>
	);
};