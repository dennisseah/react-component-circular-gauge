import React from "react";
import * as d3 from "d3";
import "./CircularGauge.css";

type Props = {
    gaugeId: string;
    percentage: number;
    color: string;
};

class CircularGauge extends React.Component<Props> {
    getDimension(elm: HTMLElement) {
        const xOffset = 5;
        const yOffset = 5;
        const height = elm.clientHeight - yOffset * 2;
        const width = elm.clientWidth - xOffset * 2;
        const diameter = Math.min(height, width);

        return {
            xOffset,
            yOffset,
            height,
            width,
            radius: Math.floor(diameter / 2),
        };
    }

    componentDidMount() {
        const id = this.props.gaugeId + "-canvas";
        const elm = document.getElementById(id);
        const g = d3.select(`#${id}`);

        if (elm) {
            const dim = this.getDimension(elm);
            const percentage = this.props.percentage;
            const color = this.props.color;

            const endAngle = ((Math.PI * percentage) / 100) * 2;

            g.append("circle")
                .style("stroke", color)
                .classed("dcomponent-circular-gauge-outer-circle", true)
                .attr("r", dim.radius)
                .attr("cx", dim.radius)
                .attr("cy", dim.radius)
                .attr("transform", `translate(${dim.xOffset}, ${dim.yOffset})`);

            const arc = d3
                .arc()
                .innerRadius(50)
                .outerRadius(dim.radius - 10)
                .startAngle(0)
                .endAngle(0);

            g.append("path")
                .attr("stroke", color)
                .attr("fill", color)
                .classed("dcomponent-circular-gauge-inner-arc", true)
                .attr(
                    "transform",
                    `translate(${dim.radius + dim.xOffset}, ${
                        dim.radius + dim.yOffset
                    })`
                )
                .transition()
                .duration(2000)
                .attrTween("d", (d: any): any => {
                    const interpolate = d3.interpolate(0, endAngle);
                    return (t: number) => {
                        arc.endAngle(interpolate(t));
                        return arc(d);
                    };
                });

            g.append("text")
                .text(percentage + "%")
                .classed("dcomponent-circular-gauge-text", true)
                .attr("fill", color)
                .attr(
                    "transform",
                    `translate(${dim.radius + dim.xOffset}, ${
                        dim.radius + dim.yOffset
                    })`
                );
        }
    }
    render() {
        return (
            <div id={this.props.gaugeId} className="dcomponent-circular-gauge">
                <svg id={this.props.gaugeId + "-canvas"}></svg>
            </div>
        );
    }
}

export default CircularGauge;
