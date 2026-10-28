from pathlib import Path
import subprocess,json,hashlib
J=Path('/home/ahi200/pumpfun-work/20261028-amm-v2-selector');S=Path('/home/ahi200/pumpfun-work/20261027-crank/sdk/llvm/bin');O=J/'regalloc-route';O.mkdir();src=J/'codegen-route-order/normal-after-exotic-flat.ll';name='_ZN18pump_amm_recovered5curve4fees19select_and_apply_v217h28f0417ffd05145aE';cmd=[str(S/'llc'),'-O3','-mattr=+store-imm,+jmp-ext','-filetype=obj','-print-before=greedy','-print-after=virtregrewriter','-filter-print-funcs='+name,str(src),'-o',str(O/'diagnostic.o')];(O/'launch.json').write_text(json.dumps({'command':cmd,'input_sha256':hashlib.sha256(src.read_bytes()).hexdigest()},indent=2))
with (O/'passes.log').open('wb') as log:r=subprocess.run(cmd,stdout=log,stderr=subprocess.STDOUT)
(O/'result.json').write_text(json.dumps({'returncode':r.returncode,'log_bytes':(O/'passes.log').stat().st_size}));r.check_returncode();print('regalloc trace complete',flush=True)
