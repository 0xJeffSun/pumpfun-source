#!/usr/bin/env python3
"""Portable static integrity/operand review, never a semantic or runtime proof."""
from pathlib import Path, PurePosixPath
import argparse, difflib, hashlib, json, os, subprocess, sys, tarfile, tempfile
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def check(ok,message):
 if not ok: raise AssertionError(message)
def js(path):return json.loads(path.read_text())
def files(root):
 check(not root.is_symlink(),'symlink root')
 out={}
 for p in root.rglob('*'):
  check(not p.is_symlink(),'symlink member '+str(p))
  if p.is_file():out[p.relative_to(root).as_posix()]=H(p.read_bytes())
 return out
def ordered(text,needles):
 offset=0
 for needle in needles:
  found=text.find(needle,offset);check(found>=0,'ordered source anchor '+needle);offset=found+len(needle)
def unpack(archive,root,expected):
 with tarfile.open(archive) as tar:
  members=tar.getmembers();check(len(members)==len(expected),'archive member count')
  check(len({m.name for m in members})==len(members),'duplicate archive member')
  for m in members:
   path=PurePosixPath(m.name)
   check(m.isfile() and not path.is_absolute() and '..' not in path.parts,'regular safe archive member')
   check(m.name in expected,'unlisted archive member')
   b=tar.extractfile(m).read();check(H(b)==expected[m.name],'archive hash '+m.name)
   target=root.joinpath(*path.parts);target.parent.mkdir(parents=True,exist_ok=True);target.write_bytes(b)
 check(files(root)==expected,'complete extracted archive inventory')
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--repo',type=Path);args=parser.parse_args()
 manifest=js(P/'manifest.json');actual=files(P);actual.pop('manifest.json',None)
 check(actual==manifest['files'],'review inventory/hash seal')
 original=(P/'inputs/original.so').read_bytes()
 check(len(original)==830448 and H(original)=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563','original ELF identity')
 if args.repo:
  check((args.repo.resolve()/'evidence/dependencies/donation_relay/deployed.so').read_bytes()==original,'repository original ELF binding')
 check(js(P/'inputs/integrated-exit.json')['exit_code']==0,'integrated publication finished')
 package_map=js(P/'input-packages.json');results=[]
 with tempfile.TemporaryDirectory(prefix='relay-composition-verify-') as tmp:
  roots={}
  for name,record in package_map.items():
   archive=P/'inputs'/f'{name}.tar.gz';check(H(archive.read_bytes())==record['archive_sha256'],'archive digest '+name)
   check(record['file_count']==len(record['all_file_sha256']),'recorded inventory count')
   root=Path(tmp)/name;root.mkdir();unpack(archive,root,record['all_file_sha256']);roots[name]=root
   check(H((root/record['manifest_file']).read_bytes())==record['manifest_sha256'],'original seal '+name)
   env=dict(os.environ);env['PYTHONDONTWRITEBYTECODE']='1';env.pop('PYTHONPATH',None)
   p=subprocess.run([sys.executable,'-B',str(root/'verify.py')],cwd=tmp,env=env,text=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE)
   check(p.returncode==0,'inherited static verifier '+name+'\n'+p.stdout+p.stderr)
   check(files(root)==record['all_file_sha256'],'inherited verifier changed inventory')
   results.append({'package':name,'returncode':p.returncode,'result':json.loads(p.stdout)})
  for row in js(P/'source-bindings.json'):
   data=(roots[row['package']]/row['path']).read_bytes()
   check(H(data)==row['sha256'] and len(data)==row['size'] and len(data.splitlines())==row['line_count'],'source binding '+row['path'])
  integrated=roots['relay_integrated_source_hypothesis'];distribution=roots['relay_distribution_handlers']
  for spans in js(P/'integrated-source-navigation.json').values():
   for row in spans:
    data=(integrated/row['path']).read_bytes();lo,hi=row['lines']
    check(H(data)==row['file_sha256'] and '\n'.join(data.decode().splitlines()[lo-1:hi])==row['excerpt'],'source navigation')
  old=js(distribution/'interface.json')['shared108'];new=js(P/'proposals/corrected-shared108-interface.json')
  check(old['context'][2]=='authority AccountInfo48' and old['context'][5]=='source AccountInfo48','retained old inversion')
  wanted=dict(old);wanted['context']=list(old['context']);wanted['context'][2]='source token AccountInfo48';wanted['context'][5]='distribution authority AccountInfo48'
  wanted['offsets']=[0,8,16,64,112,160];wanted['status']='Additive correction only; original seal unchanged; integrated source already uses this order.'
  check(new==wanted,'only supported interface corrections')
  old_source=(distribution/'hypothesis.rs').read_text();new_source=(P/'proposals/distribution-wrapper-phase-correction.rs').read_text()
  wanted=old_source.replace('    fn close_distribution_to_relayer(&mut self)->R<()>;\n    fn close_swap_receipt_to_relayer(&mut self)->R<()>;',
   '    // Wrapper119 serialization and302 set_return_data, before exit147/149.\n    fn set_event_return_data(&mut self,event:&Event)->R<()>;\n    // Complete generated exit, including close order and owner/borrow/serialization.\n    fn generated_accounts_exit(&mut self,after_swap:bool)->R<()>;')
  wanted=wanted.replace('    rt.close_distribution_to_relayer()?;\n    if after_swap {rt.close_swap_receipt_to_relayer()?;}',
   '    rt.set_event_return_data(&event)?;\n    rt.generated_accounts_exit(after_swap)?;')
  check(new_source==wanted,'minimal component wrapper correction')
  patch=''.join(difflib.unified_diff(old_source.splitlines(True),new_source.splitlines(True),fromfile='a/relay_distribution_handlers/hypothesis.rs',tofile='b/additive-wrapper-phase-hypothesis.rs'))
  check(patch==(P/'proposals/distribution-wrapper-phase.patch').read_text(),'exact additive patch')
  handlers=(integrated/'source/handlers.rs').read_text();phase=(integrated/'source/phases.rs').read_text();runtime=(integrated/'source/runtime.rs').read_text();lib=(integrated/'source/lib.rs').read_text()
  check('K+16=source, +64=mint, +112=program, +160=authority' in handlers,'integrated correct interface')
  check('transfer_checked(rt,s.program,s.source.account,s.mint.account,recipients[i],s.authority' in handlers,'integrated CPI roles')
  ordered(handlers,['fn distribute_body(', 'burn_then_close(', 'Ok(Event::Processed'])
  ordered(phase,['rt.log_data(&logged)?;', 'rt.invoke_signed(', 'let(_,returned)=event_bytes(event)?;', 'rt.set_return_data(&returned)'])
  check('Err(Error::Incomplete("generated account exit:' in phase,'exit gap retained')
  check('Err(Error::Incomplete("106 mint authority' in runtime,'mint policy gap retained')
  check('Err(Error::Incomplete("generated context admission/init:' in lib,'context gap retained')
  check('target_executed' in js(integrated/'result.json') and not js(integrated/'result.json')['target_executed'],'no runtime acceptance')
 # Complete selected windows, exact local relative calls, operand and literal anchors.
 from derive import derive
 derived=derive();check(derived==js(P/'evidence/operand-ledger.json'),'rederived operand ledger')
 inventory=js(P/'inputs/windows.json');contracts=js(P/'composition-ledger.json')
 check([c['id'] for c in contracts]==[f'C{x:02}' for x in range(1,16)],'fifteen contracts')
 for c in contracts:
  check(c['original_witness_pcs']==[r['pc'] for r in c['raw_witnesses']],'contract witness inventory')
  for row in c['raw_witnesses']:
   lo,hi=row['window_start'],row['window_end'];pc=row['pc']
   check(lo<=pc<hi and original[pc:pc+8].hex()==row['bytes_hex'] and H(original[lo:hi])==row['window_sha256'],'contract raw witness')
 units=js(P/'next-reconstruction-units.json');check([r['id'] for r in units]==[f'N{x:02}' for x in range(1,10)],'nine finite units')
 for row in units:
  check(not row['build_runtime_authorized'],'static-only next unit')
  for w in row['original_windows']:
   wanted=inventory[w['ordinal']]
   check(all(w[k]==wanted[k] for k in ('start','end','sha256')) and H(original[w['start']:w['end']])==w['sha256'],'next unit whole-window binding')
 witness=P/'inputs/shared108-review';wm=js(witness/'manifest-sha256.json');wf=files(witness);wf.pop('manifest-sha256.json');check(wf==wm,'root witness seal')
 for path in witness.glob('*.bin'):
  lo,hi=map(int,path.stem.split('-'));check(path.read_bytes()==original[lo:hi],'root witness original slice')
 historical=js(P/'input-copy-verification.json');check(len(historical)==5 and all(r['returncode']==0 and r['external_copy'] for r in historical),'five saved copy verifications')
 result={'status':'PASS','review_payload_files':len(actual),'original_sha256':H(original),'retained_packages':len(results),'selected_complete_windows':len(derived['windows']),'composition_contracts':len(contracts),'next_reconstruction_units':len(units),'source_built':False,'target_executed':False,'accepted_handler_delta':0,'semantic_equivalence_proved':False,'inherited_static_checks':results}
 print(json.dumps(result,indent=2))
if __name__=='__main__':main()
