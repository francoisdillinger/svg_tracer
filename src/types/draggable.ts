export type CircleAndLineCoordinate = {
	x: number;
	y: number;
};

export type DraggableCircle = {
	// id: number;
	coordinates: CircleAndLineCoordinate;
	isDragging: boolean;
};
