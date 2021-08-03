let inputBx = document.querySelector("#birthday");
let button = document.querySelector("#btn");
let img = document.querySelector(".image");
let output = document.querySelector(".result");

button.addEventListener("click", () => {
    setTimeout(() => {
        displayMessage(inputBx.value);
    }, 2500);
    img.src = "./image/think.gif";
    output.innerText = "loading....";
});

const displayMessage = (day) => {
    if (day === "") {
        output.innerText =
            "Please select a date first to get started , Please don't leave it blank.";
        img.src = "./image/Unimpressed.gif";
    } else {
        if (checkPalindrome(day)[0]) {
            output.innerText = `Whoa!!! Your birthdate in format ${
                checkPalindrome(day)[1] +
                "-" +
                checkPalindrome(day)[2] +
                "-" +
                checkPalindrome(day)[3]
            } is palindrome`;
            img.src = "./image/happy.gif";
        } else {
            output.innerText = `Awww! Your birthdate is not palindrome. Nearest palindrome date is ${
                getNearestPalindromDate(day)[0][1] +
                "-" +
                getNearestPalindromDate(day)[0][2] +
                "-" +
                getNearestPalindromDate(day)[0][3]
            } You missed it by ${getNearestPalindromDate(day)[1]} days.`;
            img.src = "./image/sad.gif";
        }
    }
};

const checkPalindrome = (day) => {
    let y = day.split("-")[0];
    let m = day.split("-")[1];
    let d = day.split("-")[2];
    if (y + m + d === (y + m + d).split("").reverse().join("")) {
        return [true, y, m, d];
    } else if (d + m + y === (d + m + y).split("").reverse().join("")) {
        return [true, d, m, y];
    } else if (
        m + d + (y[2] + y[3]) ===
        (m + d + (y[2] + y[3])).split("").reverse().join("")
    ) {
        return [true, m, d, y[2] + y[3]];
    } else if (
        (m > 9 ? m : m[1]) + d + y ===
        ((m > 9 ? m : m[1]) + d + y).split("").reverse().join("")
    ) {
        return [true, m[1], d, y];
    } else {
        return [false];
    }
};

const getNearestPalindromDate = (date) => {
    let lowerDate = new Date(date);
    let numberOfPreviousDays = 1;
    lowerDate.setDate(lowerDate.getDate() - 1);
    lowerDate.toLocaleString();

    let higherDate = new Date(date);
    let numberOfNextDays = 1;
    higherDate.setDate(higherDate.getDate() + 1);
    higherDate.toLocaleString();

    // checking for dates greater than the given date
    while (
        !checkPalindrome(
            `${lowerDate.getFullYear()}-${makeTwoDigits(
                (lowerDate.getMonth() + 1).toString()
            )}-${makeTwoDigits(lowerDate.getDate().toString())}`
        )[0]
    ) {
        lowerDate.setDate(lowerDate.getDate() - 1);
        lowerDate.toLocaleString();
        numberOfPreviousDays += 1;
    }
    // checking for dates greater than the given date
    while (
        !checkPalindrome(
            `${higherDate.getFullYear()}-${makeTwoDigits(
                (higherDate.getMonth() + 1).toString()
            )}-${makeTwoDigits(higherDate.getDate().toString())}`
        )[0]
    ) {
        higherDate.setDate(higherDate.getDate() + 1);
        higherDate.toLocaleString();
        numberOfNextDays += 1;
    }

    if (numberOfNextDays < numberOfPreviousDays) {
        return [
            checkPalindrome(
                `${higherDate.getFullYear()}-${makeTwoDigits(
                    (higherDate.getMonth() + 1).toString()
                )}-${makeTwoDigits(higherDate.getDate().toString())}`
            ),
            numberOfNextDays,
        ];
    } else {
        return [
            checkPalindrome(
                `${lowerDate.getFullYear()}-${makeTwoDigits(
                    (lowerDate.getMonth() + 1).toString()
                )}-${makeTwoDigits(lowerDate.getDate().toString())}`
            ),
            numberOfNextDays,
        ];
    }
};

const makeTwoDigits = (digit) => {
    if (digit.length === 1) {
        return "0".concat(digit);
    } else {
        return digit;
    }
};
