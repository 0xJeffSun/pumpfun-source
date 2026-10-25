"""Relay15 saved/current canonical source bridge; no VM/compiler/network."""
from pathlib import Path
import argparse,json,hashlib,importlib.util,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def safe(path,root):
 root=root.absolute();path=path.absolute();path.relative_to(root)
 for p in[path,*path.parents]:
  if p==root.parent:break
  assert not p.is_symlink(),p
 return path
def tree(D,seal):
 assert not D.is_symlink();assert H(D/'manifest.json')==seal==(D/'manifest.sha256').read_text().split()[0];m=J(D/'manifest.json');assert set(m)=={str(p.relative_to(D))for p in D.rglob('*')if p.is_file()and p not in[D/'manifest.json',D/'manifest.sha256']}
 for p in D.rglob('*'):assert not p.is_symlink()and p.suffix!='.pyc';assert not p.is_file()or p.stat().st_size<100*1024*1024
 for n,h in m.items():assert H(D/n)==h

def check_saved(E):
 b=J(P/'bindings.json');tree(E,b['checkpoint_seal']);result=load(E/'verify.py','relay15_deep').verify();assert result['candidate_sha256']==b['candidate'];assert H(E/'runtime-plan/static-proof/static/unstripped.so')==b['symbols'];assert J(E/'runtime-plan/static-proof/reviewed-plan/freeze.json')['source']==J(P/'source-map.json')==b['source23'];return result

def check_current(R):
 R=R.absolute();b=J(P/'bindings.json');assert P==safe(R/b['selection'],R),'selection must be exact lexical canonical root path';E=safe(R/b['checkpoint'],R);assert(R/'repro/donation-relay/current.json').read_bytes()==(P/'current.proposed.json').read_bytes();assert(R/'repro/donation-relay/README.md').read_bytes()==(P/'README.proposed.md').read_bytes();c=J(P/'current.proposed.json')
 for k,n in {'candidate_artifact':b['checkpoint']+'/run/candidate.so','source_snapshot':b['checkpoint']+'/runtime-plan/static-proof/source','source_manifest':b['selection']+'/source-map.json','evidence_manifest':b['checkpoint']+'/manifest.json'}.items():assert c[k]==n;safe(R/n,R)
 assert c['candidate_sha256']==b['candidate']and c['symbols_sha256']==b['symbols']and c['evidence_manifest_sha256']==b['checkpoint_seal']and c['full_original_byte_equality']is False and c['canonical_main_build_performed']is False
 result=check_saved(E);s=result['structure']
 for k,v in {'validated_ordinary_cases':'cases','verified_transaction_submissions':'transaction_submissions','verified_unique_transactions':'unique_transactions','verified_signature_fields':'encoded_signature_fields_checked','verified_unique_signatures':'unique_transaction_signatures','verified_effect_sets':'effects_checked'}.items():assert c[k]==s[v]
 for k in ['new_borrow_failure_coverage','new_owned6008_dynamic_coverage','weight_materialization_dynamic_coverage','leftover_sort_guard_dynamic_coverage']:assert c[k]==0
 C=safe(R/b['canonical_source_root'],R);assert not any(p.is_symlink()for p in C.rglob('*'));scanner=load(R/'scripts/build_source_manifest.py','scanner');actual=scanner.source_manifest(C,C,R);assert actual=={b['canonical_source_root']+'/'+n:h for n,h in b['source23'].items()};assert(C/'README.md').read_bytes()==(P/'canonical-README.proposed.md').read_bytes();result['actual_canonical23_checked']=True;result['current_root_checked']=True;return result
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--expected-seal',required=True);g=a.add_mutually_exclusive_group(required=True);g.add_argument('--checkpoint',type=Path);g.add_argument('--current-root',type=Path);x=a.parse_args();tree(P,x.expected_seal);print(json.dumps(check_saved(x.checkpoint.absolute())if x.checkpoint else check_current(x.current_root.absolute()),indent=2))
