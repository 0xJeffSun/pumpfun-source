#!/usr/bin/env python3
"""Verify the qualified Sweep checkpoint and every original-relative reference."""
from pathlib import Path
from functools import lru_cache
import gzip,hashlib,importlib.util,json,tarfile
P=Path(__file__).resolve().parent;R=P.parents[1]
def require(ok,message):
 if not ok:raise ValueError(message)
def sha(b):return hashlib.sha256(b).hexdigest()
def module(name,path):
 s=importlib.util.spec_from_file_location(name,path);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def decoder():
 w=module('sweep_windows',R/'research/fees-composed-frontier188/window_map.py');w.m.elf_layout=lru_cache(maxsize=16)(w.m.elf_layout);w.m.relocations=lru_cache(maxsize=16)(w.m.relocations);return w
def compare(original,parent,candidate):
 m=module('sweep_reference_comparison',P/'comparison.py');m.w=decoder();return m.check(original,parent,candidate)
def source_records(w,image):
 sections={s['name']:s for s in w.m.elf_layout(image)['sections']};data=sections['.data.rel.ro'];rodata=sections['.rodata'];rows=[]
 for at,kind in w.m.relocations(image):
  if kind&0xffffffff!=8 or not data['address']<=at<data['address']+data['size']-23:continue
  ptr=int.from_bytes(w.m.at_address(image,at,8),'little')>>32;length=int.from_bytes(w.m.at_address(image,at+8,8),'little')
  if 0<length<1024 and rodata['address']<=ptr and ptr+length<=rodata['address']+rodata['size']:
   name=w.m.at_address(image,ptr,length)
   if name.endswith(b'.rs'):rows.append((at-data['address'],name,w.m.at_address(image,at+16,8)))
 return rows
def verify():
 manifest=json.loads((P/'manifest.json').read_text())
 for name,wanted in manifest['files'].items():require(sha((P/name).read_bytes())==wanted,'packet hash: '+name)
 for name,wanted in manifest['external_files'].items():require(sha((R/name).read_bytes())==wanted,'external hash: '+name)
 original=(R/'evidence/original/pump_fees/deployed.so').read_bytes();parent=gzip.decompress((R/'research/fees-extend-integration/builds/candidate/symbols.so.gz').read_bytes())
 require(sha(parent)=='ca9e6a933d1406743689f7bad609ce6b5e95ea91c064e0233cbd4db100afb335','accepted parent artifact')
 with tarfile.open(P/'source.tar.gz')as t:source={m.name:t.extractfile(m).read()for m in t.getmembers()if m.isfile()}
 with tarfile.open(P/'macro-vendor.tar.gz')as t:vendor={m.name:t.extractfile(m).read()for m in t.getmembers()if m.isfile()}
 source_hashes={n:sha(b)for n,b in source.items()};vendor_hashes={n:sha(b)for n,b in vendor.items()};images=[];cuts=[];w=decoder();report=None
 for role in ['candidate','repeat']:
  D=P/'builds'/role;result=json.loads((D/'result.json').read_text());launch=json.loads((D/'launch.json').read_text());image=gzip.decompress((D/'symbols.so.gz').read_bytes());cut=gzip.decompress((D/'candidate.so.gz').read_bytes())
  require(result['returncode']==0 and result['source_unchanged']and result['vendor_unchanged'],'stable native Cargo build: '+role)
  require(sha(image)==result['symbols_sha256']and sha(cut)==result['candidate_sha256'],'build artifacts')
  require(launch['source_inputs']==source_hashes and launch['vendor_inputs']==vendor_hashes,'retained compiler inputs')
  require(launch['command'][1]=='rustc'and'--locked'in launch['command']and'--offline'in launch['command'],'normal locked offline Cargo')
  require(len(source_records(w,original))==105 and source_records(w,original)==source_records(w,image),'105 Source records')
  report=compare(original,parent,image);require(report==json.loads((P/'comparison.json').read_text()),'independent reference audit')
  for section in ['.text','.rodata','.data.rel.ro','.rel.dyn','.dynsym','.dynstr']:require(w.m.section_data(image,section)==w.m.section_data(cut,section),'strip preservation '+section)
  require(image!=original and cut!=original,'whole ELF equality remains false');images.append(image);cuts.append(cut)
 require(images[0]==images[1]and cuts[0]==cuts[1],'complete repeat artifacts')
 link=json.loads((P/'layout/ordered-link.json').read_text());require(link['ordered_script_sha256']==sha((P/'layout/rebound.ld').read_bytes()),'linker script binding')
 runtime=json.loads(gzip.decompress((P/'runtime/runtime.json.gz').read_bytes()));require(runtime['case_count']==17331 and len(runtime['suites'])==18 and not runtime['mismatches'],'runtime suite totals')
 require(runtime['candidate_sha256']==sha(cuts[0])and runtime['original_sha256']==sha(original),'runtime hashes');require(sum(s['case_count']for s in runtime['suites'].values())==17331,'runtime case sum')
 execution=json.loads((P/'runtime/runtime-execution.json').read_text());require(execution['candidate_sha256']==sha(cuts[0]),'runtime execution artifact')
 for name,s in runtime['suites'].items():
  require(s['candidate_sha256']==sha(cuts[0])and s['original_sha256']==sha(original),'suite binary bindings: '+name);require(not s.get('mismatches',s.get('failures',[])),'suite result: '+name);require(execution['suites'][name]['exit_code']==0,'suite execution: '+name)
 report.update(runtime_cases=17331,runtime_suites=18);return report
if __name__=='__main__':print(json.dumps(verify(),indent=2))
