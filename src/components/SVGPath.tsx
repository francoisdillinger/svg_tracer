import { useRef, useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { TraceSegment } from "../types/traceSegment";

export default function SVGPath({
	coordinate,
	matchingcolor,
	notmatchingcolor,
	delay,
}: SVGPathProps){
	const pathRef = useRef<SVGPathElement>(null);
	const [pathLength, setPathLength] = useState(0);

	useEffect(() => {
		if (pathRef.current) {
			setPathLength(pathRef.current.getTotalLength());
		}
	}, [pathRef]);

	return (
		<>
			<StyledPath
				ref={pathRef}
				d={`M ${coordinate.trace.start.x} ${coordinate.trace.start.y} C ${coordinate.trace.start.x} ${coordinate.trace.start.y} ${coordinate.trace.mid.x} ${coordinate.trace.mid.y} ${coordinate.trace.end.x} ${coordinate.trace.end.y}`}
				pathLength={pathLength}
				$tracesegment={coordinate}
				$matchingcolor={matchingcolor}
				$notmatchingcolor={notmatchingcolor}
				$delay={delay}
				className={`fill-none stroke-3 ${
					coordinate.traceCompleted ? "flicker" : ""
				}`}
			/>
		</>
	);
};

// =====================================================================================================================

type SVGPathProps = {
	coordinate: TraceSegment;
	matchingcolor: string;
	notmatchingcolor: string;
	delay: number;
};

type StyledPathProps = {
	pathLength: number;
	$delay: number;
	$tracesegment: TraceSegment;
	$matchingcolor: string;
	$notmatchingcolor: string;
};

const draw = (pathLength: number) => keyframes`
  from {
    stroke-dashoffset: ${pathLength};
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const StyledPath = styled.path.withConfig({
	shouldForwardProp: (prop) =>
		!["matchingcolor", "notmatchingcolor", "$tracesegment", "theme"].includes(
			prop
		),
})<StyledPathProps>`
	stroke: ${(props) =>
		props.$tracesegment.traceMatches
			? props.$matchingcolor
			: props.$notmatchingcolor};
	filter: drop-shadow(
		2px 2px 4px
			${(props) =>
				props.$tracesegment.traceMatches
					? props.$matchingcolor
					: props.$notmatchingcolor}
	);
	stroke-dasharray: ${(props) => props.pathLength}px;
	stroke-dashoffset: ${(props) => props.pathLength}px;

	animation: ${(props) =>
		props.$tracesegment.traceCompleted
			? css`flicker 600ms ease-in-out forwards, ${draw(
					props.pathLength
			  )} 300ms ${(props.$delay || 0) * 300}ms ease-in-out forwards`
			: css`
					${draw(props.pathLength)} 300ms ${(props.$delay || 0) *
					300}ms ease-in-out forwards
			  `};
`;