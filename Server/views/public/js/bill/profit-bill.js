const DateInput = document.querySelector(".pickupdt>input");
const SearchButton = document.querySelector(".search-bill-btn");
const today = new Date().toISOString().substr(0, 10);
DateInput.value = today;

SearchButton.addEventListener("click", () => {
    const date = DateInput.value;
    window.location.href = `http://localhost:5000/products/bill/profits?date=${date}`
});
