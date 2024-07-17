import { Curve } from "./curve";
import { DraggableCircle } from "./draggable";
import { Line } from "./line";

export type CurveAndCircleCoordinates = {
	id: number;
	curve: Curve;
	circle: DraggableCircle;
	line: Line;
	path: Curve;
};