import { Curve, CurvePoint } from "../types/curve";

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
			id: i,
			startCoordinate: { ...startCoordinate },
			curve: controlCoordinate,
			endCoordinate: endCoordinate,
		};

		startCoordinate = { ...endCoordinate };
		return curve;
	});
};

// export const createCurves = (numOfCurves: number): Curve[] => {
// 	let startCoordinate: CurvePoint = {
// 		x: Math.floor(Math.random() * 500) + 10,
// 		y: Math.floor(Math.random() * 500) + 10,
// 	};

// 	return Array.from({ length: numOfCurves }, (): Curve => {
// 		const controlCoordinate: CurvePoint = {
// 			x: Math.floor(Math.random() * 500) + 10,
// 			y: Math.floor(Math.random() * 500) + 10,
// 		};
// 		const endCoordinate: CurvePoint = {
// 			x: Math.floor(Math.random() * 500) + 10,
// 			y: Math.floor(Math.random() * 500) + 10,
// 		};

// 		const curve: Curve = {
// 			startCoordinate: { ...startCoordinate },
// 			curve: controlCoordinate,
// 			endCoordinate: endCoordinate,
// 		};

// 		startCoordinate = { ...endCoordinate };
// 		return curve;
// 	});
// };
