"""Adversarial checks retain operands and separate CALL and literal identity."""
from pathlib import Path
import gzip,importlib.util,struct
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('sharing_scope',P/'analyze.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
def patch(image,address,raw):
 section=next(s for s in m.wm.m.elf_layout(image)['sections']if s['address']<=address<s['address']+s['size']);out=bytearray(image);offset=section['offset']+address-section['address'];out[offset:offset+len(raw)]=raw;return bytes(out)
def main():
 b=gzip.decompress((P/'artifacts/origins-symbols.so.gz').read_bytes());windows=m.wm.windows(b);index={x['address']:x for x in windows};f=next(x for x in windows if'CreateFeeSharingConfig$u20$as$u20$anchor_lang..AccountsExit'in(x['name']or''));ins={i['offset']:i for i in m.wm.m.instructions(b,f['address'],f['bytes'])}
 assert ins[152]['displacement']==328
 scalar=patch(b,f['address']+152+2,struct.pack('<h',320));changed=next(x for x in m.wm.windows(scalar)if x['address']==f['address']);assert changed['signature']!=f['signature']
 pointer=ins[440]['lddw_value'];first=m.wm.m.at_address(b,pointer,1);mutated=patch(b,pointer,bytes([first[0]^1]));changed=next(x for x in m.wm.windows(mutated)if x['address']==f['address']);assert m.wm.m.section_data(mutated,'.text')==m.wm.m.section_data(b,'.text')and changed['signature']==f['signature']and m.data_contract(mutated,changed,464168)!=m.data_contract(b,f,464168)
 target=next(x['address']for x in windows if x['name']=='memcpy');before=m.calls(b,f,index);offset=next(k for k,v in before.items()if v['kind']=='local'and v['signature']!=index[target]['signature']);address=f['address']+offset;mutated=patch(b,address+4,struct.pack('<i',(target-address-8)//8));changed=next(x for x in m.wm.windows(mutated)if x['address']==f['address']);assert changed['signature']==f['signature'];after=m.calls(mutated,changed,{x['address']:x for x in m.wm.windows(mutated)});assert before[offset]['signature']!=after[offset]['signature']
 print('PASS: operand mutation breaks normalization; field-label and CALL-target mutations preserve normalized body but fail separate contracts (3 tests)')
if __name__=='__main__':main()
