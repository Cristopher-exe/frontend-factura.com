import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("<App />", () => {
  test("should work", () => {
    render(<App />);
    screen.debug();
  });
});
