import { Curve } from "../types/curve";
import { TraceObject } from "../types/traceObject";
import { CurveAndCircleCoordinates } from "./createCurvesandCircles";

// export const createPathDAttribute = (
// 	coordinates: CurveAndCircleCoordinates[]
// ) => {
// 	if (coordinates.length === 0) return "";

// 	// Start the path at the first coordinate
// 	let pathD = `M ${coordinates[0].path.startCoordinate.x} ${coordinates[0].path.startCoordinate.y}`;

// 	// Connect each subsequent coordinate with a line
// 	coordinates.forEach((coordinate, i) => {
// 		if (coordinates.length - 1 == i) return;
// 		pathD += ` C ${coordinate.path.endCoordinate.x} 
// 		${coordinate.path.endCoordinate.y} 
// 		${coordinate.path.curve.x!} 
// 		${coordinate.path.curve.y!} 
// 		${coordinate.path.endCoordinate.x} 
// 		${coordinate.path.endCoordinate.y}`;
// 	});

// 	// Close the path
// 	pathD += " Z";
// 	// console.log(pathD);
// 	return pathD;
// };


export const createPathDAttribute = (traceObject: TraceObject): string => {
	if (traceObject.segments.length === 0) return "";

	// Start the path at the first coordinate
	let pathD = `M ${traceObject.segments[0].curve.start.x} ${traceObject.segments[0].curve.start.y}`;

	// Connect each subsequent coordinate with a line
	traceObject.segments.forEach((coordinate, i) => {
		pathD += ` C ${coordinate.curve.start.x} 
		${coordinate.curve.start.y} 
		${coordinate.curve.mid.x!} 
		${coordinate.curve.mid.y!} 
		${coordinate.curve.end.x} 
		${coordinate.curve.end.y}`;
	});

	// Close the path
	pathD += " Z";
	return pathD;
};