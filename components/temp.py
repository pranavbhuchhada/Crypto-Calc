file1 = open("primes1.txt",'r')
file2 = open("myprime.json",'w')

primes = file1.read()
primes = primes.split()
count = 1
file2.write('{')
for i in primes:
    file2.write(str(count)+":"+i + ",\n")
    count +=1
    if count>1229:
        break
file2.write('}')
