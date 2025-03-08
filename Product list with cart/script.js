document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".item-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!button.classList.contains("active")) {
        // Si el botón no está activo, lo transformamos
        button.classList.add("active");
        button.innerHTML = `
          <button class="decrease">-</button>
          <span class="count">1</span>
          <button class="increase">+</button>
        `;
      }
    });
  });
});