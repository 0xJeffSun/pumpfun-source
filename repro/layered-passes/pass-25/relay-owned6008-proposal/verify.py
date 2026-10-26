"""Portable source/diff/original-contract verification; no compiler/VM."""
from pathlib import Path
import argparse,json,hashlib,difflib,importlib.util,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest();J=lambda p:json.loads(p.read_text())
def load(p,n):
 s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def verify(baseline=None):
 baseline=baseline or P/'baseline-static-evidence'
 assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0];m=J(P/'manifest.json');assert set(m)=={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and p not in[P/'manifest.json',P/'manifest.sha256']}
 for p in P.rglob('*'):assert not p.is_symlink() and p.suffix!='.pyc' and p.name!='__pycache__'
 for n,h in m.items():assert H(P/n)==h,n
 maps=J(P/'source-map.json');assert len(maps['baseline'])==len(maps['proposal'])==23;assert maps['baseline']==J(P/'baseline-compiled-source-map.json');assert H(P/'baseline-static-manifest.json')=='1cc88b000128fc0d7f8df881f660fb2cb6a93f1a038d9dbc915ce63a49e2f552';assert H(P/'baseline-runtime-manifest.json')=='aaa7ed079226d2c444474432acfebca3d69590e6c88d3cdec429cedc63387b58'
 for folder,key in [('baseline-source','baseline'),('proposal','proposal')]:
  actual={str(p.relative_to(P/folder)):H(p) for p in(P/folder).rglob('*') if p.is_file()};assert actual==maps[key]
 changed=[n for n in maps['baseline'] if maps['baseline'][n]!=maps['proposal'][n]];assert changed==maps['changed']==['src/arithmetic.rs','src/error_report.rs','src/exit_error.rs','src/handlers.rs','src/lib.rs']
 patch=''.join(''.join(difflib.unified_diff((P/'baseline-source'/n).read_text().splitlines(True),(P/'proposal'/n).read_text().splitlines(True),fromfile='a/'+n,tofile='b/'+n)) for n in changed);assert patch==(P/'source.patch').read_text()
 assert H(P/'owned-proof/manifest.json')=='160b1ca404bb59b81c67dfc2e8b233e9d1cb8a5d1cd3b2b2631c3ff76e15e06e';load(P/'owned-proof/verify.py','owned_original_proof').verify();assert H(P/'caller-arithmetic-proof/manifest.json')=='bd28e8d55346a52c7ecb32eb749a97f5f053a0738146ff8d631fc216a470ee53';load(P/'caller-arithmetic-proof/verify.py','caller_original_proof').verify()
 math=(P/'proposal/src/arithmetic.rs').read_text();assert '->Result<Vec<u64>,OwnedError>'in math;assert '(product/10000) as u64'in math;assert math.count('ok_or_else(exit_error::arithmetic_overflow)?')==3;assert math.index('amounts.push(q)')<math.index('remainders.push')<math.index('allocated.checked_add(q)');assert math.index('total.checked_sub(allocated)')<math.index('if left!=0')<math.index('remainders.sort_by');assert 'amounts[i]=amounts[i].checked_add(1)'in math;assert 'Ok(amounts)'in math
 factory=(P/'proposal/src/exit_error.rs').read_text();old=(P/'baseline-source/src/exit_error.rs').read_text();assert factory.startswith(old);extra=factory[len(old):];assert 'enum ArithmeticErrorCode { ArithmeticOverflow }'in extra and '"ArithmeticOverflow".to_owned()'in extra and 'f.write_str("Arithmetic overflow")'in extra;assert extra.index('error_name: code.name()')<extra.index('error_msg: code.to_string()')<extra.index('error_origin: None');assert 'error_code_number: 6008'in extra and 'compared_values: None'in extra and extra.endswith('}.into()\n}\n');assert all(x not in extra for x in ['with_source','file!','line!','repr(','unsafe','Box::new'])
 lib=(P/'proposal/src/lib.rs').read_text();assert 'Owned(generated_exit::exit_error::Error)'in lib and 'pub fn overflow()->Error {Error::Code(6008)}'in lib
 handler=(P/'proposal/src/handlers.rs').read_text();assert handler==(P/'baseline-source/src/handlers.rs').read_text().replace('fair_amounts(total,&shares.iter().map(|share|share.bps).collect::<Vec<_>>());','fair_amounts(total,&shares.iter().map(|share|share.bps).collect::<Vec<_>>()).map_err(Error::Owned)?;')
 report=(P/'proposal/src/error_report.rs').read_text();assert report==(P/'baseline-source/src/error_report.rs').read_text().replace('Error::Code(code)=>framework(*code,None,None,None),','Error::Code(code)=>framework(*code,None,None,None),\n        Error::Owned(error)=>error.log(),').replace('Error::Code(code)=>ProgramError::Custom(code),','Error::Code(code)=>ProgramError::Custom(code),\n            Error::Owned(error)=>error.into(),')
 # Unchanged loader/dispatch retain borrowed reporting before consuming lower.
 entry=(P/'proposal/src/entrypoint.rs').read_text();dispatch=(P/'proposal/src/dispatch.rs').read_text();assert '.map_err(crate::error_report::lower)'in entry and 'if let Err(error)=&result'in dispatch and 'rt.report_error(error)'in dispatch
 if baseline:
  assert H(baseline/'manifest.json')=='1cc88b000128fc0d7f8df881f660fb2cb6a93f1a038d9dbc915ce63a49e2f552'
  for n,h in maps['baseline'].items():assert H(baseline/'source'/n)==h,n
  load(baseline/'verify.py','baseline_saved_static').verify()
 return {'status':'PASS_UNEXECUTED_SOURCE_PROPOSAL','baseline_candidate':maps['baseline_candidate_sha256'],'source_inputs':23,'changed':changed,'owned_error_number':6008,'restored_numeric_error_sites':3,'out_of_domain_dynamic_coverage':0,'indirect_writer_bodies_expanded':False,'unique_historical_enum_claimed':False,'compiler_or_VM_runs':0,'baseline_compiled_source_checked':bool(baseline)}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--baseline',type=Path);x=a.parse_args();print(json.dumps(verify(x.baseline),indent=2))
