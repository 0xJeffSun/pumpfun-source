#!/usr/bin/env python3
"""Recover declaration order from the original dispatch discriminator comparisons."""
from pathlib import Path
import argparse,difflib,hashlib,json,re,shutil,sys
ROOT=Path(__file__).resolve().parents[3];sys.path.insert(0,str(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool'))
from elf_reader import Elf
BASE=ROOT/'repro/pump_amm/diagnostic-parity-20261027/results'
HERE=Path(__file__).resolve().parent

def hashbytes(b):return hashlib.sha256(b).hexdigest()
def recover():
 idl=json.loads((ROOT/'evidence/upstream/pump_amm.json').read_text());lookup={bytes(x['discriminator']):x['name']for x in idl['instructions']}
 o=Elf(ROOT/'evidence/original/pump_amm/deployed.so');s=Elf(BASE/'build/unstripped.so');candidate=next(f for f in s.funcs if f['name'].startswith('_ZN18pump_amm_recovered5entry17'))
 assert candidate['size']==6104;out={}
 for name,e,start in [('original',o,0xdbc98),('candidate',s,candidate['start'])]:
  comparisons=[]
  for at in range(start,start+6104,8):
   if e.b[at]!=0x18:continue
   discriminator=e.b[at+4:at+8]+e.b[at+12:at+16]
   if discriminator in lookup:comparisons.append({'offset':at-start,'name':lookup[discriminator],'discriminator_hex':discriminator.hex()})
  assert len(comparisons)==38 and len({v['name']for v in comparisons})==38
  out[name]={'start':start,'bytes':6104,'comparisons':comparisons}
 assert {v['name']for v in out['original']['comparisons']}=={x['name']for x in idl['instructions']}
 return {'original_sha256':hashbytes(o.b),'candidate_sha256':hashbytes((BASE/'build/candidate.so').read_bytes()),'idl_sha256':hashbytes((ROOT/'evidence/upstream/pump_amm.json').read_bytes()),'dispatch':out,'scope':'Instruction order recovered from every original dispatch discriminator constant, matched to captured IDL. This establishes compiled dispatch order, not historical source line placement.'}

def reorder(source,order):
 marker=source.index('pub mod pump_amm_recovered {');end=source.index('\n}',marker)
 starts=list(re.finditer(r'^    pub fn ([a-z_0-9]+)',source[marker:end],re.M))
 positions=[marker+m.start()for m in starts];names=[m.group(1)for m in starts]
 assert len(names)==len(order)==38 and set(names)==set(order)
 raw_chunks=[source[start:stop]for start,stop in zip(positions,positions[1:]+[end])]
 chunks={name:chunk.rstrip()for name,chunk in zip(names,raw_chunks)}
 gaps=[chunk[len(chunk.rstrip()):]for chunk in raw_chunks]
 after=source[:positions[0]]+''.join(chunks[name]+gap for name,gap in zip(order,gaps))+source[end:]
 # Every entire method block, including its exact signature and body,
 # survives byte-for-byte. Prefix and non-program source also survive exactly.
 m2=list(re.finditer(r'^    pub fn ([a-z_0-9]+)',after[marker:after.index('\n}',marker)],re.M));p2=[marker+m.start()for m in m2];n2=[m.group(1)for m in m2]
 extracted={name:after[start:stop].rstrip()for name,start,stop in zip(n2,p2,p2[1:]+[after.index('\n}',marker)])}
 assert n2==order and extracted==chunks
 assert source[:positions[0]]==after[:p2[0]] and source[end:]==after[after.index('\n}',marker):]
 return after,{'before_order':names,'after_order':order,'method_body_sha256':{name:hashbytes(chunks[name].encode())for name in order},'all_method_bodies_byte_identical':True,'prefix_and_suffix_byte_identical':True}

def main():
 p=argparse.ArgumentParser();p.add_argument('--source',type=Path,default=BASE/'source');p.add_argument('--output-source',type=Path);p.add_argument('--output-report',type=Path);p.add_argument('--output-patch',type=Path);a=p.parse_args()
 r=recover();file=a.source/'programs/pump-amm/src/lib.rs';before=file.read_text();after,b=reorder(before,[x['name']for x in r['dispatch']['original']['comparisons']]);r['reorder']={**b,'before_lib_sha256':hashbytes(before.encode()),'after_lib_sha256':hashbytes(after.encode())}
 if a.output_source:
  assert not a.output_source.exists();shutil.copytree(a.source,a.output_source);(a.output_source/'programs/pump-amm/src/lib.rs').write_text(after)
 if a.output_report:assert not a.output_report.exists();a.output_report.write_text(json.dumps(r,indent=2)+'\n')
 if a.output_patch:assert not a.output_patch.exists();a.output_patch.write_text(''.join(difflib.unified_diff(before.splitlines(True),after.splitlines(True),fromfile='a/programs/pump-amm/src/lib.rs',tofile='b/programs/pump-amm/src/lib.rs')))
 print(json.dumps({'original_dispatch':hex(r['dispatch']['original']['start']),'bytes':6104,'methods':len(b['after_order']),'all_method_bodies_byte_identical':True,'after_lib_sha256':r['reorder']['after_lib_sha256']}))
if __name__=='__main__':main()
