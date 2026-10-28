import re
def cut(b, start, end):
    i = b.index(start); j = b.index(end, i); return b[:i] + b[j:], b[i:j]
def lazy(b, loads_at='ret', cmp_at='bb8'):
    b = re.sub(r'%30\b', '%capptr', b)
    # pull key loads+compares out of bb9 .. bb16
    i = b.index('bb9:                                              ; preds = %bb26.i\n')
    j = b.index('bb16:', i)
    seg = b[i:j]
    hdr_end = seg.index('\n') + 1
    body = seg[hdr_end:]
    k = body.index('  %.not86')
    loads = body[:k]; cmps = body[k:]
    b = b[:i] + seg[:hdr_end] + '  br label %bb16\n\n' + b[j:]
    b = b.replace('  %.sink = phi i64 [ 184, %res_block74 ], [ 104, %bb9 ], [ 104, %res_block ]\n', '')
    gep = '  %capptr = getelementptr inbounds nuw i8, ptr %_251, i64 %.sink\n'
    b = b.replace(gep, '')
    # rename preds in cmps
    cmps = cmps.replace('label %bb16', 'label %capjoin').replace('; preds = %bb9', '; preds = %CAPSRC')
    # place loads
    if loads_at == 'keep':
        b = b.replace(seg[:hdr_end] + '  br label %bb16\n', seg[:hdr_end] + loads + '  br label %bb16\n')
    elif loads_at == 'b16':
        b = b.replace('  %_251 = load ptr, ptr %4, align 8, !nonnull !2, !align !3, !noundef !2\n', '  %_251 = load ptr, ptr %4, align 8, !nonnull !2, !align !3, !noundef !2\n' + loads, 1)
    elif loads_at == 'ret':
        m = '_ZN16mayhem_recovered5state21retained_basis_points17h0e7b13d6f6bc6aa0E.exit: ; preds = %bb16\n'
        b = b.replace(m, m + loads)
    else:
        b = b.replace('bb8.i.i:                                          ; preds = %_ZN16mayhem_recovered5state21retained_basis_points17h0e7b13d6f6bc6aa0E.exit\n',
                      'bb8.i.i:                                          ; preds = %_ZN16mayhem_recovered5state21retained_basis_points17h0e7b13d6f6bc6aa0E.exit\n' + loads)
    # place compares
    if cmp_at == 'bb8':
        hb = 'bb8.i.i:                                          ; preds = %_ZN16mayhem_recovered5state21retained_basis_points17h0e7b13d6f6bc6aa0E.exit\n'
        p = b.index(hb) + len(hb)
        if loads_at == 'bb8': p += len(loads)
        src = 'bb8.i.i'
        rest_anchor = p
    else:  # before cap load
        anchor = '  %_23.i.i = load i64, ptr %capptr'
        p = b.index(anchor)
        # need block name: use bb8.i.i (same block)
        src = 'bb8.i.i'
    cmps2 = cmps.replace('%CAPSRC', '%' + src).replace('[ 104, %bb9 ]', '[ 104, %' + src + ' ]')
    join = 'capjoin:\n  %.sink = phi i64 [ 184, %res_block74 ], [ 104, %' + src + ' ], [ 104, %res_block ]\n' + gep
    b = b[:p] + cmps2 + '\n' + join + b[p:]
    # successors of bb8.i.i now come from capjoin
    b = b.replace('; preds = %bb8.i.i\n', '; preds = %capjoin\n')
    return b
EXPS=[('lazy-ret-bb8', lambda b: lazy(b,'ret','bb8')), ('lazy-ret-cap', lambda b: lazy(b,'ret','cap')), ('lazy-bb8-bb8', lambda b: lazy(b,'bb8','bb8'))]
BAL = '''  %31 = getelementptr inbounds nuw i8, ptr %a, i64 48
  %_255 = load ptr, ptr %31, align 8, !nonnull !2, !align !3, !noundef !2
  %32 = getelementptr inbounds nuw i8, ptr %_255, i64 104
  %_48 = load i64, ptr %32, align 8, !noundef !2
'''
RET = '_ZN16mayhem_recovered5state21retained_basis_points17h0e7b13d6f6bc6aa0E.exit: ; preds = %bb16\n'
def lazy2(b, mode):
    b = lazy(b, 'ret', 'bb8')
    assert BAL in b
    b = b.replace(BAL, '')
    if mode == 'balfirst':
        b = b.replace(RET, RET + BAL)
    elif mode == 'ballast':
        i = b.index(RET) + len(RET); j = b.index('  %_9.i = zext', i)
        b = b[:j] + BAL + b[j:]
    if 'nolt' in mode or True:
        pass
    return b
def nolt(b):
    # drop lifetime.start of %_11.i in bb16
    i = b.index('bb16:'); j = b.index(RET)
    seg = b[i:j].replace('  call void @llvm.lifetime.start.p0(i64 0, ptr nonnull %_11.i)\n', '', 1)
    return b[:i] + seg + b[j:]
EXPS += [('l2-balfirst', lambda b: lazy2(b,'balfirst')), ('l2-ballast', lambda b: lazy2(b,'ballast')),
         ('nolt', nolt), ('nolt-lazy', lambda b: nolt(lazy(b,'ret','bb8')))]
def unf(b):
    b = b.replace('  %.sink = phi i64 [ 184, %res_block74 ], [ 104, %bb8.i.i ], [ 104, %res_block ]\n', '  %.sink = phi i64 [ 176, %res_block74 ], [ 96, %bb8.i.i ], [ 96, %res_block ]\n')
    b = b.replace('  %capptr = getelementptr inbounds nuw i8, ptr %_251, i64 %.sink\n', '  %gpd = getelementptr inbounds nuw i8, ptr %_251, i64 8\n  %capptr = getelementptr inbounds nuw i8, ptr %gpd, i64 %.sink\n')
    assert '%gpd' in b
    return b
EXPS += [('unf-lazy', lambda b: unf(lazy(b,'ret','bb8')))]
EXPS += [('k-keep', lambda b: lazy(b,'keep','bb8')), ('k-b16', lambda b: lazy(b,'b16','bb8')), ('k-keep-unf', lambda b: unf(lazy(b,'keep','bb8'))), ('k-b16-unf', lambda b: unf(lazy(b,'b16','bb8')))]
B8H = 'bb8.i.i:                                          ; preds = %_ZN16mayhem_recovered5state21retained_basis_points17h0e7b13d6f6bc6aa0E.exit\n'
GPD = '  %gpd = getelementptr inbounds nuw i8, ptr %_251, i64 8\n'
def unf2(b, where):
    b = unf(b)
    b = b.replace(GPD, '')
    if where == 'b8':
        b = b.replace(B8H, B8H + GPD)
    elif where == 'b16':
        b = b.replace('  %_251 = load ptr, ptr %4, align 8, !nonnull !2, !align !3, !noundef !2\n', '  %_251 = load ptr, ptr %4, align 8, !nonnull !2, !align !3, !noundef !2\n' + GPD, 1)
    return b
EXPS += [('u2-b8', lambda b: unf2(lazy(b,'keep','bb8'),'b8')), ('u2-b16', lambda b: unf2(lazy(b,'keep','bb8'),'b16'))]
CAPL = '''  %_23.i.i = load i64, ptr %capptr, align 8, !alias.scope !3466, !noalias !3465, !noundef !2
  %37 = icmp eq i64 %_23.i.i, 0
  %_23._28.i.i = tail call i64 @llvm.umin.i64(i64 %_23.i.i, i64 %_28.i.i)
  %output.sroa.0.0.i.i = select i1 %37, i64 %_28.i.i, i64 %_23._28.i.i
'''
TR = '  %_28.i.i = trunc nuw i128 %raw_quote.i.i to i64\n'
def capfirst(b, mode):
    from common import denum
    b = denum(b); CAPL2 = CAPL.replace('%37','%t37')
    return _capfirst(b, mode, CAPL2)
def _capfirst(b, mode, CAPL):
    assert CAPL in b
    b = b.replace(CAPL, '')
    if mode == 'first':
        b = b.replace(TR, TR + CAPL)
    elif mode == 'loadfirst':
        l, rest = CAPL.split('\n', 1)
        b = b.replace(TR, TR + l + '\n')
        b = b.replace('  %max.i.i = trunc nuw i128 %_17.i.i to i64\n', '  %max.i.i = trunc nuw i128 %_17.i.i to i64\n' + rest)
    elif mode == 'aftermaxload':
        k = '  %_20.i.i = load i64, ptr %t35, align 8, !alias.scope !3465, !noalias !3466, !noundef !2\n'
        b = b.replace(k, k + CAPL)
    return b
U2 = lambda b: unf2(lazy(b,'keep','bb8'),'b16')
EXPS += [('cf-'+m, (lambda m: lambda b: capfirst(U2(b), m))(m)) for m in ['first','loadfirst','aftermaxload']]
