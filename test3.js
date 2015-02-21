(function(exports){


    var queue = [], paused = false, results;

    var pause = function() {
        paused = true;
    };
    var resume = function() {
        paused = false;
        setTimeout(runTest, 1);
    };

    function runTest() {
        if (!paused && queue.length) {
            queue.shift()();
            if (!paused) {
                resume();
            }
        }
    }

    var testInNode = function(name, fn) {
        queue.push(function() {
           console.log(name);
           fn();
        });
        runTest();
    }

    var testInBrowser = function(name, fn, console) {
        queue.push(function() {
            results = document.getElementById("results");
            results = assertInBrowser(true, name).appendChild(
            document.createElement("ul"));
            fn();
        });
        runTest();
    };

    var assertInNode = function(value, desc) {
       var result = value ? 'PASS: ' : 'FAIL: ';
       console.log(result + desc); 
       return result;


    }

    var assertInBrowser = function(value, desc) {
        var li = document.createElement("li");
        li.className = value ? "pass" : "fail";
        li.appendChild(document.createTextNode(desc));
        results.appendChild(li);
        if (!value) {
            li.parentNode.parentNode.className = "fail";
        }
        return li;
    };

    //select a variant to export based on execution environment
    var selectFn = function(fn1, fn2) {
        return (typeof window === 'undefined' ? fn1 : fn2) ;
    }

    exports.assert = selectFn(assertInNode, assertInBrowser);
    exports.test = selectFn(testInNode, testInBrowser);
    exports.pause = pause;
    exports.resume = resume;

})(typeof exports === 'undefined'? this['test']={}: exports);
