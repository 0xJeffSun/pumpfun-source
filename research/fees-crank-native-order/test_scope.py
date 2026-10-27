"""Adversarial tests ensure partial runtime equality cannot become a strict-pass claim."""
from pathlib import Path
import copy,gzip,importlib.util,json,struct
P=Path(__file__).resolve().parent
def module(n,p):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
a=module('native_scope',P/'analyze.py');v=module('native_verify',P/'verify.py')
def reject(fn):
 try:fn()
 except(AssertionError,KeyError):return
 raise AssertionError('forged evidence accepted')
def patch(image,address,raw):
 sec=next(s for s in a.wm.m.elf_layout(image)['sections']if s['address']<=address<s['address']+s['size']);out=bytearray(image);k=sec['offset']+address-sec['address'];out[k:k+len(raw)]=raw;return bytes(out)
def main():
 r=json.loads(gzip.decompress((P/'receipts/origins-crank.json.gz').read_bytes()));summary=a.strict_summary(r);v.summary_checks('origins',summary)
 bad=copy.deepcopy(r);bad['mismatches']=[];reject(lambda:a.strict_summary(bad))
 bad=copy.deepcopy(r);bad['cases'][0]['candidate']['after']['payer']['lamports']+=1;bad['cases'][0]['match']=False;bad['mismatches']=sorted([0]+bad['mismatches']);reject(lambda:v.summary_checks('origins',a.strict_summary(bad)))
 bad=copy.deepcopy(r);i=r['mismatches'][0];x=bad['cases'][i];line=next(k for k,s in enumerate(x['candidate']['logs'])if s.startswith('Program log:'));x['candidate']['logs'][line]='Program log: forged application message';reject(lambda:v.summary_checks('origins',a.strict_summary(bad)))
 bad=copy.deepcopy(r);bad['cases'][0],bad['cases'][1]=bad['cases'][1],bad['cases'][0];reject(lambda:a.strict_summary(bad))
 e=json.loads((P/'experiment.json').read_text());b=gzip.decompress((P/e['variants']['origins']['files']['symbols']['path']).read_bytes());ws=a.wm.windows(b);f=next(x for x in ws if'pump_fees_candidate22crank_donation_fee_pda'in(x['name']or''));ins={i['offset']:i for i in a.wm.m.instructions(b,f['address'],f['bytes'])};refs=a.messages(b,f);offset=refs['Nothing to donate'][0]['load_offset'];pointer=ins[offset]['lddw_value'];changed=patch(b,pointer,b'X');assert a.wm.m.section_data(changed,'.text')==a.wm.m.section_data(b,'.text')and len(a.messages(changed,f)['Nothing to donate'])<len(refs['Nothing to donate'])
 scalar=next(i for i in ins.values()if i['opcode']==0x57 and i['immediate']==8);changed=patch(b,f['address']+scalar['offset']+4,struct.pack('<i',4));new=next(x for x in a.wm.windows(changed)if x['address']==f['address']);assert new['signature']!=f['signature']
 print('PASS: six mismatch-accounting/state/application-log/domain/data/scalar mutation tests')
if __name__=='__main__':main()
