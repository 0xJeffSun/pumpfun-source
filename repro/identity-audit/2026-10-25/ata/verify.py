"""Read-only ATA recipe contradiction verification; no VM or ELF rewriting."""
import hashlib,json,re,struct
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=next(p for p in HERE.parents if (p/'repro/programs.json').is_file())
sha=lambda b:hashlib.sha256(b).hexdigest()
read=lambda p:json.loads(p.read_text())
if (HERE/'manifest.json').exists():
 for name,digest in read(HERE/'manifest.json').items():
  assert sha((HERE/name).read_bytes())==digest,name
for name,digest in read(HERE/'retained-files.json').items():
 assert sha((ROOT/name).read_bytes())==digest,name
installer=(HERE/'official/solana-1.10.33-install.sh').read_text()
assert re.search(r'# Install Rust-BPF\s+version=v1\.27\s',installer)
assert 'solana-bpf-tools-$machine.tar.bz2' in installer
assert read(HERE/'official/solana-tag.json')['object']['sha']=='fcb85858485170219eb80887837afd08940f816d'
versions=read(ROOT/'repro/pump/ata-candidate-build-2/tool-versions.json')
assert '/v1.27/bpf-tools/' in versions['selected_rustc_resolved']
log=(ROOT/'repro/pump/ata-candidate-build-2/build.log').read_text()
assert 'BPF SDK: /root/.local/share/solana/install/releases/1.10.33/' in log
original=(ROOT/'evidence/dependencies/associated_token/deployed.so').read_bytes()
candidate=(ROOT/'repro/pump/ata-candidate-build-2/spl_associated_token_account.so').read_bytes()
assert len(original)==len(candidate)==105032
assert sum(a!=b for a,b in zip(original,candidate))==307
assessment=read(HERE/'assessment.json')
assert sha(original)==assessment['original_sha256'] and sha(candidate)==assessment['candidate_sha256']
assert len(assessment['differing_windows'])==6
fresh_compiler_file_verified=False
asset=HERE/'asset-assessment.json'
if asset.exists():
 proof=read(asset)
 assert sha((HERE/'official/solana-1.10.33-install.sh').read_bytes())==proof['installer_sha256']
 assert sha((HERE/'official/version.md').read_bytes())==proof['version_md_sha256']
 released=next(a for a in read(HERE/'official/bpf-tools-v1.27-release.json')['assets'] if a['name']=='solana-bpf-tools-linux.tar.bz2')
 assert released['id']==proof['release_api_asset_id'] and released['size']==proof['asset_bytes']
 assert proof['downloaded_rustc_sha256']==versions['selected_rustc_sha256']
 rustc=HERE/'official/extracted/rust/bin/rustc'
 if rustc.exists():
  assert sha(rustc.read_bytes())==proof['downloaded_rustc_sha256']
  fresh_compiler_file_verified=True
print(json.dumps({'verified':True,'ata_differing_positions':307,'affected_windows':6,'candidate_and_solana1_10_33_select_same_tools':'v1.27','fresh_downloaded_compiler_file_rehashed':fresh_compiler_file_verified,'new_source_build':False,'whole_byte_identity':False}))
