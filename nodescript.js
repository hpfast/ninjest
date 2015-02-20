//this is a script to call from the command line

var test = require('./test2.js');


//test.test("A test.", function() {
//    test.assert(true, "First assertion completed");
//    test.assert(true, "Second assertion completed");
//    test.assert(true, "Third assertion completed");
//});
//test.test("Another test.", function() {
//    test.assert(true, "First test completed");
//    test.assert(false, "Second test failed");
//    test.assert(true, "Third assertion completed");
//});
//test.test("A third test.", function() {
//    test.assert(null, "fail");
//    test.assert(5, "pass")
//});

test.test('A test group', [
        [true, "First test passed"],
        [false, "Second test failed"]
    ]);

test.test('Test some math expressions', [
    [8+2 == 10, 'adding works'],
    [8-2 == 10, "subtracting doesn't work"]
]);
test.test('Test some MORE math expressions', [
    [8+2 == 10, 'adding works'],
    [8-2 == 6, "subtracting works now"]
]);
