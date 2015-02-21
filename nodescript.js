//this is a script to call from the command line

var test = require('./test3.js');

test.test("Async Test #1", function() {
    test.pause();
    setTimeout(function() {
        test.assert(true, "First test completed");
        test.resume();
    }, 1000);
});

test.test("Async Test #2", function() {
    test.pause();
    setTimeout(function() {
        test.assert(false, "Second test completed");
        test.resume();
    }, 3000);
    test.assert(true,"Third test completed");
});
