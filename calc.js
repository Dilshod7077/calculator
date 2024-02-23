let a = "";
let b = "";
let sign = "";
let finish = false;

const digit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ","];
const action = ["-", "+", "X", "/"];

const out = document.querySelector(".calc-screen p");
const clearButton = document.querySelector(".ac");

function clearAll() {
  a = "";
  b = "";
  sign = "";
  finish = false;
  out.textContent = 0;
  clearButton.textContent = "AC";
}

function updateClearButton() {
  clearButton.textContent = "C";
}

document.querySelector(".ac").onclick = clearAll;
document.querySelector(".buttons").onclick = (event) => {
  if (!event.target.classList.contains("btn")) return;

  if (event.target.classList.contains("ac")) {
    clearAll();
    return;
  }

  if (event.target.classList.contains("plus-minus")) {
    if (sign === "") {
      a = Number(a) * -1 + "";
      out.textContent = a;
    } else {
      b = Number(b) * -1 + "";
      out.textContent = b;
    }
    return;
  }

  out.textContent = "";

  const key = event.target.textContent;

  if (digit.includes(key)) {
    updateClearButton();
    if (b === "" && sign === "") {
      a += key;
      out.textContent = a;
    } else if (a !== "" && b !== "" && finish) {
      b = key;
      finish = false;
      out.textContent = a;
    } else {
      b += key;
      out.textContent = b;
    }
    return;
  }

  if (action.includes(key)) {
    sign = key;
    out.textContent = sign;
    return;
  }
  if (key === "%") {
    if (b === "") {
      a = parseFloat(a) / 100;
      out.textContent = a;
    } else {
      b = parseFloat(b) / 100;
      out.textContent = b;
    }
    return;
  }
  
  if (key === "=") {
    if (b === "") b = a;
    switch (sign) {
      case "+":
        a = +a + +b;
        break;
      case "-":
        a = a - b;
        break;
      case "X":
        a = a * b;
        break;
      case "/":
        if (b === "0") {
          out.textContent = "Ошибка";
          return;
        }
        a = a / b;
        break;
    }
    finish = true;
    out.textContent = a;
  }
};
