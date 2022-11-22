import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === 'BLUR') {
    return { isTouched: true, value: state.value };
  }
  if (action.type === 'RESET') {
    return { isTouched: false, value: '' };
  }
  return inputStateReducer;
};

const useInputNew = (validateFn) => {
  const [inputState, dispach] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateFn(inputState.value);
  const inputHasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispach({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispach({ type: 'BLUR' });
  };

  const resetValueInput = () => {
    dispach({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    valueIsValid,
    inputHasError,
    valueChangeHandler,
    inputBlurHandler,
    resetValueInput,
  };
};

export default useInputNew;
