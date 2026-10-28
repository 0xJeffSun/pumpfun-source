import sys; sys.path.insert(0,'/Users/shawwalters/Documents/Codex/2026-10-24/claude-mayhem-work/mega/mg-M-o84c/tools')
from irh import *
LD=['%v34 = getelementptr inbounds nuw i8, ptr %_224, i64 96','%_24.i.i = load']
CJ='_ZN16mayhem_recovered5state21retained_basis_points17h0e7b13d6f6bc6aa0E.exit230'
IT='_ZN16mayhem_recovered5state20initial_trade_output17h9a3096f7f3bde4bdE.exit.i'
RB='_ZN16mayhem_recovered5state21retained_basis_points17h0e7b13d6f6bc6aa0E.exit'
EXPS=[
 ('ld_before_cap', R(lambda b: move(b, LD, after='%v32 = getelementptr'))),
 ('ld_after_phi', R(lambda b: move(b, LD, after='%.sink.i = phi'))),
 ('ld_after_sel', R(lambda b: move(b, LD, after='%_0.sroa.0.0.i226 = select'))),
 ('ld_in_IT', R(lambda b: to_block_end(b, LD, IT))),
 ('ld_in_RB', R(lambda b: to_block_end(b, LD, RB))),
 ('ld_in_bb9', R(lambda b: to_block_end(b, LD, 'bb9'))),
 ('sub_before_cap', R(lambda b: move(b, ['%_2.0.i228 = sub'], after='%v32 = getelementptr'))),
 ('sub_after_phi', R(lambda b: move(b, ['%_2.0.i228 = sub'], after='%.sink.i = phi'))),
 ('sub_in_IT', R(lambda b: to_block_end(b, ['%_2.0.i228 = sub'], IT))),
 ('sub_in_RB', R(lambda b: to_block_end(b, ['%_2.0.i228 = sub'], RB))),
 ('subld_in_IT', R(lambda b: to_block_end(b, ['%_2.0.i228 = sub']+LD, IT))),
 ('subld_in_RB', R(lambda b: to_block_end(b, ['%_2.0.i228 = sub']+LD, RB))),
]
