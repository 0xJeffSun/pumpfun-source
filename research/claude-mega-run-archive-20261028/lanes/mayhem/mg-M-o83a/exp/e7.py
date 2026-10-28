import sys,re; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83a/tools'); import ire, rs, objsec, sbfdis
pre,h,post=ire.split(ire.L+'/ir/r5b.ll'); h=ire.unnumber(h)
SUB='  %_2.0.i = sub nuw nsw i16 10000, %retained_reserve_bps\n'; Z='  %_24.i.i = zext nneg i16 %_2.0.i to i128\n'
EV='  call void @llvm.lifetime.start.p0(i64 296, ptr nonnull %event)\n'
def score(lab,hh):
    r=ire.run(pre,hh,post,lab); code=open(f'{ire.L}/llc/{lab}.bin','rb').read() if r else None
    Y=[sbfdis.decode(code,None,pc,pc+len(x),None,None)[0]['text'] for pc,x in objsec.insns(code)] if code else None
    print(lab, r, rs.regions(Y)[1] if Y else None); return hh
hsub=h.replace(SUB,'',1).replace(Z, SUB+Z,1)
score('e7_capsink',hsub)
assert hsub.count(EV)==1
h2=hsub.replace(EV,'',1)
for lab in ['bb64','bb65']:
    m=re.search(r'\n('+lab+r':[^\n]*\n)',h2); assert m,lab
    h2=h2[:m.end()]+EV+h2[m.end():]
score('e7_capsink_evarm',h2)
# also just event-arm edit alone (no cap sink)
h3=h.replace(EV,'',1)
for lab in ['bb64','bb65']:
    m=re.search(r'\n('+lab+r':[^\n]*\n)',h3); h3=h3[:m.end()]+EV+h3[m.end():]
score('e7_evarm',h3)
