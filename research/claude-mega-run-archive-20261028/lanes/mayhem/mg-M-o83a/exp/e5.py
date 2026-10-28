import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o83a/tools'); import ire, rs, objsec, sbfdis
pre,h,post=ire.split(ire.L+'/ir/s2c9.ll'); h=ire.unnumber(h)
J0='''bb10.i.i:                                         ; preds = %res_block.i.i, %bb7.i.i
  %.sink = phi i64 [ 104, %bb7.i.i ], [ 184, %res_block.i.i ]
  %v32 = getelementptr inbounds nuw i8, ptr %_231, i64 %.sink
'''
J1='''bb10.i.i:                                         ; preds = %res_block.i.i, %bb7.i.i
  %.sink = phi i64 [ 96, %bb15.i.i ], [ 96, %res_block.i.i ], [ 176, %bb7.i.i ]
  %v32 = getelementptr inbounds nuw i8, ptr %gpx, i64 %.sink
'''
assert J0 in h
i=h.index(J0); j=h.index('%max.output.sroa.0.0.i.i = tail call',i); j=h.index('\n',j)+1
blk=h[i:j]; lines=blk.split('\n')
def L_(sub): r=[l for l in lines if sub in l]; assert len(r)==1,sub; return r[0]
real_gep=L_('%v33 = getelementptr'); real_ld=L_('%_27.i.i = load'); z26=L_('%_26.i.i = zext'); z28=L_('%_28.i.i = zext'); mul=L_('%v34 = mul'); udiv=L_('%_24.i.i = udiv'); tr=L_('%max.i.i = trunc')
capld=L_('%_30.i.i = load'); cz=L_('%v35 = icmp eq'); umin=L_('%_30._36.i.i = tail call'); sel=L_('%output.sroa.0.0.i.i = select'); fin=L_('%max.output.sroa.0.0.i.i')
SUB='  %_2.0.i = sub nuw nsw i16 10000, %retained_reserve_bps'
GP='  %gpx = getelementptr inbounds nuw i8, ptr %_231, i64 8\n'
MAXF=[real_gep,real_ld,z26,z28,mul,udiv,tr,capld,cz,umin,sel,fin]
CAPF=[capld,cz,umin,sel,real_gep,real_ld,z26,z28,mul,udiv,tr,fin]
def mk(order, sub_in_join, gp_where):
    body=order[:]
    if sub_in_join: body.insert(body.index(z28),SUB)
    hh=h.replace(blk,J1+'\n'.join(body)+'\n')
    if sub_in_join: hh=hh.replace(SUB+'\n','',1)
    hh=hh.replace('br i1 %or.cond575, label %bb7.i.i, label %res_block.i.i','br i1 %or.cond575, label %bb10.i.i, label %res_block.i.i')
    hh=hh.replace('br i1 %or.cond28.i.i, label %bb7.i.i, label %bb10.i.i','br i1 %or.cond28.i.i, label %bb10.i.i, label %bb7.i.i')
    if gp_where=='bb15': hh=hh.replace('  %_36.i.i = trunc nuw i128 %raw_quote.i.i to i64\n','  %_36.i.i = trunc nuw i128 %raw_quote.i.i to i64\n'+GP,1)
    else: hh=hh.replace('  %_231 = load ptr, ptr %v4, align 8, !nonnull !2, !align !3, !noundef !2\n','  %_231 = load ptr, ptr %v4, align 8, !nonnull !2, !align !3, !noundef !2\n'+GP,1)
    assert '%gpx = ' in hh
    return hh
for o_name,o in [('maxf',MAXF),('capf',CAPF)]:
    for sj in [False,True]:
        for gw in ['bb15','bb9']:
            lab=f'e5_{o_name}_{"sj" if sj else "se"}_{gw}'
            r=ire.run(pre,mk(o,sj,gw),post,lab)
            code=open(f'{ire.L}/llc/{lab}.bin','rb').read() if r else None
            Y=[sbfdis.decode(code,None,pc,pc+len(x),None,None)[0]['text'] for pc,x in objsec.insns(code)] if code else None
            print(lab, r, rs.regions(Y)[1] if Y else None)
