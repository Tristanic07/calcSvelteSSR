<script>
  import { onMount } from "svelte";
  const calcButtons = [
    ["C", "+ -", "%", "/"],
    ["7", "8", "9", "x"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ].flat();

  let userInput = "";
  let result = null;

  async function calculate() {
    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();
      result = data.result;
    } catch (error) {
      console.error("Error:", error);
      result = "Error calculating";
    }
  }

  function handleButtonClick(button) {
    if (button === "=") {
      calculate();
    } else if (button === "C") {
      userInput = "";
      result = null;
    } else {
      userInput += button;
    }
    console.log(userInput);
  }

  onMount(() => {
    document.querySelectorAll(".button").forEach((button) => {
      button.addEventListener("click", () => {
        const buttonText = button.innerText;
        handleButtonClick(buttonText);
      });
    });
  });
</script>

<div class="container">
  {result}
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
