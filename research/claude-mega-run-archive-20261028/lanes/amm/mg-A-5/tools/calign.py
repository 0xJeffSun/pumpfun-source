# align ordered call sequences orig vs cand and show gaps (instr count between consecutive calls)
import sys,subprocess,difflib
def get(args):
    out=subprocess.run(['python3','-I','/Users/shawwalters/amm100-run/lanes/sell-r1/tools/calls.py',*args],capture_output=True,text=True).stdout.split('\n')
    r=[]
    for l in out:
        if not l.strip(): continue
        a,n=l.split(' ',1); r.append((int(a,16),n[-45:]))
    return r
o=get(['orig',sys.argv[1]]);c=get(['cand',sys.argv[2],sys.argv[3]])
sm=difflib.SequenceMatcher(a=[n for _,n in o],b=[n for _,n in c],autojunk=False)
po=pc=0
for tag,i1,i2,j1,j2 in sm.get_opcodes():
    if tag=='equal':
        for k in range(i2-i1):
            ao,ac=o[i1+k][0],c[j1+k][0]
            d=(ao-po)//8-(ac-pc)//8
            print(f'{ao:5x} {ac:5x} gapdiff {d:+4d} {o[i1+k][1]}' if d else f'{ao:5x} {ac:5x}            {o[i1+k][1]}')
            po,pc=ao,ac
    else:
        print('  ',tag,'O:',[n[-30:] for _,n in o[i1:i2]],'C:',[n[-30:] for _,n in c[j1:j2]])
