(function(exports){


    var nodeAssert = function(value, desc) {
        var result = value ? 'PASS: ' : 'FAIL: ';
            console.log(result + desc);
    };


    var browserAssert = function(value, desc) {
        var li = document.createElement("li");
        li.className = value ? 'pass' : 'fail';
        li.appendChild(document.createTextNode(desc));
        document.getElementById("results").appendChild(li);
    }


    exports.assert = typeof window === 'undefined' ? nodeAssert : browserAssert;


})(typeof exports === 'undefined'? this['test']={}: exports);
