const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let input = "";
let cursorPos = 0;

// render function (cursor show)
function render() {
  let text =
    input.slice(0, cursorPos) +
    "|" +
    input.slice(cursorPos);

  display.innerText = text || "0";
}

// calculate safely
function calculate(expr) {
  try {
    if (/[^0-9+\-*/.]/.test(expr)) return "Error";
    return Function("return " + expr)();
  } catch {
    return "Error";
  }
}

// handle input
function insert(char) {
  input =
    input.slice(0, cursorPos) +
    char +
    input.slice(cursorPos);

  cursorPos++;
  render();
}

// delete at cursor
function deleteChar() {
  if (cursorPos > 0) {
    input =
      input.slice(0, cursorPos - 1) +
      input.slice(cursorPos);

    cursorPos--;
    render();
  }
}

// button clicks
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const val = btn.getAttribute("data-value");

    if (val === "C") {
      input = "";
      cursorPos = 0;
      render();
      return;
    }

    if (val === "=") {
      input = calculate(input).toString();
      cursorPos = input.length;
      render();
      return;
    }

    insert(val);
  });
});

// keyboard support
document.addEventListener("keydown", (e) => {

  if ("0123456789+-*/.".includes(e.key)) {
    insert(e.key);
  }

  else if (e.key === "Backspace") {
    deleteChar();
  }

  else if (e.key === "Enter") {
    input = calculate(input).toString();
    cursorPos = input.length;
    render();
  }

  else if (e.key === "Escape") {
    input = "";
    cursorPos = 0;
    render();
  }

  else if (e.key === "ArrowLeft") {
    cursorPos = Math.max(0, cursorPos - 1);
    render();
  }

  else if (e.key === "ArrowRight") {
    cursorPos = Math.min(input.length, cursorPos + 1);
    render();
  }
});