(function(exports){


    var nodetest = function() {
        console.log('testing node');

    }


    var browsertest = function() {
        console.log('testing browser');

    }


    exports.test = typeof window === 'undefined' ? nodetest : browsertest;


})(typeof exports === 'undefined'? this['test']={}: exports);
