from pathlib import Path
import hashlib,json,shutil,subprocess
W=Path(__file__).resolve().parent;R=W.parents[1];P=W/'publication';assert not P.exists();P.mkdir()
H=lambda b:hashlib.sha256(b).hexdigest();origins={}
def cp(src,dest,scope='metadata input'):
 s=R/src;assert not s.is_symlink() and not s.name.endswith('-keypair.json');b=s.read_bytes();p=P/dest;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(b);origins[dest]={'source':src,'sha256':H(b),'bytes':len(b),'scope':scope};return b
base='repro/pump/nested-general-route-fortyeight'
smap=json.loads((R/base/'source-sha256.json').read_text());assert len(smap)==37
for n,h in smap.items():
 assert H(cp(n,'inputs/source/'+n,'opaque source binding; only lib error declaration and exact surrogate-token sites inspected'))==h
for src,dest in [(base+'/candidate.so','inputs/candidate.so'),(base+'/unstripped.so','inputs/symbols.so'),(base+'/source-sha256.json','inputs/source-sha256.json'),(base+'/manifest-sha256.json','inputs/current-package-manifest.json'),(base+'/build-comparison.json','inputs/build-comparison.json'),('evidence/original/pump/deployed.so','inputs/original.so'),('evidence/upstream/pump.json','inputs/official-idl.json'),('repro/layered-passes/pass-01/results/pump/source-tools/elf_reader.py','elf_reader.py'),('repro/layered-passes/pass-01/results/pump/REPORT.md','inputs/prior-layer01-REPORT.md')]:cp(src,dest)
p=P/'inputs/prior-metadata-witness.json';p.write_bytes((W/'analysis/prior-witness.json').read_bytes())
(P/'input-origins.json').write_text(json.dumps(origins,indent=2,sort_keys=True)+'\n')
(P/'baseline.json').write_text(json.dumps({'source_inputs':37,'observed_HEAD':subprocess.check_output(['git','rev-parse','HEAD'],cwd=R,text=True).strip(),'candidate_sha256':H((P/'inputs/candidate.so').read_bytes()),'symbols_sha256':H((P/'inputs/symbols.so').read_bytes()),'excluded_semantics':['stopped sell_v2 lane','token incentives','Mayhem initializer','old unintegrated extensions'],'scope':'Read-only error metadata, exact surrogate-reference migration and error-construction callsite metadata; no excluded body semantics decoded.'},indent=2)+'\n')
print('input files',len(origins))
