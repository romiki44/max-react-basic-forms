import { useRef, useState } from 'react';

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState('');

  const nameChangeInputHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const formSubmitHandler = (event) => {
    //vzdy treba volat, lebo inac sa vola server, cize urobi reload stranky
    event.preventDefault();
    //jedna moznost..value cez useState..vyhodnejsie pre dalsie spracovanie
    console.log(enteredName);
    //druha moznost...value cez useRef()...ak staci len nacitat a nic viac
    const enteredRefName = nameInputRef.current.value;
    console.log(enteredRefName);

    //alebo pre 2-way bindig...nastavime cez premmenu html-input
    setEnteredName('');
    //iba cez useState...ale nie cez useRef!
    //resp. ide to ale iba za priamej manipulacie DOMu...neni dobre, mali by sme pouzivatr react
    //nameInputRef.current.value = '';
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input
          ref={nameInputRef}
          type='text'
          id='name'
          onChange={nameChangeInputHandler}
          value={enteredName}
        />
      </div>
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
