# Blind IR-lever probes on r3 handler body. Each fn edits the function-body text; irx prints ONLY scores.
# Levers prior closes used: phi incoming order, lifetime.start/end placement, store/alloca order.
import re
def phi_sink_swap(b):
    # swap the {176 / 96 / 96} incoming order on the cap-offset phi
    m = re.search(r'(%\.sink\.i = phi i64 )(\[ [^\n]+)', b)
    if not m: return b
    line = m.group(2)
    items = re.findall(r'\[ [^\]]+ \]', line)
    if len(items) < 2: return b
    items = items[::-1]
    return b[:m.start(2)] + ', '.join(items) + b[m.start(2)+len(line):] if False else b.replace(m.group(2), ', '.join(items), 1)
def sub_after_realsol(b):
    # move the 10000-retained sub to just before the max umin (after real_sol load+mul+udiv)
    sub = re.search(r'\n\s*%_2\.0\.i228 = sub nuw nsw i16 10000, %retained_reserve_bps', b)
    if not sub: return b
    subline = b[sub.start():b.index('\n', sub.start()+1)]
    b2 = b.replace(subline, '', 1)
    anchor = '\n  %max.i.i = trunc nuw i128 %_21.i.i to i64'
    return b2.replace(anchor, subline + anchor, 1) if anchor in b2 else b
def realsol_before_cap(b):
    # move the real_sol gep+load (offset 96 on %_224) to just before the cap phi block
    gl = re.search(r'\n  %34 = getelementptr inbounds nuw i8, ptr %_224, i64 96\n  %_24\.i\.i = load i64, ptr %34[^\n]*', b)
    if not gl: return b
    seg = b[gl.start():gl.end()]
    b2 = b.replace(seg, '', 1)
    anchor = '\n  %.sink.i = phi i64'
    return b2.replace(anchor, seg + anchor, 1) if anchor in b2 else b
EXPS = [('identity', lambda b: b), ('phi_sink_swap', phi_sink_swap), ('sub_after_realsol', sub_after_realsol), ('realsol_before_cap', realsol_before_cap)]
