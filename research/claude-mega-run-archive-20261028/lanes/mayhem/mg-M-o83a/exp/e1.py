import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83a/tools'); import ire
pre,h,post=ire.split(ire.L+'/ir/s2c9.ll'); h=ire.unnumber(h)
lines=h.split('\n')
def idx(sub):
    r=[i for i,l in enumerate(lines) if sub in l]; assert len(r)==1,(sub,r); return r[0]
def block(start_sub, end_sub):
    a=idx(start_sub); b=idx(end_sub); return a,b
res={}
res['base']=ire.run(pre,h,post,'e1b')
# e1: cap load/min/select before max
a=idx('%v33 = getelementptr inbounds nuw i8, ptr %_228, i64 96'); m=idx('%max.i.i = trunc nuw i128 %_24.i.i to i64')
c0=idx('%_30.i.i = load i64, ptr %v32'); c1=idx('%output.sroa.0.0.i.i = select i1 %v35')
def e1(L_):
    L_=list(L_); maxblk=L_[a:m+1]; capblk=L_[c0:c1+1]
    return L_[:a]+capblk+maxblk+L_[c1+1:]
L1=e1(lines); res['e1']=ire.run(pre,'\n'.join(L1),post,'e1')
# e2: e1 + gp=box+8, phi(96,176)
def e2(L_):
    s='\n'.join(L_)
    s=s.replace('%.sink = phi i64 [ 104, %bb7.i.i ], [ 184, %res_block.i.i ]\n  %v32 = getelementptr inbounds nuw i8, ptr %_231, i64 %.sink',
                '%.sink = phi i64 [ 96, %bb7.i.i ], [ 176, %res_block.i.i ]\n  %gpx = getelementptr inbounds nuw i8, ptr %_231, i64 8\n  %v32 = getelementptr inbounds nuw i8, ptr %gpx, i64 %.sink')
    assert '%gpx' in s; return s
res['e2']=ire.run(pre,e2(L1),post,'e2')
res['e2_only']=ire.run(pre,e2(lines),post,'e2o')
# e3: e2 + sub moved into bb10 before zext
def e3(s):
    sub='  %_2.0.i = sub nuw nsw i16 10000, %retained_reserve_bps\n'
    assert sub in s; s=s.replace(sub,'',1)
    z='  %_28.i.i = zext nneg i16 %_2.0.i to i128\n'; assert z in s
    return s.replace(z, sub+z,1)
res['e3']=ire.run(pre,e3(e2(L1)),post,'e3')
res['e3_noe2']=ire.run(pre,e3('\n'.join(L1)),post,'e3n')
for k,v in res.items(): print(k,v)
