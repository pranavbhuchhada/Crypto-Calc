function randPrime(){
    const primes =  require('./myprime.json');
    return primes[Math.floor(Math.random() * 1229) + 1];
}
function isPrime (num) {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num > 1;
}
function gcd(a,b) {
    var r,i;
    while (b!=0) {
        r = a%b;
        a=b;
        b=r;
    }
    return a;
}
function extendedGCD(a,b) {
    var g,x,y;
    if(a==0){
        return [b,0,1];
    }
    else{
        [g, y, x] = extendedGCD(b % a, a);
        return [g, x - Math.floor(b / a) * y, y];
    }
}
function modInverse(a, m) {
    var g,x,y;
    [g, x, y] = extendedGCD(a, m)
    if (g != 1){
        return 0;
    }
    else{
        return (x % m + m)%m;
    }
}
export{
    randPrime,
    isPrime,
    gcd,
    modInverse
}