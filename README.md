Here I want to follow along with chapter 2 of 'Secrets of the Javascript Ninja' and create a test suite.

I'm going to be obtuse and make things hard for myself and see if I can write it for node and browser using [portable methods](:exp node-browser-exports)

The rules are:

 * when the library is included in the browser as a `<script>`, the assert method function should be available and should write elements to the Document with identical behaviour to the implementation in the JSNinja book.
 * when the library is required as a NodeJS module, it should print or log the results of the test indicating success or failure with color or a big fat flag or something.


Looks like we're in luck: we have a `console.log` method in both environments. So we don't need to do any requiring or anything.
