import { CoordinateSum, Coordinate, ElementCenter } from "../types/coordinate";
import { Curve } from "../types/curve";
import { TraceObject } from "../types/traceObject";
import { createPathDAttribute } from "./createPathDAttribute";


export const polygonCentroid = (sums: Coordinate, area: number) => {
	if (area === 0) {
		throw new Error("Area cannot be zero.");
	}
	return { x: sums.x / (6 * area), y: sums.y / (6 * area) };
};

// export const polygonCentroid = (sums: CoordinateSum, area: number) => {
// 	if (area === 0) {
// 		throw new Error("Area cannot be zero.");
// 	}
// 	return { x: sums.x / (6 * area), y: sums.y / (6 * area) };
// };


export const polygonAreaReducer = (traceObject: TraceObject) => {
	const area = traceObject.segments.reduce((accumulator, segment) => {
		return (accumulator +=
			segment.curve.start.x * segment.curve.end.y -
			segment.curve.end.x * segment.curve.start.y);
	}, 0);
	return area / 2;
};

// export const polygonAreaReducer = (shapeCoordinates: any[]) => {
// 	const finalPoint = shapeCoordinates.length - 1;
// 	const area = shapeCoordinates.reduce(
// 		(accumulator, shapeCoordinate, i, theArray) => {
// 			if (finalPoint === i) {
// 				accumulator +=
// 					shapeCoordinate.startCoordinate.x * theArray[0].startCoordinate.y -
// 					theArray[0].startCoordinate.x * shapeCoordinate.startCoordinate.y;
// 			} else {
// 				accumulator +=
// 					shapeCoordinate.startCoordinate.x * shapeCoordinate.endCoordinate.y -
// 					shapeCoordinate.endCoordinate.x * shapeCoordinate.startCoordinate.y;
// 			}
// 			return accumulator;
// 		},
// 		0
// 	);
// 	return area / 2;
// };

export const polygonCoordinateReducer = (traceObject: TraceObject) => {
	const result = traceObject.segments.reduce(
		(accumulator, segment) => {
			const accumulatedCoordinates = {
				x:
					(segment.curve.start.x + segment.curve.end.x) *
					(segment.curve.start.x * segment.curve.end.y -
						segment.curve.end.x * segment.curve.start.y),
				y:
					(segment.curve.start.y + segment.curve.end.y) *
					(segment.curve.start.x * segment.curve.end.y -
						segment.curve.end.x * segment.curve.start.y),
			};
			accumulator.x += accumulatedCoordinates.x;
			accumulator.y += accumulatedCoordinates.y;

			return accumulator;
		},
		{ x: 0, y: 0 }
	);

	return result;
};

// export const polygonCoordinateReducer = (shapeCoordinates: any[]) => {
// 	const finalPoint = shapeCoordinates.length - 1;

// 	const result = shapeCoordinates.reduce(
// 		(accumulator, shapeCoordinate, i, theArray) => {
// 			let accumulatedCoordinates;
// 			if (finalPoint === i) {
// 				accumulatedCoordinates = {
// 					x:
// 						(shapeCoordinate.startCoordinate.x +
// 							theArray[0].startCoordinate.x) *
// 						(shapeCoordinate.startCoordinate.x * theArray[0].startCoordinate.y -
// 							theArray[0].startCoordinate.x *
// 								shapeCoordinate.startCoordinate.y),
// 					y:
// 						(shapeCoordinate.startCoordinate.y +
// 							theArray[0].startCoordinate.y) *
// 						(shapeCoordinate.startCoordinate.x * theArray[0].startCoordinate.y -
// 							theArray[0].startCoordinate.x *
// 								shapeCoordinate.startCoordinate.y),
// 				};
// 			} else {
// 				accumulatedCoordinates = {
// 					x:
// 						(shapeCoordinate.startCoordinate.x +
// 							shapeCoordinate.endCoordinate.x) *
// 						(shapeCoordinate.startCoordinate.x *
// 							shapeCoordinate.endCoordinate.y -
// 							shapeCoordinate.endCoordinate.x *
// 								shapeCoordinate.startCoordinate.y),
// 					y:
// 						(shapeCoordinate.startCoordinate.y +
// 							shapeCoordinate.endCoordinate.y) *
// 						(shapeCoordinate.startCoordinate.x *
// 							shapeCoordinate.endCoordinate.y -
// 							shapeCoordinate.endCoordinate.x *
// 								shapeCoordinate.startCoordinate.y),
// 				};
// 			}
// 			accumulator.x += accumulatedCoordinates.x;
// 			accumulator.y += accumulatedCoordinates.y;

// 			return accumulator;
// 		},
// 		{ x: 0, y: 0 }
// 	);

// 	return result;
// };

export const differenceBetweenCenters = (
	canvas: Coordinate,
	polygon: Coordinate
): Coordinate => {
	return { x: canvas.x - polygon.x, y: canvas.y - polygon.y };
};

// export const differenceBetweenCenters = (
// 	canvas: ElementCenter,
// 	polygon: ElementCenter
// ): Coordinate => {
// 	return { x: canvas.x - polygon.x, y: canvas.y - polygon.y };
// };

export const shiftSVGtoCanvasCenter = (
	shiftCoordinateBy: Coordinate,
	traceObject: TraceObject
): TraceObject => {
	const shiftedCoords = traceObject.segments.map((segment, i) => {
		if (shiftCoordinateBy === null)
			throw new Error("shiftCoordinateBy cannot be null.");
		if (segment.curve.start.x === null)
			throw new Error("curve.start.x cannot be null.");
		if (segment.curve.start.y === null)
			throw new Error("curve.start.y cannot be null.");
		if (segment.curve.mid.x === null)
			throw new Error("curve.mid.x cannot be null.");
		if (segment.curve.mid.y === null)
			throw new Error("curve.mid.y cannot be null.");
		if (segment.curve.end.x === null)
			throw new Error("curve.end.x cannot be null.");
		if (segment.curve.end.y === null)
			throw new Error("curve.end.y cannot be null.");
		return {
			...segment,
			curve: {
				start: {
					x: segment.curve.start.x + shiftCoordinateBy.x,
					y: segment.curve.start.y + shiftCoordinateBy.y,
				},
				mid: {
					x: segment.curve.mid.x + shiftCoordinateBy.x,
					y: segment.curve.mid.y + shiftCoordinateBy.y,
				},
				end: {
					x: segment.curve.end.x + shiftCoordinateBy.x,
					y: segment.curve.end.y + shiftCoordinateBy.y,
				},
			},
			circle: {
				x: segment.circle.x + shiftCoordinateBy.x,
				y: segment.circle.y + shiftCoordinateBy.y,
			},
			trace: {
				start: {
					x: segment.trace.start.x + shiftCoordinateBy.x,
					y: segment.trace.start.y + shiftCoordinateBy.y,
				},
				mid: {
					x: segment.trace.mid.x + shiftCoordinateBy.x,
					y: segment.trace.mid.y + shiftCoordinateBy.y,
				},
				end: {
					x: segment.trace.end.x + shiftCoordinateBy.x,
					y: segment.trace.end.y + shiftCoordinateBy.y,
				},
			},
		};
	});
	const traceWithShiftedCoords = {
		...traceObject,
		segments: [...shiftedCoords],
	};
	return {
		...traceWithShiftedCoords,
		traceObjectPath: createPathDAttribute(traceWithShiftedCoords),
	};
};

// export const shiftSVGtoCanvasCenter = (
// 	coordinateShift: Coordinate,
// 	shapeCoordinates: Curve[]
// ): Curve[] => {
// 	const shiftedShapeCoordinates = shapeCoordinates.map((shapeCoordinate, i) => {
// 		if (coordinateShift === null)
// 			throw new Error("coordinateShift cannot be null.");
// 		if (shapeCoordinate.startCoordinate.x === null)
// 			throw new Error("startCoordinate.x cannot be null.");
// 		if (shapeCoordinate.startCoordinate.y === null)
// 			throw new Error("startCoordinate.y cannot be null.");
// 		if (shapeCoordinate.curve.x === null)
// 			throw new Error("curve.x cannot be null.");
// 		if (shapeCoordinate.curve.y === null)
// 			throw new Error("curve.y cannot be null.");
// 		if (shapeCoordinate.endCoordinate.x === null)
// 			throw new Error("endCoordinate.x cannot be null.");
// 		if (shapeCoordinate.endCoordinate.y === null)
// 			throw new Error("endCoordinate.y cannot be null.");
// 		return {
// 			id: i,
// 			startCoordinate: {
// 				x: shapeCoordinate.startCoordinate.x + coordinateShift.x,
// 				y: shapeCoordinate.startCoordinate.y + coordinateShift.y,
// 			},
// 			curve: {
// 				x: shapeCoordinate.curve.x + coordinateShift.x,
// 				y: shapeCoordinate.curve.y + coordinateShift.y,
// 			},
// 			endCoordinate: {
// 				x: shapeCoordinate.endCoordinate.x + coordinateShift.x,
// 				y: shapeCoordinate.endCoordinate.y + coordinateShift.y,
// 			},
// 		};
// 	});
// 	return shiftedShapeCoordinates;
// };
