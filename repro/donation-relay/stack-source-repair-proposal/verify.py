#!/usr/bin/env python3
"""Static-only verification; never invokes cargo, rustc, target code or network."""
import argparse,difflib,hashlib,importlib.util,json,re,struct,sys
sys.dont_write_bytecode=True
from pathlib import Path
from derive import derive
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def J(n):return json.loads((P/n).read_text())
def readsource(name):return {p.relative_to(P/name).as_posix():p.read_text() for p in (P/name).rglob('*') if p.is_file()}
def verify(repo=None):
 actual={}
 for p in P.rglob('*'):
  assert not p.is_symlink()
  if p.is_file() and p!=P/'manifest.json':actual[p.relative_to(P).as_posix()]=H(p.read_bytes())
 assert actual==J('manifest.json')['files'],'seal'
 assert H((P/'build02/manifest.json').read_bytes())=='578f7ae0e2a8eba157159c4fbf7d4dc488b32860bd82102d0d85b9db95021326'
 bmap=J('build02/manifest.json')['files']
 for p in (P/'build02').iterdir():
  if p.name!='manifest.json':assert H(p.read_bytes())==bmap[p.name]
 base=readsource('base-source');proposed=readsource('source');assert len(base)==len(proposed)==21
 for n,t in base.items():assert H(t.encode())==bmap['source/'+n]
 assert derive(base)==proposed,'exact source transform'
 delta=J('source-delta.json');assert delta['base']=={n:H(t.encode()) for n,t in base.items()};assert delta['proposal']=={n:H(t.encode()) for n,t in proposed.items()}
 changed=sorted(n for n in base if base[n]!=proposed[n]);assert changed==delta['changed']==['src/admission.rs','src/dispatch.rs']
 patch=''.join(''.join(difflib.unified_diff(base[n].splitlines(True),proposed[n].splitlines(True),fromfile='a/'+n,tofile='b/'+n)) for n in sorted(base) if base[n]!=proposed[n])
 assert patch==(P/'source-repair.patch').read_text()
 assert proposed['src/admission.rs'].count('Box::new(LoadedValue{info:a,value})')==3
 assert 'core::ops::Deref' not in proposed['src/admission.rs']
 assert 'pub type Loaded<T> = Box<LoadedValue<T>>;' in proposed['src/admission.rs']
 assert 'impl<T> LoadedValue<T>' in proposed['src/admission.rs']
 # Every account frame/body/exit/runtime and wire module is byte-identical.
 for n in base:
  if n not in changed:assert base[n]==proposed[n]
 boundary=J('acceptance-boundary.json');assert boundary==dict(proposal_compiled=False,typechecked=False,runtime_cases=0,accepted_handlers=0,source_origin_spoofing=False,new_dependencies=0,compiler_flag_changes=0,inline_attributes_added=0,next_build_authorized=False,required_next_review='Review this exact two-file source delta and allocation/borrow limitations before authorizing one new isolated build; require zero backend stack/overwritten-frame errors, not just exit0.')
 spec=importlib.util.spec_from_file_location('build_analysis',P/'build02/analyze.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
 original=(P/'build02/original.so').read_bytes();oe=module.Elf(original);ce=module.Elf((P/'build02/unstripped.so').read_bytes())
 originalrows=J('build02/original-function-ledger.json');candidaterows=J('build02/candidate-function-ledger.json')
 for row in J('build02/stack-source-correspondence.json'):
  c=candidaterows[row['candidate_index']];o=originalrows[row['original_contract_ordinal']]
  assert ce.function(c['start'],c['bytes'],c['names'])=={k:v for k,v in c.items() if k!='index'}
  assert oe.function(o['start'],o['bytes'],[])=={k:v for k,v in o.items() if k!='ordinal'}
  assert row['diagnostic']['symbol'] in c['names']
  assert row['candidate_min_direct_r10_offset']==min(x['offset'] for x in c['direct_r10_accesses']) < -4096
  assert row['original_min_direct_r10_offset']==min(x['offset'] for x in o['direct_r10_accesses']) >= -4096
 assert J('build02/stack-diagnostics.json')['total']==301
 assert H((P/'n09/manifest.json').read_bytes())=='a44dd8e7b2b706e196995a49f6d43f14a0a9b096e2a0c9553e6419f93c21b655'
 nmap=J('n09/manifest.json')['files'];assert H((P/'n09/dispatch.json').read_bytes())==nmap['inputs/integrated/inputs/dispatch.json']
 # Validate retained discriminator constants, branch displacements, direct calls
 # and complete original wrapper bytes rather than trusting prose/name matching.
 nd=J('n09/dispatch.json');assert len(nd)==11
 for row in nd:
  pc=row['constant_pc'];op,regs,off,lo=struct.unpack_from('<BBhI',original,pc);hi=struct.unpack_from('<I',original,pc+12)[0];assert op==0x18
  assert (lo+(hi<<32)).to_bytes(8,'little').hex()==row['discriminator']
  pc=row['comparison_pc'];raw=original[pc:pc+8];assert raw.hex()==row['raw_comparison'];op,regs,off,imm=struct.unpack('<BBhi',raw);assert off==row['branch_displacement'] and pc+8+8*off==row['branch_target']
  pc=row['dispatch_call_pc'];op,regs,off,imm=struct.unpack_from('<BBhi',original,pc);assert op==0x85 and regs>>4==1 and pc+8+8*imm==row['direct_callee_start']
  assert H(original[row['direct_callee_start']:row['direct_callee_end']])==row['direct_callee_sha256']
  selector='['+', '.join(str(x) for x in bytes.fromhex(row['discriminator']))+']'
  assert selector+'=>wrap_'+row['name']+'(' in proposed['src/dispatch.rs']
  assert proposed['src/dispatch.rs'].count('fn wrap_'+row['name']+'<')==1
 assert sorted(x['wrapper_ordinal'] for x in nd)==list(range(178,189))
 if repo:assert H((repo/'evidence/dependencies/donation_relay/deployed.so').read_bytes())==H(original)
 return dict(verified=True,payload_files=len(actual),base_sources=21,changed_sources=changed,wrappers=11,original_wrapper_anchors=11,failing_functions_bound=6,prior_backend_errors=301,compiled=False,typechecked=False,runtime_cases=0,allocation_provenance='candidate repair, historical layout unknown')
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--repo',type=Path);args=a.parse_args();print(json.dumps(verify(args.repo),sort_keys=True))
