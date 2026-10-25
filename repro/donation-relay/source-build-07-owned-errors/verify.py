#!/usr/bin/env python3
"""Verify saved build/source/static evidence; does not execute the program."""
from pathlib import Path
import argparse,gzip,hashlib,json
from analyze import analyze
from review import generate
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def verify(repo=None):
 m=json.loads((P/'manifest.json').read_text());assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
 actual={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']and '__pycache__'not in p.parts};assert actual==set(m)
 for n,h in m.items():assert not(P/n).is_symlink()and H(P/n)==h,n
 source=json.loads((P/'launcher/resolved-source-sha256.json').read_text());assert len(source)==23
 for n,h in source.items():assert H(P/'source'/n)==h,n
 result=json.loads((P/'attempt/build-result.json').read_text());assert result['returncode']==0 and result['source_after']==source
 before=json.loads((P/'attempt/tool-phase-before.json').read_text());after=json.loads((P/'attempt/tool-phase-after.json').read_text());assert before['tools']==after['tools']
 assert json.loads((P/'launcher/tool-witness/sdk-files.json').read_text())==json.loads((P/'SDK-source-after.json').read_text())
 generated=analyze(P)
 for n,v in generated.items():
  raw=gzip.decompress((P/n).read_bytes())if n.endswith('.gz')else(P/n).read_bytes();assert json.loads(raw)==v,n
 for n,v in generate().items():assert(P/n).read_text()==(v if isinstance(v,str)else json.dumps(v,indent=2,sort_keys=True)+'\n'),n
 stack=json.loads((P/'stack-observations.json').read_text());assert not stack['backend_errors']and not any(x['out_of_range']for x in stack['frames'])
 artifacts=json.loads((P/'attempt/retained-artifacts.json').read_text())
 for n in ['candidate.so','unstripped.so']:assert H(P/n)==artifacts[n]['sha256']and(P/n).stat().st_size==artifacts[n]['bytes'],n
 if repo:
  repo=Path(repo);assert H(repo/'evidence/dependencies/donation_relay/deployed.so')==H(P/'original.so')
  base=repo/'repro/donation-relay/source-build-06-bpf-writer';assert H(base/'manifest.json')==H(P/'previous/manifest.json')
 out={'status':'PASS','payloads':len(m),'source_inputs':len(source),'builds':1,'target_executions_by_verifier':0,'comparison':generated['comparison-summary.json']};print(json.dumps(out));return out
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);args=ap.parse_args();verify(args.repo)
