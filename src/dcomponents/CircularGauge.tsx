import React from "react";
import { arc, interpolate, select } from "d3";
import "./CircularGauge.css";

type Props = {
    gaugeId: string;
    percentage: number;
    color: string;
};

class CircularGauge extends React.Component<Props> {
    percentage: number | undefined = undefined;
    color: string | undefined = undefined;

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

    componentDidUpdate() {
        if (
            this.percentage !== this.props.percentage ||
            this.color !== this.props.color
        ) {
            this.draw();
            this.percentage = this.props.percentage;
            this.color = this.props.color;
        }
    }
    componentDidMount() {
        this.draw();
        this.percentage = this.props.percentage;
        this.color = this.props.color;
    }

    draw() {
        const id = this.props.gaugeId + "-canvas";
        const elm = document.getElementById(id);
        const g = select(`#${id}`);
        g.selectAll("*").remove();

        if (elm) {
            const dim = this.getDimension(elm);
            const percentage = this.props.percentage;
            const color = this.props.color;

            const endAngle = ((Math.PI * percentage) / 100) * 2;

            g.append("circle")
                .style("stroke", color)
                .classed("dcomponent-circular-gauge-outer-circle", true)
                .attr("id", `${id}-rim`)
                .attr("r", dim.radius)
                .attr("cx", dim.radius)
                .attr("cy", dim.radius)
                .attr("transform", `translate(${dim.xOffset}, ${dim.yOffset})`);

            const _arc = arc()
                .innerRadius(50)
                .outerRadius(dim.radius - 10)
                .startAngle(0)
                .endAngle(0);

            g.append("path")
                .attr("id", `${id}-path`)
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
                    const intp = interpolate(0, endAngle);
                    return (t: number) => {
                        _arc.endAngle(intp(t));
                        return _arc(d);
                    };
                });

            g.append("text")
                .text(percentage + "%")
                .classed("dcomponent-circular-gauge-text", true)
                .attr("id", `${id}-text`)
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
