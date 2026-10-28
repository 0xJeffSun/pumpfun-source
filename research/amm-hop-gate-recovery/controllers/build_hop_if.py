from pathlib import Path
import json,shutil,subprocess,os,hashlib,datetime
G=Path('/home/ahi200/pumpfun-work/20261028-amm-incentive-regression');H=Path('/home/ahi200/pumpfun-work/20261028-amm-select-resume');W=Path('/home/ahi200/pumpfun-work/20261028-amm-sweep-order');S=Path('/home/ahi200/pumpfun-work/20261027-crank/sdk');src=H/'source-hop-mask-if';shutil.copytree(G/'source-guard',src);out=H/'hop-mask-if';out.mkdir()
p=src/'programs/pump-amm/src/instructions/swap/multi_hop_swap.rs';s=p.read_text()
for gate in ['creator','lp','protocol']:
 old=f'''    let ({gate}_fee_bps, {gate}_fee) = if context.gates.{gate} {{
        (fees.{gate}_fee_bps, fees.{gate}_fee)
    }} else {{
        (0, 0)
    }};'''
 new=f'''    let {gate}_mask = if context.gates.{gate} {{ u64::MAX }} else {{ 0 }};
    let ({gate}_fee_bps, {gate}_fee) = (
        fees.{gate}_fee_bps & {gate}_mask,
        fees.{gate}_fee & {gate}_mask,
    );'''
 assert s.count(old)==1;s=s.replace(old,new)
p.write_text(s)
base=Path(__file__).with_name('build_tail.py').read_text();runner=base[base.index('sha=lambda'):];runner=runner.replace("'Qualified parts helper restores shared low load and avoids early global flag but constructs context after PDA and changes frame/lifetime. Restore context construction before PDA; return actual CPI Return directly, leaving get/global flag/apply outside helper. This differs from failed all-tail context helper and from parts helper in actual return ABI and context lifetime.'","'Original hop helper uses sign-extended Boolean masks and bitwise AND for three pairs. Current source emits six branches. Express same total gating operation with defined wrapping_neg masks; preserve layout and all source coordinates.'");exec(compile(runner,str(__file__),'exec'))
