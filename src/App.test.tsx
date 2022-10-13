import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

test("app test", () => {
    render(<App />);
    const linkElement = screen.getByText(/Circular Gauge/i);
    expect(linkElement).toBeInTheDocument();
});
