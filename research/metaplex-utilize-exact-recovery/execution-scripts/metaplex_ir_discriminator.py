"""Diagnostic IR interventions only: NEVER a source-build acceptance candidate."""
from pathlib import Path
import subprocess,re,json,hashlib,sys
from elftools.elf.elffile import ELFFile
B=Path('/home/ahi200/pumpfun-work/20261027-metaplex');R=Path('/mnt/c/Users/ahi20/Documents/ChatGPT/pumpfun-source')
D=B/'ir-discriminator';reuse='--analyze-only' in sys.argv;D.mkdir(exist_ok=reuse)
fn='_ZN14token_metadata9processor4uses7utilize15process_utilize17h9789c7990f4c0b83E'
ll=(B/'traces/owned-control-stages/token_metadata.ll').read_text()
m=re.search(r'(?ms)^define void @'+fn+r'[^\n]*\n.*?^}\n',ll);assert m
body=m[0]
clone=next(l for l in body.splitlines() if 'call ' in l and 'clone17h4d8ccf9a2d363941E' in l)
replacement='  call void @llvm.memcpy.p0.p0.i64(ptr noundef nonnull align 8 dereferenceable(24) %_134, ptr noundef nonnull align 8 dereferenceable(24) %_135, i64 24, i1 false)'
block=re.search(r'(?ms)^bb109:[^\n]*\n.*?(?=^[^ ;\n][^\n]*:\s)',body);assert block
underflow=block[0]
next_block=re.search(r'(?ms)^bb103:[^\n]*\n.*?(?=^[^ ;\n][^\n]*:\s)',body);assert next_block
def change(copy,layout):
 s=body
 if copy:s=s.replace(clone,replacement)
 if layout:
  s=s.replace(underflow,'');pos=s.index(next_block[0])+len(next_block[0]);s=s[:pos]+underflow+s[pos:]
 return ll[:m.start()]+s+ll[m.end():]
image='solanafoundation/solana-verifiable-build@sha256:43206149a565ec35da95b1a909f4714f5d5f0d8241c31df24189e517acd18467'
sys.path.insert(0,str(R/'repro/pump_fees/framework-matching'));from elf_reader import Elf
original=Elf(R/'evidence/dependencies/token_metadata/deployed.so');control=Elf(B/'builds/control/candidate.so');start=236632;size=5104
results=[]
for label,copy,layout in [('control',False,False),('copy-only',True,False),('layout-only',False,True),('copy-and-layout',True,True)]:
 source=D/(label+'.ll');source.write_text(change(copy,layout))
 cmd=['docker','run','--rm','--network','none','-v',str(B/'sdk')+':/sdk:ro','-v',str(D)+':/analysis:rw',image,'/sdk/llvm/bin/llc','-O2','-filetype=obj','/analysis/'+source.name,'-o','/analysis/'+label+'.o']
 if not reuse:
  with (D/(label+'.log')).open('wb') as f:r=subprocess.run(cmd,stdout=f,stderr=subprocess.STDOUT)
  assert r.returncode==0
 with (D/(label+'.o')).open('rb') as f:
  elf=ELFFile(f);sym=next(s for s in elf.get_section_by_name('.symtab').iter_symbols() if s.name==fn);sec=elf.get_section(sym['st_shndx']);off=sym['st_value'];raw=sec.data()[off:off+sym['st_size']];norm=bytearray(raw);rels=[]
  for rs in elf.iter_sections():
   if rs['sh_type'] not in ['SHT_REL','SHT_RELA'] or rs['sh_info']!=sym['st_shndx']:continue
   for rel in rs.iter_relocations():
    at=rel['r_offset']-off
    if not 0<=at<len(raw):continue
    typ=rel['r_info_type'];rels.append((at,typ))
    if raw[at]==0x85:norm[at+4:at+8]=bytes(4)
    elif raw[at]==0x18:norm[at+4:at+8]=bytes(4);norm[at+12:at+16]=bytes(4)
    else:raise AssertionError((at,typ,raw[at]))
  for at in range(0,len(raw),8):
   if raw[at:at+2]==b'\x85\x10':norm[at+4:at+8]=bytes(4)
  (D/(label+'.function.bin')).write_bytes(raw)
  row={'label':label,'command':cmd,'size':len(raw),'relocation_count':len(rels),'normalized_control_equal':bytes(norm)==control.normalized[start:start+size],'normalized_original_equal':bytes(norm)==original.normalized[start:start+size],'original_differing_positions':sum(x!=y for x,y in zip(norm,original.normalized[start:start+size])),'function_sha256':hashlib.sha256(raw).hexdigest(),'relocations':rels}
  results.append(row);print(json.dumps({k:v for k,v in row.items() if k not in ['command','relocations']}),flush=True)
(D/'results.json').write_text(json.dumps({'scope':'Counterfactual diagnostic only; edited IR is not recovered Rust source or an accepted artifact','results':results},indent=2)+'\n')
