//this is my script that I want to run in the browser

function aTestFunc(){
    var a = 2, b = 3;

    return a + b == 9;

}

window.onload = function() {
    test.assert(1 + 2 == 3, "The test suite is running.");
    test.assert(1 + 2 == 4, "Fail!");
    test.assert(aTestFunc(), "oops, it doesn't add up");
};
