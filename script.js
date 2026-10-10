// Get the page elements
let nameInput = document.getElementById("nameInput");
let showBtn = document.getElementById("showBtn");
let result = document.getElementById("result");

showBtn.addEventListener("click", function () {
  // Declare a variable with the typed name
  let name = nameInput.value.trim();

  if (name === "") {
    result.textContent = "Please type your name first.";
    return;
  }

  // Declare your variables for Math
  let billions = 3;
  let netWorth = billions * 1000000000; // 3,000,000,000

  // Show the statement
  result.innerHTML =
    name + ", your net worth will be" +
    "<strong>$" + netWorth.toLocaleString() + "</strong>" +
    "(3 billion dollars) by 2027!";
});

// Press Enter to submit
nameInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") showBtn.click();
});
