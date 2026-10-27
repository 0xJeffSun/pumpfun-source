#!/usr/bin/env python3
"""Independently verify the retained Sweep research result; never promote layout."""
from pathlib import Path
from functools import lru_cache
import gzip,hashlib,importlib.util,json,tarfile,io
from collections import Counter
P=Path(__file__).resolve().parent;R=P.parents[1]
def require(condition,message):
 if not condition:raise ValueError(message)
def digest(data):return hashlib.sha256(data).hexdigest()
def reader():
 s=importlib.util.spec_from_file_location('fees_window_reader',R/'research/fees-composed-frontier188/window_map.py');w=importlib.util.module_from_spec(s);s.loader.exec_module(w)
 w.m.elf_layout=lru_cache(maxsize=16)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=16)(w.m.relocations);return w

def check_image(w,original,candidate):
 ow,cw=w.windows(original),w.windows(candidate);keys={r['signature']for r in cw};matches=[r for r in ow if r['signature']in keys];gaps=[r['address']for r in ow if r['signature']not in keys]
 require(len(ow)==585 and len(cw)==586,'function boundary count')
 counts=Counter(r['signature']for r in cw);require(all(counts[k]>=n for k,n in Counter(r['signature']for r in matches).items()),'injective matched-signature multiplicity')
 require(len(matches)==583 and gaps==[147944,163920],'583 matches with exactly Crank/Create gaps required')
 target=next(r for r in ow if r['address']==120816);hits=[r for r in cw if r['signature']==target['signature']]
 require(len(hits)==1,'Sweep must match a unique full function signature');body=hits[0]
 require(body['bytes']==6960 and body['instructions']==848,'Sweep size/instructions')
 require(body['name']and'instructions7buyback13sweep_buyback'in body['name'],'Sweep symbol binding')
 maps=[{r['address']:r for r in arr}for arr in [ow,cw]];rels=[dict(w.m.relocations(x))for x in [original,candidate]];calls=0
 for a,b in zip(w.m.instructions(original,120816,6960),w.m.instructions(candidate,body['address'],6960)):
  if'call_target'not in a or rels[0].get(120816+a['offset'],0)&0xffffffff==10:continue
  require(maps[0][a['call_target']]['signature']==maps[1][b['call_target']]['signature'],'Sweep direct target at '+str(a['offset']));calls+=1
 require(calls==37,'Sweep call count')
 return dict(normalized_matches=len(matches),remaining_original=gaps,sweep_bytes=6960,sweep_instructions=848,sweep_direct_target_signatures=calls,raw_matches=sum(r['raw_sha256']in{v['raw_sha256']for v in cw}for r in ow),rodata_equal=w.m.section_data(original,'.rodata')==w.m.section_data(candidate,'.rodata'),whole_elf_equal=original==candidate)

def verify():
 manifest=json.loads((P/'manifest.json').read_text())
 for name,wanted in manifest['files'].items():require(digest((P/name).read_bytes())==wanted,'packet file: '+name)
 for name,wanted in manifest['external_files'].items():require(digest((R/name).read_bytes())==wanted,'external file: '+name)
 original=(R/'evidence/original/pump_fees/deployed.so').read_bytes();w=reader();images=[];stripped=[]
 for label in ['pre-guard-bvd','sweep-confirm-a','sweep-capture']:
  D=P/'builds'/label;result=json.loads((D/'result.json').read_text());launch=json.loads((D/'launch.json').read_text());image=gzip.decompress((D/'symbols.so.gz').read_bytes());cut=gzip.decompress((D/'candidate.so.gz').read_bytes())
  require(result['returncode']==0 and result['source_unchanged']and result['vendor_unchanged'],'stable normal Cargo build: '+label)
  require(result['symbols_sha256']==digest(image)and result['candidate_sha256']==digest(cut),'artifact hashes')
  require(launch['command'][1]=='rustc'and'--locked'in launch['command']and'--offline'in launch['command'],'normal locked offline Cargo')
  check_image(w,original,image)
  require(w.m.section_data(image,'.text')==w.m.section_data(cut,'.text'),'strip text preservation')
  images.append(image);stripped.append(cut)
 require(len({digest(x)for x in images})==len({digest(x)for x in stripped})==1,'repeat full ELF identity')
 with tarfile.open(P/'source.tar.gz')as t:
  source={m.name:t.extractfile(m).read()for m in t.getmembers()if m.isfile()}
 require({n:digest(b)for n,b in source.items()}==json.loads((P/'builds/sweep-confirm-a/launch.json').read_text())['source_inputs'],'retained source archive inputs')
 report=check_image(w,original,images[0]);require(report['raw_matches']==145 and not report['rodata_equal']and not report['whole_elf_equal'],'default layout scope')
 runtime=json.loads(gzip.decompress((P/'runtime/runtime.json.gz').read_bytes()))
 require(runtime['candidate_sha256']==digest(stripped[0])and runtime['original_sha256']==digest(original),'runtime artifact binding')
 require(len(runtime['suites'])==18 and runtime['case_count']==17331 and not runtime['mismatches'],'runtime suite count')
 require(sum(s['case_count']for s in runtime['suites'].values())==17331,'runtime case total')
 for name,suite in runtime['suites'].items():
  require(not suite.get('mismatches',suite.get('failures',[])),'runtime mismatches: '+name)
  require(suite['original_sha256']==digest(original)and suite['candidate_sha256']==digest(stripped[0]),'runtime suite hashes')
 report.update(runtime_cases=17331,runtime_suites=18,accepted_layout_promoted=False)
 return report
if __name__=='__main__':print(json.dumps(verify(),indent=2))
