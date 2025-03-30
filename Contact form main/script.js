const submitBtn = document.getElementById("submit");
const modal = document.querySelector(".modal");

// Input de texto
const inputFirstName = document.getElementById("input-firstname");
const errorFirstName = document.getElementById("error-firstname");

const inputLastName = document.getElementById("input-lastname");
const errorLastName = document.getElementById("error-lastname");

const inputEmail = document.getElementById("input-email");
const errorEmail = document.getElementById("error-email");

// Input radio
const queryRadios = document.querySelectorAll('input[type="radio"]');
const errorQueryType = document.getElementById("error-querytype");

// Text area
const messageText = document.getElementById("message-text");
const errorMessage = document.getElementById("error-message");

// Checkbox (Consent)
const checkboxConsent = document.querySelector('input[type="checkbox"]');
const errorConsent = document.getElementById("error-consent");

// Agregamos listener al botón "Submit"
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();  // Evitamos envío real del formulario hasta que se cumplan las condiciones
  
  // First Name
  if (inputFirstName.value.trim() === "") {
    errorFirstName.classList.remove("hidden");
  } else {
    errorFirstName.classList.add("hidden");
  }

  // Last Name 
  if (inputLastName.value.trim() === "") {
    errorLastName.classList.remove("hidden");
  } else {
    errorLastName.classList.add("hidden");
  }

  // Email
  // Validamos que sea valido con una regex minima
  if (inputEmail.value.trim() === "") {
    errorEmail.textContent = "This field is required";
    errorEmail.classList.remove("hidden");
  } else if (!/\S+@\S+\.\S+/.test(inputEmail.value.trim())) {
    // Si no cumple formato
    errorEmail.textContent = "Please enter a valid email address";
    errorEmail.classList.remove("hidden");
  } else {
    errorEmail.classList.add("hidden");
  }

  // Query Type (radio)
  let oneRadioChecked = false;
  queryRadios.forEach((radio) => {
    if (radio.checked) {
      oneRadioChecked = true;
    }
  });
  if (!oneRadioChecked) {
    errorQueryType.classList.remove("hidden");
  } else {
    errorQueryType.classList.add("hidden");
  }

  // Message 
  if (messageText.value.trim() === "") {
    errorMessage.classList.remove("hidden");
  } else {
    errorMessage.classList.add("hidden");
  }

  // Consent (checkbox) 
  if (!checkboxConsent.checked) {
    errorConsent.classList.remove("hidden");
  } else {
    errorConsent.classList.add("hidden");
  }

  // Si están todos con la clase hidden al darle click (lo que significa que no todos los datos están bien9
  // mostraremos el siguiente mensaje

  if (
    errorFirstName.classList.contains("hidden") &&
    errorLastName.classList.contains("hidden") &&
    errorEmail.classList.contains("hidden") &&
    errorQueryType.classList.contains("hidden") &&
    errorMessage.classList.contains("hidden") &&
    errorConsent.classList.contains("hidden")
  ) {
    modal.classList.remove("hidden"); // Enviamos este mensaje (en realidad no era un modal pero le deje ese nombre de clase, ya que al principio iba a serlo)

  // Vamos a reiniciar todo el formulario una vez lo enviemos

  setTimeout(() => {
    modal.classList.add("hidden");

    // Limpiar campos
    inputFirstName.value = "";
    inputLastName.value = "";
    inputEmail.value = "";
    messageText.value = "";

    // Deseleccionar radios y checkbox una vez completemos
    queryRadios.forEach((radio) => {
      radio.checked = false;
    });
    checkboxConsent.checked = false;
  }, 3000);
}

});

// Evitamos que en los input para los nombres usen números

inputFirstName.addEventListener("input", () => {
  inputFirstName.value = inputFirstName.value.replace(/[^a-zA-Z\s]/g, "");
});

inputLastName.addEventListener("input", () => {
  inputLastName.value = inputLastName.value.replace(/[^a-zA-Z\s]/g, "");
});