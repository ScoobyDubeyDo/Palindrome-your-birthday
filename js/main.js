let inputBx = document.querySelector("#birthday");
let button = document.querySelector("#btn");
let wink = document.querySelector("#wink");
let sad = document.querySelector("#sad");
let happy = document.querySelector("#happy");
let unimpressed = document.querySelector("#unimpressed");
let think = document.querySelector("#think");
let output = document.querySelector(".result");

button.addEventListener("click", () => {
    setTimeout(() => {
        displayMessage(inputBx.value);
    }, 2500);
    displayImage("think");
    output.innerText = "loading....";
});

const displayMessage = (day) => {
    if (day === "") {
        output.innerText =
            "Please select a date first to get started , Please don't leave it blank. Just wasted my time";
        displayImage("unimpressed");
    } else {
        if (checkPalindrome(day)[0]) {
            output.innerText = `Whoa!!! Your birthdate in format ${
                checkPalindrome(day)[1] +
                "-" +
                checkPalindrome(day)[2] +
                "-" +
                checkPalindrome(day)[3]
            } is palindrome`;

            displayImage("happy");
        } else {
            output.innerText = `Awww! Your birthdate is not palindrome. Nearest palindrome date is ${
                getNearestPalindromDate(day)[0][1] +
                "-" +
                getNearestPalindromDate(day)[0][2] +
                "-" +
                getNearestPalindromDate(day)[0][3]
            } You missed it by ${getNearestPalindromDate(day)[1]} days.`;
            displayImage("sad");
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

const displayImage = (img) => {
    if (img === "think") {
        sad.style.display = "none";
        happy.style.display = "none";
        unimpressed.style.display = "none";
        wink.style.display = "none";
        think.style.display = "block";
    } else if (img === "happy") {
        sad.style.display = "none";
        happy.style.display = "block";
        unimpressed.style.display = "none";
        wink.style.display = "none";
        think.style.display = "none";
    } else if (img === "sad") {
        sad.style.display = "block";
        happy.style.display = "none";
        unimpressed.style.display = "none";
        wink.style.display = "none";
        think.style.display = "none";
    } else if (img === "unimpressed") {
        sad.style.display = "none";
        happy.style.display = "none";
        unimpressed.style.display = "block";
        wink.style.display = "none";
        think.style.display = "none";
    } else {
        sad.style.display = "none";
        happy.style.display = "none";
        unimpressed.style.display = "none";
        wink.style.display = "block";
        think.style.display = "none";
    }
};
