import { json } from '@sveltejs/kit';
import { evaluate } from 'mathjs';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  try {
    const requestBody = await request.json();
    const userInput = requestBody.userInput;
    const result = evaluate(userInput);
    return json({ result }); // Return the result as a JSON object
  } catch (error) {
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
