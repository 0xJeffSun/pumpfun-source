"""Mutations demonstrate separate instruction, pointer-data, CALL and receipt checks."""
from pathlib import Path
import gzip,importlib.util,json,struct,copy
P=Path(__file__).resolve().parent
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
m=module('prefix_scope',P/'analyze.py');v=module('prefix_checks',P/'verify.py')
def patch(image,address,raw):
 sec=next(s for s in m.wm.m.elf_layout(image)['sections']if s['address']<=address<s['address']+s['size']);out=bytearray(image);start=sec['offset']+address-sec['address'];out[start:start+len(raw)]=raw;return bytes(out)
def main():
 b=gzip.decompress((P/'artifacts/origins-symbols.so.gz').read_bytes());r=json.loads(gzip.decompress((P/'analysis.json.gz').read_bytes()));pairs={x['original']['address']:x['candidate']['address']for x in r['variants']['origins']['unique_pairs']};ws=m.wm.windows(b);ci={x['address']:x for x in ws};f=ci[pairs[18384]];ins=m.wm.m.instructions(b,f['address'],f['bytes'])
 scalar=next(i for i in ins if i['opcode']==0xb7 and i['immediate']>1);changed=patch(b,f['address']+scalar['offset']+4,struct.pack('<i',scalar['immediate']+1));new={x['address']:x for x in m.wm.windows(changed)};assert new[f['address']]['signature']!=f['signature']
 owner=next(i['lddw_value']for i in ins if i['offset']==32);first=m.wm.m.at_address(b,owner,1);changed=patch(b,owner,bytes([first[0]^1]));assert m.wm.m.section_data(b,'.text')==m.wm.m.section_data(changed,'.text')and m.decoder_data(changed,ci,pairs)!=m.decoder_data(b,ci,pairs)
 closure=ci[pairs[302032]];call=closure['address']+6040;other=ci[pairs[36072]];changed=patch(b,call+4,struct.pack('<i',(other['address']-call-8)//8));new={x['address']:x for x in m.wm.windows(changed)};assert new[closure['address']]['signature']==closure['signature']and m.admin.calls(changed,new[closure['address']],new)[6040]['signature']!=m.admin.calls(b,closure,ci)[6040]['signature']
 receipt=json.loads(gzip.decompress((P/'receipts/origins-strict.json.gz').read_bytes()));v.strict(receipt);bad=copy.deepcopy(receipt);bad['cases'][0]['candidate']['error']='forged outcome'
 try:v.strict(bad)
 except AssertionError:pass
 else:raise AssertionError('receipt mutation accepted')
 before=(P/'sources/control/programs/pump-fees/src/types.rs').read_text();after=(P/'sources/origins/programs/pump-fees/src/types.rs').read_text();v.source_change(before,after)
 try:v.source_change(before,after.replace('if buf.len() < 8','if buf.len() < 9',1))
 except AssertionError:pass
 else:raise AssertionError('changed decoder source accepted')
 print('PASS: five scalar/data/CALL/receipt/source mutation checks')
if __name__=='__main__':main()
