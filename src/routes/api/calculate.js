export async function load({ request, resolve }) {

    if (request.method === "POST" && request.url === "/api/calculate") {
     
      const requestBody = await request.json();
      const userInput = requestBody.userInput;
      const result = customCalculate(userInput);
      return {
        body: JSON.stringify({ result }),
        headers: {
          "Content-Type": "application/json"
        }
      };
    }
  
  
    return await resolve(request);
  }
  
 
  function customCalculate(userInput) {
  
    try {
      const result = eval(userInput);
      return result;
    } catch (error) {
   
      return "Error evaluating expression";
    }
  }
  