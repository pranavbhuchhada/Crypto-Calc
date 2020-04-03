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
            throw this.c_wrongdimensions;
        for (var i = 0; i < rowsA; ++i) {
            var newrow = [];
            for (var j = 0; j < columnsB; ++j) {
                var value = 0;
                for (var k = 0; k < rowsB; ++k) {
                    this.value += this.get(matrixA, i, k) * this.get(matrixB, k, j);
                }
                newrow.push(value);
            }
            result.push(newrow);
        }
        return result;
    };
    calcTransponent = function (matrixarray) {
        var transponent = [];
        var cols = this.columns(matrixarray);
        for (var i = 0; i < cols; ++i) {
            var newrow = [];
            var rowscount = this.rows(matrixarray);
            for (var j = 0; j < rowscount; ++j) {
                this.newrow[newrow.length] = this.get(matrixarray, j, i);
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
                this.newrow.push(this.get(matrixarray, i, j) * scalarValue);
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
                this.det += Math.pow(-1, i) * this.get(matrixarray, 0, i) * this.calcDeterminant(this.minor(matrixarray, 0, i));
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
    norm(ta, m) {
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
                this.newrow.push(this.norm(this.get(matrixarray, i, j) * scalarValue, modulus));
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
        //this.show(matrixarray);
        if (matrixarray.length == 1)
            return this.norm(this.get(matrixarray, 0, 0), modulus);
        else if (matrixarray.length == 2) {
            return this.norm(this.get(matrixarray, 0, 0) * this.get(matrixarray, 1, 1) - this.get(matrixarray, 0, 1) * this.get(matrixarray, 1, 0), modulus);
        }
        else {
            var det = 0;
            var cols = this.columns(matrixarray);
            for (var i = 0; i < cols; ++i) {
                this.det += this.norm(Math.pow(-1, i) * this.get(matrixarray, 0, i) * this.calcDeterminantMod(this.minor(matrixarray, 0, i), modulus), modulus);
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
        var result = Planetcalc.Calculate3312({ "a": detA, "m": modulus });
        var scalarresult = this.calcScalarMod(transponentminors, result.b, modulus);
        return scalarresult;
    };
}

