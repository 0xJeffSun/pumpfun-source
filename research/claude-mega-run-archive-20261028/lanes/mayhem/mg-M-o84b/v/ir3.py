# Arm/event-region IR levers on r3: lifetime.start/end placement of the two event allocas (%_2.i, %_3.i543).
# Known-effective for sell event blocks (FINDINGS o0079). Scores only.
import re
def _move_lifetime_start_to_blocktop(b, alloca):
    # find lifetime.start for alloca; move it to just after its basic-block label (earliest legal point)
    m = re.search(r'\n(\s*call void @llvm\.lifetime\.start\.p0\(i64 \d+, ptr nonnull %' + re.escape(alloca) + r'\)[^\n]*)', b)
    if not m: return b
    line = m.group(1)
    b2 = b.replace('\n' + line, '', 1)
    # insert after the nearest preceding label line
    idx = m.start()
    lbl = b2.rfind('\n', 0, idx)
    lbl_line_start = b2.rfind('\n', 0, lbl - 1) + 1 if lbl > 0 else 0
    # put it right after the block label that contains the def (approx: after previous '\n...:\n')
    labels = [mm.end() for mm in re.finditer(r'\n[^\n]*:\s*;[^\n]*\n', b2) if mm.end() < idx]
    if not labels: return b
    at = labels[-1]
    return b2[:at] + line + '\n' + b2[at:]
def ev1(b): return _move_lifetime_start_to_blocktop(b, '_2.i')
def ev2(b): return _move_lifetime_start_to_blocktop(b, '_3.i543')
EXPS = [('identity', lambda b: b), ('ev_start_top', ev1), ('evcpi_start_top', ev2)]
