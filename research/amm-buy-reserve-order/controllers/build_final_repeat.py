from pathlib import Path
import shutil,json,hashlib,subprocess,os,datetime
D=Path('/home/ahi200/pumpfun-work/20261028-amm-reserve-source');W=Path('/home/ahi200/pumpfun-work/20261028-amm-sweep-order');src=D/'source-reserve-fee-order'
s=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-contribution-review/amm-reserve-source-20261028/build_can_boost.py').read_text();body=s[s.index('sha=lambda'):].replace("out=D/'reserve-can-boost'","out=D/'reserve-fee-order-repeat'");exec(body)
a=json.loads((D/'reserve-fee-order/result.json').read_text());b=json.loads((D/'reserve-fee-order-repeat/result.json').read_text());assert a==b
