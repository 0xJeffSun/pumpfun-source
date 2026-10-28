import sys, re; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/tools')
from irh import *
def phis(b):
    ls = lines(b); i = find(ls, '%quote_vault_balance.sroa.0.0 = phi')
    s = i
    while ls[s-1].lstrip().startswith('%') and ' = phi ' in ls[s-1]: s -= 1
    e = i
    while ' = phi ' in ls[e+1]: e += 1
    return ls, s, e
def perm(b, order):
    ls, s, e = phis(b); grp = ls[s:e+1]
    ls[s:e+1] = [grp[k] for k in order]; return '\n'.join(ls)
def n(b):
    ls, s, e = phis(b); return e - s + 1
import functools
def mk(i, front):
    def f(b):
        k = n(b); o = [j for j in range(k) if j != i]
        o = [i] + o if front else o + [i]
        return perm(b, o)
    return f
EXPS = []
for i in range(13):
    EXPS.append((f'front{i}', mk(i, True)))
    EXPS.append((f'end{i}', mk(i, False)))
EXPS.append(('reverse', lambda b: perm(b, list(range(n(b)))[::-1])))
