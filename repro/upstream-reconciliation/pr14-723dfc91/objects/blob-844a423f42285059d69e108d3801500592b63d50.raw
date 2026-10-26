#!/usr/bin/env python3
import hashlib,json,sys
from pathlib import Path
P=Path(__file__).resolve().parent
ROOT=P.parents[2]
sys.path.insert(0,str(ROOT/'repro/pump_fees/framework-matching'))
from elf_reader import Elf
H=lambda b:hashlib.sha256(b).hexdigest()
def main():
 for n,h in json.loads((P/'manifest.json').read_text()).items(): assert H((P/n).read_bytes())==h,n
 sdk=json.loads((P/'sdk-files.json').read_text());a,b=sdk['v137'],sdk['v138']
 assert len(a)==len(b)==1989
 assert sorted(n for n in a.keys()|b.keys() if a.get(n)!=b.get(n))==sorted(json.loads((P/'sdk-differences.json').read_text()))
 assert len(json.loads((P/'sdk-differences.json').read_text()))==44
 assert a['rust/bin/rustc']==b['rust/bin/rustc']=='7194df9c12e893cfa88fff5dd821d02d45910b4d375e13677b4723f45769a384'
 assert a['rust/lib/librustc_driver-f767167903553d17.so']!=b['rust/lib/librustc_driver-f767167903553d17.so']
 for ver in ('v137','v138'): assert H((P/(ver+'-version.md')).read_bytes())==sdk[ver]['version.md']
 d=P/'baseline';sm=json.loads((d/'source-manifest.json').read_text())
 assert len(sm)==812 and sm==json.loads((ROOT/'repro/pump/metaplex-candidate-build-11/source-manifest.json').read_text())
 report=json.loads((d/'comparison.json').read_text());facts=json.loads((P/'result.json').read_text())
 raw=(d/'token_metadata.so').read_bytes();original=(ROOT/'evidence/dependencies/token_metadata/deployed.so').read_bytes()
 assert H(original)==report['original_sha256']=='31f0a627dba051a938de650464e55cc5397a4be0fd496929c1f9cf02fe5e9011'
 assert H(raw)==report['candidate_input_sha256']==facts['raw_sha256']
 assert len(raw)==report['candidate_input_bytes']==facts['raw_bytes']
 payload=raw+bytes(max(0,len(original)-len(raw)))
 assert payload==(d/'rebuilt.deployed.so').read_bytes()
 assert H(payload)==report['candidate_sha256']
 assert (payload==original)==report['full_byte_equality']==facts['full_byte_equality']
 assert sum(x!=y for x,y in zip(payload,original))+abs(len(payload)-len(original))==facts['differing_payload_positions']
 redaction=json.loads((d/'log-redaction.json').read_text())
 assert H((d/'build.log').read_bytes())==redaction['sanitized_sha256']
 assert report['build_log_sha256']==redaction['original_sha256']
 assert H((d/'source-manifest.json').read_bytes())==report['source_manifest_sha256']
 target=Elf(ROOT/'evidence/dependencies/token_metadata/deployed.so');candidate=Elf(d/'token_metadata.so')
 assert (candidate.b[candidate.lo:candidate.hi]==target.b[target.lo:target.hi])==facts['whole_text_equality']
 prior=(ROOT/'repro/pump/metaplex-candidate-build-11/token_metadata.so').read_bytes()
 assert (raw==prior)==facts['candidate11_raw_equal']
 tool=json.loads((d/'tool-versions.json').read_text());assert '/v1.37/platform-tools/rust/' in tool['selected_rustc_resolved']
 selected=json.loads((d/'selected-sdk-during-build.json').read_text());assert selected['selected']=='/root/.cache/solana/v1.38/platform-tools/rust'
 mounts=json.loads((d/'mounts.json').read_text());assert any(m['Destination']=='/root/.cache/solana/v1.38/platform-tools' and not m['RW'] for m in mounts)
 assert (d/'restrip-control.so').read_bytes()==raw
 pre=Elf(d/'compiled-before-strip.so');assert pre.b[pre.lo:pre.hi]==candidate.b[candidate.lo:candidate.hi]
 stripper=json.loads((d/'stripper-identity.json').read_text())
 assert stripper[1]['output'].split()[0]==a['llvm/bin/llvm-objcopy']
 print(json.dumps(dict(verified=True,source_files=812,sdk_files_per_distribution=1989,full_byte_equality=facts['full_byte_equality'],whole_text_equality=facts['whole_text_equality'],accepted=False)))
if __name__=='__main__':main()
