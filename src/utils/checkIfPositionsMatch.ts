export const checkIfPositionsMatch = (
	currentPosition: { x: number; y: number },
	tracePosition: { x: number; y: number }
) => {
	const differenceInX = Math.abs(tracePosition.x - currentPosition.x);
	const differenceInY = Math.abs(tracePosition.y - currentPosition.y);

	return differenceInX <= 3 && differenceInY <= 3;
};