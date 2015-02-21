(function(exports){


    var queue = []; paused = false;

    var runTest = function() {
        if (!paused && queue.length) {
            queue.shift()();
            if (!paused) {
                resume();
            }
        }

    }
    
    var pause = function() {
        paused = true;
    };

    var resume = function() {
        paused = false;
        setTimeout(runTest, 1);
    };

    //Fn assert
    //evaluate value and return true or false
    var assert = function(value) {
        return value ? true : false;
                
    }


    //Fn test
    //run a group of tests with name String and testgroup Array
    var test = function(testfn, callback){
        var result = testfn();
        var pass = true, results = [];    
//        for (var i=0; i<testgroup.length;i++){
//            var result = [assert(testgroup[i][0]), testgroup[i][1]];
//            pass = result[0] ? pass : false;
//            results.push(result);
//
//        }
        callback(result);

    }



    //two assert wrappers
    var assertInNode = function(value, desc) {
       console.log(assert(value)+': '+desc);

    };


    var assertInBrowser = function(value, desc) {
        var li = document.createElement("li");
        li.className = assert(value) ? 'pass' : 'fail';
        li.appendChild(document.createTextNode(desc));
        document.getElementById("results").appendChild(li);

    }

    var testInNode = function(name, testfn) {
        var that = this;
        queue.push(function(that){test.call(that, testfn, function(results) {
                    console.log('ha ha! '+results);
                }
            )
        });
        runTest();
        exports.assert(true,'a fake test');
        //console.log(results);
        //var results = test(testgroup);

    }
    var testInBrowser = function(name, testfn) {
        testfn();
        exports.assert(false,'can you tell me if this is expected?');
        //var results = test(testgroup);
        //var li = document.createElement('li');
        //li.className = results[0] == true ? 'pass' : 'fail';
        //li.appendChild(document.createTextNode(name));
        //var ul = document.createElement('ul');
        //for (var i=0;i<results[1].length;i++){
        //    var lo = document.createElement('li');
        //    lo.className = results[1][i][0] == true ? 'pass' : 'fail';
        //    lo.appendChild(document.createTextNode(results[1][i][1]));
        //    ul.appendChild(lo);
        //}
        //li.appendChild(ul);
        //document.getElementById('results').appendChild(li);
        console.log(exports.assert.toSource());
        console.log(assertInNode.toSource());


    }

    //select a variant to export based on execution environment
    var selectFn = function(fn1, fn2) {
        return (typeof window === 'undefined' ? fn1 : fn2) ;
    }
    
    //Public Function assert.
    //Run a single test and display the truth value and test description
    exports.assert = selectFn(assertInNode, assertInBrowser);
    //Public Function test
    //run a group of tests and display individual desc and value
    //as well as overall group name and pass/fail:w
    exports.test = selectFn(testInNode,testInBrowser);
    exports.pause = pause;
    exports.resume = resume;
    exports.test2 = testInNode;


})(typeof exports === 'undefined'? this['test']={}: exports);
