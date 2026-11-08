import { memo } from "react";

import { useLiquidLayers } from "./useLiquidLayers";

const CoViewer = memo(({ drink, kind }) => {
	const layers = useLiquidLayers(drink);

	return (
		<div className={`${kind}-viewer halftone`}>
			<div style={{ height: "0px" }}>
				<div
					className={`${kind}-viewer-liquid`}
					style={{
						clipPath: `path("${drink.glass.glass.liquid.path}")`,
						width: drink.glass.glass.liquid.width,
						height: drink.glass.glass.liquid.height,
						marginTop: drink.glass.glass.liquid.marginTop,
						marginLeft: drink.glass.glass.liquid.marginLeft || "0px",
						backgroundColor:
							drink.mix_color || drink.ingredients[0].alcohol.color,
					}}
				>
					{layers.map((ingredient, index) => (
						<div
							key={index}
							className={`${kind}-viewer-liquid-layer`}
							style={{
								backgroundColor: ingredient.alcohol.color,
								height: `${ingredient.visualHeight}%`,
								width: "100%",
							}}
						></div>
					))}
				</div>
			</div>
			{drink.ganish.map((ganish, index) => (
				<div key={index} style={{ height: "0px" }}>
					<div
						className="card-viewer-ganish"
						style={{
							mixBlendMode:
								ganish.name === "ice cube" ? "soft-light" : "multiply",
							zIndex: ganish.name === "ice cube" ? 1 : 0,
						}}
					>
						<img
							loading="lazy"
							style={{
								width: ganish.size,
								top: ganish.top,
								left: ganish.left,
								rotate: ganish.rotate,
							}}
							src={ganish.icon}
							alt={ganish.name}
						/>
					</div>
				</div>
			))}
			<img loading="lazy" src={drink.glass.glass.empty} alt={drink.name} />
		</div>
	);
});

export default CoViewer;
