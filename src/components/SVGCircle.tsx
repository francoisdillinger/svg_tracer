import styled, { keyframes, css } from "styled-components";
import { TraceSegment } from "../types/traceSegment";

export default function SVGCircle({ coordinate, handlemousedown }: SVGCircleProps) {
	return (
		<>
			<FadeInCircle
				onMouseDown={() => handlemousedown(coordinate.id)}
				cx={coordinate.circle.x}
				cy={coordinate.circle.y}
				r={9}
				className={`fill-slate-400 cursor-pointer`}
				$tracecompleted={coordinate.traceCompleted ? 1 : 0}
			></FadeInCircle>
		</>
	);
};

// =====================================================================================================================

export const fadeInControls = keyframes`
	to {
		opacity: 1;
	}
	`;

const FadeInCircle = styled.circle.withConfig({
	shouldForwardProp: (prop) => !["$tracecompleted", "theme"].includes(prop),
})<FadeInCircleProps>`
	${(props) =>
		props.$tracecompleted
			? css`
					animation: scaleBounceOut 600ms 500ms ease-in-out forwards;
					transform-origin: ${props.cx}px ${props.cy}px;
			  `
			: css`
					animation: ${fadeInControls} 500ms 1500ms ease forwards;
					opacity: 0;
			  `};
`;

type FadeInCircleProps = {
	onMouseDown: Function;
	cx: number;
	cy: number;
	r: number;
	$tracecompleted: number;
};

type SVGCircleProps = {
	coordinate: TraceSegment;
	handlemousedown: Function;
	r: number;
};