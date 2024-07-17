import { Curve } from "../types/curve";
import { CurveAndCircleCoordinates } from "../types/curveAndCircleCoordinate";
import { CurvePoint } from "../types/curvePoint";
import midPoint from "./midPoint";



export const createCurves = (numOfCurves: number): Curve[] => {
	let startCoordinate: CurvePoint = {
		x: Math.floor(Math.random() * 500) + 10,
		y: Math.floor(Math.random() * 500) + 10,
	};

	return Array.from({ length: numOfCurves }, (_, i): Curve => {
		// console.log(i);
		const controlCoordinate: CurvePoint = {
			x: Math.floor(Math.random() * 500) + 10,
			y: Math.floor(Math.random() * 500) + 10,
		};
		const endCoordinate: CurvePoint = {
			x: Math.floor(Math.random() * 500) + 10,
			y: Math.floor(Math.random() * 500) + 10,
		};

		// Check for null values
		if (
			[
				startCoordinate.x,
				startCoordinate.y,
				controlCoordinate.x,
				controlCoordinate.y,
				endCoordinate.x,
				endCoordinate.y,
			].some((coord) => coord === null)
		) {
			throw new Error("Null coordinate value found");
		}

		const curve: Curve = {
			startCoordinate: { ...startCoordinate },
			curve: controlCoordinate,
			endCoordinate: endCoordinate,
		};

		startCoordinate = { ...endCoordinate };
		return curve;
	});
};

export const createDraggableCirclesAndLines = (
	curvesArray: Curve[],
	offSetForStyle: number
): CurveAndCircleCoordinates[] => {
	return curvesArray.map((curve: Curve, i): CurveAndCircleCoordinates => {
		const circleX =
			midPoint(curve.endCoordinate.x!, curve.startCoordinate.x!) -
			offSetForStyle;
		const circleY =
			midPoint(curve.endCoordinate.y!, curve.startCoordinate.y!) -
			offSetForStyle;
		return {
			id: i,
			curve: curve,
			circle: {
				coordinates: {
					x: circleX,

					y: circleY,
				},
				isDragging: false,
			},
			line: {
				anchorPoint: { x: curve.startCoordinate.x, y: curve.startCoordinate.y },
				freePoint: { x: circleX, y: circleY },
			},
			path: {
				startCoordinate: {
					x: curve.startCoordinate.x,
					y: curve.startCoordinate.y,
				},
				curve: { x: curve.endCoordinate.x, y: curve.endCoordinate.y },
				endCoordinate: {
					x: curve.endCoordinate.x,
					y: curve.endCoordinate.y,
				},
			},
		};
	});
};

export const createCurveLineCircles = (
	numOfSides: number,
	offSetForStyle: number
): CurveAndCircleCoordinates[] => {
	const curvesArray = createCurves(numOfSides);
	const addCirclesAndLines = createDraggableCirclesAndLines(
		curvesArray,
		offSetForStyle
	);
	console.log(addCirclesAndLines);
	return addCirclesAndLines;
};
