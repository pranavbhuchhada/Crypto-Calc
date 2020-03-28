
def gcd(a,b):
    while a != b:
        if a > b:
            a = a - b
        else:
            b = b - a
    return a
def primitive_root(modulo):
    primitiveroot = []
    required_set = set(num for num in range (1, modulo))
    for g in range(2, modulo):
        actual_set = set(pow(g, powers) % modulo for powers in range (1, modulo))
        if required_set == actual_set:
            primitiveroot.append(g)
    return primitiveroot

print(primitive_root(int(input())))