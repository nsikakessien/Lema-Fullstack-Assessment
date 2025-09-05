import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import Home from "../routes/Home";

vi.mock("../hooks/useUsers", () => {
  return {
    useUsers: vi.fn(() => ({
      data: [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          adders: {
            street: "123 Main St",
            state: "CA",
            city: "San Francisco",
            zipcode: "94105",
          },
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          adders: {
            street: "456 Market St",
            state: "NY",
            city: "New York",
            zipcode: "10001",
          },
        },
      ],
      isLoading: false,
    })),
    useUsersCount: vi.fn(() => ({
      data: { count: 2 },
      isLoading: false,
    })),
  };
});

describe("Home Page", () => {
  it("renders table with users list", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(
      screen.getByText("123 Main St, CA, San Francisco, 94105")
    ).toBeInTheDocument();

    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(
      screen.getByText("456 Market St, NY, New York, 10001")
    ).toBeInTheDocument();
  });
});
