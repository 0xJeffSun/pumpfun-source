"""Mutations preserve the recorded distinction between code, data and cases."""
from pathlib import Path
import copy,gzip,importlib.util,json,struct
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('social_scope',P/'analyze.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
def patch(image,address,raw):
 sec=next(s for s in m.wm.m.elf_layout(image)['sections']if s['address']<=address<s['address']+s['size']);out=bytearray(image);n=sec['offset']+address-sec['address'];out[n:n+len(raw)]=raw;return bytes(out)
def main():
 b=gzip.decompress((P/'artifacts/origins-symbols.so.gz').read_bytes());windows=m.wm.windows(b);index={x['address']:x for x in windows};f=next(x for x in windows if'pump_fees_candidate21create_social_fee_pda'in(x['name']or''));ins={i['offset']:i for i in m.wm.m.instructions(b,f['address'],f['bytes'])};assert f['bytes']==3296
 changed=patch(b,f['address']+1296+4,struct.pack('<i',68));after=next(x for x in m.wm.windows(changed)if x['address']==f['address']);assert after['signature']!=f['signature']
 pointer=ins[1256]['lddw_value'];first=m.wm.m.at_address(b,pointer,1);changed=patch(b,pointer,bytes([first[0]^1]));after=next(x for x in m.wm.windows(changed)if x['address']==f['address']);assert after['signature']==f['signature']and m.social_data(changed,after)!=m.social_data(b,f)
 target=next(x for x in windows if x['name']=='memcmp');before=m.old.calls(b,f,index);offset=next(k for k,x in before.items()if x['kind']=='local'and x['signature']!=target['signature']);address=f['address']+offset;changed=patch(b,address+4,struct.pack('<i',(target['address']-address-8)//8));after=next(x for x in m.wm.windows(changed)if x['address']==f['address']);assert after['signature']==f['signature']and m.old.calls(changed,after,{x['address']:x for x in m.wm.windows(changed)})[offset]['signature']!=before[offset]['signature']
 s=importlib.util.spec_from_file_location('social_case_check',P/'verify.py');v=importlib.util.module_from_spec(s);s.loader.exec_module(v);r=json.loads(gzip.decompress((P/'receipts/control-strict.json.gz').read_bytes()));v.strict(r,True);r=copy.deepcopy(r);row=next(x for x in r['cases']if x['original']['error']!=x['candidate']['error']);row['candidate']['error']=row['original']['error']
 try:v.strict(r,True)
 except AssertionError:pass
 else:raise AssertionError('altered outcome count accepted')
 print('PASS: guard scalar, error-path data, masked CALL and strict-outcome mutation checks (4 tests)')
if __name__=='__main__':main()
