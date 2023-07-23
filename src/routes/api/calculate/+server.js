import { json } from '@sveltejs/kit';
import { evaluate } from 'mathjs';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    const requestBody = await request.json(); // asigning parse json data
    const userInput = requestBody.userInput;
    const result = calculate(userInput); // calculating the userInput
    return json({ result }); // Return the result as a JSON object
  } catch (error) { //error handling
    console.error("Error in POST /api/calculate:", error);
    return {
      status: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
}

function calculate(input) {
  function getPrecedence(operator) {
    if (operator === "+" || operator === "-") return 1;
    if (operator === "*" || operator === "/") return 2;
    return 0;
  }

  function applyOperator(operator, operand1, operand2) {
    if (operator === "+") return operand1 + operand2;
    if (operator === "-") return operand1 - operand2;
    if (operator === "*") return operand1 * operand2;
    if (operator === "/") return operand1 / operand2;
    return null; // Invalid operator
  }

  const operators = [];
  const operands = [];

  const components = input.match(/[-+*/]|[0-9.]+/g);

  if (!components || components.length === 0) {
    return null;
  }

  for (const component of components) {
    if (!isNaN(component)) {
      // If it's a number, push to the operands stack
      operands.push(parseInt(component));
    } else {
      // If it's an operator, handle operator precedence
      while (
        operators.length > 0 &&
        getPrecedence(operators[operators.length - 1]) >= getPrecedence(component)
      ) {
        const operator = operators.pop();
        const operand2 = operands.pop();
        const operand1 = operands.pop();
        const result = applyOperator(operator, operand1, operand2);
        operands.push(result);
      }
      operators.push(component);
    }
  }

  // Perform remaining calculations with remaining operators
  while (operators.length > 0) {
    const operator = operators.pop();
    const operand2 = operands.pop();
    const operand1 = operands.pop();
    const result = applyOperator(operator, operand1, operand2);
    operands.push(result);
  }

  return operands[0];
}


