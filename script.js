document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const userName = document.getElementById("userName");
  const loginModal = document.getElementById("loginModal");
  const closeModal = document.getElementById("closeModal");
  const loginForm = document.getElementById("loginForm");
  const cart = [];
  const cartElement = document.getElementById("cart");
  const finalizeOrderBtn = document.getElementById("finalizeOrder");

  // Credenciais corretas (simuladas)
  const correctEmail = "owayran@fatec.com";
  const correctPassword = "owayran";

  const openModal = () => {
    loginModal.style.display = "flex";
  };

  const closeModalHandler = () => {
    loginModal.style.display = "none";
  };

  const login = (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === correctEmail && password === correctPassword) {
      localStorage.setItem("user", email); // Salva o e-mail como identificador

      window.location.href = "products.html";
    } else {
      alert("E-mail ou senha incorreto!");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "index.html";
  };

  // Adiciona eventos
  if (loginBtn) {
    loginBtn.addEventListener("click", openModal);
  }

  if (closeModal) {
    closeModal.addEventListener("click", closeModalHandler);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", login);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }

  if (userName) {
    const user = localStorage.getItem("user");
    if (user) {
      userName.textContent = `Olá, ${user}`;
    } else {
      window.location.href = "index.html";
    }
  }

  const updateCart = () => {
    if (cart.length === 0) {
      cartElement.innerHTML = "<p>Seu carrinho está vazio.</p>";
    } else {
      cartElement.innerHTML = cart
        .map(
          (item, index) =>
            `<p>${item.name} - R$${parseFloat(item.price).toFixed(2)} 
                      <button class="removeFromCart" data-index="${index}">Remover</button></p>`
        )
        .join("");

      // Adiciona evento para os botões de remoção
      const removeButtons = document.querySelectorAll(".removeFromCart");
      removeButtons.forEach((button) =>
        button.addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          removeFromCart(index);
        })
      );
    }
  };

  const removeFromCart = (index) => {
    cart.splice(index, 1); // Remove o item da lista
    updateCart(); // Atualiza o carrinho
  };

  const finalizeOrder = () => {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }

    let total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    alert(
      `Pedido finalizado! Total: R$${total.toFixed(2)}\nObrigado pela compra!`
    );
    cart.length = 0;
    updateCart();
  };

  // Adiciona eventos aos botões de adicionar ao carrinho
  const addToCartButtons = document.querySelectorAll(".addToCart");
  addToCartButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
      const name = e.target.getAttribute("data-name");
      const price = e.target.getAttribute("data-price");
      cart.push({ name, price });
      updateCart();
    })
  );

  // Evento do botão "Finalizar Pedido"
  if (finalizeOrderBtn) {
    finalizeOrderBtn.addEventListener("click", finalizeOrder);
  }

  const navToggle = document.querySelector("#loginBtn"); // Substitua pelo botão de menu
  const navMenu = document.querySelector("nav ul");

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
});
