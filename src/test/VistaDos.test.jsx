import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import VistaDos from "../pages/vistaUno";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("<VistaDos />", () => {
  test("should work", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <VistaDos />
      </QueryClientProvider>
    );
  });
});
