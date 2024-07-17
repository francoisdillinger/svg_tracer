import { CurvePoint } from "./curvePoint";

export type Curve = {
	// id: number;
	startCoordinate: CurvePoint;
	curve: CurvePoint;
	endCoordinate: CurvePoint;
};


