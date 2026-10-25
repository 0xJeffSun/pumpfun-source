#!/usr/bin/env python3
"""Saved build06 attestation and complete static verification; no execution."""
from pathlib import Path
import argparse,gzip,hashlib,json,sys,importlib.util
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
J=lambda p:json.loads(p.read_text())
def verify(repo=None):
 m=J(P/'manifest.json');assert H(P/'manifest.json')==(P/'manifest.sha256').read_text().split()[0]
 files={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and str(p.relative_to(P))not in ['manifest.json','manifest.sha256']};assert files==set(m)
 assert not any(p.is_symlink() or p.name=='__pycache__' or p.suffix=='.pyc' for p in P.rglob('*'))
 for n,h in m.items():assert H(P/n)==h,n
 assert H(P/'previous/manifest.json')=='ca775c1758f5e05a9afff9022aecc4fe9e534f4ae2b6764bf932ea645e2651e2'
 assert H(P/'proposal/manifest.json')=='0248828dd08316ca4e3565bdd31f4effb32372363b2f889d234d6e79f679f4d9'
 pm=J(P/'proposal/manifest.json');bm=J(P/'previous/manifest.json');assert H(P/'analyze.py')==bm['analyze.py']
 for folder,prior in [('proposal',pm),('previous',bm)]:
  for file in (P/folder).rglob('*'):
   if file.is_file()and str(file.relative_to(P/folder))not in ['manifest.json','manifest.sha256']:
    assert H(file)==prior[str(file.relative_to(P/folder))],str(file)
 import tarfile
 with tarfile.open(P/'proposal/upstream/anchor-lang-0.31.1.crate')as archive:
  assert archive.extractfile('anchor-lang-0.31.1/src/bpf_writer.rs').read()==(P/'source/src/bpf_writer.rs').read_bytes()
 src={str(p.relative_to(P/'source')):H(p)for p in(P/'source').rglob('*')if p.is_file()}
 assert len(src)==22 and src==J(P/'launcher/resolved-source-sha256.json')==J(P/'proposal/source-proposal-sha256.json')==J(P/'attempt/build-result.json')['source_after']==J(P/'attempt/build-launch.json')['source']
 for n,h in src.items():assert pm['source-proposal/'+n]==h
 old=J(P/'previous/launcher/resolved-source-sha256.json');assert[n for n in old if src[n]!=old[n]]==['src/generated_exit.rs'];assert set(src)-set(old)=={'src/bpf_writer.rs'}
 lm=J(P/'launcher/manifest.json')['files'];om=J(P/'previous/launcher/manifest.json')['files'];assert sorted(n for n in lm if lm[n]!=om.get(n))==['build06-source-adaptation.json','crate/src/bpf_writer.rs','crate/src/generated_exit.rs','resolved-source-sha256.json'];assert not(set(om)-set(lm))
 for p in(P/'launcher').rglob('*'):
  if p.is_file()and p!=P/'launcher/manifest.json':assert H(p)==lm[str(p.relative_to(P/'launcher'))]
 assert H(P/'launcher/relay_build_once.py')==H(P/'previous/launcher/relay_build_once.py')
 tools=J(P/'launcher/tool-witness/tool-files.json');before=J(P/'attempt/tool-phase-before.json');after=J(P/'attempt/tool-phase-after.json')
 assert before['tools']==after['tools'] and len(tools)==7
 assert{n:r['sha256']for n,r in tools.items()}=={n:r['sha256']for n,r in after['tools'].items()}
 assert J(P/'SDK-source-after.json')==J(P/'launcher/tool-witness/sdk-files.json') and len(J(P/'SDK-source-after.json'))==53
 registry={r['name']+'-'+r['version']:r['files']for r in J(P/'launcher/resolved-source-archive-equality.json')};assert len(registry)==232
 used=J(P/'attempt/dependency-source-after.json');assert len(used)==232 and {r['package']for r in used}==set(registry)
 for r in used:assert r['files']==registry[r['package']]
 args=J(P/'attempt/build-launch.json')['command'];assert args[1]=='build-sbf'and args[args.index('--tools-version')+1]=='v1.44'and args[-3:]==['--','--locked','--offline']
 assert J(P/'attempt/build-result.json')['returncode']==0
 err=(P/'attempt/build.stderr').read_text();assert not any(l.startswith('Error:')for l in err.splitlines());assert not any(x in err for x in ['Stack offset of','overwrites values in the frame'])
 for n in ['candidate.so','unstripped.so']:
  r=J(P/'attempt/retained-artifacts.json')[n];assert H(P/n)==r['sha256']and(P/n).stat().st_size==r['bytes']
 assert H(P/'original.so')=='367f07a62e3f74d358187d175cf3228848e81a56c781a9a75b9df7fed1268563'
 spec=importlib.util.spec_from_file_location('build06_static',P/'analyze.py');a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a);calculated=a.analyze(P)
 for n,value in calculated.items():
  b=(P/n).read_bytes();assert json.loads(gzip.decompress(b)if n.endswith('.gz')else b)==value,n
 fs=J(P/'stack-observations.json');assert not fs['backend_errors']
 frames=[{'index':f['index'],'start':f['start'],'names':f['names'],'minimum_r10_offset':min((x['offset']for x in f['direct_r10_accesses']),default=None),'out_of_range':[x for x in f['direct_r10_accesses']if x['offset'] < -4096]}for f in calculated['candidate-function-ledger.json']]
 assert fs['frames']==frames and not any(f['out_of_range']for f in frames)
 for n,row in J(P/'input-provenance.json').items():
  assert H(P/row['copy'])==row['sha256']
  if repo and n.startswith(('repro/','evidence/')):assert H(repo/n)==row['sha256']
 spec=importlib.util.spec_from_file_location('writer_static',P/'writer_review.py');w=importlib.util.module_from_spec(spec);spec.loader.exec_module(w)
 for n,value in w.review().items():assert value==J(P/n),n
 spec=importlib.util.spec_from_file_location('build06_disasm',P/'disasm.py');d=importlib.util.module_from_spec(spec);spec.loader.exec_module(d)
 for file in (P/'disassembly').glob('*.asm'):
  side,index=file.stem.split('-');f=calculated[side+'-function-ledger.json'][int(index)];elf=a.Elf((P/('original.so'if side=='original'else'unstripped.so')).read_bytes());assert file.read_text()==d.render(elf,f['start'],f['end'])
 return dict(status='PASS',source_inputs=22,source_builds=1,backend_errors=0,review_target_executions=0,whole_file_equal=False,comparison=calculated['comparison-summary.json'])
if __name__=='__main__':
 ap=argparse.ArgumentParser();ap.add_argument('--repo',type=Path);x=ap.parse_args();print(json.dumps(verify(x.repo.resolve()if x.repo else None),sort_keys=True))
