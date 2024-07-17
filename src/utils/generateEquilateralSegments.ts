import { TraceObject } from "../types/traceObject";

export const generateEquilateralSegments = (): TraceObject => {
	return {
		segments: [
			{
				id: 0,
				curve: {
					start: { x: 250, y: 120 },
					mid: {
						x: 175,
						y: 250,
					},
					end: { x: 100, y: 380 },
				},
				circle: { x: 150, y: 250 },
				trace: {
					start: { x: 250, y: 120 },
					mid: {
						x: Math.floor(Math.random() * 400) + 20,
						y: Math.floor(Math.random() * 400) + 20,
					},
					end: { x: 100, y: 380 },
				},
				traceMatches: false,
				traceCompleted: false,
			},
			{
				id: 1,
				curve: {
					start: { x: 100, y: 380 },
					mid: { x: 200, y: 380 },
					end: { x: 400, y: 380 },
				},
				circle: { x: 250, y: 450 },
				trace: {
					start: { x: 100, y: 380 },
					mid: {
						x: Math.floor(Math.random() * 400) + 20,
						y: Math.floor(Math.random() * 400) + 20,
					},
					end: { x: 400, y: 380 },
				},
				traceMatches: false,
				traceCompleted: false,
			},
			{
				id: 2,
				curve: {
					start: { x: 400, y: 380 },
					mid: { x: 325, y: 250 },
					end: { x: 250, y: 120 },
				},
				circle: { x: 350, y: 250 },
				trace: {
					start: { x: 400, y: 380 },
					mid: {
						x: Math.floor(Math.random() * 400) + 20,
						y: Math.floor(Math.random() * 400) + 20,
					},
					end: { x: 250, y: 120 },
				},
				traceMatches: false,
				traceCompleted: false,
			},
		],
		traceObjectPath: null,
	};
};