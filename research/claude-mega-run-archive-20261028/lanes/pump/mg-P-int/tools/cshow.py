import sys
# print conflict hunks of a merge-file output with line numbers (ours side numbering approximated)
p=sys.argv[1]; maxl=int(sys.argv[2]) if len(sys.argv)>2 else 40
L=open(p).read().splitlines(); i=0; n=0
while i<len(L):
    if L[i].startswith('<<<<<<<'):
        j=i
        while not L[j].startswith('>>>>>>>'): j+=1
        n+=1; print(f'--- conflict {n} at merged line {i+1} ({j-i+1} lines)')
        for k in range(i,min(j+1,i+maxl)): print(L[k][:160])
        if j+1-i>maxl: print('   ...')
        i=j
    i+=1
