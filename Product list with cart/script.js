const cart = {};

document.addEventListener("DOMContentLoaded", async () => {
  //haciendo peticion hacia el archivo json
  const response = await fetch("./data.json");
  const data = await response.json();
  // seleccionando elementos de menu para agregar los elementos para cada item
  const menu = document.querySelector(".menu");
  //recorriendo el array de data del json para crear elementos
  data.forEach(({ price, name, category, image, id }, index) => {
    // creando elementos HTML
    const item = document.createElement("div");
    // agregando la clase para los estilos css
    item.classList.add("items");
    // creando contenido del elemento item
    item.innerHTML = `
          <picture>
            <source media="(min-width:650px)" srcset="${image.desktop}">
            <source media="(min-width:465px)" srcset="${image.tablet}">
            <img src="${image.mobile}" style="width:auto;">
          </picture>
      
          <button class="item-btn" data-id="${id}"><img src="/assets/images/icon-add-to-cart.svg" alt=""> Add to cart</button>

          <div class="hidden cart-controls">
              <button data-id="${id}" data-action="decrease" class="decrease">-</button>
              <span class="count" id="count">1</span>
              <button data-id="${id}" data-action="increase" class="increase">+</button>
          </div>

          <p class="title">${category}</p>
          <p class="description">${name}</p>
          <p class="price" id="price">$${price}</p>
  
    `;
    // agregando item recien creado al elemento menu
    menu.appendChild(item);
  });

  // Mostrar modal con items del carrito
  function showFinalModal() {

  const modal = document.getElementById("final-modal");
  const modalCartItems = document.querySelector(".modal-cart-items");
  modalCartItems.innerHTML = ""; // Limpiamos antes de pintar

  const itemsInCart = Object.values(cart);

  // Definimos una variable para calcular la sumatoria
  let totalPurchase = 0;

  // Aquí podemos asumir que siempre existe al menos un producto,
  // porque solo llamamos a esta función si el carrito no está vacío ya que de otra forma el botón no se muestra en nuestro display
  itemsInCart.forEach(({ product, quantity }) => {
    const { name, price, image } = product;
    const modalItem = document.createElement("div");
    modalItem.classList.add("modal-item");

    // NUEVO: sumamos el precio total de este ítem al total general
    const itemTotal = price * quantity;
    totalPurchase += itemTotal;

    //creamos el HTML del Modal
    modalItem.innerHTML = `
      <div class="modal-products">
        <img src="${image.thumbnail}">
        <div>
          <p>${name} <span><span class="modal-quantity">${quantity}x</span> $${price}</span></p>
        </div>
      </div>

      <div>
        <p class="modal-total"> $${itemTotal.toFixed(2)} </p>
      </div>
    `;
    modalCartItems.appendChild(modalItem);
  });

  // Agregamos un último .modal-item para el "Order Total"
  const modalItemTotal = document.createElement("div");
  modalItemTotal.classList.add("modal-item");
  modalItemTotal.innerHTML = `
    <p class="order-total">Order Total</p>
    <p class="order-total"><strong>$${totalPurchase.toFixed(2)}</strong></p>
  `;
  modalCartItems.appendChild(modalItemTotal);

  // Mostramos el modal
  modal.classList.remove("hidden");
  modal.classList.add("show");
}

  // Agregamos varios items SIN REEMPLAZARLOS
  function updateCartProducts() {
    const cartList = document.querySelector(".cart-list");
    cartList.innerHTML = "";
    const itemsInCart = Object.values(cart);

    if (itemsInCart.length === 0) {
      document.querySelector(".cart img").classList.remove("hidden");
      document.querySelector(".cart p.cart-message").classList.remove("hidden");
    } else {
      document.querySelector(".cart img").classList.add("hidden");
      document.querySelector(".cart p.cart-message").classList.add("hidden");

      // Iteramos cada producto para agregarlos
      itemsInCart.forEach(({ product, quantity }) => {
        const { name, price } = product;
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-items");
        cartItem.innerHTML = `
          <div class="cart-item-content">
            <div>
              <span class="cart-item">${name}</span>
              <div class="item-price">
                <span class="quantity">x</span>
                <span class="quantity" id="quantity">${quantity}</span>
                <span class="unity-price">@ $<span id="unity-price">${price}</span>
                <span class="total-price">$<span id="total-price">${(
                  price * quantity
                ).toFixed(2)}</span>
              </div>
            </div>
              <button class="remove" data-id="${
                product.id
              }"><img src="./assets/images/icon-remove-item.svg" alt=""></button>
            </div>
        `;
        
        cartList.appendChild(cartItem);
      });

      // Añadimos botón “Confirm Order” solo una vez
      const confirmButton = document.createElement("button");
      confirmButton.textContent = "Confirm Order";
      confirmButton.classList.add("confirm-btn");
      cartList.appendChild(confirmButton);

      // Al hacer click en Confirmar, mostramos el modal
      confirmButton.addEventListener("click", () => {
        showFinalModal();
      });
    }

    // Actualizamos el span del contador (cartspan)
    const count = itemsInCart.reduce((acc, item) => acc + item.quantity, 0);
    document.querySelector("#cartspan").textContent = count;

    // Asignamos el evento "click" a cada botón remove
    const removeButtons = cartList.querySelectorAll(".remove");
    removeButtons.forEach((removeBtn) => {
      removeBtn.addEventListener("click", (e) => {
        const { id } = removeBtn.dataset;
        delete cart[id];
        // Re–mostramos el botón “Add to cart” en la izquierda
        const buttonInMenu = document.querySelector(
          `.item-btn[data-id="${id}"]`
        );
        if (buttonInMenu) {
          buttonInMenu.classList.remove("hidden");
          buttonInMenu.nextElementSibling.classList.add("hidden");
          const countSpanLeft =
            buttonInMenu.nextElementSibling.querySelector(".count");
          if (countSpanLeft) {
            countSpanLeft.textContent = "1";
          }
        }
        updateCartProducts();
      });
    });
  }

  // Agregamos afuera de las funciones del for each para evitar errores

  function updateCartCount() {
    const count = Object.values(cart).reduce(
      (acc, { quantity }) => acc + quantity,
      0
    );
    document.querySelector("#cartspan").textContent = count;
  }

  const buttons = document.querySelectorAll(".item-btn");

  //seccion de clicks en botones de agregar
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!button.classList.contains("hidden")) {
        button.classList.add("hidden");
      }
      button.nextElementSibling.classList.toggle("hidden");

      const { id } = button.dataset;
      const product = data.find((item) => item.id == id);

      if (cart[id]) {
        cart[id].quantity++;
      } else {
        cart[id] = { quantity: 1, product };
      }

      updateCartCount();
      updateCartProducts();
    });
  });

  // Agregando, sumando y restando en el carrito
  const increaseBtn = document.querySelectorAll(".increase");
  const decreaseBtn = document.querySelectorAll(".decrease");

  // Para cada boton .increase
  increaseBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const { id } = btn.dataset;
      if (!cart[id]) return;
      cart[id].quantity++;

      const parentControls = e.target.closest(".cart-controls");
      const countSpan = parentControls.querySelector(".count");
      countSpan.textContent = cart[id].quantity;

      updateCartProducts();
    });
  });

  // Para cada boton .decrease
  decreaseBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const { id } = btn.dataset;
      if (!cart[id]) return;

      if (cart[id].quantity > 1) {
        cart[id].quantity--;
      }
      const parentControls = e.target.closest(".cart-controls");
      const countSpan = parentControls.querySelector(".count");
      countSpan.textContent = cart[id].quantity;

      updateCartProducts();
    });
  });

  // Para cerrar el modal

  const modal = document.getElementById("final-modal");
  // Ya NO tenemos close-modal, ni lo buscamos

  // Al hacer click fuera de la modal-content se cierra
   modal.addEventListener("click", (e) => {
     if (e.target === modal) {
       modal.classList.remove("show");
       modal.classList.add("hidden");
     }
   });

  // El único botón dentro del modal es .purchase-btn
  const purchaseBtn = modal.querySelector(".purchase-btn");
  purchaseBtn.addEventListener("click", () => {

    // Ceramos el modal
     modal.classList.remove("show");
     modal.classList.add("hidden");
  });

  purchaseBtn.addEventListener("click", () => {
    alert("Purchase completed successfully!");
    // Recargar la página para restaurar todo el HTML
    location.reload();
  });
});
