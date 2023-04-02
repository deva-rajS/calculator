"use strict";
let disNum = document.querySelector(".dis--0");
const numbers = document.querySelectorAll(".btn--nums");
const clear = document.querySelector(".btn--ac");
const operations = document.querySelectorAll(".btn--op");
const plusMinus = document.querySelector(".btn--minus");
const decimal = document.querySelector(".btn--dec");
const percent = document.querySelector(".btn--percent");
const equal = document.querySelector(".btn--equal");
const disSize = document.querySelector(".dis--0");
const allBtn = document.querySelectorAll(".btn--nums,.btn--right,.btn--top");

let curNum = "";
let preNum = "";
let operator = null;
const MAX_DIGITS = 10;

numbers.forEach(function (num) {
  num.addEventListener("click", function (e) {
    clear.textContent = "C";
    const value = e.target.textContent;
    if (curNum.length < MAX_DIGITS) {
      curNum += value;
      disNum.textContent = curNum;
    }
  });
});

operations.forEach(function (op) {
  op.addEventListener("click", function (e) {
    if (operator && !curNum === "") {
      performOperation();
    } else if (operator === null) {
      preNum = curNum;
      curNum = "";
      operator = op.textContent;
    }
  });
});
plusMinus.addEventListener("click", function (e) {
  if (curNum === "") {
    return;
  }
  curNum = (-1 * parseFloat(curNum)).toString();
  disNum.textContent = curNum;
});
decimal.addEventListener("click", function (e) {
  clear.textContent = "C";
  if (!curNum.includes(".")) {
    if (curNum === "") {
      curNum = 0;
    }
    curNum += ".";
    disNum.textContent = curNum;
  }
});
percent.addEventListener("click", function (e) {
  if (curNum === "") return 0;
  curNum = parseFloat(curNum / 100).toString();
  disNum.textContent = curNum;
});
equal.addEventListener("click", function () {
  performOperation();
});
clear.addEventListener("click", function () {
  curNum = "";
  preNum = "";
  operator = null;
  disNum.textContent = 0;
  clear.textContent = "AC";
});
function performOperation() {
  const num1 = parseFloat(preNum);
  const num2 = parseFloat(curNum);
  let result;
  if (curNum.endsWith(operator)) {
    return;
  }
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "x":
      result = num1 * num2;
      break;
    case "÷":
      result = num1 / num2;
      break;
  }
  if (result % 1 !== 0) {
    curNum = result.toFixed(2).toString();
  } else {
    curNum = result.toString();
  }

  disNum.textContent = curNum;
  operator = null;
}

allBtn.forEach(function (btn) {
  btn.addEventListener("mousedown", function (e) {
    if (e.target.classList.contains("btn--nums")) {
      btn.classList.add("button-num");
    }
    if (e.target.classList.contains("btn--top")) {
      btn.classList.add("button-top");
    }
    if (e.target.classList.contains("btn--right")) {
      btn.classList.add("button-right");
    }
  });
  btn.addEventListener("mouseup", function (e) {
    if (e.target.classList.contains("btn--nums")) {
      btn.classList.remove("button-num");
    }
    if (e.target.classList.contains("btn--top")) {
      btn.classList.remove("button-top");
    }
    if (e.target.classList.contains("btn--right")) {
      btn.classList.remove("button-right");
    }
  });
  btn.addEventListener("mouseleave", function (e) {
    if (e.target.classList.contains("btn--nums")) {
      btn.classList.remove("button-num");
    }
    if (e.target.classList.contains("btn--top")) {
      btn.classList.remove("button-top");
    }
    if (e.target.classList.contains("btn--right")) {
      btn.classList.remove("button-right");
    }
  });
});
