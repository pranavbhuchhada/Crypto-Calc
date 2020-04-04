function randPrime(){
    const primes =  require('./myprime.json');
    return primes[Math.floor(Math.random() * 1229) + 1];
}
function randNum(num = 9999){
    return Math.floor(Math.random() * num) + 1;
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
function checkPrimitive(num,modulo){
    var required_set = new Set();
    for (let i = 1; i < modulo; i++) {
        required_set.add(i);
    }
    let actual_set = new Set();
    for(let power = 1 ; power < modulo ; power++){
        actual_set.add(powerMod(num,power,modulo));
    }
    if(eqSet(required_set,actual_set)){
        return true;
    }
    return false;
}
function primitiveRoots(modulo){
    var required_set = new Set();
    var primitive_set = new Set();
    for (let i = 1; i < modulo; i++) {
        required_set.add(i);
    }
    for(let g =2; g < modulo ; g++){
        let actual_set = new Set();
        for(let power = 1 ; power < modulo ; power++){
            actual_set.add(powerMod(g,power,modulo));
        }
        if(eqSet(required_set,actual_set)){
            primitive_set.add(g);
        }
    }
    return Array.from(primitive_set);
}
function primitiveRoot(modulo){
    var required_set = new Set();
    for (let i = 1; i < modulo; i++) {
        required_set.add(i);
    }
    for(let g =modulo; g > 1 ; g--){
        let actual_set = new Set();
        for(let power = 1 ; power < modulo ; power++){
            actual_set.add(powerMod(g,power,modulo));
        }
        if(eqSet(required_set,actual_set)){
            return g;
        }
    }
}
function cal_CRT(a,n){
    let sum = 0
    let prod = 1
    n.forEach(element => {
        prod *= element
    });
    for (let i = 0; i < n.length; i++) {
        p = prod/n[i]
        sum += a[i] * modInverse(p,n[i])*p
    }
    return sum % prod
}
class MatrixSolver {
  constructor() {
      this.c_valid = 0;
      this.c_nonsquare = -1;
      this.c_singular = -2;
      this.c_wrongdimensions = -3;
  }
  get = (matrixarray, i, j) => {
      var row = matrixarray[i];
      return row[j];
  }
  columns = (matrixarray) => {
      var row = matrixarray[0];
      return row.length;
  }
  rows = (matrixarray) => {
      return matrixarray.length;
  }
  show = (matrixarray) => {
      var s = "";
      for (var i = 0; i < this.rows(matrixarray); ++i) {
          for (var j = 0; j < this.columns(matrixarray); ++j) {
              var row = matrixarray[i];
              s += " " + row[j];
          }
          s += "\n\r";
      }
      alert(s);
  }
  minor = (matrixarray, i, j) => {
      var m = [];
      for (var k = 0; k < matrixarray.length; ++k) {
          if (k == i)
              continue;
          var row = matrixarray[k];
          var newrow = [];
          for (var l = 0; l < row.length; ++l) {
              if (l == j)
                  continue;
              newrow.push(row[l]);
          }
          m.push(newrow);
      }
      return m;
  }
  calcMultiplication = function (matrixA, matrixB) {
      var result = [];
      var columnsA = this.columns(matrixA);
      var rowsA = this.rows(matrixA);
      var columnsB = this.columns(matrixB);
      var rowsB = this.rows(matrixB);
      if (columnsA != rowsB)
          alert("Wrong Diemensions");
      for (var i = 0; i < rowsA; ++i) {
          var newrow = [];
          for (var j = 0; j < columnsB; ++j) {
              var value = 0;
              for (var k = 0; k < rowsB; ++k) {
                  value += this.get(matrixA, i, k) * this.get(matrixB, k, j);
              }
              newrow.push(value);
          }
          result.push(newrow);
      }
      return result;
  }
  calcTransponent = function (matrixarray) {
      var transponent = [];
      var cols = this.columns(matrixarray);
      for (var i = 0; i < cols; ++i) {
          var newrow = [];
          var rowscount = this.rows(matrixarray);
          for (var j = 0; j < rowscount; ++j) {
              newrow[newrow.length] = this.get(matrixarray, j, i);
          }
          transponent[transponent.length] = newrow;
      }
      return transponent;
  };
  calcScalar = function (matrixarray, scalarValue) {
      var scalar = [];
      var cols = this.columns(matrixarray);
      for (var i = 0; i < cols; ++i) {
          var newrow = [];
          var rowscount = this.rows(matrixarray);
          for (var j = 0; j < rowscount; ++j) {
              newrow.push(this.get(matrixarray, i, j) * scalarValue);
          }
          scalar.push(newrow);
      }
      return scalar;
  };
  calcDeterminant = function (matrixarray) {
      var columnsA = this.columns(matrixarray);
      var rowsA = this.rows(matrixarray);
      if (columnsA != rowsA)
          throw this.c_nonsquare;
      if (matrixarray.length == 1)
          return this.get(matrixarray, 0, 0);
      else if (matrixarray.length == 2)
          return this.get(matrixarray, 0, 0) * this.get(matrixarray, 1, 1) - this.get(matrixarray, 0, 1) * this.get(matrixarray, 1, 0);
      else {
          var det = 0;
          var cols = this.columns(matrixarray);
          for (var i = 0; i < cols; ++i) {
            det += Math.pow(-1, i) * this.get(matrixarray, 0, i) * this.calcDeterminant(this.minor(matrixarray, 0, i));
          }
          return det;
      }
  };
  calcInverse = function (matrixarray) {
      var columnsA = this.columns(matrixarray);
      var rowsA = this.rows(matrixarray);
      if (columnsA != rowsA)
          throw this.c_nonsquare;
      var detA = this.calcDeterminant(matrixarray);
      if (detA == 0)
          throw this.c_singular;
      var minorsmatrix = [];
      for (var i = 0; i < rowsA; ++i) {
          var newrow = [];
          for (var j = 0; j < columnsA; ++j) {
              var val = this.calcDeterminant(this.minor(matrixarray, i, j));
              val = val * Math.pow(-1, i + j);
              newrow.push(val);
          }
          minorsmatrix.push(newrow);
      }
      var transponentminors = this.calcTransponent(minorsmatrix);
      var scalarresult = this.calcScalar(transponentminors, 1 / detA);
      return scalarresult;
  };
  norm = (ta, m) => {
      if (ta > m)
          ta = ta % m;
      if (ta < 0)
          ta = ta + m * (Math.floor(Math.abs(ta) / m) + 1);
      return ta;
  }
  calcScalarMod = function (matrixarray, scalarValue, modulus) {
      var scalar = [];
      var cols = this.columns(matrixarray);
      for (var i = 0; i < cols; ++i) {
          var newrow = [];
          var rowscount = this.rows(matrixarray);
          for (var j = 0; j < rowscount; ++j) {
              newrow.push(this.norm(this.get(matrixarray, i, j) * scalarValue, modulus));
          }
          scalar.push(newrow);
      }
      return scalar;
  };
  calcDeterminantMod = function (matrixarray, modulus) {
      var columnsA = this.columns(matrixarray);
      var rowsA = this.rows(matrixarray);
      if (columnsA != rowsA)
          throw this.c_nonsquare;
      if (matrixarray.length == 1)
          return this.norm(this.get(matrixarray, 0, 0), modulus);
      else if (matrixarray.length == 2) {
          return this.norm(this.get(matrixarray, 0, 0) * this.get(matrixarray, 1, 1) - this.get(matrixarray, 0, 1) * this.get(matrixarray, 1, 0), modulus);
      }
      else {
          var det = 0;
          var cols = this.columns(matrixarray);
          for (var i = 0; i < cols; ++i) {
              det += this.norm(Math.pow(-1, i) * this.get(matrixarray, 0, i) * this.calcDeterminantMod(this.minor(matrixarray, 0, i), modulus), modulus);
          }
          return this.norm(det, modulus);
      }
  };
  calcInverseMod = function (matrixarray, modulus) {
      var columnsA = this.columns(matrixarray);
      var rowsA = this.rows(matrixarray);
      if (columnsA != rowsA)
          throw this.c_nonsquare;
      var detA = this.calcDeterminantMod(matrixarray, modulus);
      if (detA == 0)
          throw this.c_singular;
      var minorsmatrix = [];
      for (var i = 0; i < rowsA; ++i) {
          var newrow = [];
          for (var j = 0; j < columnsA; ++j) {
              var val = this.calcDeterminantMod(this.minor(matrixarray, i, j), modulus);
              val = this.norm(val * Math.pow(-1, i + j), modulus);
              newrow.push(val);
          }
          minorsmatrix.push(newrow);
      }
      var transponentminors = this.calcTransponent(minorsmatrix);
      var result = modInverse(detA,modulus);
      var scalarresult = this.calcScalarMod(transponentminors, result, modulus);
      return scalarresult;
  };
}
export{
    randPrime,
    isPrime,
    gcd,
    modInverse,
    primitiveRoots,
    cal_CRT,
    powerMod,
    randNum,
    primitiveRoot,
    checkPrimitive,
    MatrixSolver
}