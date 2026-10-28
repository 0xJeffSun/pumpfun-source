import re
B9 = 'bb9:                                              ; preds = %bb26.i\n'
B8 = 'bb8.i.i:                                          ; preds = %_ZN16mayhem_recovered5state21retained_basis_points17h0e7b13d6f6bc6aa0E.exit\n'
RET = '_ZN16mayhem_recovered5state21retained_basis_points17h0e7b13d6f6bc6aa0E.exit: ; preds = %bb16\n'
def sel(b, where='b8', unfold=False, cmpwhere='b9', loadswhere='b9'):
    b = re.sub(r'%30\b', '%capptr', b)
    i = b.index(B9); j = b.index('bb16:', i)
    seg = b[i+len(B9):j]
    k = seg.index('  %.not86'); loads = seg[:k]
    z = seg[k:seg.index('  br i1 %or.cond582')]
    r0 = seg.index('res_block:'); r0 = seg.index('\n', r0)+1
    w = seg[r0:seg.index('  br i1 %or.cond102')]
    cond = z + w + '  %nacc = select i1 %or.cond582, i1 true, i1 %or.cond102\n'
    pre = loads + (cond if cmpwhere == 'b9' else '')
    if loadswhere != 'b9': pre = cond if cmpwhere == 'b9' else ''
    b = b[:i] + B9 + pre + '  br label %bb16\n\n' + b[j:]
    b = b.replace('bb16:                                             ; preds = %res_block, %bb9, %res_block74\n', 'bb16:                                             ; preds = %bb9\n')
    b = b.replace('  %.sink = phi i64 [ 184, %res_block74 ], [ 104, %bb9 ], [ 104, %res_block ]\n', '')
    gep = '  %capptr = getelementptr inbounds nuw i8, ptr %_251, i64 %.sink\n'
    if unfold:
        s = '  %gpd = getelementptr inbounds nuw i8, ptr %_251, i64 8\n  %capoff = select i1 %nacc, i64 96, i64 176\n  %capptr = getelementptr inbounds nuw i8, ptr %gpd, i64 %capoff\n'
    else:
        s = '  %capA = getelementptr inbounds nuw i8, ptr %_251, i64 104\n  %capB = getelementptr inbounds nuw i8, ptr %_251, i64 184\n  %capptr = select i1 %nacc, ptr %capA, ptr %capB\n'
    if cmpwhere != 'b9': s = cond + s
    if where == 'b16':
        b = b.replace(gep, s)
    else:
        b = b.replace(gep, '')
        if loadswhere == 'ret':
            b = b.replace(RET, RET + loads)
        p = b.index('  %_23.i.i = load i64, ptr %capptr') if where == 'cap' else b.index(B8) + len(B8)
        b = b[:p] + s + b[p:]
    return b
EXPS = []
for w in ['b16', 'b8', 'cap']:
    for u in [False, True]:
        for cw in ['b9', 'late']:
            for lw in ['b9', 'ret']:
                if w == 'b16' and (cw == 'late' or lw=='ret'): continue
                EXPS.append((f'sel-{w}-{"unf" if u else "fold"}-{cw}-{lw}', (lambda w,u,cw,lw: lambda b: sel(b, w, u, cw, lw))(w,u,cw,lw)))
