Here I want to follow along with chapter 2 of 'Secrets of the Javascript Ninja' and create a test suite.

I'm going to be obtuse and make things hard for myself and see if I can write it for node and browser using [portable methods](:exp node-browser-exports)

The rules are:

 * when the library is included in the browser as a `<script>`, the assert method function should be available and should write elements to the Document with identical behaviour to the implementation in the JSNinja book.
 * when the library is required as a NodeJS module, it should print or log the results of the test indicating success or failure with color or a big fat flag or something.


Looks like we're in luck: we have a `console.log` method in both environments. So we don't need to do any requiring or anything.

#Steps
To start building this up, I'll start with the three steps in the book: first an assert function, then test groups, then asynchronous testing.

##Step 1: an assert() function
The core of this test suite is an `assert` function. It takes a statement to evaluate, and a string to print if the evaluation is `true`.

Here's the function from the book, listing 2.4:

    function assert(value, desc) {
        var li = document.createElement("li");
        li.className = value ? "pass" : "fail";
        li.appendChild(document.createTextNode(desc));
        document.getElementById("results").appendChild(li);
    }

We can achieve the same effect at the command line like this:


function assert(value, desc) {
    var result = value ? 'PASS:' : 'FAIL:';
    console.log(result + ' ' + desc);
};

###Aside: do we want to print the test we're doing?
I spent quite a while trying to print the actual expression we're evaluating. Eventually gave up and passed the evaluation as a string, and tested it with eval(), so I still had a string to print in the output. That works. But eval is dangerous.

Then I realized: we don't actually want this behaviour! Because we're not going to be using this test suite for simple little true/false evaluations, but we're going to be inputting real functions from code we're testing. So we don't want to print all of that! How would we know what all to print?

Though maybe some kind of trace would be useful.

Well, we can do that: the code can contain console.trace(value,desc) instead of console.log. But we might want to add a verbose flag.
