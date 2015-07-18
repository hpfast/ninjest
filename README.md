##Protest, JSNinja demo test framework made portable
The simple test framework from [Secrets of the Javascript Ninja](http://manning.com/resig/) by John Resig and Bear Bibeault, rewritten to be useable both in the browser and in NodeJS, and with the asynchronous part replaced with promises. 

##Example

In Node:

    var pro = require('protest');
    
`protest` depends on `rsvp`, see below for instructions.

In the browser:
    
    <script src="rsvp.js"></script>
    <script src="protest.js"></script>
    <script>//your code and tests here</script>

Then, run a simple test:

    test.assert(true,'the test passes');

Or, run a group of tests:

    test.test('Test Group', function() {   
        test.assert(true, 'the test passes');
        test.assert(false, 'the test fails');
    })

Run two test groups, in which the first one has potentially asynchronous operations that must complete before the second test group runs:


    test.test('test for (modern) browser environment', function(dfd){
            setTimeout(function(){
                test.assert(typeof window !== 'undefined','the window object is present')
                test.assert(typeof localStorage !== 'undefined', 'the localStorage object is present');
                dfd.resolve();
            },1000);
        }, true)
    .then(function(promise){
        return test.test('test for node environment',function(dfd){
            setTimeout(function(){
                test.assert(typeof module !== 'undefined', 'the module object is present');
                test.assert((typeof module !== 'undefined' && typeof module.exports !== 'undefined'), 'the module object has an exports member');
                dfd.resolve();
            },1000);
        },true)
    }).catch(function(error){console.log('there was an error: '+error)});
    

##Features
 * when the library is included in the browser as a `<script>`, the assert method function should be available and should write elements to the Document with identical behaviour to the implementation in the JSNinja book.
 * when the library is required as a NodeJS module, it should print or log the results of the test indicating success or failure with color or a big fat flag or something.

At the command line, the visualisation of a test group parent is not changed to reflect any failure of child tests (we don't have a DOM at our disposal, only a linear console). I worked on making that work for a bit, but it got really complicated.

##Usage
There are two functions available. In the browser, these will be available as methods of the `test` object; in Node, they'll be methods of whatever variable you require `protest` as.

###`assert(test Expression|Boolean, description String)`

run a simple test, the first argument is the expression or function which must evaluate/return `true` or `false`, the second argument is a description of the test.

###`test(name String, function Function, [async] Boolean)`

run a group of asserts, they will be grouped visually in the output and in the browser the whole group will be indicated as failing if one assert fails. If the last argument `async` is true, the test group will pause until any asynchronous operations complete.

A `test` returns a promise, so you can chain them together. The implementation of the async behaviour is as follows: if the async argument is not set, we call the function and resolve the deferred manually; if it is set, we call the function and pass it the defferred as an argument. Then in the function we can manually resolve the deferred after our asyncrhonous operations have completed.

