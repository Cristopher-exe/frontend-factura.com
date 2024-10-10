import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import VistaUno from "../pages/vistaUno";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";

const queryClient = new QueryClient();

describe("<VistaUno />", () => {
  test("should work", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <VistaUno />
      </QueryClientProvider>
    );
  });
});
