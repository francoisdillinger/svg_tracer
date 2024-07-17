import { Coordinate } from "./coordinate";
import { CurveCoordinate } from "./curveCoordinate";
import { TraceCoordinate } from "./traceCoordinate";

export type TraceSegment = {
	id: number;
	curve: CurveCoordinate;
	circle: Coordinate;
	trace: TraceCoordinate;
	traceMatches: boolean;
	traceCompleted: boolean;
};