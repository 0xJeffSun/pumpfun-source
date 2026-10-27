"""Negative controls exercise real call and data mutations without executing SBF."""
from pathlib import Path
import copy,gzip,importlib.util,json,struct
P=Path(__file__).resolve().parent
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
a=module('v2_negative_analysis',P/'analyze.py');v=module('v2_negative_verify',P/'verify.py')
def reject(f):
 try:f()
 except(AssertionError,KeyError):return
 raise AssertionError('forged evidence accepted')
def main():
 r=v.load(P/'analysis.json.gz');v.counts(r);bad=copy.deepcopy(r);bad['reports']['origins']['normalized']=571;reject(lambda:v.counts(bad));e=v.load(P/'experiment.json');bad=copy.deepcopy(e['variants']['origins']['input_sha256']);bad['programs/pump-fees/src/lib.rs']='0'*64;reject(lambda:v.source_scope(e['variants']['control']['input_sha256'],bad))
 c=e['variants']['origins']['files']['candidate']['sha256'];f=v.load(P/'receipts/origins-sharing.json.gz');v.focused(f,c);bad=copy.deepcopy(f);bad['cases'].pop();reject(lambda:v.focused(bad,c))
 o=(a.ROOT/'evidence/original/pump_fees/deployed.so').read_bytes();b=gzip.decompress((P/e['variants']['origins']['files']['symbols']['path']).read_bytes());ow=a.wm.windows(o);cw=a.wm.windows(b);oi={x['address']:x for x in ow};ci={x['address']:x for x in cw};cf=next(x for x in cw if'v2_transfer_creator_fees_to_pump17'in(x['name']or''));assert cf['signature']==oi[240088]['signature'];rows={x['offset']:x for x in a.wm.m.instructions(b,cf['address'],cf['bytes'])};sec=next(x for x in a.wm.m.elf_layout(b)['sections']if x['name']=='.text');off=sec['offset']+cf['address']-sec['address']
 raw=bytearray(b);wrong=next(x for x in cw if'pump_amm3cpi29transfer_creator_fees_to_pump17'in(x['name']or''));struct.pack_into('<i',raw,off+3040+4,(wrong['address']-cf['address']-3040-8)//8);changed=bytes(raw);assert next(x for x in a.wm.windows(changed)if x['address']==cf['address'])['signature']==oi[240088]['signature'];reject(lambda:a.calls(o,oi[240088],oi,changed,cf,ci))
 ptr=rows[224]['lddw_value'];sec=next(x for x in a.wm.m.elf_layout(b)['sections']if x['address']<=ptr< x['address']+x['size']);raw=bytearray(b);raw[sec['offset']+ptr-sec['address']+31]=1;changed=bytes(raw);assert a.wm.m.section_data(changed,'.text')==a.wm.m.section_data(b,'.text');reject(lambda:a.system_id(changed,cf))
 raw=bytearray(b);i=next(x for x in rows.values()if x['opcode']==0xb7 and x['immediate']>0);raw[off+i['offset']+4]^=1;assert next(x for x in a.wm.windows(bytes(raw))if x['address']==cf['address'])['signature']!=oi[240088]['signature']
 raw=bytearray(b);sec=next(x for x in a.wm.m.elf_layout(b)['sections']if x['name']=='.dynstr');pos=b.index(b'abort\0',sec['offset'],sec['offset']+sec['size']);raw[pos]=ord('x');assert next(x for x in a.wm.windows(bytes(raw))if x['address']==cf['address'])['signature']!=oi[240088]['signature']
 print('PASS: seven inventory/source/receipt/callee/SystemID/scalar/import negative controls')
if __name__=='__main__':main()
