import { json } from '@sveltejs/kit';
import { evaluate } from 'mathjs';
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const userInput = await request.json();
    eval(userInput);
    return json(userInput);
}