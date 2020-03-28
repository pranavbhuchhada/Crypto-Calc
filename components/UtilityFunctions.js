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
function powerMod(base, exponent, modulus) {
    if (modulus === 1) return 0;
    var result = 1;
    base = base % modulus;
    while (exponent > 0) {
        if (exponent % 2 === 1)  //odd number
            result = (result * base) % modulus;
        exponent = exponent >> 1; //divide by 2
        base = (base * base) % modulus;
    }
    return result;
}
function eqSet(as, bs) {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
}
function primitiveRoots(modulo){
    var required_set = new Set();
    var primitive_set = new Set();
    for (let i = 1; i < modulo; i++) {
        required_set.add(i);
    }
    for(let g =2; g < modulo ; g++){
        actual_set = new Set();
        for(let power = 1 ; power < modulo ; power++){
            actual_set.add(powerMod(g,power,modulo));
        }
        if(eqSet(required_set,actual_set)){
            primitive_set.add(g);
        }
    }
    return Array.from(primitive_set);
}
export{
    randPrime,
    isPrime,
    gcd,
    modInverse,
    primitiveRoots
}