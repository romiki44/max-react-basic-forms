import useInput from '../hooks/use-input';

//nemusi byt vnutri komponentu
const enteredNameValidation = (value) => {
  return value.trim() !== '';
};

//nemusia byt vnutri komponentu
const enteredEmailValidation = (value) => {
  return value.includes('@');
};

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    valueIsValid: enteredFirstNameIsValid,
    inputHasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    resetValueInput: resetFirstNameInput,
  } = useInput(enteredNameValidation);

  const {
    value: enteredLastName,
    valueIsValid: enteredLastNameIsValid,
    inputHasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    resetValueInput: resetLastNameInput,
  } = useInput(enteredNameValidation);

  const {
    value: enteredEmail,
    valueIsValid: enteredEmailIsValid,
    inputHasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetValueInput: resetEmailInput,
  } = useInput(enteredEmailValidation);

  let formIsValid = false;
  if (
    enteredFirstNameIsValid &&
    enteredLastNameIsValid &&
    enteredEmailIsValid
  ) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log(`${enteredFirstName} ${enteredLastName}: ${enteredEmail}`);
    resetFirstNameInput();
    resetLastNameInput();
    resetEmailInput();
  };

  const firstNameInputClasses = firstNameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const lastNameInputClasses = lastNameInputHasError
    ? 'form-control invalid'
    : 'form-control';

  const emailInputClasses = emailInputHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            value={enteredFirstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameInputHasError && (
            <p className='error-text'>First Name is required</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='firstname'>Last Name</label>
          <input
            type='text'
            id='firstname'
            value={enteredLastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameInputHasError && (
            <p className='error-text'>Last Name is required</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>E-Mail Address</label>
        <input
          type='email'
          id='email'
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailInputHasError && (
          <p className='error-text'>Please enter a valid email.</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
