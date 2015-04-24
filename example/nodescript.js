//this is a script to call from the command line

var test = require('../index.js'); // when you install protest as a package, replace this with:
                                   // var test = require('protest');

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
}).then(function(promise){
    return test.test('random test',function(){
        test.assert(false,'the third test fails');
    })
}).catch(function(error){console.log('there was an error: '+error)});
