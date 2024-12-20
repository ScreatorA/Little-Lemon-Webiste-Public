//Formik and Yup for form Validation
import "./BookingForm.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function BookingForm({
  formData,
  handleChange,
  handleSubmit,
  reservationTimes,
  isSubmitting,
}) {
  const occasion = [
    { event: "default", label: "Select an occasion" },
    { event: "justLoveFood", label: "Foodie/s" },
    { event: "birthday", label: "Birthday" },
    { event: "date", label: "Date" },
    { event: "firstDate", label: "First Date" },
    { event: "engagement", label: "Engagement" },
    { event: "anniversary", label: "Anniversary" },
    { event: "firstJob", label: "First Job" },
    { event: "jobPromotion", label: "Job Promotion" },
    { event: "teamCeleberation", label: "Team Celebration" },
    { event: "gatheringUp", label: "Gathering Up" },
    { event: "reunion", label: "Reunion" },
  ];

  const formValidationSchema = Yup.object({
    firstName: Yup.string()
      .required("First Name is Required!")
      .min(2, "First Name Should at least have 2 Characters")
      .max(30, "First Name Should at most have 30 Characters"),

    lastName: Yup.string()
      .required("Last Name is Required!")
      .min(2, "Last Name Should at least have 2 Characters")
      .max(30, "Last Name Should at most have 30 Characters"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is Required!")
      .min(5, "Email must have at least 5 characters!"),

    date: Yup.date()
      .required("Date is Required!")
      .test(
        "future Date or present-Date",
        `The date must either be ${new Date().toLocaleDateString()} or lay in the future`,
        (value) =>
          value &&
          new Date(value).setHours(0, 0, 0, 0) >=
            new Date().setHours(0, 0, 0, 0)
      ),

    occasion: Yup.string()
      .required("Occasion is Required!")
      .test(
        "Occassion is selected",
        "Occasion needs to be selected",
        (value) => value && value !== "default"
      ),

    guests: Yup.number()
      .required("Guests number is Required!")
      .min(1, "Guests needs to be at least 1")
      .max(10, "Guests needs to be at most be 10"),
  });

  return (
    <div className='fullForm'>
      <Formik
        initialValues={formData}
        validationSchema={formValidationSchema}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        className='form'
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form className='formContent'>
            <h1 className='formHeading'>Make a Reservation</h1>
            {/* FIRST NAME */}
            <div className='firstName divField'>
              <label htmlFor='firstName' className='formLabel'>
                First Name<span>*</span>
              </label>
              <Field
                type='text'
                id='firstName'
                name='firstName'
                placeholder='  Zoro'
                aria-describedby='firstNameError'
                className={`field ${
                  errors.firstName && touched.firstName ? "field-error" : ""
                } ${
                  !errors.firstName && touched.firstName ? "field-success" : ""
                }`}
              />
              <div className='icon'>
                {!errors.firstName && touched.firstName && (
                  <span className='success-icon' aria-hidden='true'>
                    O
                  </span>
                )}
                {errors.firstName && touched.firstName && (
                  <span className='error-icon' aria-hidden='true'>
                    X
                  </span>
                )}
              </div>

              {/* Show error message if validation fails */}
              {touched.firstName && (
                <ErrorMessage
                  name='firstName'
                  component='div'
                  className='error'
                  data-testid='firstNameError'
                  aria-live='assertive'
                />
              )}
            </div>

            {/* LAST NAME */}
            <div className='lastName divField'>
              <label htmlFor='lastName' className='formLabel'>
                Last Name<span>*</span>
              </label>
              <Field
                type='text'
                id='lastName'
                name='lastName'
                placeholder='  Roronoa'
                aria-describedby='lastNameError'
                className={`field ${
                  errors.lastName && touched.lastName ? "field-error" : ""
                } ${
                  !errors.lastName && touched.lastName ? "field-success" : ""
                }`}
              />
              <div className='icon'>
                {!errors.lastName && touched.lastName && (
                  <span className='success-icon' aria-hidden='true'>
                    O
                  </span>
                )}
                {errors.lastName && touched.lastName && (
                  <span className='error-icon' aria-hidden='true'>
                    X
                  </span>
                )}
              </div>
              {/* Show error message if validation fails */}
              {touched.lastName && (
                <ErrorMessage
                  name='lastName'
                  component='div'
                  className='error'
                  data-testid='lastNameError'
                  aria-live='assertive'
                />
              )}
            </div>

            {/* EMAIL */}
            <div className='email divField'>
              <label htmlFor='email' className='formLabel'>
                Email<span>*</span>
              </label>
              <Field
                type='email'
                id='email'
                name='email'
                placeholder='  Zoro.Roronoa@mail.de'
                aria-describedby='emailError'
                className={`field ${
                  errors.email && touched.email ? "field-error" : ""
                } ${!errors.email && touched.email ? "field-success" : ""}`}
              />
              <div className='icon'>
                {!errors.email && touched.email && (
                  <span className='success-icon' aria-hidden='true'>
                    O
                  </span>
                )}
                {errors.email && touched.email && (
                  <span className='error-icon' aria-hidden='true'>
                    X
                  </span>
                )}
              </div>
              {/* Show error message if validation fails */}
              {touched.email && (
                <ErrorMessage
                  name='email'
                  component='div'
                  className='error'
                  data-testid='emailError'
                  aria-live='assertive'
                />
              )}
            </div>

            {/* RESERVATION DATE */}
            <div className='reservationDate divField'>
              <div className='dateLabelField'>
                <label htmlFor='date' className='formLabel'>
                  Choose date<span>*</span>
                </label>
                <Field
                  type='date'
                  id='date'
                  name='date'
                  aria-describedby='dateError'
                  className={`field ${
                    errors.date && touched.date ? "field-error" : ""
                  } ${!errors.date && touched.date ? "field-success" : ""}`}
                />
                <div className='icon'>
                  {!errors.date && touched.date && (
                    <span className='success-icon' aria-hidden='true'>
                      O
                    </span>
                  )}
                  {errors.date && touched.date && (
                    <span className='error-icon' aria-hidden='true'>
                      X
                    </span>
                  )}
                </div>
                {/* Show error message if validation fails */}
                {touched.date && (
                  <ErrorMessage
                    name='date'
                    component='div'
                    className='error'
                    data-testid='dateError'
                    aria-live='assertive'
                  />
                )}
              </div>
            </div>

            {/* RESERVATION TIME */}
            <div className='availableTimes divField'>
              <label htmlFor='time' className='formLabel'>
                Choose time<span>*</span>
              </label>
              <Field
                as='select'
                id='time'
                name='time'
                className={`field ${
                  errors.time && touched.time ? "field-error" : ""
                } ${!errors.time && touched.time ? "field-success" : ""}`}
              >
                {reservationTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Field>
              <div className='icon'>
                {!errors.time && touched.time && (
                  <span className='success-icon' aria-hidden='true'>
                    O
                  </span>
                )}
                {errors.time && touched.time && (
                  <span className='error-icon' aria-hidden='true'>
                    X
                  </span>
                )}
              </div>
            </div>

            {/* SELECT OCCASION */}
            <div className='occasion divField'>
              <label htmlFor='occasion' className='formLabel'>
                Occasion<span>*</span>
              </label>
              <Field
                as='select'
                id='occasion'
                name='occasion'
                aria-describedby='occasionError'
                className={`field ${
                  errors.occasion && touched.occasion ? "field-error" : ""
                } ${
                  !errors.occasion && touched.occasion ? "field-success" : ""
                }`}
              >
                {occasion.map((occasion) => (
                  <option key={occasion.event} value={occasion.event}>
                    {occasion.label}
                  </option>
                ))}
              </Field>
              <div className='icon'>
                {!errors.occasion && touched.occasion && (
                  <span className='success-icon' aria-hidden='true'>
                    O
                  </span>
                )}
                {errors.occasion && touched.occasion && (
                  <span className='error-icon' aria-hidden='true'>
                    X
                  </span>
                )}
              </div>
              {/* Show error message if validation fails */}
              {touched.occasion && (
                <ErrorMessage
                  name='occasion'
                  component='div'
                  className='error'
                  data-testid='occasionError'
                  aria-live='assertive'
                />
              )}
            </div>

            {/* SELECT NUMBER OF GUESTS*/}
            <div className='guests divField'>
              <label htmlFor='guests' className='formLabel'>
                Number of guests<span>*</span>
              </label>
              <Field
                type='number'
                name='guests'
                placeholder='  2'
                id='guests'
                aria-describedby='guestsError'
                className={`field ${
                  errors.guests && touched.guests ? "field-error" : ""
                } ${!errors.guests && touched.guests ? "field-success" : ""}`}
              />
              <div className='icon'>
                {!errors.guests && touched.guests && (
                  <span className='success-icon' aria-hidden='true'>
                    O
                  </span>
                )}
                {errors.guests && touched.guests && (
                  <span className='error-icon' aria-hidden='true'>
                    X
                  </span>
                )}
              </div>
              {/* Show error message if validation fails */}
              {touched.guests && (
                <ErrorMessage
                  name='guests'
                  component='div'
                  className='error'
                  data-testid='guestsError'
                  aria-live='assertive'
                />
              )}
            </div>

            {/* BUTTON */}
            <button
              type='submit'
              name='reservationSubmitButton'
              className='reservationSubmit'
              data-testid='submitButtonError'
              aria-label='Submit'
              aria-live='polite'
              aria-busy={isSubmitting ? "true" : "false"}
              aria-disabled={isSubmitting || !(dirty && isValid)}
              disabled={isSubmitting || !(dirty && isValid)}
            >
              {isSubmitting ? (
                <>
                  <span className='spinner' aria-hidden='true'></span>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
