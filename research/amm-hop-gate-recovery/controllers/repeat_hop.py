from pathlib import Path
import json,shutil,subprocess,os,hashlib,datetime
G=Path('/home/ahi200/pumpfun-work/20261028-amm-incentive-regression');H=Path('/home/ahi200/pumpfun-work/20261028-amm-select-resume');W=Path('/home/ahi200/pumpfun-work/20261028-amm-sweep-order');S=Path('/home/ahi200/pumpfun-work/20261027-crank/sdk');src=H/'source-hop-lp-first';out=H/'hop-repeat';out.mkdir()
base=Path(__file__).with_name('build_tail.py').read_text();exec(compile(base[base.index('sha=lambda'):],str(__file__),'exec'))
assert all((out/(n+'.so')).read_bytes()==(H/'hop-lp-first'/(n+'.so')).read_bytes() for n in ['candidate','symbols']);print('Normal repeat equals candidate, stripped and with symbols',flush=True)
