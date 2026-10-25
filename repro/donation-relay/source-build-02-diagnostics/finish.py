from pathlib import Path
import gzip,hashlib,json,tarfile,io
P=Path(__file__).resolve().parent;R=P.parents[1]
H=lambda b:hashlib.sha256(b).hexdigest()
def J(name,v):(P/name).write_text(json.dumps(v,indent=2,sort_keys=True)+'\n')
def arc(src,name):
 with (P/name).open('wb') as f:
  with gzip.GzipFile(fileobj=f,mode='wb',mtime=0,filename='') as g:
   with tarfile.open(fileobj=g,mode='w') as t:
    for p in sorted(src.rglob('*')):
     if p.is_file():
      assert not p.is_symlink();b=p.read_bytes();i=tarfile.TarInfo(p.relative_to(src).as_posix());i.size=len(b);i.mode=0o644;i.mtime=0;t.addfile(i,io.BytesIO(b))
arc(R/'work/relay-runtime-build-preflight/handoff','prior/preflight.tar.gz')
arc(R/'work/relay-first-build-launcher-correction','prior/launcher-correction.tar.gz')
of=json.loads((P/'original-function-ledger.json').read_text());cf=json.loads((P/'candidate-function-ledger.json').read_text());diag=json.loads((P/'stack-diagnostics.json').read_text())
rows=[]
for d,n in zip(diag['by_function'],[169,142,146,148,150,154]):
 c=next(f for f in cf if d['symbol'] in f['names']);o=of[n]
 rows.append(dict(diagnostic=d,source='src/dispatch.rs' if n==169 else 'src/admission.rs',candidate_index=c['index'],candidate_start=c['start'],candidate_end=c['end'],candidate_raw_sha256=c['raw_sha256'],candidate_min_direct_r10_offset=min(x['offset'] for x in c['direct_r10_accesses']),original_contract_ordinal=n,original_start=o['start'],original_end=o['end'],original_sha256=o['raw_sha256'],original_min_direct_r10_offset=min(x['offset'] for x in o['direct_r10_accesses']),correspondence='application-role correspondence, NOT a complete-body or historical source identity'))
J('stack-source-correspondence.json',rows)
J('build-assessment.json',dict(command_returncode=0,emitted_ELF=True,clean_build=False,execution_suitable=False,blocking_backend_diagnostics=301,affected_functions=6,maximum_reported_frame=7552,runtime_cases=0,compile_phase='pinned platform-tools v1.44',strip_phase='recorded SDK default platform-tools v1.52',complete_child_invocation_trace=False,source_inputs=21,original_recipe_recovered=False,source_changes_since_preflight=0,dependencies_changed=0,flags_changed=0,first_failure_retained='prior/launcher-correction.tar.gz',proposed_next_step='Review separate grounded source repair; no retry authorized by this record'))
