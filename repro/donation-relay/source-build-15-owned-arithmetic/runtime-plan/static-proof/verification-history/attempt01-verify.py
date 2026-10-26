"""Portable saved-only Relay15 emitted source/order/inventory review; no compiler/VM."""
from pathlib import Path
import hashlib,json,gzip,importlib.util,struct,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
def tree(D,seal=None):
 h=H(D/'manifest.json');assert h==(D/'manifest.sha256').read_text().split()[0]
 if seal:assert h==seal
 m=J(D/'manifest.json');assert set(m)=={str(p.relative_to(D)) for p in D.rglob('*') if p.is_file() and p not in [D/'manifest.json',D/'manifest.sha256']}
 for p in D.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc' and p.name!='__pycache__'
 for n,h in m.items():assert H(D/n)==h,n

def verify():
 tree(P);B=P/'reviewed-plan';tree(B,'208f8ef9d620b875948af11e00418e815903b53bde6acfa066bccba3a22178e8');z=J(B/'freeze.json');load(B/'source-proof/verify.py','sourceproof').verify()
 source={str(p.relative_to(P/'source')):H(p) for p in(P/'source').rglob('*') if p.is_file()};assert source==z['proposal']==z['source'] and len(source)==23;assert [n for n in source if source[n]!=z['baseline'][n]]==z['changed']
 assert H(P/'static/candidate.so')=='5f6d29410047551f5f4e448937f2de318c2a55546699fbfb33dacd5c89ddaea4';assert H(P/'static/unstripped.so')=='573c172f0a58fd33b1c28e3908d6bfd0066dabffbd8850c045ca0c0acdb4638b'
 assert J(P/'controller-exit.json')['returncode']==J(P/'build-records/build-result.json')['returncode']==0 and not J(P/'backend-diagnostics.json')['failures'];after=J(P/'independent-after-gates.json');assert not after['failed'] and len(after['checks'])==8 and all(r['passed'] for r in after['checks'].values());assert after['checks']['source23']['observed']==source;assert after['checks']['SDK53']['observed']==J(B/'launcher/tool-witness/sdk-files.json');assert after['checks']['full_existing_tool_cache_bytes']['observed']==J(B/'complete-existing-cache-snapshots.json')
 for n,r in after['checks']['tool_bytes']['observed'].items():assert r['sha256']==J(B/'launcher/tool-witness/tool-files.json')[n]['sha256']
 deps={r['name']+'-'+r['version']:r['files'] for r in J(B/'launcher/resolved-source-archive-equality.json')}
 for r in after['checks']['extracted_dependencies']['observed']:assert r['files']==deps[r['package']]
 for ns,m in after['checks']['private_cache_archives']['observed'].items():
  assert len(m)==232
  for n,h in m.items():assert H(B/'launcher/registry/archives'/n)==h
 fp=J(P/'build-records/actual-root-fingerprint.json');old=J(B/'prior-build-plan/accepted-e575-root-fingerprint.json')
 for k in ['rustflags','features','profile','compile_kind','rustc']:assert fp[k]==old[k],k
 launch=J(P/'build-records/build-launch.json');assert launch['source']==source;cmd=launch['command'];assert cmd[cmd.index('--tools-version')+1]=='v1.44' and cmd.count('--locked')==1 and cmd.count('--offline')==2
 runner=J(P/'root-observed/relay25-owned6008-build-runner-exit.json');assert runner['returncode']==0 and runner['actual_terminal_completion_observed'];assert H(P/'root-observed/relay25-owned6008-build.stdout')==runner['stdout_sha256'] and H(P/'root-observed/relay25-owned6008-build.stderr')==runner['stderr_sha256']
 a=load(B/'method/analyze.py','inventory');actual=a.analyze(P/'static')
 for n,v in actual.items():assert v==json.loads(gzip.decompress((P/'static'/n).read_bytes()) if n.endswith('.gz') else (P/'static'/n).read_bytes()),n
 e=a.Elf((P/'static/unstripped.so').read_bytes());ins=lambda pc:struct.unpack('<BBhi',e.at(pc,8))
 def check(pc,expected):assert ins(pc)==tuple(expected),(pc,ins(pc),expected)
 def call(pc,target):
  op,r,off,imm=ins(pc);assert op==133 and pc+8+imm*8==target,(pc,target)
 def branch(pc,target):
  op,r,off,imm=ins(pc);assert op&7==5 and pc+8+off*8==target,(pc,target)
 # Full current generated windows are bound and independently re-rendered.
 d=load(B/'method/disasm.py','disasm')
 for row in J(P/'bounded-function-rows.json'):assert d.render(e,row['start'],row['end'])==(P/'bounded'/f"{row['start']}.asm").read_text()
 # Quotient LOW64 store; all remainder writes precede carry/error join.
 call(45920,422888);check(45936,[121,167,-128,0]);check(46048,[123,114,0,0]);check(45640,[123,147,16,0]);check(45648,[123,131,8,0]);check(45656,[123,83,0,0]);branch(45696,46936);check(46272,[15,113,0,0]);branch(46288,45584)
 # Allocated overflow and pre-sort underflow share constructor; increment has its own error join before store.
 branch(46416,46936);branch(46432,46752);call(46936,8448);check(46896,[7,1,0,1]);branch(46912,46672);branch(46680,47000);call(47000,8448);check(46720,[123,18,0,0]);check(46976,[123,18,0,0]);check(47032,[123,22,0,0])
 # Actual FnOnce constructor alias: name18 before message19 before owned160B; metadata None and6008.
 assert e.at(428487,19)==b'Arithmetic overflow';check(8600,[183,2,0,18]);check(8656,[123,22,8,0]);check(8680,[123,22,0,0]);check(8688,[106,6,16,30575]);call(8840,399528);check(8832,[183,3,0,19]);check(9128,[183,2,0,160]);check(9248,[98,0,152,6008]);check(9192,[122,0,0,2]);check(9256,[114,0,80,2])
 # Sole helper caller: both guards beforeu16, Result error short-circuit before recipient CPI.
 check(57784,[98,9,16,6025]);check(57904,[98,9,16,6030]);check(58064,[103,4,0,1]);check(58224,[105,16,0,0]);check(58232,[107,4,0,0]);check(58240,[7,1,0,36]);check(58248,[7,4,0,2]);call(58304,45008);branch(58352,59824);check(59824,[123,38,24,0]);check(59832,[123,54,16,0]);check(59864,[122,6,0,1]);branch(59872,57920);call(59064,40640)
 # Both compiled incoming application routes propagate the error before success work.
 call(62024,57648);branch(62064,62816);branch(62848,61608);call(221224,57648);branch(221280,222248);branch(221328,224848)
 # Owned branch logging borrows original payload; entrypoint reports before consuming lower.
 call(355232,71376);call(359544,353312);call(359736,355672);check(356704,[97,50,152,0]);check(356736,[99,33,8,0]);check(356936,[97,35,152,0]);check(356968,[99,49,8,0]);check(359952,[123,67,0,0]);check(360008,[123,50,0,0])
 s=J(P/'static/comparison-summary.json');assert s['original_inferred_windows']==492 and s['candidate_symbol_windows']==331 and s['original_normalized_match_windows']==122 and s['original_raw_match_windows']==33 and s['unmatched_original_windows']==370 and not s['whole_file_equal']
 return {'status':'PASS_BOUNDED_STATIC','source_inputs':23,'changed_files':5,'candidate_sha256':H(P/'static/candidate.so'),'actual_controller_child_runner_exits':[0,0,0],'after_gates':8,'owned6008_error_edges':3,'constructor_alias_start':8448,'caller_error_before_recipient_CPI':True,'log_before_consuming_lower':True,'normalized_matches':122,'unmatched_original':370,'runtime_executions':0,'dynamic_owned6008_coverage':0,'original58_59_rejected9d_or_writer_dtor_new_bodies':False}
if __name__=='__main__':print(json.dumps(verify(),indent=2))
