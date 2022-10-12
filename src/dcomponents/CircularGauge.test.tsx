import React from "react";
import { render, queryByAttribute } from "@testing-library/react";
import "@testing-library/jest-dom";
import CircularGauge from "./CircularGauge";

const getById = queryByAttribute.bind(null, "id");

const testRunner = (id: string, percentage: number) => {
    const view = render(
        <CircularGauge color="#00F" percentage={percentage} gaugeId={id} />
    );
    const divElement = getById(view.container, id);
    expect(divElement?.nodeName).toBe("DIV");
    expect(divElement).toBeInTheDocument();

    const svgElement = getById(view.container, `${id}-canvas`);
    expect(svgElement).toBeInTheDocument();
    expect(svgElement?.nodeName).toBe("svg");

    const rimElement = getById(svgElement!, `${id}-canvas-rim`);
    expect(rimElement).toBeInTheDocument();
    expect(rimElement?.nodeName).toBe("circle");

    const arcElement = getById(svgElement!, `${id}-canvas-path`);
    expect(arcElement).toBeInTheDocument();
    expect(arcElement?.nodeName).toBe("path");

    const textElement = getById(svgElement!, `${id}-canvas-text`);
    expect(textElement).toBeInTheDocument();
    expect(textElement?.nodeName).toBe("text");
    expect(textElement?.textContent).toBe(`${percentage}%`);
};

test("test circular gauge component", () => {
    testRunner("test1", 0);
    testRunner("test2", 10);
    testRunner("test3", 200);
});
