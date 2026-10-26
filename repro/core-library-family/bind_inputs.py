"""Rehash retained build graph, artifacts, source and captures; no tool calls."""
import hashlib,json,struct
from match_helpers import ROOT,REPO,Elf
H=lambda b:hashlib.sha256(b).hexdigest()
FOLDERS={'v143':'repro/pump_fees/compiler-family/v143-build-02','v144':'repro/pump_fees/compiler-family/v144-build-01','v145':'repro/pump_fees/compiler-family/v145-build-01','v146':'repro/pump_fees/compiler-family/v146-build-01','v1461':'repro/identity-audit/2026-10-25/compiler-v1461/v1461-build-01'}
def header(e):
 end=struct.unpack_from('<Q',e.b,40)[0]+struct.unpack_from('<H',e.b,58)[0]*struct.unpack_from('<H',e.b,60)[0]
 return dict(bytes=len(e.b),sha256=H(e.b),machine=struct.unpack_from('<H',e.b,18)[0],flags=struct.unpack_from('<I',e.b,48)[0],section_table_end=end,trailing_bytes=len(e.b)-end,trailing_all_zero=not any(e.b[end:]),text_start=e.lo,text_end=e.hi,inferred_entries=len(e.entries))
def analyze():
 external={};builds={};graph=None
 def read(name):
  b=(REPO/name).read_bytes();external[name]=H(b);return b
 for v,folder in FOLDERS.items():
  a=json.loads(read(folder+'/build-attempt.json'));c=json.loads(read(folder+'/build-comparison.json'));assert a['returncode']==0 and a['source_unchanged'];assert a['source_sha256']==a.get('source_after_sha256',a['source_sha256'])
  source={k.removeprefix('work/fees-compat/v143-crate/'):d for k,d in a['source_sha256'].items()}
  if graph is None:graph=source
  else:assert graph==source
  b=read(folder+'/pump_fees_candidate.so');sym=read(folder+'/unstripped.so');comp=c.get('comparison',c);assert H(b)==comp.get('candidate_sha256',comp.get('candidate_input_sha256'))
  E=Elf(REPO/folder/'pump_fees_candidate.so');S=Elf(REPO/folder/'unstripped.so');assert E.b[E.lo:E.hi]==S.b[S.lo:S.hi]
  builds[v]=dict(folder=folder,build_returncode=0,source_unchanged=True,source_sha256=source,command=a['command'],environment=a.get('environment'),selected_toolchain=a.get('selected_toolchain',c.get('selected_toolchain',v)),rustc_sha256=a.get('rustc_sha256',c.get('rustc_sha256')),rustc_version=a.get('rustc_version',c.get('rustc_version')),target_adaptation=a.get('target_adaptation'),candidate=header(E),symbol_source_sha256=H(sym))
 for name,digest in graph.items():assert H(read('repro/pump_fees/compiler-family/crate/'+name))==digest
 targets={}
 for n in ['pump','pump_amm']:
  folder='evidence/original/'+n;cap=json.loads(read(folder+'/capture.json'));b=read(folder+'/deployed.so');pd=read(folder+'/programdata-account.bin');pa=read(folder+'/program-account.bin');assert pd[45:]==b and H(b)==cap['payload_sha256']and len(b)==cap['payload_bytes']and H(pd)==cap['programdata_sha256']and H(pa)==cap['program_sha256'];targets[n]=dict(header=header(Elf(REPO/folder/'deployed.so')),capture=cap,payload_after_loader_header=45)
 provenance=['repro/pump_fees/compiler-family/v144-toolchain-provenance.json','repro/pump_fees/compiler-family/v1.45-toolchain-provenance.json','repro/pump_fees/compiler-family/v1.46-toolchain-provenance.json','repro/identity-audit/2026-10-25/compiler-v1461/asset-verification.json','repro/identity-audit/2026-10-25/compiler-v1461/old-target-setup.json','repro/identity-audit/2026-10-25/compiler-v1461/REPORT.md','repro/identity-audit/2026-10-25/relay-compiler/match_helpers.py','repro/identity-audit/2026-10-25/relay-compiler/manifest.json','repro/compiler-fingerprints/analysis.json','repro/pump_fees/compiler-family/artifact-hashes.json']
 for f in provenance:read(f)
 prior=json.loads((REPO/'repro/compiler-fingerprints/analysis.json').read_text());assert H((ROOT/'v144-cached-unicode-printable.rs').read_bytes())==prior['toolchains']['v1.43']['files']['library/core/src/unicode/printable.rs']
 assert (ROOT/'reference-relay-matcher.py').read_bytes()==(REPO/'repro/identity-audit/2026-10-25/relay-compiler/match_helpers.py').read_bytes()
 return dict(targets=targets,builds=builds,frozen_fees16_graph=graph,provenance_receipt_paths=provenance,unicode_source=dict(copied_cached_path='/Users/shawwalters/.cache/solana/v1.44/platform-tools/rust/lib/rustlib/src/rust/library/core/src/unicode/printable.rs',sha256=H((ROOT/'v144-cached-unicode-printable.rs').read_bytes()),same_source_as_prior_v143_hash=True,fresh_distribution_authentication=False),scope='Existing frozen Fees16 output artifacts compared directly to two captured core targets; no new builds, distributions or execution'),external
