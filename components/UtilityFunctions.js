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
    if(a) 
        return true;
    else
        return false;

}
export{
    randPrime,
    isPrime
}