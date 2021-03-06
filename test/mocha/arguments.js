var UglifyJS = require('../../');
var assert = require("assert");

describe("arguments", function() {
    it("Should known that arguments in functions are local scoped", function() {
        var ast = UglifyJS.parse("var arguments; var f = function() {arguments.length}");
        ast.figure_out_scope();

        // Test scope of `var arguments`
        assert.strictEqual(ast.find_variable("arguments").global, true);

        // Select arguments symbol in function
        var symbol = ast.body[1].definitions[0].value.find_variable("arguments");

        assert.strictEqual(symbol.global, false);
        assert.strictEqual(symbol.scope, ast. // From ast
            body[1]. // Select 2nd statement (equals to `var f ...`)
            definitions[0]. // First definition of selected statement
            value // Select function as scope
        );
    });
});