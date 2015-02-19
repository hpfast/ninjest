//this is a script to call from the command line

var test = require('./test.js');


function aTestFunc(){
    var a = 2, b = 3;

    return a + b == 9;

}


test.assert(1+2 == 3,'the test suite is running!');
test.assert(1+2 == 4,'fail!');
test.assert(aTestFunc(), 'oops, it doesnt add up~');

