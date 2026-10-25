"""Verify the single pinned hosted build's source, image, tool and comparison receipts."""
from pathlib import Path
import hashlib,json,sys
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def read(p):return json.loads(p.read_text())
def verify(folder):
    expected=read(P/'expected-source-inputs.json');patch=folder/'source.patch'
    report=read(folder/'comparison.json');actual=read(folder/'source-manifest.json');upstream=read(folder/'upstream-source-manifest.json')
    assert report['source_commit']==expected['upstream_commit']=='17e99434af5ead3e989c08f32af33609821d0bc0'
    assert report['source_repository']=='https://github.com/metaplex-foundation/mpl-token-metadata'
    assert report['image']=='solanafoundation/solana-verifiable-build@sha256:43206149a565ec35da95b1a909f4714f5d5f0d8241c31df24189e517acd18467'
    assert report['platform']=='linux/amd64' and report['active_host_toolchain']=='1.69.0-x86_64-unknown-linux-gnu'
    assert H(folder/'source-manifest.json')==report['source_manifest_sha256'] and H(folder/'build.log')==report['build_log_sha256']
    assert set(actual)==set(upstream)
    assert {k for k in actual if actual[k]!=upstream[k]}==set(expected['patched'])
    assert len(expected['patched'])==18
    assert all(upstream[n]==h for n,h in expected['baseline'].items())
    assert all(actual[n]==h for n,h in expected['patched'].items())
    assert read(folder/'patch-source-inputs.json')==expected
    assert patch.read_bytes()==(P/'expected-source.patch').read_bytes()
    assert H(patch)==report['source_patch']['sha256']
    tools=read(folder/'tool-versions.json')
    assert tools['selected_rustc_sha256']=='7194df9c12e893cfa88fff5dd821d02d45910b4d375e13677b4723f45769a384'
    assert tools['selected_rustc_resolved']=='/root/.cache/solana/v1.37/platform-tools/rust/bin/rustc'
    assert 'rustc 1.68.0-dev' in tools['selected_rustc_version'] and 'LLVM version: 15.0.7' in tools['selected_rustc_version']
    image=read(folder/'image-inspect.json');assert len(image)==1
    assert report['image'] in image[0]['RepoDigests']
    commands=report['commands'];assert len(commands)==1
    assert commands[0]==['docker','exec','-e','RUSTUP_TOOLCHAIN=1.69.0-x86_64-unknown-linux-gnu','-w','/build/programs/token-metadata','<container>','cargo','build-sbf','--','--config','registries.crates-io.protocol="sparse"','--locked','--manifest-path','/build/programs/token-metadata/Cargo.toml']
    raw=(folder/'token_metadata.so').read_bytes();payload=(folder/'rebuilt.deployed.so').read_bytes()
    assert H(folder/'token_metadata.so')==report['candidate_input_sha256'] and H(folder/'rebuilt.deployed.so')==report['candidate_sha256']
    assert len(raw)==report['candidate_input_bytes'] and len(payload)==report['candidate_bytes']
    assert payload==raw+bytes(report['zero_padding_bytes'])
    return dict(verified=True,source_commit=expected['upstream_commit'],patched_source_files=18,exact_pinned_patch=True,exact_image_and_command=True,
                actual_sbf_compiler='platform-tools v1.37 / rustc 1.68.0-dev',host_rust='1.69.0',source_build_completed=True,
                candidate_sha256=report['candidate_input_sha256'],full_byte_equality=report['full_byte_equality'],first_difference=report['first_difference'])
if __name__=='__main__':print(json.dumps(verify(Path(sys.argv[1])),indent=2))
