"""pre-opt model: cap selection moved into initial_trade_output (copies ito2/sa2), handler passes &GlobalParams + key."""
import re
ITO = '_ZN16mayhem_recovered5state20initial_trade_output17h5b01ab86b5230ad0E'
SA = '_ZN16mayhem_recovered5state12sell_amounts17h5bf00e1bba216ecfE'
H = 'sell_v2_handler17h38d186980e52c827E'
WS = '@alloc_e953c1d75e6a4349f2dca6892c168ab2'
def fspan(s, name):
    m = re.search(r'\ndefine[^\n]*' + re.escape(name) + r'\(', s); st = m.start() + 1
    return st, s.find('\n}\n', st) + 3
def mk(s, order='capfirst', byref=False, native_copy=False, cmpform='memcmp', armgep=False, layout=0, zform='global', slot=False, lay2=0):
    st, en = fspan(s, ITO); ito = s[st:en]
    ito = ito.replace('@' + ITO + '(', '@ito2(', 1)
    ito = ito.replace('ptr noalias noundef readonly align 8 dereferenceable(8) %cap,', 'ptr noalias noundef readonly align 8 %gp, ptr noalias noundef readonly align 1 dereferenceable(32) %qk,', 1)
    capcode = ('  %gA = getelementptr inbounds i8, ptr %gp, i64 96\n  %gB = getelementptr inbounds i8, ptr %gp, i64 176\n'
               '  %cz = call i32 @memcmp(ptr %qk, ptr @zero32, i64 32)\n  %cze = icmp eq i32 %cz, 0\n  br i1 %cze, label %capA, label %capW\n\n'
               'capW:\n  %cw = call i32 @memcmp(ptr %qk, ptr ' + WS + ', i64 32)\n  %cwe = icmp eq i32 %cw, 0\n  br i1 %cwe, label %capA, label %capB\n\n'
               'capA:\n  br label %capJ\n\ncapB:\n  br label %capJ\n\ncapJ:\n  %capp = phi ptr [ %gA, %capA ], [ %gB, %capB ]\n')
    if cmpform == 'bool':
        capcode = ('  %cz = call i32 @memcmp(ptr %qk, ptr @zero32, i64 32)\n  %cze = icmp eq i32 %cz, 0\n  br i1 %cze, label %nT, label %nW\n\n'
                   'nW:\n  %cw = call i32 @memcmp(ptr %qk, ptr ' + WS + ', i64 32)\n  %cwe = icmp eq i32 %cw, 0\n  br label %nJ\n\n'
                   'nT:\n  br label %nJ\n\nnJ:\n  %na = phi i1 [ true, %nT ], [ %cwe, %nW ]\n  br i1 %na, label %capA, label %capB\n\n'
                   'capA:\n  %gA = getelementptr inbounds i8, ptr %gp, i64 96\n  store ptr %gA, ptr %capslot, align 8\n  br label %capJ\n\n'
                   'capB:\n  %gB = getelementptr inbounds i8, ptr %gp, i64 176\n  store ptr %gB, ptr %capslot, align 8\n  br label %capJ\n\n'
                   'capJ:\n  %capp = load ptr, ptr %capslot, align 8\n')
        ito = ito.replace('start:\n', 'start:\n  %capslot = alloca [8 x i8], align 8\n', 1)
        armgep = False; slot = False; layout = 0
    if armgep:
        capcode = capcode.replace('  %gA = getelementptr inbounds i8, ptr %gp, i64 96\n  %gB = getelementptr inbounds i8, ptr %gp, i64 176\n', '')
        capcode = capcode.replace('capA:\n  br label %capJ', 'capA:\n  %gA = getelementptr inbounds i8, ptr %gp, i64 96\n  br label %capJ').replace('capB:\n  br label %capJ', 'capB:\n  %gB = getelementptr inbounds i8, ptr %gp, i64 176\n  br label %capJ')
    DEF = '@"_ZN4core5array76_$LT$impl$u20$core..default..Default$u20$for$u20$$u5b$T$u3b$$u20$32$u5d$$GT$7default17hc42c1c46efc79776E"'
    if zform == 'alloca':
        capcode = capcode.replace('  %cz = call i32 @memcmp(ptr %qk, ptr @zero32, i64 32)\n', '  call void @llvm.memset.p0.i64(ptr align 1 %zz, i8 0, i64 32, i1 false)\n  %cz = call i32 @memcmp(ptr %qk, ptr %zz, i64 32)\n')
        ito = ito.replace('start:\n', 'start:\n  %zz = alloca [32 x i8], align 1\n', 1)
    elif zform == 'default':
        capcode = capcode.replace('  %cz = call i32 @memcmp(ptr %qk, ptr @zero32, i64 32)\n', '  call void ' + DEF + '(ptr noalias nocapture noundef sret([32 x i8]) align 1 dereferenceable(32) %zz) #18\n  %cz = call i32 @memcmp(ptr %qk, ptr %zz, i64 32)\n')
        ito = ito.replace('start:\n', 'start:\n  %zz = alloca [32 x i8], align 1\n', 1)
    if layout:
        A = 'capA:\n  %gA = getelementptr inbounds i8, ptr %gp, i64 96\n  br label %capJ\n\n'
        B = 'capB:\n  %gB = getelementptr inbounds i8, ptr %gp, i64 176\n  br label %capJ\n\n'
        W = capcode[capcode.index('capW:'):capcode.index('capA:')]
        head = capcode[:capcode.index('capW:')]
        J = capcode[capcode.index('capJ:'):]
        if layout == 1:   # rustc-like: trampolines, then-arm after else
            head = head.replace('label %capA, label %capW', 'label %cT1, label %capW')
            W = W.replace('label %capA, label %capB', 'label %cT2, label %capB')
            capcode = head + W + 'cT1:\n  br label %capA\n\n' + B + 'cT2:\n  br label %capA\n\n' + A + J
        elif layout == 2:  # B before A
            capcode = head + W + B + A + J
        elif layout == 3:  # trampolines, A then B
            head = head.replace('label %capA, label %capW', 'label %cT1, label %capW')
            W = W.replace('label %capA, label %capB', 'label %cT2, label %capB')
            capcode = head + W + 'cT1:\n  br label %capA\n\n' + 'cT2:\n  br label %capA\n\n' + A + B + J
        elif layout == 4:  # inverted conditions: else-first
            head = head.replace('br i1 %cze, label %capA, label %capW', '%czn = xor i1 %cze, true\n  br i1 %czn, label %capW, label %capA')
            W = W.replace('br i1 %cwe, label %capA, label %capB', '%cwn = xor i1 %cwe, true\n  br i1 %cwn, label %capB, label %capA')
            capcode = head + W + B + A + J
    if slot:
        capcode = capcode.replace('  %gA = getelementptr inbounds i8, ptr %gp, i64 96\n  br label %capJ', '  %gA = getelementptr inbounds i8, ptr %gp, i64 96\n  store ptr %gA, ptr %capslot, align 8\n  br label %capJ')
        capcode = capcode.replace('  %gB = getelementptr inbounds i8, ptr %gp, i64 176\n  br label %capJ', '  %gB = getelementptr inbounds i8, ptr %gp, i64 176\n  store ptr %gB, ptr %capslot, align 8\n  br label %capJ')
        capcode = capcode.replace('  %capp = phi ptr [ %gA, %capA ], [ %gB, %capB ]\n', '  %capp = load ptr, ptr %capslot, align 8\n')
        ito = ito.replace('start:\n', 'start:\n  %capslot = alloca [8 x i8], align 8\n', 1)
        if lay2:
            # rustc-like block order: head, capW, cT1, capB(else), cT2, capJ ..., capA (then) at end
            head = capcode[:capcode.index('capW:')].replace('label %capA, label %capW', 'label %cT1, label %capW')
            W = capcode[capcode.index('capW:'):capcode.index('capA:')].replace('label %capA, label %capB', 'label %cT2, label %capB')
            A = capcode[capcode.index('capA:'):capcode.index('capB:')]
            B = capcode[capcode.index('capB:'):capcode.index('capJ:')]
            J = capcode[capcode.index('capJ:'):]
            capcode = head + W + 'cT1:\n  br label %capA\n\n' + B + 'cT2:\n  br label %capA\n\n' + J
            ito = ito.replace('\n}\n', '\n' + A.rstrip() + '\n}\n') if lay2 == 1 else ito
            if lay2 == 2: capcode = head + W + 'cT1:\n  br label %capA\n\n' + B + 'cT2:\n  br label %capA\n\n' + A + J
    ito = ito.replace('load i64, ptr %cap, align 8', 'load i64, ptr %capp, align 8')
    if order == 'capfirst':
        anchor = '  call void @llvm.lifetime.end.p0(i64 16, ptr %_15)\n'
        i = ito.index(anchor) + len(anchor)
        ito = ito[:i] + capcode + ito[i:]
        ito = ito.replace('; preds = %bb8\n', '; preds = %capJ\n')
    else:  # maxfirst: at bb4 before load cap
        anchor = '  %max = trunc i128 %_17 to i64\n'
        i = ito.index(anchor) + len(anchor)
        ito = ito[:i] + capcode + ito[i:]
        ito = ito.replace('; preds = %bb4\n', '; preds = %capJ\n')
        ito = ito.replace('; preds = %bb9, %bb4\n', '; preds = %bb9, %capJ\n')
        ito = ito.replace('[ %_23, %bb4 ]', '[ %_23, %capJ ]')
    st2, en2 = fspan(s, SA); sa = s[st2:en2]
    sa = sa.replace('@' + SA + '(', '@sa2(', 1)
    sa = sa.replace('ptr noalias noundef readonly align 8 dereferenceable(8) %cap,', 'ptr noalias noundef readonly align 8 %gp, ptr noalias noundef readonly align 1 dereferenceable(32) %qk,', 1)
    sa = sa.replace('@' + ITO + '(', '@ito2(').replace('ptr noalias noundef readonly align 8 dereferenceable(8) %cap,', 'ptr noalias noundef readonly align 8 %gp, ptr noalias noundef readonly align 1 dereferenceable(32) %qk,')
    # handler
    st3, en3 = fspan(s, H); h = s[st3:en3]
    m = re.search(r'  %(\d+) = call \{ i64, i64 \} @' + SA + r'\(i64 noundef %_45, ptr noalias noundef readonly align 8 dereferenceable\(136\) %_46, ptr noalias noundef readonly align 8 dereferenceable\(8\) %_47,', h)
    assert m
    pre = ('  %gpbox = load ptr, ptr %gpslot, align 8\n  %gpp = getelementptr inbounds i8, ptr %gpbox, i64 8\n'
           '  %qkap = load ptr, ptr %qkslot, align 8\n  %qkp = load ptr, ptr %qkap, align 8\n')
    if not byref:
        pre += '  call void @llvm.memcpy.p0.p0.i64(ptr align 1 %qkc, ptr align 1 %qkp, i64 32, i1 false)\n'
        qarg = '%qkc'
    else:
        qarg = '%qkp'
    h = h[:m.start()] + pre + h[m.start():]
    h = h.replace(m.group(0), m.group(0).replace('@' + SA + '(', '@sa2(').replace('ptr noalias noundef readonly align 8 dereferenceable(8) %_47,', f'ptr noalias noundef readonly align 8 %gpp, ptr noalias noundef readonly align 1 dereferenceable(32) {qarg},'))
    # allocas / slots
    h = h.replace('start:\n', 'start:\n  %qkc = alloca [32 x i8], align 1\n  %gpslot = getelementptr inbounds i8, ptr %a.dummy, i64 8\n', 1) if False else h
    # gp slot and key slot = gep a,8 / a,32 : find %a def
    h = h.replace(pre, pre.replace('%gpslot', '%gpslot').replace('  %gpbox', '  %gpslot = getelementptr inbounds i8, ptr %a, i64 8\n  %qkslot = getelementptr inbounds i8, ptr %a, i64 32\n  %gpbox'))
    h = h.replace('start:\n', 'start:\n  %qkc = alloca [32 x i8], align 1\n', 1)
    if native_copy:
        # native compare uses the copy %qkc instead of fresh memcpy
        h = re.sub(r'call i32 @memcmp\(ptr %_50, ptr ' + WS, 'call i32 @memcmp(ptr %qkc, ptr ' + WS, h)
    s = s[:st3] + h + s[en3:]
    s = s.replace('\ndeclare i32 @memcmp(ptr, ptr, i64)', '\ndeclare i32 @memcmp(ptr, ptr, i64)\n@zero32 = private unnamed_addr constant [32 x i8] zeroinitializer, align 1')
    i = s.index('\ndefine'); s = s[:i] + '\n' + ito + '\n' + sa + s[i:]
    return s
EXPS = []
for o in ['capfirst', 'maxfirst']:
    for br in [False, True]:
        for nc in ([False, True] if not br else [False]):
            EXPS.append((f'ci-{o}-{"ref" if br else "val"}{"-nc" if nc else ""}', (lambda o, br, nc: lambda s: mk(s, o, br, nc))(o, br, nc)))
def nodead(s):
    st, en = fspan(s, H); h = s[st:en]
    assert h.count('  br i1 %_36, label %bb11, label %bb12\n') == 1
    h = h.replace('  br i1 %_36, label %bb11, label %bb12\n', '  br label %bb11\n')
    return s[:st] + h + s[en:]
EXPS2 = []
for o in ['capfirst', 'maxfirst']:
    EXPS2.append((f'cd-{o}-val', (lambda o: lambda s: mk(nodead(s), o, False, True))(o)))
    EXPS2.append((f'cd-{o}-ref', (lambda o: lambda s: mk(nodead(s), o, True, False))(o)))
EXPS = EXPS + EXPS2
def attr(s, which, grp):
    # which: 'ito' or 'sa' -> set attribute group of ito2 / sa2 definition
    name = '@ito2(' if which == 'ito' else '@sa2('
    i = s.index('define internal', s.index(name) - 200)
    i = s.rfind('\ndefine', 0, s.index(name)) + 1
    j = s.index('{\n', i)
    line = s[i:j]
    line2 = line.replace('unnamed_addr #3 ', f'unnamed_addr #{grp} ')
    assert line2 != line, line[-80:]
    return s[:i] + line2 + s[j:]
EXPS3 = []
for o in ['capfirst', 'maxfirst']:
    for br in [False, True]:
        for g in [0, 1]:
            for w in ['ito', 'sa', 'both']:
                def f(s, o=o, br=br, g=g, w=w):
                    s = mk(nodead(s), o, br, not br)
                    if w in ('ito', 'both'): s = attr(s, 'ito', g)
                    if w in ('sa', 'both'): s = attr(s, 'sa', g)
                    return s
                EXPS3.append((f'ni-{o}-{"ref" if br else "val"}-a{g}-{w}', f))
EXPS = EXPS + EXPS3

EXPS4 = []
for o in ['capfirst', 'maxfirst']:
    for br in [False, True]:
        for w in ['none', 'ito', 'sa', 'both']:
            def f(s, o=o, br=br, w=w):
                s = mk(nodead(s), o, br, not br, armgep=True)
                if w in ('ito', 'both'): s = attr(s, 'ito', 0)
                if w in ('sa', 'both'): s = attr(s, 'sa', 0)
                return s
            EXPS4.append((f'ag-{o}-{"ref" if br else "val"}-{w}', f))
EXPS = EXPS + EXPS4

EXPS5 = []
for o in ['capfirst','maxfirst']:
    for lay in [0,1,2,3,4]:
        def f(s, o=o, lay=lay):
            s = mk(nodead(s), o, False, True, armgep=True, layout=lay)
            return attr(s, 'ito', 0)
        EXPS5.append((f'lay-{o}-{lay}', f))
EXPS = EXPS + EXPS5

EXPS6 = []
for o in ['capfirst','maxfirst']:
    for z in ['alloca','default']:
        def f(s, o=o, z=z):
            s = mk(nodead(s), o, False, True, armgep=True, zform=z)
            return attr(s, 'ito', 0)
        EXPS6.append((f'z-{o}-{z}', f))
EXPS = EXPS + EXPS6

EXPS7 = []
for o in ['capfirst','maxfirst']:
    for l2 in [0,1,2]:
        def f(s, o=o, l2=l2):
            s = mk(nodead(s), o, False, True, armgep=True, slot=True, lay2=l2)
            return attr(s, 'ito', 0)
        EXPS7.append((f'sl-{o}-{l2}', f))
EXPS = EXPS + EXPS7
def helper(s, order='capfirst', grp=0, slotform=True, place='mid'):
    s = mk(nodead(s), order, False, True, armgep=True, slot=slotform, lay2=1 if slotform else 0)
    # extract the cap code from ito2 into a function @tcap(ptr %gp, ptr %qk) -> ptr
    st, en = fspan(s, 'ito2'); ito = s[st:en]
    i = ito.index('  %cz = call i32 @memcmp') if not slotform else ito.index('  %cz = call i32 @memcmp')
    j = ito.index('capJ:\n'); jl = ito.index('\n', ito.index('%capp =', j)) + 1
    body = ito[i:jl]
    tail_a = ''
    if slotform:
        k = ito.rfind('capA:'); ke = ito.index('\n}\n', k)
        tail_a = ito[k:ke+1]
        ito = ito[:k] + ito[ke+1:]
    ito = ito[:i] + '  %capp = call ptr @tcap(ptr %gp, ptr %qk)\n' + ito[jl:]
    fn = ('define internal noundef nonnull align 8 ptr @tcap(ptr noalias noundef readonly align 8 %gp, ptr noalias noundef readonly align 1 dereferenceable(32) %qk) unnamed_addr #' + str(grp) + ' {\nstart:\n'
          + ('  %capslot = alloca [8 x i8], align 8\n' if slotform else '') + body + '  ret ptr %capp\n\n' + tail_a + '}\n')
    s = s[:st] + ito + s[en:]
    s = s.replace('\n@ito2', '\n@ito2')  # noop
    i = s.index('\ndefine'); s = s[:i] + '\n' + fn + s[i:]
    return s
EXPS += [('hp-cf-g0', lambda s: helper(s, 'capfirst', 0)), ('hp-mf-g0', lambda s: helper(s, 'maxfirst', 0)),
         ('hp-cf-g1', lambda s: helper(s, 'capfirst', 1)), ('hp-cf-g0-phi', lambda s: helper(s, 'capfirst', 0, False))]
def noai_orig(s):
    # strip alwaysinline from the ORIGINAL initial_trade_output (used by legacy + buy + v2)
    i = s.index('define internal noundef i64 @' + ITO + '(')
    j = s.index('{\n', i)
    line = s[i:j]; assert 'unnamed_addr #3 ' in line
    return s[:i] + line.replace('unnamed_addr #3 ', 'unnamed_addr #1 ') + s[j:]
EXPS += [('noai-orig', noai_orig)]
def helper_v(s, order='capfirst', grp=0, where='cap'):
    s = helper(s, order, grp, True)
    # tcap returns the loaded value instead of the pointer
    st, en = fspan(s, 'tcap'); f = s[st:en]
    f = f.replace('define internal noundef nonnull align 8 ptr @tcap(', 'define internal noundef i64 @tcap(')
    f = f.replace('  ret ptr %capp\n', '  %capv = load i64, ptr %capp, align 8, !noundef !2\n  ret i64 %capv\n')
    s = s[:st] + f + s[en:]
    st, en = fspan(s, 'ito2'); ito = s[st:en]
    ito = ito.replace('  %capp = call ptr @tcap(ptr %gp, ptr %qk)\n', '')
    assert '  %_23 = load i64, ptr %capp, align 8, !noundef !2\n' in ito
    ito = ito.replace('  %_23 = load i64, ptr %capp, align 8, !noundef !2\n', '  %_23 = call i64 @tcap(ptr %gp, ptr %qk)\n')
    s = s[:st] + ito + s[en:]
    return s
EXPS += [('hv-cf', lambda s: helper_v(s, 'capfirst')), ('hv-mf', lambda s: helper_v(s, 'maxfirst'))]
def helper_v2(s, grp=0, ret='val'):
    s = helper(s, 'capfirst', grp, True)
    st, en = fspan(s, 'tcap'); f = s[st:en]
    if ret == 'val':
        f = f.replace('define internal noundef nonnull align 8 ptr @tcap(', 'define internal noundef i64 @tcap(')
        f = f.replace('  ret ptr %capp\n', '  %capv = load i64, ptr %capp, align 8, !noundef !2\n  ret i64 %capv\n')
    s = s[:st] + f + s[en:]
    st, en = fspan(s, 'ito2'); ito = s[st:en]
    if ret == 'val':
        ito = ito.replace('  %capp = call ptr @tcap(ptr %gp, ptr %qk)\n', '  %_23 = call i64 @tcap(ptr %gp, ptr %qk)\n')
        ito = ito.replace('  %_23 = load i64, ptr %capp, align 8, !noundef !2\n', '')
    else:
        ito = ito.replace('  %_23 = load i64, ptr %capp, align 8, !noundef !2\n', '')
        ito = ito.replace('  %capp = call ptr @tcap(ptr %gp, ptr %qk)\n', '  %capp = call ptr @tcap(ptr %gp, ptr %qk)\n  %_23 = load i64, ptr %capp, align 8, !noundef !2\n')
    s = s[:st] + ito + s[en:]
    return s
EXPS += [('hv2-val', lambda s: helper_v2(s, 0, 'val')), ('hv2-ptr', lambda s: helper_v2(s, 0, 'ptr'))]
RS0 = '  %7 = getelementptr inbounds i8, ptr %c, i64 88\n  %_20 = load i64, ptr %7, align 8, !noundef !2\n'
def early_rs(s, where='start'):
    st, en = fspan(s, 'ito2'); ito = s[st:en]
    ito = re.sub(r'%(\d+)\b', r'%t\1', ito)
    RS = RS0.replace('%7', '%t7')
    assert RS in ito
    ito = ito.replace(RS, '')
    if where == 'start':
        k = '  %t0 = getelementptr inbounds i8, ptr %c, i64 72\n'
        ito = ito.replace(k, RS + k)
    elif where == 'bb3':
        k = '  %raw_quote = udiv i128 %_10.0, %_12.0\n'
        ito = ito.replace(k, k + RS)
    return s[:st] + ito + s[en:]
EXPS += [('ers-hp-cf-start', lambda s: early_rs(helper(s,'capfirst',0),'start')), ('ers-hp-cf-bb3', lambda s: early_rs(helper(s,'capfirst',0),'bb3')),
         ('ers-hp-mf-start', lambda s: early_rs(helper(s,'maxfirst',0),'start')), ('ers-hv2-start', lambda s: early_rs(helper_v2(s,0,'val'),'start'))]

EXPS8 = []
for o in ['capfirst','maxfirst']:
    for br in [False, True]:
        for ai in ['ai','noai']:
            def f(s, o=o, br=br, ai=ai):
                s = mk(nodead(s), o, br, not br, cmpform='bool')
                return attr(s, 'ito', 0) if ai == 'noai' else s
            EXPS8.append((f'bool-{o}-{"ref" if br else "val"}-{ai}', f))
EXPS = EXPS + EXPS8
def helper_min(s, grp=0, pos='afterout'):
    # base: original ito copy with cap param -> make ito2 (AI) with gp/qk params, and tcap2(out,gp,qk)->u64 (non-AI) applying the cap
    st, en = fspan(s, ITO); ito = s[st:en]
    ito = ito.replace('@' + ITO + '(', '@ito2(', 1)
    ito = ito.replace('ptr noalias noundef readonly align 8 dereferenceable(8) %cap,', 'ptr noalias noundef readonly align 8 %gp, ptr noalias noundef readonly align 1 dereferenceable(32) %qk,', 1)
    ito = ito.replace('  %_23 = load i64, ptr %cap, align 8, !noundef !2\n  %9 = icmp eq i64 %_23, 0\n  br i1 %9, label %bb6, label %bb5\n',
                      '  %_23 = add i64 0, 0\n  %9 = icmp eq i64 %_23, 0\n  br label %bb6\n')
    assert '%_23 = add i64 0, 0' in ito
    call = '  %ocv = load i64, ptr %output, align 8\n  %oc = call i64 @tcap2(i64 %ocv, ptr %gp, ptr %qk)\n  store i64 %oc, ptr %output, align 8\n'
    if pos == 'afterout':
        k = '  call void @llvm.lifetime.end.p0(i64 16, ptr %_15)\n'
        ito = ito.replace(k, k + call)
    else:
        k = '  %_23 = add i64 0, 0\n'
        ito = ito.replace(k, call + k)
    fn = ('define internal noundef i64 @tcap2(i64 noundef %out, ptr noalias noundef readonly align 8 %gp, ptr noalias noundef readonly align 1 dereferenceable(32) %qk) unnamed_addr #' + str(grp) + ' {\nstart:\n'
          '  %capslot = alloca [8 x i8], align 8\n'
          '  %cz = call i32 @memcmp(ptr %qk, ptr @zero32, i64 32)\n  %cze = icmp eq i32 %cz, 0\n  br i1 %cze, label %cT1, label %capW\n\n'
          'capW:\n  %cw = call i32 @memcmp(ptr %qk, ptr ' + WS + ', i64 32)\n  %cwe = icmp eq i32 %cw, 0\n  br i1 %cwe, label %cT2, label %capB\n\n'
          'cT1:\n  br label %capA\n\ncapB:\n  %gB = getelementptr inbounds i8, ptr %gp, i64 176\n  store ptr %gB, ptr %capslot, align 8\n  br label %capJ\n\ncT2:\n  br label %capA\n\n'
          'capJ:\n  %capp = load ptr, ptr %capslot, align 8\n  %cv = load i64, ptr %capp, align 8\n  %cnz = icmp eq i64 %cv, 0\n  br i1 %cnz, label %rz, label %rm\n\n'
          'rm:\n  %mn = call i64 @llvm.umin.i64(i64 %out, i64 %cv)\n  br label %rz\n\nrz:\n  %r = phi i64 [ %out, %capJ ], [ %mn, %rm ]\n  ret i64 %r\n\n'
          'capA:\n  %gA = getelementptr inbounds i8, ptr %gp, i64 96\n  store ptr %gA, ptr %capslot, align 8\n  br label %capJ\n}\n')
    st2, en2 = fspan(s, SA); sa = s[st2:en2]
    sa = sa.replace('@' + SA + '(', '@sa2(', 1)
    sa = sa.replace('ptr noalias noundef readonly align 8 dereferenceable(8) %cap,', 'ptr noalias noundef readonly align 8 %gp, ptr noalias noundef readonly align 1 dereferenceable(32) %qk,', 1)
    sa = sa.replace('@' + ITO + '(', '@ito2(').replace('ptr noalias noundef readonly align 8 dereferenceable(8) %cap,', 'ptr noalias noundef readonly align 8 %gp, ptr noalias noundef readonly align 1 dereferenceable(32) %qk,')
    # handler edits: reuse mk's handler part by building with mk then replacing its ito2/sa2
    s2 = mk(nodead(s), 'capfirst', False, True, armgep=True)
    a, b = fspan(s2, 'ito2'); s2 = s2[:a] + ito + s2[b:]
    a, b = fspan(s2, 'sa2'); s2 = s2[:a] + sa + s2[b:]
    if 'declare i64 @llvm.umin.i64' not in s2:
        s2 = s2.replace('\ndeclare i32 @memcmp(ptr, ptr, i64)', '\ndeclare i32 @memcmp(ptr, ptr, i64)\ndeclare i64 @llvm.umin.i64(i64, i64)')
    i = s2.index('\ndefine'); s2 = s2[:i] + '\n' + fn + s2[i:]
    return s2
EXPS += [('hm-g0', lambda s: helper_min(s, 0)), ('hm-g1', lambda s: helper_min(s, 1))]

EXPS += [('hm-aftermax', lambda s: helper_min(s, 0, 'aftermax'))]
def legacy_capfirst(s, grp=3):
    st, en = fspan(s, ITO); ito = s[st:en]
    ito = ito.replace('  %_23 = load i64, ptr %cap, align 8, !noundef !2\n  %9 = icmp eq i64 %_23, 0\n  br i1 %9, label %bb6, label %bb5\n',
                      '  %_23 = add i64 0, 0\n  %9 = icmp eq i64 %_23, 0\n  br label %bb6\n')
    call = '  %ocv = load i64, ptr %output, align 8\n  %oc = call i64 @tcap3(i64 %ocv, ptr %cap)\n  store i64 %oc, ptr %output, align 8\n'
    k = '  call void @llvm.lifetime.end.p0(i64 16, ptr %_15)\n'
    ito = ito.replace(k, k + call)
    fn = ('define internal noundef i64 @tcap3(i64 noundef %out, ptr noalias noundef readonly align 8 dereferenceable(8) %cap) unnamed_addr #' + str(grp) + ' {\nstart:\n'
          '  %cv = load i64, ptr %cap, align 8\n  %cnz = icmp eq i64 %cv, 0\n  br i1 %cnz, label %rz, label %rm\n\n'
          'rm:\n  %mn = call i64 @llvm.umin.i64(i64 %out, i64 %cv)\n  br label %rz\n\nrz:\n  %r = phi i64 [ %out, %start ], [ %mn, %rm ]\n  ret i64 %r\n}\n')
    s = s[:st] + ito + s[en:]
    if 'declare i64 @llvm.umin.i64' not in s:
        s = s.replace('\ndeclare i32 @memcmp(ptr, ptr, i64)', '\ndeclare i32 @memcmp(ptr, ptr, i64)\ndeclare i64 @llvm.umin.i64(i64, i64)')
    i = s.index('\ndefine'); s = s[:i] + '\n' + fn + s[i:]
    return s
EXPS += [('lcf', legacy_capfirst), ('lcf-hm', lambda s: helper_min(legacy_capfirst(s), 0))]
