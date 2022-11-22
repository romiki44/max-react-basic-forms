import { useState } from 'react';

const useInput = (validateFn) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateFn(enteredValue);
  const inputHasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const resetValueInput = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    valueIsValid,
    inputHasError,
    valueChangeHandler,
    inputBlurHandler,
    resetValueInput,
  };
};

export default useInput;
