var helloWorld = function () {};

helloWorld.prototype.print= () => { 
    return "Hello World! <br>" + "Implementing arrow function"; 
}

module.exports = new helloWorld();