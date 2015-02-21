(function(exports){
    
    var results;

    var testInNode = function(name, fn) {
        var passing = true;
        var results = [];
        results.push(assertInNode(true, name, fn, this));
        for (var i=0;i<results.length;i++){
            console.log('this is the result'+results[i])
            }
        
    };
    
    this.paused = false;

    var assert = function(value, desc) {
        while (paused == false) {
                


        }

    }

    var assertInNode = function(value, desc, callback, context) {
        var result = value ? 'PASS: ' : 'FAIL: ';
            if (callback) {
                var test = callback.apply(this);
                console.log(test);
                return(' foo  '+result+desc);
            }else{
                console.log(result + desc);
                return(result + desc);
            }
    };

    var testInBrowser = function(name, fn) {
        results = document.getElementById("results");
        results = assertInBrowser(true, name).appendChild(
            document.createElement("ul"));
        fn();
    }



    var assertInBrowser = function(value, desc) {
        var li = document.createElement("li");
        li.className = value ? 'pass' : 'fail';
        li.appendChild(document.createTextNode(desc));
        results.appendChild(li);
        if (!value) {
            li.parentNode.parentNode.className = "fail";
        }
        return li;
    }

        var selectFn = function(fn1, fn2) {
        return (typeof window === 'undefined' ? fn1 : fn2) ;


    }

    exports.assert = selectFn(assertInNode, assertInBrowser);
    exports.test = selectFn(testInNode,testInBrowser);


})(typeof exports === 'undefined'? this['test']={}: exports);
