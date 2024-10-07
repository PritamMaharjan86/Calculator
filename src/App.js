import { useState } from "react";


function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ['/', '*', '+', '-', '.'];


  const calculateExpression = (expression) => {
    try {

      const tokens = expression.split(/([+\-*/])/);

      let currentValue = parseFloat(tokens[0]);

      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextValue = parseFloat(tokens[i + 1]);

        switch (operator) {
          case '+':
            currentValue += nextValue;
            break;
          case '-':
            currentValue -= nextValue;
            break;
          case '*':
            currentValue *= nextValue;
            break;
          case '/':
            currentValue /= nextValue;
            break;
          default:
            return "Error";
        }
      }

      return currentValue;
    } catch (error) {
      return "Error";
    }
  };

  const updateCalc = (value) => {
    if (
      (ops.includes(value) && calc === "") ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc(calc + value);

    if (!ops.includes(value)) {
      const updatedResult = calculateExpression(calc + value);
      setResult(updatedResult.toString());
    }
  };

  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };

  const calculate = () => {
    if (calc === "") {
      return;
    }

    const finalResult = calculateExpression(calc);
    setCalc(finalResult.toString());
    setResult("");
  };

  const deleteAll = () => {
    setCalc("");
    setResult("");
  };

  const clear = () => {
    if (calc === "") {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value);
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">

          {calc || "0"}
          {result ? <span className="result"> = {result}</span> : ""}
        </div>
        <div className="operators">
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={() => updateCalc('/')}>/</button>
        </div>

        <div className="digits">
          {createDigits()}
          <button onClick={() => updateCalc('.')}>.</button>
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={clear}>C</button>
          <button onClick={deleteAll}>AC</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
