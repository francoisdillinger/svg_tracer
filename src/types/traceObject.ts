import { TraceSegment } from "./traceSegment";

export type TraceObject = {
	segments: TraceSegment[];
	traceObjectPath: string | null;
};