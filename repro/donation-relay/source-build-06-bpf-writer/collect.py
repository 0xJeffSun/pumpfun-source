#!/usr/bin/env python3
"""Collect a root-confirmed completed build; never invokes a compiler or target."""
from pathlib import Path
import argparse,hashlib,json,shutil,importlib.util,gzip,sys
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def collect(R):
 B=R/'work/relay-source-build-06';L=R/'work/relay-source-build-06-launcher';S=R/'work/relay-build05-serializer-review';base=R/'repro/donation-relay/source-build-05-streaming'
 inputs={}
 def cp(a,n):
  q=P/n;q.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(a,q);inputs[str(a.relative_to(R))]={'copy':n,'sha256':H(q)}
 def js(n,v):
  q=P/n;q.parent.mkdir(parents=True,exist_ok=True);q.write_text(json.dumps(v,indent=2,sort_keys=True)+'\n')
 assert H(L/'manifest.json')=='ea9ff66f395d3572480ae9850e53ac9dca373cd751e21976b358661f39ca76be'
 assert H(S/'manifest.json')=='0248828dd08316ca4e3565bdd31f4effb32372363b2f889d234d6e79f679f4d9'
 for n in ['build-launch.json','build-result.json','build.stdout','build.stderr','tool-phase-before.json','tool-phase-after.json','dependency-source-after.json','retained-artifacts.json']:cp(B/n,'attempt/'+n)
 for n in ['manifest.json','relay_build_once.py','resolved-source-sha256.json','build06-source-adaptation.json','tool-witness/tool-files.json','tool-witness/sdk-files.json','resolved-source-archive-equality.json']:cp(L/n,'launcher/'+n)
 for n in json.loads((L/'resolved-source-sha256.json').read_text()):cp(B/'source'/n,'source/'+n)
 for n in ['candidate.so','unstripped.so']:cp(B/'retained'/n,n)
 cp(R/'evidence/dependencies/donation_relay/deployed.so','original.so')
 for n in ['original-windows.json','analyze.py']:cp(base/n,n)
 for n in ['manifest.json','manifest.sha256','source-proposal-sha256.json','source-proposal.patch','README.md','writer-contract.json','field-stream-map.json','upstream/extraction.json','upstream/ATTRIBUTION.md','upstream/anchor-lang-0.31.1.crate']:cp(S/n,'proposal/'+n)
 for n in ['manifest.json','comparison-summary.json','candidate-function-ledger.json','match-ledger.json','launcher/manifest.json','launcher/resolved-source-sha256.json','launcher/relay_build_once.py']:cp(base/n,'previous/'+n)
 expected=json.loads((L/'tool-witness/sdk-files.json').read_text());actual={}
 for n in expected:
  p=B/'sdk'/n;actual[n]=dict(sha256=H(p),mode=p.stat().st_mode&0o777,size=p.stat().st_size)
 js('SDK-source-after.json',actual)
 spec=importlib.util.spec_from_file_location('relay06_analysis',P/'analyze.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 results=m.analyze(P)
 for n,v in results.items():
  data=(json.dumps(v,indent=2,sort_keys=True)+'\n').encode();(P/n).write_bytes(gzip.compress(data,mtime=0)if n.endswith('.gz')else data)
 errors=[{'line':i,'text':line}for i,line in enumerate((B/'build.stderr').read_text().splitlines(),1)if line.startswith('Error:')or 'Stack offset of' in line or 'overwrites values in the frame' in line]
 frames=[{'index':f['index'],'start':f['start'],'names':f['names'],'minimum_r10_offset':min((x['offset']for x in f['direct_r10_accesses']),default=None),'out_of_range':[x for x in f['direct_r10_accesses']if x['offset'] < -4096]}for f in results['candidate-function-ledger.json']]
 js('stack-observations.json',dict(backend_errors=errors,frames=frames,limit=4096,scope='Direct r10-based accesses only; no whole dynamic-stack proof.'))
 js('input-provenance.json',inputs)
 print(json.dumps({'build_returncode':json.loads((B/'build-result.json').read_text())['returncode'],'backend_errors':errors,'sdk_unchanged':actual==expected,'comparison':results['comparison-summary.json']},indent=2))
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path,required=True);ap.add_argument('--root-confirmed-complete',action='store_true',required=True);args=ap.parse_args();collect(args.repo.resolve())
