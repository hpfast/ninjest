var R = typeof window === 'undefined' ? require('rsvp') : RSVP;

(function(exports){
    
    var c1 = 1, c2 = 1, results;
    
    /* Returns a resolved promise. Use to start a chain on which to hang
     * ordered tests.
     * Unnecessary.
     */
    var queue = function(){
        var promise = new R.Promise(function(resolve, reject) {
            resolve()
        });
        return promise;
    }

    /*Test functions: run (asynchronous) blocks of test code*/

   var testInNode = function(name, fn, async) {
        var dfd = R.defer();
        var that = this;
        dfd.promise.then(function(value){
            c1++;
            c2=1;
        });
        console.log('\n===================================');
        console.log(c1+'. '+name);
        console.log('===================================');
        if (async) {
            fn.call(that, dfd);
        } else {
            fn();
            dfd.resolve()
        }
        
        return dfd.promise              
   }

    var testInBrowser = function(name, fn, async) {
        var dfd = R.defer();
        var that = this;
        c2 = 0;
        results = document.getElementById("results");
        results = assertInBrowser(true, c1+'. '+name).appendChild(
            document.createElement("ul"));
        if (async) {
            fn.call(that, dfd);
        } else {
            fn();
            dfd.resolve()
        }
        c1++;
        return dfd.promise  
    }

    /*Assert functions: return visual indication of pass/fail for individual truth test*/
    var assertInNode = function(value, desc) {
       var result = value ? 'PASS: ' : 'FAIL: ';
       console.log(c1+'.'+c2+' '+result + desc);
       c2++;
       return result;
    }

    var assertInBrowser = function(value, desc) {
        var li = document.createElement("li");
        li.className = value ? "pass" : "fail";
        li.appendChild(document.createTextNode((c2 == 0 ? '' : c2) +' '+desc));
        results.appendChild(li);
        if (!value) {
            li.parentNode.parentNode.className = "fail";
        }
        c2++;
        return li;
    };

    //select a variant to export based on execution environment
    var selectFn = function(fn1, fn2) {
        return (typeof window === 'undefined' ? fn1 : fn2) ;
    }

    exports.assert = selectFn(assertInNode, assertInBrowser);
    exports.test = selectFn(testInNode, testInBrowser);
    //exports.queue = queue;

})(typeof exports === 'undefined'? this['test']={}: exports);
