import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83a/tools'); import ire
pre,h,post=ire.split(ire.L+'/ir/s2c9.ll'); h=ire.unnumber(h)
def rep(s,a,b,n=1):
    assert s.count(a)==n,(a,s.count(a)); return s.replace(a,b)
J0='''bb10.i.i:                                         ; preds = %res_block.i.i, %bb7.i.i
  %.sink = phi i64 [ 104, %bb7.i.i ], [ 184, %res_block.i.i ]
  %v32 = getelementptr inbounds nuw i8, ptr %_231, i64 %.sink
  %v33 = getelementptr inbounds nuw i8, ptr %_228, i64 96
  %_27.i.i = load i64, ptr %v33, align 8, !alias.scope !3496, !noalias !3497, !noundef !2
'''
assert J0 in h, 'J0'
i=h.index(J0); j=h.index('%max.output.sroa.0.0.i.i = tail call',i); j=h.index('\n',j)+1
blk=h[i:j]
lines=blk.split('\n')
def L_(sub): r=[l for l in lines if sub in l]; assert len(r)==1,sub; return r[0]
real_gep=L_('%v33 = getelementptr'); real_ld=L_('%_27.i.i = load'); z26=L_('%_26.i.i = zext'); z28=L_('%_28.i.i = zext'); mul=L_('%v34 = mul'); udiv=L_('%_24.i.i = udiv'); tr=L_('%max.i.i = trunc')
capld=L_('%_30.i.i = load'); cz=L_('%v35 = icmp eq'); umin=L_('%_30._36.i.i = tail call'); sel=L_('%output.sroa.0.0.i.i = select'); fin=L_('%max.output.sroa.0.0.i.i')
SUB='  %_2.0.i = sub nuw nsw i16 10000, %retained_reserve_bps'
def build(phi_lines, order):
    return '\n'.join(phi_lines+order)+'\n'
variants={}
hdr_old=['bb10.i.i:                                         ; preds = %res_block.i.i, %bb7.i.i','  %.sink = phi i64 [ 104, %bb7.i.i ], [ 184, %res_block.i.i ]','  %v32 = getelementptr inbounds nuw i8, ptr %_231, i64 %.sink']
hdr_new=['bb10.i.i:                                         ; preds = %res_block.i.i, %bb7.i.i','  %.sink = phi i64 [ 96, %bb15.i.i ], [ 96, %res_block.i.i ], [ 176, %bb7.i.i ]','  %v32 = getelementptr inbounds nuw i8, ptr %gpx, i64 %.sink']
O_e3=[capld,cz,umin,sel,real_gep,real_ld,z26,SUB,z28,mul,udiv,tr,fin]
O_e4=[capld,cz,umin,real_gep,real_ld,sel,z26,SUB,z28,mul,udiv,tr,fin]
O_e4b=[capld,umin,real_gep,real_ld,cz,sel,SUB,z26,z28,mul,udiv,tr,fin]
def mk(hdr,order,newcfg):
    hh=h.replace(blk,build(hdr,order)); hh=hh.replace(SUB+'\n','',1) if hh.count(SUB)==2 else hh
    if newcfg:
        hh=rep(hh,'br i1 %or.cond575, label %bb7.i.i, label %res_block.i.i','br i1 %or.cond575, label %bb10.i.i, label %res_block.i.i')
        hh=rep(hh,'br i1 %or.cond28.i.i, label %bb7.i.i, label %bb10.i.i','br i1 %or.cond28.i.i, label %bb10.i.i, label %bb7.i.i')
        hh=rep(hh,'  %_36.i.i = trunc nuw i128 %raw_quote.i.i to i64\n','  %_36.i.i = trunc nuw i128 %raw_quote.i.i to i64\n  %gpx = getelementptr inbounds nuw i8, ptr %_231, i64 8\n')
    return hh
for name,hdr,order,cfg in [('e3r',hdr_old,O_e3,False),('e4a',hdr_old,O_e4,False),('e4c',hdr_new,O_e3,True),('e4',hdr_new,O_e4,True),('e4b',hdr_new,O_e4b,True)]:
    variants[name]=ire.run(pre,mk(hdr,order,cfg),post,name)
for k,v in variants.items(): print(k,v)
