const toggle = document.getElementById("togglePlan");
const priceText = document.getElementById("price");
const monthText = document.getElementById("monthly");
const button = document.getElementById("signup");

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    priceText.innerHTML =
      '<span class="price">$290</span> <span class="thin">PER YEAR (save $58)</span>';
  }

   else {
    priceText.innerHTML =
      '<span class="price">$29</span> <span class="thin">per month</span>';
  }

});

toggle.addEventListener("change", () => {
  monthText.textContent = toggle.checked
    ? "Yearly Subscription"
    : "Monthly Subscription";
});

button.addEventListener("click", () => {
  button.textContent = "Processing...";

  setTimeout(() => {
    alert("Subscription Processed 🚀");
    button.textContent = "Sign Up";
  }, 1000);
});

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    button.textContent = "Sign Up"
  }

  else {
    button.textContent = "Sign Up"
  }
});



