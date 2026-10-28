import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/tools')
from irh import *
LD=['%v34 = getelementptr inbounds nuw i8, ptr %_224, i64 96','%_24.i.i = load']
EXPS=[
 ('ld_RB_start', R(lambda b: move(b, LD, after='%_9.i = zext i64 %_38'))),
 ('ld_RB_after_mul', R(lambda b: move(b, LD, after='%v30 = mul'))),
 ('ld_RB_after_udiv', R(lambda b: move(b, LD, after='%raw_quote.i.i = udiv'))),
 ('ld_IT_start', R(lambda b: move(b, LD, after='%_32.i.i = trunc'))),
 ('ld_IT_mid', R(lambda b: move(b, LD, after='%or.cond26.i = select'))),
 ('ld_res_block', R(lambda b: move(b, LD, after='%or.cond24.i = select'))),
]
