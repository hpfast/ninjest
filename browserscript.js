//this is my script that I want to run in the browser


window.onload = function() {
    test.assert(2+4==6,'A simple test')
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
};

