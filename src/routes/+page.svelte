<script>
  const calcButtons = [
    ["C", "+ -", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ].flat();

  let userInput = "0";

  async function calculate() {
    try {
      // will try to run the code block
      const response = await fetch("/api/calculate", {
        // making request to server using fetch
        method: "POST",
        body: JSON.stringify({ userInput }), //making a json representation of userInput
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json(); //revcieving data from server
      userInput = data.result;
    } catch {
      // catch error
      console.error("Error:");
      userInput = "Error calculating";
    }
  }

  function handleButtonClick(button) {
    if (!isNaN(button)) {
      userInput = userInput == 0 ? button : userInput + button;
    } else {
      switch (button) {
        case "C":
          userInput = "0";
          break;

        case "+ -":
          userInput *= -1;
          break;

        case "%":
          userInput *= 0.1;
          break;

        case "=":
          calculate(); // running the async function when click
          break;

        default:
          const lastChar = userInput[userInput.length - 1];
          const isOperator = /[*/+\-.]/.test(lastChar);

          //checking if the last input is operator or period
          if (isOperator) {
            userInput = userInput.slice(0, -1) + button;
          } else {
            userInput += button;
          }
          break;
      }
    }
  }
</script>

<div class="container">
  <div class="calcu">
    <input type="text" bind:value={userInput} readonly />
    <section>
      {#each calcButtons as buttons}
        {#if buttons === "="}
          <button
            class="buttonStyle"
            on:click={() => handleButtonClick(buttons)}>{buttons}</button
          >
        {:else}
          <button on:click={() => handleButtonClick(buttons)}>{buttons}</button>
        {/if}
      {/each}
    </section>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .calcu {
    width: 20.5rem;
    height: 24.5rem;
    padding: 0.5rem;
    background-color: #1f2937;
    border-radius: 6px;
  }

  input {
    padding: 0 10px;
    height: 4rem;
    width: 93%;
    margin-bottom: 0.4rem;
    border-radius: 6px;
    background-color: #334155;
    color: white;
    text-align: end;
    font-size: 2.25rem;
    line-height: 2.5rem;
  }

  section {
    display: grid;
    grid-template-columns: 5rem 5rem 5rem 5rem;
    height: 20rem;
    gap: 0.2rem;
  }

  button {
    border-radius: 6px;
    background-color: #6d28d9;
    font-size: 1.125rem;
    line-height: 1.75rem;
    color: white;
  }

  .buttonStyle {
    grid-column-end: span 2;
    background-color: #ff2400;
  }
</style>
