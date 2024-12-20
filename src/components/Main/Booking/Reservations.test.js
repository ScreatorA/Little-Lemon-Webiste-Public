// Mock react-router-dom before imports
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
  cleanup,
  getByText,
} from "@testing-library/react";
import Reservations from "./Reservations";
import userEvent from "@testing-library/user-event";

// Run cleanup after each test
afterEach(() => {
  cleanup();
  // jest.runOnlyPendingTimers(); // Clear active timers
  // jest.clearAllMocks(); // Reset mocks
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(), // Mocking `useNavigate`
}));

const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

describe("Form Labels/Text/Roles", () => {
  test("The form has all necessary Information for the User", () => {
    render(<Reservations />);

    expect(screen.getByText(/Make a Reservation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("The Form is Invalid Required", async () => {
    render(<Reservations />);
    const firstNameField = screen.getByLabelText(/First Name/i);
    const lastNameField = screen.getByLabelText(/Last Name/i);
    const emailField = screen.getByLabelText(/Email/i);

    // Fill out the form with sample data
    fireEvent.change(firstNameField, {
      target: { value: "" },
    });

    fireEvent.change(lastNameField, {
      target: { value: "" },
    });

    fireEvent.change(emailField, {
      target: { value: "" },
    });

    fireEvent.focus(firstNameField);
    fireEvent.blur(firstNameField);

    await waitFor(() => {
      expect(screen.getByTestId("firstNameError")).toHaveTextContent(
        /First Name is Required!/i
      );
    });

    fireEvent.focus(lastNameField);
    fireEvent.blur(lastNameField);

    await waitFor(() => {
      expect(screen.getByTestId("lastNameError")).toHaveTextContent(
        /Last Name is Required!/i
      );
    });

    fireEvent.focus(emailField);
    fireEvent.blur(emailField);

    await waitFor(() => {
      expect(screen.getByTestId("emailError")).toHaveTextContent(
        /Email is Required!/i
      );
    });
  });

  test("The Form is Invalid Minimum", async () => {
    render(<Reservations />);
    const firstNameField = screen.getByLabelText(/First Name/i);
    const lastNameField = screen.getByLabelText(/Last Name/i);
    const emailField = screen.getByLabelText(/Email/i);
    const guestField = screen.getByLabelText(/Number of guests/i);

    // Fill out the form with sample data
    fireEvent.focus(firstNameField);
    fireEvent.blur(firstNameField);
    fireEvent.change(firstNameField, {
      target: { value: "S" },
    });

    fireEvent.focus(lastNameField);
    fireEvent.blur(lastNameField);
    fireEvent.change(lastNameField, {
      target: { value: "S" },
    });

    fireEvent.focus(emailField);
    fireEvent.blur(emailField);
    fireEvent.change(emailField, {
      target: { value: "S@s" },
    });

    fireEvent.focus(guestField);
    fireEvent.blur(guestField);
    fireEvent.change(guestField, {
      target: { value: -1 },
    });

    await waitFor(() => {
      expect(screen.getByTestId("firstNameError")).toHaveTextContent(
        /First Name Should at least have 2 Characters/i
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("lastNameError")).toHaveTextContent(
        /Last Name Should at least have 2 Characters/i
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("emailError")).toHaveTextContent(
        /Email must have at least 5 characters!/i
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("guestsError")).toHaveTextContent(
        /Guests needs to be at least 1/i
      );
    });
  });

  test("The Form is Invalid Maximum", async () => {
    render(<Reservations />);
    const firstNameField = screen.getByLabelText(/First Name/i);
    const lastNameField = screen.getByLabelText(/Last Name/i);
    const guestField = screen.getByLabelText(/Number of guests/i);

    // Fill out the form with sample data
    fireEvent.focus(firstNameField);
    fireEvent.blur(firstNameField);
    fireEvent.change(firstNameField, {
      target: { value: "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGH" },
    });

    fireEvent.focus(lastNameField);
    fireEvent.blur(lastNameField);
    fireEvent.change(lastNameField, {
      target: { value: "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGH" },
    });

    fireEvent.focus(guestField);
    fireEvent.blur(guestField);
    fireEvent.change(guestField, {
      target: { value: 11 },
    });

    await waitFor(() => {
      expect(screen.getByTestId("firstNameError")).toHaveTextContent(
        /First Name Should at most have 30 Characters/i
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("lastNameError")).toHaveTextContent(
        /Last Name Should at most have 30 Characters/i
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("guestsError")).toHaveTextContent(
        /Guests needs to be at most be 10/i
      );
    });
  });

  test("Invalid Email, Occasion not selected, Date is in past", async () => {
    render(<Reservations />);
    const emailField = screen.getByLabelText(/Email/i);
    const dateField = screen.getByLabelText(/Date/i);
    const occasionField = screen.getByLabelText(/Occasion/i);

    // Fill out the form with sample data
    fireEvent.focus(emailField);
    fireEvent.blur(emailField);
    fireEvent.change(emailField, {
      target: { value: "ss" },
    });

    fireEvent.focus(dateField);
    fireEvent.blur(dateField);
    fireEvent.change(dateField, {
      target: { value: "2024-12-12" },
    });

    fireEvent.focus(occasionField);
    fireEvent.blur(occasionField);
    fireEvent.change(occasionField, {
      target: { value: "default" },
    });

    await waitFor(() => {
      expect(screen.getByTestId("emailError")).toHaveTextContent(
        /Invalid email format/i
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("dateError")).toHaveTextContent(
        new RegExp(
          `The date must either be ${new Date().toLocaleDateString()} or lay in the future`,
          "i"
        )
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("occasionError")).toHaveTextContent(
        /Occasion needs to be selected/i
      );
    });
  });

  test("Submit is disabled, when User has given one invalid value", async () => {
    const handleSubmit = jest.fn();
    render(<Reservations onSubmit={handleSubmit} />);

    const firstNameField = screen.getByLabelText(/First Name/i);
    const lastNameField = screen.getByLabelText(/Last Name/i);
    const emailField = screen.getByLabelText(/Email/i);
    const dateField = screen.getByLabelText(/Choose date/i);
    const occasionField = screen.getByLabelText(/Occasion/i);
    const guestsField = screen.getByLabelText(/Number of guests/i);
    const submitButton = screen.getByTestId("submitButtonError");

    expect(submitButton).toBeDisabled(); // Interact with the fields with invalid inputs
    // Fill out the form with sample data

    await userEvent.type(firstNameField, "Z"); // Invalid (min 2 chars)
    await userEvent.type(lastNameField, "Sugi"); // Invalid (min 2 chars)
    await userEvent.type(emailField, "a@s.de"); // Invalid email
    await userEvent.selectOptions(occasionField, "firstDate"); // Invalid occasion
    await userEvent.type(guestsField, "5"); // Invalid (max 10)
    fireEvent.focus(dateField);
    fireEvent.blur(dateField);
    fireEvent.change(dateField, {
      target: { value: new Date().toLocaleDateString() },
    });
    // Ensure the submit button is disabled
    expect(submitButton).toBeDisabled();
  });

  test("Submit is disabled, when User has not given any valid value", async () => {
    const handleSubmit = jest.fn();
    render(<Reservations onSubmit={handleSubmit} />);

    const firstNameField = screen.getByLabelText(/First Name/i);
    const lastNameField = screen.getByLabelText(/Last Name/i);
    const emailField = screen.getByLabelText(/Email/i);
    const dateField = screen.getByLabelText(/Choose date/i);
    const occasionField = screen.getByLabelText(/Occasion/i);
    const guestsField = screen.getByLabelText(/Number of guests/i);
    const submitButton = screen.getByTestId("submitButtonError");

    expect(submitButton).toBeDisabled(); // Interact with the fields with invalid inputs

    await userEvent.type(firstNameField, "Z"); // Invalid (min 2 chars)
    await userEvent.type(lastNameField, "R"); // Invalid (min 2 chars)
    await userEvent.type(emailField, "invalid-email"); // Invalid email
    await userEvent.selectOptions(occasionField, "default"); // Invalid occasion
    await userEvent.type(guestsField, "11"); // Invalid (max 10)
    // Fill out the form with sample data
    fireEvent.focus(dateField);
    fireEvent.blur(dateField);
    fireEvent.change(dateField, {
      target: { value: "2024-03-06" },
    });
    // Ensure the submit button is disabled
    expect(submitButton).toBeDisabled();
  });

  test("Submit is enabled, when User has given valid value", async () => {
    const handleSubmit = jest.fn();
    render(<Reservations onSubmit={handleSubmit} />);
    const firstNameField = screen.getByLabelText(/First Name/i);
    const lastNameField = screen.getByLabelText(/Last Name/i);
    const emailField = screen.getByLabelText(/Email/i);
    const dateField = screen.getByLabelText(/Choose date/i);
    const occasionField = screen.getByLabelText(/Occasion/i);
    const guestsField = screen.getByLabelText(/Number of guests/i);
    const submitButton = screen.getByTestId("submitButtonError");
    const user = userEvent.setup();
    // Initial state: Submit button should be disabled
    expect(submitButton).toBeDisabled();

    // Fill out the form with valid data
    await userEvent.type(firstNameField, "John");
    await userEvent.type(lastNameField, "Doe");
    await userEvent.type(emailField, "john.doe@example.com");
    await userEvent.selectOptions(occasionField, "anniversary");

    fireEvent.focus(dateField);
    fireEvent.blur(dateField);
    fireEvent.change(dateField, {
      target: { value: new Date().toLocaleDateString() },
    });

    fireEvent.focus(guestsField);
    fireEvent.blur(guestsField);
    fireEvent.change(guestsField, {
      target: { value: 5 },
    });
    expect(submitButton).toHaveTextContent(/Submit/i);
    // Submit button should now be enabled
    expect(submitButton).not.toBeDisabled();

    await user.click(submitButton);
    //await expect(submitButton).toHaveTextContent(/Submitting/i);
    //expect(submitButton).toHaveTextContent(/...Submitting/i)
    expect(submitButton).toBeDisabled();
  });

  test("Submit is enabled, when User has given valid value and by submitting the button is disabled", async () => {
    const handleSubmit = jest
      .fn()
      .mockResolvedValueOnce(
        new Promise((resolve) => setTimeout(resolve, 10000))
      ); // Simulate async submit

    render(<Reservations onSubmit={handleSubmit} />);

    const firstNameField = screen.getByLabelText(/First Name/i);
    const lastNameField = screen.getByLabelText(/Last Name/i);
    const emailField = screen.getByLabelText(/Email/i);
    const dateField = screen.getByLabelText(/Choose date/i);
    const occasionField = screen.getByLabelText(/Occasion/i);
    const guestsField = screen.getByLabelText(/Number of guests/i);
    const submitButton = screen.getByTestId("submitButtonError");

    // Initial state: Submit button should be disabled
    expect(submitButton).toBeDisabled();

    // Fill out the form with valid data
    await userEvent.type(firstNameField, "John");
    await userEvent.type(lastNameField, "Doe");
    await userEvent.type(emailField, "john.doe@example.com");
    await userEvent.selectOptions(occasionField, "anniversary");

    fireEvent.change(dateField, {
      target: { value: new Date().toLocaleDateString() },
    });
    fireEvent.change(guestsField, { target: { value: 5 } });

    // Submit button should now be enabled
    expect(submitButton).not.toBeDisabled();
    expect(submitButton).toHaveTextContent(/Submit/i);

    // Simulate form submission and wait for the button text to change

    fireEvent.click(screen.getByText(/Submit/i));
    expect(handleSubmit).toHaveBeenCalledTimes(0);
    await waitFor(() => {
      expect(submitButton).toBeInTheDocument();
    }, {timeout: 2000});

    // Check if the submit button is disabled during submission
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });

    // Wait for the async operation to finish and check that the text is reset to "Submit"
    await waitFor(() => {
      expect(submitButton).toHaveTextContent(/Submit/i);
    });

    // The Submit button should be disabled after the async submission completes
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });
});
