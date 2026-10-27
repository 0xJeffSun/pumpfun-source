"""Derive trade names from exact wrapper log literals and direct calls."""
from pathlib import Path
import importlib.util,json,struct,hashlib
P=Path(__file__).resolve().parent;R=P.parents[1]
def generate():
 s=importlib.util.spec_from_file_location('attribution_elf',R/'repro/mayhem/global-params-layout-recovery/tools/layer01.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
 o=m.Elf(R/'evidence/original/mayhem/deployed.so');rows=[]
 for wrapper,handler,end,expected in [(528568,127520,140512,'Sell'),(529400,113672,127520,'Buy'),(530232,159160,177256,'SellV2'),(531064,140512,159160,'BuyV2'),(531896,95848,113160,'SellPumpSwap'),(532728,85600,95336,'BuyPumpSwap')]:
  w=o.window(wrapper,wrapper+832);ref=w['data_references'][0];pc=ref['pc'];ptr=ref['target']
  assert struct.unpack_from('<BBh',o.b,pc)==(0x18,1,0)
  op,reg,off,length=struct.unpack_from('<BBhi',o.b,pc+16);assert(op,reg,off)==(0xb7,2,0)
  log=o.b[ptr:ptr+length].decode();assert log=='Instruction: '+expected
  call_pc=pc+24;assert o.rel[call_pc]['symbol']=='sol_log_'
  edges=[d for d in w['direct']if d['target']==handler];assert len(edges)==1
  body=o.window(handler,end)
  rows.append(dict(name=expected,wrapper_start=wrapper,wrapper_end=wrapper+832,wrapper_sha256=w['raw_sha256'],log_reference_pc=pc,log_address=ptr,log_bytes=length,log=log,log_call_pc=call_pc,handler_call_pc=edges[0]['pc'],handler_start=handler,handler_end=end,handler_sha256=body['raw_sha256'],arithmetic_calls=[{'pc':d['pc'],'target':d['target']}for d in body['direct']if d['target']in[185296,186552]]))
 return dict(original_sha256=hashlib.sha256(o.b).hexdigest(),scope='Static wrapper attribution only; no handler-body equality or runtime path coverage inferred.',handlers=rows)
if __name__=='__main__':
 import argparse
 a=argparse.ArgumentParser();a.add_argument('--check',action='store_true');args=a.parse_args();b=(json.dumps(generate(),indent=2)+'\n').encode()
 if args.check:assert(P/'attribution.json').read_bytes()==b
 else:(P/'attribution.json').write_bytes(b)
 print('PASS: six trade wrappers bind log literal to direct handler target')
