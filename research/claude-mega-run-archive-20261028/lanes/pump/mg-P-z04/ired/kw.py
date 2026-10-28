import os
def edit(b):
    extra=''
    for k,(lbl,env) in enumerate([("  br i1 %_3.not, label %bb2, label %bb27","W1"),("  br i1 %5, label %bb10, label %bb9","W2")]):
        w=os.environ.get(env)
        if not w: continue
        assert lbl in b, lbl
        b=b.replace(lbl, lbl+f", !prof !9999{k}",1)
        extra+=f'\n!9999{k} = !{{!"branch_weights", i32 {w.split(",")[0]}, i32 {w.split(",")[1]}}}'
    return b+extra+'\n'
