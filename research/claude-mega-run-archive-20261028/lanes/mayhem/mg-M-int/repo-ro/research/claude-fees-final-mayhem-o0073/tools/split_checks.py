#!/usr/bin/env python3
"""IR surgery that proves O0073's residual: split the fused zero tests in the unthreaded IR.

Input: rustc's IR for the parent built with -Zmir-enable-passes=-JumpThreading (diagnostic only),
where bb19 holds `select native` + `or.cond = (last == 0) | (interval == 0)`. The edit replaces
the single `br %or.cond` with two sequential branches (last == 0, then interval == 0), optionally
inverting the select and/or keeping the interval load in the second block, then runs llc and
compares with the original window (masked call/lddw, positional).

  python -B split_checks.py NOJT.ll
"""
import sys
sys.path.insert(0, __import__('os').path.dirname(__file__))
import irs  # noqa: E402


def ed(select_inv, interval_hoisted):
    def f(blocks):
        out = []
        for n, ls in blocks:
            if n != 'bb19':
                out.append((n, ls)); continue
            nl = []
            for l in ls:
                s = l.strip()
                if s.startswith('%_6.sroa.0.0 = select') and select_inv:
                    l = '  %nn0 = xor i1 %native, true\n  %_6.sroa.0.0 = select i1 %nn0, i64 %.val, i64 %self.val'
                if s.startswith(('%9 = getelementptr', '%_8 = load', '%11 = icmp', '%or.cond', 'br i1 %or.cond')):
                    if interval_hoisted and s.startswith(('%9', '%_8')):
                        nl.append(l)
                    continue
                nl.append(l)
            nl.append('  br i1 %10, label %bb12, label %bb4x')
            out.append((n, nl))
            b4 = ['bb4x:']
            if not interval_hoisted:
                b4 += ['  %9 = getelementptr inbounds nuw i8, ptr %global_params, i64 160',
                       '  %_8 = load i64, ptr %9, align 8, !noundef !2']
            b4 += ['  %11 = icmp eq i64 %_8, 0', '  br i1 %11, label %bb12, label %bb6']
            out.append(('bb4x', b4))
        return out
    return f


if __name__ == '__main__':
    ll = sys.argv[1]
    irs.run(ll, 'unchanged-nojt', lambda b: b)
    for inv in (False, True):
        for h in (False, True):
            irs.run(ll, f's-inv{int(inv)}-h{int(h)}', ed(inv, h))
