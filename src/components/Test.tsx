import React, { SVGProps, useState, useEffect, useRef } from "react";
import { Coordinate } from "../types/coordinate";
import { TraceObject } from "../types/traceObject";
import { TraceSegment } from "../types/traceSegment";
import { checkIfPositionsMatch } from "../utils/checkIfPositionsMatch";
import { createPathDAttribute } from "../utils/createPathDAttribute";
import { generateEquilateralSegments } from "../utils/generateEquilateralSegments";
import { generateNewSegments } from "../utils/generateNewSegments";
import { generateNewSvgKey } from "../utils/generateNewSvgKey";
import { polygonCoordinateReducer, polygonAreaReducer, polygonCentroid, differenceBetweenCenters, shiftSVGtoCanvasCenter } from "../utils/polygon";
import SVGCircle from "./SVGCircle";
import SVGLine from "./SVGLine";
import SVGPath from "./SVGPath";
import SVGPolygon from "./SVGPolygon";
import SideBarControls from "./SideBarControls";
import Instructions from "./Instructions";


export default function Test() {
	console.log(generateNewSegments(3));
	const notMatchingColor = "rgba(255, 255, 255, 1)";
	const matchingColor = "rgba(50, 205, 50, 1)";
	const svgRef = useRef<SVGSVGElement>(null);
	const [circleId, setCircleId] = useState<number | null>(null);
	const [showInstructions, setShowInstructions] = useState(false);
	const [svgCanvasDimensions, setSVGCanvasDimensions] =
		useState<Coordinate | null>();
	const [newTriangleKey, setNewTriangleKey] = useState(0);
	const [coordinates, setCoordinates] = useState<TraceObject>(
		generateEquilateralSegments()
	);

	const handleSVGGeneration = (
		coordinates: TraceObject,
		svgDimensions?: Coordinate
	) => {
		const reducedCoords = polygonCoordinateReducer(coordinates);
		const polygonArea = polygonAreaReducer(coordinates);
		const polygonCenter = polygonCentroid(reducedCoords, polygonArea);
		const svgCenter = svgCanvasDimensions
			? { x: svgCanvasDimensions.x / 2, y: svgCanvasDimensions.y / 2 }
			: {
					x: svgDimensions!.x / 2,
					y: svgDimensions!.y / 2,
			  };
		const shiftNeeded = differenceBetweenCenters(svgCenter, polygonCenter);
		const shiftedTrace = shiftSVGtoCanvasCenter(shiftNeeded, coordinates);
		setCoordinates(shiftedTrace);
	};

	useEffect(() => {
		if (svgRef.current) {
			setSVGCanvasDimensions({
				x: svgRef.current.width.animVal.value,
				y: svgRef.current.height.animVal.value,
			});
			handleSVGGeneration(generateNewSegments(3), {
				x: svgRef.current.width.animVal.value,
				y: svgRef.current.height.animVal.value,
			});
		}
	}, [svgRef]);

	useEffect(() => {
		if (coordinates.traceObjectPath === null) {
			console.log("We building path.");
			setCoordinates((prevTraceObject) => {
				return {
					...prevTraceObject,
					traceObjectPath: createPathDAttribute(prevTraceObject),
				};
			});
		}
		const handleMouseMove = (event: MouseEvent) => {
			if (circleId != null && svgRef.current != null) {
				console.log(circleId);
				const svgRect = svgRef.current.getBoundingClientRect();
				const newMousePosition = {
					x: event.clientX - svgRect.left,
					y: event.clientY - svgRect.top,
				};

				setCoordinates((prevTraceObject: TraceObject) => {
					// Map through the segments to update the one with the matching id
					const updatedSegments = prevTraceObject.segments.map(
						(segment): TraceSegment => {
							if (segment.id === circleId) {
								const traceMatches = checkIfPositionsMatch(
									segment.curve.mid,
									segment.trace.mid
								);
								return {
									...segment,
									curve: {
										...segment.curve,
										mid: newMousePosition,
									},
									circle: newMousePosition,
									traceMatches: traceMatches,
								};
							}
							return segment;
						}
					);
					const newTraceObject = {
						...prevTraceObject,
						segments: updatedSegments,
					};

					return {
						...newTraceObject,
						traceObjectPath: createPathDAttribute(newTraceObject),
					};
				});
			}
		};
		const handleMouseUp = () => {
			setCoordinates({
				...coordinates,
				segments: coordinates.segments.map((coordinate) => {
					if (circleId === coordinate.id) {
						if (coordinate.traceMatches) {
							return { ...coordinate, traceCompleted: true };
						}
					}
					return coordinate;
				}),
			});
			setCircleId(null);
		};
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};
	}, [circleId, coordinates]);

	const handleMouseDown = (id: number) => {
		setCircleId(id);
	};

	const handleShowInstructions = () => {
		setShowInstructions(!showInstructions);
		console.log("Show instructions: ", showInstructions)
	};

	const handleEquilateral = () => {
		setNewTriangleKey(generateNewSvgKey());
		handleSVGGeneration(generateEquilateralSegments());
	};

	const handleScalene = () => {
		setNewTriangleKey(generateNewSvgKey());
		handleSVGGeneration(generateNewSegments(3));
	};

	return (
		<React.Fragment>
			<div className="flex">
				{/* <SideBar /> */}
				<SideBarControls handleShowInstructions={handleShowInstructions} handleEquilateral={handleEquilateral} handleScalene={handleScalene} showInstructions={showInstructions} />
				
				{/* <div className="w-3/4"> */}
					<svg
						ref={svgRef}
						key={newTriangleKey}
						width={"100%"}
						height={"100vh"}
						className="bg-neutral-800"
					>
						<SVGPolygon coordinates={coordinates}></SVGPolygon>
						{coordinates.segments.map((coordinate, i) => (
							<SVGPath
								key={coordinate.id}
								coordinate={coordinate}
								matchingcolor={matchingColor}
								notmatchingcolor={notMatchingColor}
								delay={i}
							/>
						))}
						{coordinates.segments.map((coordinate) => (
							<g key={coordinate.id}>
								<SVGCircle
									coordinate={coordinate}
									handlemousedown={handleMouseDown}
									r={9}
								></SVGCircle>
								<SVGLine coordinate={coordinate}></SVGLine>
							</g>
						))}
					</svg>
				{/* </div> */}
			</div>
		</React.Fragment>
	);
}

// =====================================================================================================================

// type SVGPathProps = {
// 	coordinate: TraceSegment;
// 	matchingcolor: string;
// 	notmatchingcolor: string;
// 	delay: number;
// };

// type StyledPathProps = {
// 	pathLength: number;
// 	$delay: number;
// 	$tracesegment: TraceSegment;
// 	$matchingcolor: string;
// 	$notmatchingcolor: string;
// };

// const draw = (pathLength: number) => keyframes`
//   from {
//     stroke-dashoffset: ${pathLength};
//   }
//   to {
//     stroke-dashoffset: 0;
//   }
// `;

// const StyledPath = styled.path.withConfig({
// 	shouldForwardProp: (prop) =>
// 		!["matchingcolor", "notmatchingcolor", "$tracesegment", "theme"].includes(
// 			prop
// 		),
// })<StyledPathProps>`
// 	stroke: ${(props) =>
// 		props.$tracesegment.traceMatches
// 			? props.$matchingcolor
// 			: props.$notmatchingcolor};
// 	filter: drop-shadow(
// 		2px 2px 4px
// 			${(props) =>
// 				props.$tracesegment.traceMatches
// 					? props.$matchingcolor
// 					: props.$notmatchingcolor}
// 	);
// 	stroke-dasharray: ${(props) => props.pathLength}px;
// 	stroke-dashoffset: ${(props) => props.pathLength}px;

// 	animation: ${(props) =>
// 		props.$tracesegment.traceCompleted
// 			? css`flicker 600ms ease-in-out forwards, ${draw(
// 					props.pathLength
// 			  )} 300ms ${(props.$delay || 0) * 300}ms ease-in-out forwards`
// 			: css`
// 					${draw(props.pathLength)} 300ms ${(props.$delay || 0) *
// 					300}ms ease-in-out forwards
// 			  `};
// `;

// const SVGPath = ({
// 	coordinate,
// 	matchingcolor,
// 	notmatchingcolor,
// 	delay,
// }: SVGPathProps) => {
// 	const pathRef = useRef<SVGPathElement>(null);
// 	const [pathLength, setPathLength] = useState(0);

// 	useEffect(() => {
// 		if (pathRef.current) {
// 			setPathLength(pathRef.current.getTotalLength());
// 		}
// 	}, [pathRef]);

// 	return (
// 		<>
// 			<StyledPath
// 				ref={pathRef}
// 				d={`M ${coordinate.trace.start.x} ${coordinate.trace.start.y} C ${coordinate.trace.start.x} ${coordinate.trace.start.y} ${coordinate.trace.mid.x} ${coordinate.trace.mid.y} ${coordinate.trace.end.x} ${coordinate.trace.end.y}`}
// 				pathLength={pathLength}
// 				$tracesegment={coordinate}
// 				$matchingcolor={matchingcolor}
// 				$notmatchingcolor={notmatchingcolor}
// 				$delay={delay}
// 				className={`fill-none stroke-3 ${
// 					coordinate.traceCompleted ? "flicker" : ""
// 				}`}
// 			/>
// 		</>
// 	);
// };

// =====================================================================================================================

// const fadeInPolygon = keyframes`
// 	to {
// 		opacity: .85;
// 	}
// 	`;
// const FadeInPolygon = styled.path.withConfig({
// 	shouldForwardProp: (prop) => !["theme"].includes(prop),
// })<FadeInPolygonProps>`
// 	opacity: 0;
// 	animation: ${fadeInPolygon} 500ms ease forwards;
// 	animation-delay: 1s;
// `;

// type FadeInPolygonProps = {};

// type SVGPolygonProps = {
// 	coordinates: TraceObject;
// };

// const SVGPolygon = ({ coordinates }: SVGPolygonProps) => {
// 	return (
// 		<>
// 			<FadeInPolygon
// 				d={
// 					coordinates.traceObjectPath !== null
// 						? coordinates.traceObjectPath
// 						: ""
// 				}
// 				className={`fill-orange-500 stroke-white`}
// 			/>
// 		</>
// 	);
// };

// =====================================================================================================================

// const fadeInControls = keyframes`
// 	to {
// 		opacity: 1;
// 	}
// 	`;

// const FadeInCircle = styled.circle.withConfig({
// 	shouldForwardProp: (prop) => !["$tracecompleted", "theme"].includes(prop),
// })<FadeInCircleProps>`
// 	${(props) =>
// 		props.$tracecompleted
// 			? css`
// 					animation: scaleBounceOut 600ms 500ms ease-in-out forwards;
// 					transform-origin: ${props.cx}px ${props.cy}px;
// 			  `
// 			: css`
// 					animation: ${fadeInControls} 500ms 1500ms ease forwards;
// 					opacity: 0;
// 			  `};
// `;

// type FadeInCircleProps = {
// 	onMouseDown: Function;
// 	cx: number;
// 	cy: number;
// 	r: number;
// 	$tracecompleted: number;
// };

// type SVGCircleProps = {
// 	coordinate: TraceSegment;
// 	handlemousedown: Function;
// 	r: number;
// };

// const SVGCircle = ({ coordinate, handlemousedown }: SVGCircleProps) => {
// 	return (
// 		<>
// 			<FadeInCircle
// 				onMouseDown={() => handlemousedown(coordinate.id)}
// 				cx={coordinate.circle.x}
// 				cy={coordinate.circle.y}
// 				r={9}
// 				className={`fill-slate-400 cursor-pointer`}
// 				$tracecompleted={coordinate.traceCompleted ? 1 : 0}
// 			></FadeInCircle>
// 		</>
// 	);
// };

// type FadeInLineProps = {
// 	x1: number;
// 	y1: number;
// 	x2: number;
// 	y2: number;
// 	$tracecompleted: number;
// };

// // =====================================================================================================================

// const FadeInLine = styled.line.withConfig({
// 	shouldForwardProp: (prop) => !["$tracecompleted", "theme"].includes(prop),
// })<FadeInLineProps>`
// 	${(props) =>
// 		props.$tracecompleted
// 			? css`
// 					animation: strokeWidthBounce 600ms 500ms ease-in-out forwards;
// 			  `
// 			: css`
// 					animation: ${fadeInControls} 500ms ease forwards;
// 					animation-delay: 1500ms;
// 					opacity: 0;
// 			  `};
// `;

// type SVGLineProps = {
// 	coordinate: TraceSegment;
// };

// const SVGLine = ({ coordinate }: SVGLineProps) => {
// 	return (
// 		<>
// 			<FadeInLine
// 				x1={coordinate.curve.start.x}
// 				y1={coordinate.curve.start.y}
// 				x2={coordinate.circle.x}
// 				y2={coordinate.circle.y}
// 				className={`stroke-slate-400 stroke-2`}
// 				$tracecompleted={coordinate.traceCompleted ? 1 : 0}
// 			></FadeInLine>
// 		</>
// 	);
// };

// =====================================================================================================================
// interface DraggableSVGProps extends SVGProps<SVGPathElement> {
// 	draggable: 'true' | 'false';
//   }
// const SideBar = () => {
// 	const path =
// 		"M 127 269 C 127 269 143.5 161.5 160 54 C 160 54 97.5 121.5 35 189 C 35 189 81 229 127 269 Z";
// 	return (
// 		<>
// 			<div className="w-1/4 bg-neutral-700">
// 				<div className="h-1/3 w-full border-slate-50 border-2">
// 					<svg
// 						width={"100%"}
// 						height={"100%"}
// 					>
// 						<path
// 							d={path}
// 							className="stroke-orange-400 fill-orange-400"
// 						></path>
// 					</svg>
// 				</div>
// 				<div className="h-1/3 w-full border-slate-50 border-2">
// 					<svg
// 						width={"100%"}
// 						height={"100%"}
// 					>
// 						<path
// 							d={path}
// 							className="stroke-orange-400 fill-orange-400"
// 						></path>
// 					</svg>
// 				</div>
// 				<div className="h-1/3 w-full border-slate-50 border-2">
// 					<svg
// 						width={"100%"}
// 						height={"100%"}
// 					>
// 						<path
// 							d={path}
// 							className="stroke-orange-400 fill-orange-400"
// 						></path>
// 					</svg>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// =====================================================================================================================

// type SideBarControlsProps = {
// 	handleShowInstructions: (event: React.MouseEvent<HTMLDivElement>) => void;
// 	handleEquilateral: (event: React.MouseEvent<HTMLDivElement>) => void;
// 	handleScalene: (event: React.MouseEvent<HTMLDivElement>) => void;
// };

// const SideBarControls = ({
// 	handleShowInstructions,
// 	handleEquilateral,
// 	handleScalene,
// }: SideBarControlsProps) => {
// 	return (
// 		<>
// 			<div className="relative">
// 				<div className="bg-neutral-800 pt-4 absolute">
// 					<div
// 						className="p-4 m-2 w-28 bg-orange-500 opacity-90 rounded-lg font-semibold text-white hover:bg-orange-600 text-center cursor-pointer"
// 						onClick={handleEquilateral}
// 					>
// 						<p>Equilateral</p>
// 					</div>
// 					<div
// 						className="p-4 m-2 w-28 bg-orange-500 opacity-90 rounded-lg font-semibold text-white hover:bg-orange-600 text-center cursor-pointer"
// 						onClick={handleScalene}
// 					>
// 						<p>Scalene</p>
// 					</div>
// 					<div
// 						className="p-4 m-2 w-28 text-orange-500 bg-neutral-600 opacity-90 rounded-lg font-semibold  hover:bg-neutral-700 text-center cursor-pointer"
// 						onClick={handleShowInstructions}
// 					>
// 						<p>Instructions</p>
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// };

// =====================================================================================================================

// type InstructionsProps = {
// 	showInstructions: boolean;
// 	handleShowInstructions: (event: React.MouseEvent<HTMLDivElement>) => void;
// };

// const Instructions = ({
// 	showInstructions,
// 	handleShowInstructions,
// }: InstructionsProps) => {
// 	return (
// 		<>
// 			{showInstructions && (
// 				<div className="absolute bottom-0 left-0 m-5 border-2 p-4 rounded-lg">
// 					<h2 className="text-white text-center">Instructions:</h2>
// 					<p className="text-white">
// 						- Use control points to pull sides to match the trace outlines.
// 					</p>
// 					<p className="text-white">
// 						- When trace lines flash green, release control point to lock it in.
// 					</p>
// 					<p className="text-white">
// 						- Click 'Equilateral' for triangles with equal sides.
// 					</p>
// 					<p className="text-white">
// 						- Click 'Scalene' for triangles with no equal sides.
// 					</p>
// 					<div
// 						onClick={handleShowInstructions}
// 						className="text-white absolute top-0 right-0 bg-orange-500 opacity-90 p-1 rounded-bl-md rounded-tr-md cursor-pointer"
// 					>
// 						close
// 					</div>
// 				</div>
// 			)}
// 		</>
// 	);
// };
