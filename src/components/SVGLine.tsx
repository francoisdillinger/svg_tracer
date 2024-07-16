import styled, { css } from "styled-components";
import { TraceSegment } from "../types/traceSegment";
import { fadeInControls } from "./SVGCircle";


export default function SVGLine({ coordinate }: SVGLineProps) {
	return (
		<>
			<FadeInLine
				x1={coordinate.curve.start.x}
				y1={coordinate.curve.start.y}
				x2={coordinate.circle.x}
				y2={coordinate.circle.y}
				className={`stroke-slate-400 stroke-2`}
				$tracecompleted={coordinate.traceCompleted ? 1 : 0}
			></FadeInLine>
		</>
	);
};

// =====================================================================================================================

type FadeInLineProps = {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	$tracecompleted: number;
};

const FadeInLine = styled.line.withConfig({
	shouldForwardProp: (prop) => !["$tracecompleted", "theme"].includes(prop),
})<FadeInLineProps>`
	${(props) =>
		props.$tracecompleted
			? css`
					animation: strokeWidthBounce 600ms 500ms ease-in-out forwards;
			  `
			: css`
					animation: ${fadeInControls} 500ms ease forwards;
					animation-delay: 1500ms;
					opacity: 0;
			  `};
`;

type SVGLineProps = {
	coordinate: TraceSegment;
};