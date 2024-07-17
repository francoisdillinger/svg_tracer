import { TraceObject } from "../types/traceObject";
import { createPathDAttribute } from "./createPathDAttribute";

export const generateNewSegments = (numOfSides: number): TraceObject => {
	const anchorCoordinateX = Math.floor(Math.random() * 600) + 20;
	const anchorCoordinateY = Math.floor(Math.random() * 600) + 20;
	let startingCoordinateX = anchorCoordinateX;
	let startingCoordinateY = anchorCoordinateY;

	const segments = Array.from({ length: numOfSides }).map((_, i) => {
		let endingCoordinateX, endingCoordinateY;

		if (i === numOfSides - 1) {
			// Last segment should connect back to the first point
			endingCoordinateX = anchorCoordinateX;
			endingCoordinateY = anchorCoordinateY;
		} else {
			endingCoordinateX = Math.floor(Math.random() * 600) + 20;
			endingCoordinateY = Math.floor(Math.random() * 600) + 20;
		}

		const midCoordinateX = (startingCoordinateX + endingCoordinateX) / 2;
		const midCoordinateY = (startingCoordinateY + endingCoordinateY) / 2;

		const segment = {
			id: i,
			curve: {
				start: { x: startingCoordinateX, y: startingCoordinateY },
				mid: { x: midCoordinateX, y: midCoordinateY },
				end: { x: endingCoordinateX, y: endingCoordinateY },
			},
			circle: { x: midCoordinateX, y: midCoordinateY },
			trace: {
				start: { x: startingCoordinateX, y: startingCoordinateY },
				mid: {
					x: Math.floor(Math.random() * 600) + 20,
					y: Math.floor(Math.random() * 600) + 20,
				},
				end: { x: endingCoordinateX, y: endingCoordinateY },
			},
			traceMatches: false,
			traceCompleted: false,
		};

		// Update starting coordinates for the next segment
		if (i !== numOfSides - 1) {
			startingCoordinateX = endingCoordinateX;
			startingCoordinateY = endingCoordinateY;
		}

		return segment;
	});

	const traceObject = {
		segments: segments,
		traceObjectPath: null, // Initial value
	};

	return {
		...traceObject,
		traceObjectPath: createPathDAttribute(traceObject),
	};
};