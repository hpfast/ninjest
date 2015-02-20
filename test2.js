(function(exports){

    //Fn assert
    //evaluate value and return true or false
    var assert = function(value) {
        return value ? true : false;
                
    }

    var that = this;

    //Fn test
    //run a group of tests with name String and testgroup Array of functions
    var test = function(testgroup){
        var pass = true, results = [];    
        for (var i=0; i<testgroup.length;i++){
            var result = [assert(testgroup[i][0]), testgroup[i][1]];
            pass = result[0] ? pass : false;
            results.push(result);

        }
        return([pass, results]);

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

    var testInNode = function(name, testgroup) {
        var results = test(testgroup);
        console.log((results[0] == true ? 'PASS' : 'FAIL') + ': '+name);
        for (var i = 0; i<results[1].length;i++){
            console.log('   '+(results[1][i][0] == true ? 'PASS:' : 'FAIL:')+' '+results[1][i][1]);


        }

    }
    var testInBrowser = function(name, testgroup) {
        var results = test(testgroup);
        var li = document.createElement('li');
        li.className = results[0] == true ? 'pass' : 'fail';
        li.appendChild(document.createTextNode(name));
        var ul = document.createElement('ul');
        for (var i=0;i<results[1].length;i++){
            var lo = document.createElement('li');
            lo.className = results[1][i][0] == true ? 'pass' : 'fail';
            lo.appendChild(document.createTextNode(results[1][i][1]));
            ul.appendChild(lo);
        }
        li.appendChild(ul);
        document.getElementById('results').appendChild(li);


    }

    //select a variant to export based on execution environment
    var selectFn = function(fn1, fn2) {
        return (typeof window === 'undefined' ? fn1 : fn2) ;
    }

    exports.assert = selectFn(assertInNode, assertInBrowser);
    exports.test = selectFn(testInNode,testInBrowser);


})(typeof exports === 'undefined'? this['test']={}: exports);
