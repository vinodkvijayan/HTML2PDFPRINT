_calls = {}

profile = function(fn) {
    return function() {
        _calls[fn.name] = (_calls[fn.name] || 0) + 1;
        return fn.apply(this, arguments);
    }
}

function foo() {
    bar()
    bar()
}

function bar() {
}

foo = profile(foo)
bar = profile(bar)

foo()
foo()

console.log(_calls);