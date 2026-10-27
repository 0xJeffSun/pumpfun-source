"""Mutation checks separate heap sizes, program IDs and encoded call targets."""
from pathlib import Path
import gzip,importlib.util,struct
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('admin_scope',P/'analyze.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m)
def patch(image,address,raw):
 section=next(s for s in m.wm.m.elf_layout(image)['sections']if s['address']<=address<s['address']+s['size']);out=bytearray(image);offset=section['offset']+address-section['address'];out[offset:offset+len(raw)]=raw;return bytes(out)
def main():
 b=gzip.decompress((P/'artifacts/origins-symbols.so.gz').read_bytes());windows=m.wm.windows(b);index={x['address']:x for x in windows};parser=next(x for x in windows if'AdminCtoSharingConfig$u20$as$u20$anchor_lang..Accounts$LT$'in(x['name']or'')and'12try_accounts'in x['name']);ins={i['offset']:i for i in m.wm.m.instructions(b,parser['address'],parser['bytes'])}
 changed=patch(b,parser['address']+376+4,struct.pack('<i',736));f=next(x for x in m.wm.windows(changed)if x['address']==parser['address']);assert f['signature']!=parser['signature']
 helper=index[ins[1584]['call_target']];hi={i['offset']:i for i in m.wm.m.instructions(b,helper['address'],584)};pointer=hi[144]['lddw_value'];first=m.wm.m.at_address(b,pointer,1);changed=patch(b,pointer,bytes([first[0]^1]));f=next(x for x in m.wm.windows(changed)if x['address']==helper['address']);assert m.wm.m.section_data(changed,'.text')==m.wm.m.section_data(b,'.text')and f['signature']==helper['signature']and m.reader_contract(changed,parser,index)!=m.reader_contract(b,parser,index)
 wrapper=next(x for x in windows if'__global'in(x['name']or'')and'admin_cto_sharing_config'in x['name']);address=wrapper['address']+488;changed=patch(b,address+4,struct.pack('<i',(helper['address']-address-8)//8));f=next(x for x in m.wm.windows(changed)if x['address']==wrapper['address']);assert f['signature']==wrapper['signature'];newindex={x['address']:x for x in m.wm.windows(changed)};assert m.calls(changed,f,newindex)[488]['signature']!=m.calls(b,wrapper,index)[488]['signature']
 print('PASS: allocation scalar, program-ID payload and masked parser-call retarget checks (3 tests)')
if __name__=='__main__':main()
