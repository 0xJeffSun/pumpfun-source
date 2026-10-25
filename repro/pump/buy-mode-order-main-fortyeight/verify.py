#!/usr/bin/env python3
"""Standard-library-only main/scratch identity verifier; no build, VM, signing or network."""
from pathlib import Path
import argparse,gzip,hashlib,json,re
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def raw(n):
 p=P/n;assert p.is_file()and not p.is_symlink(),n;return p.read_bytes()
def obj(n):return json.loads(raw(n))
def verify(current=None):
 manifest=obj('manifest.json');assert H(raw('manifest.json'))==raw('manifest.sha256').decode().split()[0]
 actual={p.relative_to(P).as_posix()for p in P.rglob('*')if p.is_file()and p not in [P/'manifest.json',P/'manifest.sha256']};assert actual==set(manifest)
 for n,v in manifest.items():assert H(raw(n))==v['sha256']and len(raw(n))==v['bytes'],n
 subset=obj('scratch-subset.json');sealed=obj('scratch/manifest.json');assert H(raw('scratch/manifest.json'))==subset['manifest_sha256']==raw('scratch/manifest.sha256').decode().split()[0]
 assert subset['manifest_sha256']=='84849c316aa1e9c0bb8ae05050480cd641fdd9546e69cf875085f29645bbd3a0'
 for n,h in subset['included_files'].items():assert H(raw('scratch/'+n))==h==sealed[n]['sha256'],n
 source=obj('main/controls/source-proposed.json');before=obj('main/controls/source-before.json');assert len(source)==len(before)==37
 assert {n for n in source if source[n]!=before[n]}=={'programs/pump/src/trade.rs'}
 assert source==obj('scratch/source-sha256.json')and before==obj('scratch/baseline-source-sha256.json')
 prefix='work/pump-buy-mode-order-build/source/';scratch_actual=obj('scratch/actual-source-sha256.json');assert all(n.startswith(prefix)for n in scratch_actual)
 assert {n[len(prefix):]:h for n,h in scratch_actual.items()}==source
 for n,h in source.items():assert H(raw('main/source/'+n))==h,n
 report=obj('main/build-comparison.json');attempt=obj('main/build-attempt.json');identity=obj('main/controls/identity.json')
 assert report['source_sha256']==attempt['source_sha256']==attempt['source_after_sha256']==source
 assert attempt['source_unchanged']and attempt['returncode']==obj('main/controls/build-exit.json')['returncode']==obj('main/controls/runner-exit.json')['returncode']==0
 assert H(raw('main/build.log'))==report['build_log_sha256']==attempt['build_log_sha256']
 assert not any(re.search(r'(stack offset .*exceed|stack frame .*exceed|stack.*exceeded|LLVM ERROR|Cannot select:)',l,re.I)for l in raw('main/build.log').decode().splitlines())
 for n in ['candidate.so','unstripped.so']:assert raw('main/'+n)==raw('scratch/'+n),n
 assert H(raw('main/candidate.so'))==report['comparison']['candidate_sha256']==identity['candidate_sha256']=='bc6775052d8d335907d2a797113a4bb8e0008f07fa9d69c7597984fda9887314'
 assert H(raw('main/unstripped.so'))==identity['symbols_sha256']=='b029fb7c5f3621c54bd5ad3a8c203ba73dbed8f152728a45d9be583025aac9ee'
 assert identity['whole_candidate_equal']and identity['whole_symbols_equal']and identity['source']==source and identity['all_before_after_gates_equal']
 assert not report['comparison']['full_byte_equality']
 assert identity['README_sha256_unchanged']==H(raw('scratch/README.before.md'))
 assert raw('main/README.final.md')==raw('scratch/README.proposed.md')
 gate=obj('main/controls/gate-before.json');assert gate==obj('main/controls/gate-after.json')
 assert gate['dependency_files']==14281 and gate['registry_packages']==252 and gate['dependency_inventory_sha256']==H(raw('scratch/baseline-dependency-provenance.json.gz'))
 dependencies=json.loads(gzip.decompress(raw('scratch/baseline-dependency-provenance.json.gz')));assert len(dependencies['packages'])==252
 assert gate['tools']=={n:v['sha256']for n,v in obj('scratch/tools-observed.json')['files'].items()}
 assert gate['sdk']==obj('scratch/sdk-source-sha256.json')==report['sdk_source_sha256']
 assert gate['helpers']==obj('scratch/build-helper-sha256.json')
 for n,h in gate['helpers'].items():assert H(raw('main/build-helpers/'+n))==h,n
 for n,h in gate['sdk'].items():assert H(raw('main/sdk-source/'+n))==h,n
 assert report['selected_toolchain']=='v1.44'and report['rustc_sha256']==gate['tools']['rust/bin/rustc']
 phases=obj('scratch/toolchain-phases.json');assert phases['strip']['actual_distribution']=='v1.52'and phases['compile']['selected_version']=='v1.44'
 assert all(x['returncode']==0 for x in obj('scratch/root-runtime-exits.json'))
 bindings=obj('scratch/receipt-bindings.json');assert len(bindings)==68
 totals={'differential':0,'surfpool':0}
 for row in bindings:
  assert row['actual_source_sha256']==scratch_actual and row['candidate_sha256']==identity['candidate_sha256']
  assert row['build_report_sha256']==sealed['build/build-comparison.json']['sha256'] and row['sha256']==sealed[row['path']]['sha256']
  totals[row['kind']]+=row['cases']
 assert totals=={'differential':9269,'surfpool':1024}
 assert not obj('scratch/coverage-review.json')['targeted_double_flag_coverage_established']
 assert all(row['complete_and_cashback_cases']==0 for row in obj('scratch/coverage-review.json')['surfpool_fixture_inspection'])
 assert all(row['explicit_double_flag_cases']==0 for row in obj('scratch/coverage-review.json')['differential_case_inspection'])
 if current:
  current=Path(current)
  for n,h in source.items():assert H((current/n).read_bytes())==h,n
  assert (current/'programs/pump/README.md').read_bytes()==raw('main/README.final.md')
 return {'status':'PASS','source_inputs':37,'whole_candidate_equal':True,'whole_symbols_equal':True,'candidate_sha256':identity['candidate_sha256'],'scratch_manifest_sha256':subset['manifest_sha256'],'build_returncode':0,'receipt_bindings':68,'case_counts':totals,'saved_receipts_referenced_not_reexecuted':True,'current_main_checked':bool(current),'whole_original_equal':False,'new_builds':0,'new_runtime_executions':0}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--current-main',type=Path);a=p.parse_args();print(json.dumps(verify(a.current_main),indent=2))
