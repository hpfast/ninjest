
The simple test framework from [Secrets of the Javascript Ninja](http://manning.com/resig/) by John Resig and Bear Bibeault, useable in both the Browser and NodeJS through an IIFE (see [writing Javascript for node and the browser](http://caolanmcmahon.com/posts/writing_for_node_and_the_browser/) by Caolan McMahon). 


 * when the library is included in the browser as a `<script>`, the assert method function should be available and should write elements to the Document with identical behaviour to the implementation in the JSNinja book.
 * when the library is required as a NodeJS module, it should print or log the results of the test indicating success or failure with color or a big fat flag or something.

At the command line, the visualisation of a test group parent is not changed to reflect any failure of child tests (we don't have a DOM at our disposal, only a linear console). I worked on making that work for a bit, but it got really complicated.
