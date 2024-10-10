import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Sidebar from "../components/Sidebar";
import { BrowserRouter } from "react-router-dom";

describe("<Sidebar />", () => {
  test("should work", () => {
    render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );
  });
});
