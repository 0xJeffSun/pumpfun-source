"""Recompute input, source-receipt, ELF-header and path witnesses read-only."""
from pathlib import Path
import hashlib,json,re,struct
from match_helpers import ROOT,REPO,Elf
H=lambda b:hashlib.sha256(b).hexdigest()
FOLDERS={'v143':'repro/pump_fees/compiler-family/v143-build-02','v144':'repro/pump_fees/compiler-family/v144-build-01','v145':'repro/pump_fees/compiler-family/v145-build-01','v146':'repro/pump_fees/compiler-family/v146-build-01','v1461':'repro/identity-audit/2026-10-25/compiler-v1461/v1461-build-01','v152':'repro/mayhem/sell-result-error-main-twentyfour/main','v153':'repro/identity-audit/2026-10-25/mayhem-v153/build-01'}
def header(e):
 table_end=struct.unpack_from('<Q',e.b,40)[0]+struct.unpack_from('<H',e.b,58)[0]*struct.unpack_from('<H',e.b,60)[0]
 return dict(section_table_end=table_end,bytes_after_section_table=len(e.b)-table_end,all_bytes_after_section_table_zero=not any(e.b[table_end:]),bytes=len(e.b),sha256=H(e.b),machine=struct.unpack_from('<H',e.b,18)[0],flags=struct.unpack_from('<I',e.b,48)[0],entry=struct.unpack_from('<Q',e.b,24)[0],text_start=e.lo,text_end=e.hi,section_table_offset=struct.unpack_from('<Q',e.b,40)[0],inferred_function_entries=len(e.entries),sections={n:dict(type=s[1],flags=s[2],address=s[3],offset=s[4],bytes=s[5])for n,s in e.secs.items()})
def analyze():
 external={};binds={};sourcegraphs={}
 def read(name):
  p=REPO/name;b=p.read_bytes();external[name]=H(b);return b
 for version,folder in FOLDERS.items():
  a=json.loads(read(folder+'/build-attempt.json'));c=json.loads(read(folder+'/build-comparison.json'));candidate_name='pump_fees_candidate.so'if version not in ['v152','v153']else'candidate.so'
  b=read(folder+'/'+candidate_name);symbols=read(folder+'/unstripped.so');comparison=c.get('comparison',c)
  assert a['returncode']==0 and a['source_unchanged']
  source=a['source_sha256'];after=a.get('source_after_sha256',source);assert source==after
  normalized={k.removeprefix('work/fees-compat/v143-crate/').removeprefix('programs/mayhem/'):v for k,v in source.items()};graph='frozen_fees16'if version not in ['v152','v153']else'frozen_mayhem24'
  if graph in sourcegraphs:assert sourcegraphs[graph]==normalized
  sourcegraphs[graph]=normalized
  assert H(b)==comparison.get('candidate_sha256',comparison.get('candidate_input_sha256'))
  e=Elf(REPO/folder/candidate_name);u=Elf(REPO/folder/'unstripped.so');assert e.b[e.lo:e.hi]==u.b[u.lo:u.hi]
  binds[version]=dict(folder=folder,graph=graph,source_sha256=normalized,candidate=header(e),unstripped_sha256=H(symbols),selected_toolchain=a.get('selected_toolchain',c.get('selected_toolchain',version)),rustc_sha256=a.get('rustc_sha256',c.get('rustc_sha256')),rustc_version=a.get('rustc_version',c.get('rustc_version')),target_adaptation=a.get('target_adaptation'),source_build_returncode=a['returncode'],source_unchanged=True,receipt_command=a['command'])
 # Bind actual retained graph source bytes as well as saved source receipts.
 for graph,source in sourcegraphs.items():
  base='repro/pump_fees/compiler-family/crate'if graph=='frozen_fees16'else'repro/identity-audit/2026-10-25/mayhem-v153/crate'
  for name,digest in source.items():assert H(read(base+'/'+name))==digest
 target=read('evidence/dependencies/donation_relay/deployed.so');capture=json.loads(read('evidence/dependencies/donation_relay/capture.json'));pd=read('evidence/dependencies/donation_relay/programdata-account.bin');pa=read('evidence/dependencies/donation_relay/program-account.bin');assert pd[45:]==target and H(pd)==capture['programdata_sha256']and H(pa)==capture['program_sha256']and H(target)==capture['payload_sha256']and len(target)==capture['payload_bytes']
 e=Elf(REPO/'evidence/dependencies/donation_relay/deployed.so');paths=[dict(file_offset=m.start(),path=m.group().decode())for m in re.finditer(rb'/home/runner/work/platform-tools/platform-tools/out/rust/library/[A-Za-z0-9_./-]+?\.rs',target)]
 root_paths=[dict(file_offset=m.start(),path=m.group().decode())for m in re.finditer(rb'programs/contracts/src/lib\.rs',target)]
 unicode_source='repro/identity-audit/2026-10-25/mayhem-v153/primary-source/v153-unicode-printable.rs';assert read(unicode_source)==(ROOT/'v153-unicode-printable.rs').read_bytes();read('repro/identity-audit/2026-10-25/mayhem-v153/unicode-data-proof.json')
 for provenance in ['repro/pump_fees/compiler-family/v144-toolchain-provenance.json','repro/pump_fees/compiler-family/v1.45-toolchain-provenance.json','repro/pump_fees/compiler-family/v1.46-toolchain-provenance.json','repro/identity-audit/2026-10-25/compiler-v1461/asset-verification.json','repro/identity-audit/2026-10-25/mayhem-v153/distribution-verification.json']:read(provenance)
 return dict(target=header(e),capture_receipt=capture,payload_follows_programdata_header_bytes=45,rust_library_path_witnesses=paths,application_path_witnesses=root_paths,candidates=binds,graph_source_maps=sourcegraphs,scope='Retained build receipts and actual artifact/source bytes only; current audit performs no builds/distribution download/runtime; cross-graph counts descriptive, no unique historical attribution'),external
if __name__=='__main__':
 b,e=analyze();(ROOT/'input-bindings.json').write_text(json.dumps(b,indent=2)+'\n');(ROOT/'external-inputs.json').write_text(json.dumps(e,indent=2)+'\n');print(json.dumps(dict(target_header={k:b['target'][k]for k in ['machine','flags','bytes','sha256']},graphs={k:len(v)for k,v in b['graph_source_maps'].items()},candidate_inputs=len(b['candidates']),path_witnesses=len(b['rust_library_path_witnesses']))))
