import os
def edit(b):
    A="  br i1 %switch.i, label %bb16.i, label %bb17.i\n"
    assert A in b
    w=os.environ.get('W','1,2000')
    b=b.replace(A,"  br i1 %switch.i, label %bb16.i, label %bb17.i, !prof !99999\n")
    return b+f'\n!99999 = !{{!"branch_weights", i32 {w.split(",")[0]}, i32 {w.split(",")[1]}}}\n'
