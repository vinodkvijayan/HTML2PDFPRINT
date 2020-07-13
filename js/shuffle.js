function shuffle (str) {
    var a = str.split(""),
        n = a.length;
 
    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random(Date.now()) * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
 }
 
 console.log(shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"));