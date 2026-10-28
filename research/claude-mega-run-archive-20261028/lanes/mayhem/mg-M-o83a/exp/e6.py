import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83a/tools'); import ire, rs, objsec, sbfdis
pre,h,post=ire.split(ire.L+'/ir/r5b.ll'); h=ire.unnumber(h)
SUB='  %_2.0.i = sub nuw nsw i16 10000, %retained_reserve_bps\n'
assert h.count(SUB)==1, h.count(SUB)
Z='  %_24.i.i = zext nneg i16 %_2.0.i to i128\n'
assert h.count(Z)==1
def score(lab,hh):
    r=ire.run(pre,hh,post,lab)
    code=open(f'{ire.L}/llc/{lab}.bin','rb').read() if r else None
    Y=[sbfdis.decode(code,None,pc,pc+len(x),None,None)[0]['text'] for pc,x in objsec.insns(code)] if code else None
    print(lab, r, rs.regions(Y)[1] if Y else None)
    return hh
score('e6_base',h)
# e6a: sink sub right before the zext (join block)
h1=h.replace(SUB,'',1).replace(Z, SUB+Z,1); score('e6a',h1)
# e6b: also move the max-mul block (zext,mul,udiv,trunc) to AFTER the cap umin/select, i.e. put sub+zext+mul+udiv right before max.umin
MAXBLK='  %34 = getelementptr inbounds nuw i8, ptr %_229, i64 96\n  %_23.i.i = load i64, ptr %34, align 8, !alias.scope !3487, !noalias !3488, !noundef !2\n  %_22.i.i = zext i64 %_23.i.i to i128\n  %_24.i.i = zext nneg i16 %_2.0.i to i128\n  %35 = mul nuw nsw i128 %_22.i.i, %_24.i.i\n  %_20.i.i = udiv i128 %35, 10000\n  %max.i.i = trunc nuw i128 %_20.i.i to i64\n'
print('MAXBLK present', h.count(MAXBLK))
