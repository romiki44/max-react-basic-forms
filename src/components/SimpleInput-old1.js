import { useState } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  //bez useEffect! v podstate nie je vobec potrebny...
  let formIsValid = false;
  if (enteredNameIsValid) {
    formIsValid = true;
  }

  const nameChangeInputHandler = (event) => {
    setEnteredName(event.target.value);
    //pozor, enteredName nestihne update (je to scheduled async metoda),
    //preto treba pouzit event.target.value!
    if (event.target.value.trim() !== '') {
      setEnteredNameIsValid(true);
    }
  };

  const nameInputBlurHandler = () => {
    setEnteredNameTouched(true);
    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    setEnteredNameTouched(true);
    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return;
    }
    setEnteredNameIsValid(true);
    console.log(enteredName);
    setEnteredName('');
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  const nameInputClasses = nameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameChangeInputHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && (
          <p className='error-text'>Name must not be empty.</p>
        )}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
