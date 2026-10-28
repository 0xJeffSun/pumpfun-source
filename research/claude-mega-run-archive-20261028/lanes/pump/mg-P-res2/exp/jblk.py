import re, os
# S1: intermediate join J for the error paths (fund-err + realloc-err) with an aggregate phi; extracts in J; J -> bb12
TAGJ = os.environ.get('TAGJ', 'agg')   # agg: tag also from aggregate; early: tag from early extract via scalar phi in J
def edit(f):
    lines = f.split('\n')
    fundblk = None; e95 = None
    for i, l in enumerate(lines):
        if l.startswith('"_ZN4core3ptr53drop_in_place$LT$solana_account_info..AccountInfo$GT$17h939ec0182fa7fae5E.exit":'):
            fundblk = l.split(':')[0]
        if l.startswith('"_ZN4core3ptr85drop_in_place') and 'exit95' in l.split(':')[0]:
            e95 = l.split(':')[0]
    out = []; cur = None
    for l in lines:
        m = re.match(r'^("[^"]+"|[\w.]+):', l)
        if m: cur = m.group(1)
        if cur == fundblk and l.strip() == 'br i1 %24, label %bb20, label %bb12':
            l = '  br i1 %24, label %bb20, label %J'
        if cur == e95 and l.strip() == 'br label %bb12':
            l = '  br label %J'
        if l.strip().startswith('%_29.1 = extractvalue'):
            continue
        if TAGJ == 'agg' and l.strip().startswith('%_29.0 = extractvalue'):
            continue
        if l.startswith('bb12:'):
            out.append('J:')
            out.append(f'  %aggJ = phi {{ i64, ptr }} [ %21, %{fundblk} ], [ %41, %{e95} ]')
            if TAGJ == 'agg':
                out.append('  %tJ = extractvalue { i64, ptr } %aggJ, 0')
            else:
                out.append(f'  %tJ = phi i64 [ %22, %{fundblk} ], [ %_29.0, %{e95} ]')
            out.append('  %pJ = extractvalue { i64, ptr } %aggJ, 1')
            out.append('  br label %bb12')
            out.append('')
        mm = re.match(r'(\s*%_0\.sroa\.([05])\.0 = phi \S+ )(.*)$', l)
        if mm:
            parts = re.findall(r'\[ [^\]]+ \]', mm.group(3))
            parts = [p for p in parts if e95 not in p and fundblk not in p]
            parts.append('[ %pJ, %J ]' if mm.group(2) == '5' else '[ %tJ, %J ]')
            l = mm.group(1) + ', '.join(parts)
        out.append(l)
    return '\n'.join(out)
