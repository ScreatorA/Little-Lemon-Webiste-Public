import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Reservations, {
  updateTimes,
} from "./components/Main/Booking/Reservations"; // Import the Reservations component
import { fetchAPI, submitAPI } from "./utils/api"; // Import the mockable API functions
import { MemoryRouter } from "react-router-dom"; // MemoryRouter is used to mock routing for tests

// Mock the API functions so that real HTTP requests are not made during testing
jest.mock("./utils/api", () => ({
  fetchAPI: jest.fn(), // Mocks the fetchAPI function
  submitAPI: jest.fn(), // Mocks the submitAPI function
}));

describe("Reservations Component", () => {
  // Test case 1: Check if all the form fields are rendered correctly
  test("should render reservation form with all fields", () => {
    render(
      <MemoryRouter>
        <Reservations />
      </MemoryRouter>
    );

    // Ensure that the essential form fields are rendered
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
  });

  // Test case 2: Check if available times are fetched correctly based on selected date
  test("should fetch available times when a new date is selected", async () => {
    render(
      <MemoryRouter>
        <Reservations />
      </MemoryRouter>
    );

    // Mocking the API call to fetch available times for a specific date
    const mockTimes = ["18:00", "18:30", "19:00"];
    fetchAPI.mockResolvedValueOnce(mockTimes); // Resolve the mock API call with mockTimes

    // Find the date input and simulate changing the date
    const dateInput = screen.getByLabelText(/Choose date/i);
    fireEvent.change(dateInput, { target: { value: "2024-12-25" } });

    // Wait for the API call to complete and check if the times are updated
    await waitFor(() =>
      expect(fetchAPI).toHaveBeenCalledWith(new Date("2024-12-25"))
    );

    // Wait for the time select element to update its value
    await waitFor(() => {
      expect(screen.getByLabelText(/Choose time/i)).toHaveValue("18:00"); // Assuming the first available time is pre-selected
    });
  });

  // Test case 3: Test form submission behavior
  test("should submit the form successfully", async () => {
    render(
      <MemoryRouter>
        <Reservations />
      </MemoryRouter>
    );

    // Mock the submitAPI response to simulate a successful submission
    submitAPI.mockResolvedValueOnce(true);

    // Fill out the form with sample data
    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Choose date/i), {
      target: { value: "2024-12-25" },
    });
    fireEvent.change(screen.getByLabelText(/Choose time/i), {
      target: { value: "18:00" },
    });
    fireEvent.change(screen.getByLabelText(/Occasion/i), {
      target: { value: "date" },
    });
    fireEvent.change(screen.getByLabelText(/Number of guests/i), {
      target: { value: 2 },
    });

    // Submit the form
    const submitButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitButton);

    // Wait for the submission to be processed
    await waitFor(() =>
      expect(submitAPI).toHaveBeenCalledWith({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        date: "2024-12-25",
        time: "18:00",
        occasion: "date",
        guests: 2,
      })
    );
  });

  // Test case 4: Verifying the reducer logic for handling different actions
  describe("updateTimes Reducer", () => {
    const initialState = {
      time: [
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00",
        "23:30",
      ],
    };

    // Test the 'SET_TIMES' action
    test("should handle 'SET_TIMES' action", () => {
      const newTimes = ["12:00", "12:30", "13:00"];
      const action = { type: "SET_TIMES", payload: newTimes };
      const result = updateTimes(initialState, action);
      expect(result.time).toEqual(newTimes); // Check if the times have been updated
    });

    // Test the 'Christmas' action
    test("should handle 'Christmas' action", () => {
      const action = { type: "Christmas" };
      const result = updateTimes(initialState, action);
      expect(result.time).toEqual([
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
      ]); // Set specific times for Christmas
    });

    // Test the 'Sylvester' action
    test("should handle 'Sylvester' action", () => {
      const action = { type: "Sylvester" };
      const result = updateTimes(initialState, action);
      expect(result.time).toEqual([
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
      ]); // Set specific times for Sylvester
    });

    // Test the 'New Year' action
    test("should handle 'New Year' action", () => {
      const action = { type: "New Year" };
      const result = updateTimes(initialState, action);
      expect(result.time).toEqual([
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
      ]); // Set specific times for New Year's Day
    });

    // Test for an unknown action type
    test("should return the current state for unknown action types", () => {
      const action = { type: "UNKNOWN_ACTION" };
      const result = updateTimes(initialState, action);
      expect(result).toEqual(initialState); // The state should remain unchanged for unknown actions
    });
  });
});
