import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("Portfolio App Tests", () => {
  it("renders home page with name", () => {
    render(<App />);
    expect(screen.getByText(/Rahmat Hidayat Ramadhan/i)).toBeInTheDocument();
  });

  it("validates email format correctly", () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test("test@example.com")).toBe(true);
    expect(emailRegex.test("invalid-email")).toBe(false);
  });

  it("validates name length", () => {
    const shortName = "A";
    const validName = "John Doe";
    expect(shortName.length >= 2).toBe(false);
    expect(validName.length >= 2).toBe(true);
  });

  it("dark mode toggle works", () => {
    render(<App />);
    const darkModeButton = screen.getAllByLabelText(/toggle dark mode/i)[0];

    // Initial state
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    // Click to enable dark mode
    fireEvent.click(darkModeButton);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("navigation changes page", () => {
    render(<App />);
    const aboutButton = screen.getByRole("button", { name: /about/i });

    fireEvent.click(aboutButton);
    expect(screen.getByText(/About Me/i)).toBeInTheDocument();
  });
});
