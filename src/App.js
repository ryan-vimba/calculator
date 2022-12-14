// import logo from './logo.svg';
import './App.css';
import Wrapper from './components/Wrapper';
import Screen from './components/Screen';
import Branding from './components/Branding';
import SolarPanel from './components/SolarPanel';
import ButtonBox from './components/ButtonBox';
import React, { useState } from "react";

const UNARY_OPERATIONS = ['+/-', '√', '%'];
const BINARY_OPERATIONS = ['+', '-', 'x', '÷'];

const buttonValuesLeft = [
  ['+/-', '√', '%'],
  ['MRC', 'M-', 'M+'],
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['ON/C', '0', '.']
];

const buttonValuesRight = [
  ['÷'], 
  ['x'], 
  ['-'], 
  ['+'], 
  ['=']
];

function App() {
  var [calc, setCalc] = useState({
    clear_display: false,
    operation: '',
    op_value: 0,
    prev_display: 0,
    display: '0',
    memory: 0,
  })

  const handleButtonPressed = (event) => {
    var button_value = event.target.innerHTML;
    if (button_value === 'ON/C') {
      handleClear();
    } else if (!isNaN(button_value)) {
      handleNumber(button_value);
    } else if (button_value === '.') {
      handleDecimalPoint();
    } else if (BINARY_OPERATIONS.includes(button_value)) {
      handleBinaryOperation(button_value);
    } else if (button_value === '=') {
      handleEquals();
    } else if (UNARY_OPERATIONS.includes(button_value)) {
      handleUnaryOperation(button_value);
    } else if (button_value === 'M+') {
      handleMemoryAdd();
    } else if (button_value === 'M-') {
      handleMemorySubtract();
    } else if (button_value === 'MRC') {
      handleMRC();
    }
  };

  const handleClear = () => {
    setCalc({
      clear_display: false,
      operation: '',
      op_value: 0,
      display: '0',
      prev_display: 0,
      memory: 0,
    });
  }

  const handleNumber = (number) => {
    if (calc.clear_display) {
      setCalc({
        ...calc,
        clear_display: false,
        display: number,
        op_value: calc.operation ? number : 0,
      });
      return;
    } 
    let new_value = calc.display + number;
    if (!new_value.includes('.')) {
      new_value = String(Number(new_value));
    }
    setCalc({
      ...calc,
      display: new_value,
      op_value: calc.operation ? new_value : 0,
    });
  };

  const handleDecimalPoint = () => {
    if (!calc.display.includes('.')) {
      setCalc({
        ...calc,
        display: calc.display + '.'
      });
    }
  };

  const handleBinaryOperation = (op) => {
    if (BINARY_OPERATIONS.includes(calc.operation)) {
      let new_value = performBinaryOperation();
      setCalc({
        ...calc,
        operation: op,
        clear_display: true,
        display: new_value,
        prev_display: new_value,
      });
    } else {
      setCalc({
        ...calc,
        operation: op,
        clear_display: true,
        prev_display: calc.display,
      });
    }
  };

  const handleEquals = () => {
    if (calc.operation !== '') {
      let new_value = performBinaryOperation();
      setCalc({
        ...calc,
        operation: '',
        clear_display: true,
        display: new_value,
        prev_display: new_value,
      });
    }
  };

  const handleUnaryOperation = (op) => {
    let new_value = performUnaryOperation(op, calc.display);
    if (BINARY_OPERATIONS.includes(calc.operation)) {
      new_value = performBinaryOperation();
      new_value = performUnaryOperation(op, new_value);
    }

    setCalc({
      ...calc,
      operation: '',
      clear_display: true,
      display: new_value,
      prev_display: new_value,
    });
  }

  const handleMemoryAdd = () => {
    let add_to_memory = Number(calc.display);
    if (BINARY_OPERATIONS.includes(calc.operation)) {
      add_to_memory = performBinaryOperation();
      let new_memory_value = calc.memory + add_to_memory;
      setCalc({
        ...calc,
        operation: '',
        clear_display: true,
        display: add_to_memory,
        prev_display: add_to_memory,
        memory: new_memory_value,
      });
    } else {
      let new_memory_value = calc.memory + add_to_memory;
      setCalc({
        ...calc,
        operation: '',
        clear_display: true,
        display: add_to_memory,
        memory: new_memory_value,
      });
    }
  }

  const handleMemorySubtract = () => {
    let sub_from_memory = Number(calc.display);
    if (BINARY_OPERATIONS.includes(calc.operation)) {
      sub_from_memory = performBinaryOperation();
      let new_memory_value = calc.memory - sub_from_memory;
      setCalc({
        ...calc,
        operation: '',
        clear_display: true,
        display: sub_from_memory,
        prev_display: sub_from_memory,
        memory: new_memory_value,
      });
    } else {
      let new_memory_value = calc.memory - sub_from_memory;
      setCalc({
        ...calc,
        operation: '',
        clear_display: true,
        display: sub_from_memory,
        memory: new_memory_value,
      });
    }
  }

  const handleMRC = () => {
    let new_display_value = String(calc.memory);
    let op = calc.operation;
    if (BINARY_OPERATIONS.includes(op)) {
      let new_prev_display = performBinaryOperation();
      setCalc({
        ...calc,
        operation: 'MRC',
        clear_display: true,
        display: new_display_value,
        prev_display: new_prev_display,
      });
    } else {
      setCalc({
        ...calc,
        operation: 'MRC',
        clear_display: true,
        display: new_display_value,
        memory: op === 'MRC' ? 0 : calc.memory,
      });
    }
  }

  const performBinaryOperation = () => {
    switch (calc.operation) {
      case '+':
        return Number(calc.prev_display) + Number(calc.display);
      case '-':
        return Number(calc.prev_display) - Number(calc.display);
      case 'x':
        return Number(calc.prev_display) * Number(calc.display);
      case '÷':
        return Number(calc.prev_display) / Number(calc.display);
      default:
        return 0;
    }
  };

  const performUnaryOperation = (op, value) => {
    switch(op) {
      case '+/-':
        return -1 * value;
      case '√':
        return Math.sqrt(value);
      case '%':
        return value / 100;
      default:
        return 0;
    }
  }

  return (
    <Wrapper>
      <Screen value={calc.display ? calc.display : calc.saved}/>
      <Branding/>
      <SolarPanel/>
      <ButtonBox className="buttonBox left" buttonValues={buttonValuesLeft} buttonHandler={handleButtonPressed}/>
      <ButtonBox className="buttonBox right" buttonValues={buttonValuesRight} buttonHandler={handleButtonPressed}/>
    </Wrapper>
  );
}

export default App;
