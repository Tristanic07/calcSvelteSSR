<script>
  const calcButtons = [
    ["C", "+ -", "%", "/"],
    ["7", "8", "9", "x"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ].flat();

  let userInput = " ";
  let result = null;
  $: displayValue = result === null ? userInput : result;

  async function calculate() {
    const response = await fetch("/api/calculate", {
      method: "POST",
      body: JSON.stringify({ userInput }),
      headers: {
        "content-type": "application/json",
      },
    });

    result = await response.json();
    console.log(result);
  }

  function handleButtonClick(button) {
    switch (button) {
      case "C":
        userInput = " ";
        break;

      case "+ -":
        userInput *= -1;
        break;

      case ".":
        break;

      case "%":
        userInput *= 0.1;
        break;

      case "=":
        calculate();
        break;

      default:
        userInput += button;
        break;
    }
  }
</script>

<div class="container">
  <div class="calcu">
    <input type="text" bind:value={displayValue} readonly />
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
