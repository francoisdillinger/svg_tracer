import styled, { keyframes } from "styled-components";
import { TraceObject } from "../types/traceObject";

export default function SVGPolygon({ coordinates }: SVGPolygonProps) {
	return (
		<>
			<FadeInPolygon
				d={
					coordinates.traceObjectPath !== null
						? coordinates.traceObjectPath
						: ""
				}
				className={`fill-orange-500 stroke-white`}
			/>
		</>
	);
};

// =====================================================================================================================

const fadeInPolygon = keyframes`
	to {
		opacity: .85;
	}
	`;
const FadeInPolygon = styled.path.withConfig({
	shouldForwardProp: (prop) => !["theme"].includes(prop),
})<FadeInPolygonProps>`
	opacity: 0;
	animation: ${fadeInPolygon} 500ms ease forwards;
	animation-delay: 1s;
`;

type FadeInPolygonProps = {};

type SVGPolygonProps = {
	coordinates: TraceObject;
};