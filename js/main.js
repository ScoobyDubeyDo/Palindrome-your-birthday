let inputBx = document.querySelector("#birthday");
let button = document.querySelector("#btn");
let img = document.querySelector(".image");
let output = document.querySelector(".result");

button.addEventListener("click", () => {
    if (hasError(inputBx.value)) {
        setTimeout(() => {
            output.innerText =
                "Please select a date first to get started , Please don't leave it blank.";
            img.src = "./image/Unimpressed.gif";
        }, 2500);
        img.src = "./image/think.gif";
        output.innerText = "loading....";
    } else {
        setTimeout(() => {
            isPalindrome(inputBx.value);
        }, 2500);
        img.src = "./image/think.gif";
        output.innerText = "loading....";
    }
});

const isPalindrome = (day) => {
    let yyyy = day.split("-")[0];
    let yy = yyyy[2] + yyyy[3];
    let mm = day.split("-")[1];
    let m = mm[1];
    let dd = day.split("-")[2];
    if (hasReversed(yyyy, mm, dd)) {
        output.innerText = `Whoa!!! Your birthdate in format ${
            yyyy + "-" + mm + "-" + dd
        } is palindrome`;
        img.src = "./image/happy.gif";
        return true;
    } else if (hasReversed(dd, mm, yyyy)) {
        output.innerText = `Whoa!!! Your birthdate in format ${
            dd + "-" + mm + "-" + yyyy
        } is palindrome`;
        img.src = "./image/happy.gif";
        return true;
    } else if (hasReversed(mm, dd, yy)) {
        output.innerText = `Whoa!!! Your birthdate in format ${
            mm + "-" + dd + "-" + yy
        } is palindrome`;
        img.src = "./image/happy.gif";
        return true;
    } else if (hasReversed(m, dd, yyyy)) {
        output.innerText = `Whoa!!! Your birthdate in format ${
            m + "-" + dd + "-" + yyyy
        } is palindrome`;
        img.src = "./image/happy.gif";
        return true;
    } else {
        output.innerText = "Awww! Your birthdate is not palindrome.";
        img.src = "./image/sad.gif";
        return false;
    }
};

const hasReversed = (a, b, c) => {
    return a + b + c === (a + b + c).split("").reverse().join("");
};

const hasError = (input) => {
    if (input === "") {
        return true;
    } else {
        return false;
    }
};
