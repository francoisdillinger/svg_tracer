import { DraggableCircle } from "../types/draggable";
import { Curve } from "../types/curve";
import midPoint from "./midPoint";

export const createDraggableCircles = (
	shapeCoordinates: Curve[],
	offSetForStyle: number
): DraggableCircle[] => {
	return shapeCoordinates.map((curve: Curve, i): DraggableCircle => {
		return {
			id: i,
			coordinates: {
				x:
					midPoint(curve.endCoordinate.x!, curve.startCoordinate.x!) -
					offSetForStyle,
				y:
					midPoint(curve.endCoordinate.y!, curve.startCoordinate.y!) -
					offSetForStyle,
			},
			isDragging: false,
		};
	});
};
