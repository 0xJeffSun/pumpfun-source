import os,re
def edit(b):
    lines=b.split('\n')
    i=next(k for k,l in enumerate(lines) if '%12 = icmp eq i32 %11, 0' in l)
    j=next(k for k in range(i,i+6) if lines[k].strip().startswith('br i1'))
    w1=os.environ.get('W1')
    extra=''
    if w1:
        lines[j]=lines[j]+', !prof !99998'; extra+=f'\n!99998 = !{{!"branch_weights", i32 {w1.split(",")[0]}, i32 {w1.split(",")[1]}}}'
    w2=os.environ.get('W2')
    b='\n'.join(lines)
    if w2:
        A="  br i1 %switch.i, label %bb16.i, label %bb17.i\n"; assert A in b
        b=b.replace(A,"  br i1 %switch.i, label %bb16.i, label %bb17.i, !prof !99999\n")
        extra+=f'\n!99999 = !{{!"branch_weights", i32 {w2.split(",")[0]}, i32 {w2.split(",")[1]}}}'
    return b+extra+'\n'
