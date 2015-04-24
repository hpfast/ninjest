//this is my script that I want to run in the browser

window.onload = function() {
    test.test('test for (modern) browser environment', function(def){
            setTimeout(function(){
                test.assert(typeof window !== 'undefined','the window object is present')
                test.assert(typeof localStorage !== 'undefined', 'the localStorage object is present');
                def.resolve();
            },1000);
        }, true)
    .then(function(promise){
        return test.test('test for node environment',function(def){
            setTimeout(function(){
                test.assert(typeof module !== 'undefined', 'the module object is present');
                test.assert((typeof module !== 'undefined' && typeof module.exports !== 'undefined'), 'the module object has an exports member');
                def.resolve();
            },1000);
        },true)
    }).then(function(promise){
        return test.test('random test suite',function(){
            test.assert(false,'this test fails');
            test.assert(true, 'this test passes, but the test suite fails');
            if (typeof window !== 'undefined') {
                var ul = document.getElementById('results');
                var li = ul.lastElementChild;
                test.assert(li.innerHTML.contains('random test') && li.className == 'fail', 'the last test suite is called \'random test\' and it has indeed failed');
            }
        })
    }).catch(function(error){console.log('there was an error: '+error)});
};

