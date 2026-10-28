#!/usr/bin/env python3
"""Verify packaged source, clean-build receipt, official census, call graph and migration corpus."""
from pathlib import Path
import csv,difflib,gzip,hashlib,json,re,runpy,subprocess,sys,tempfile
sys.dont_write_bytecode=True
P=Path(__file__).resolve().parent
ROOT=next(p for p in P.parents if (p/'evidence/original/pump/deployed.so').is_file())
sys.path.insert(0,str(ROOT/'scripts'))
from pump_compare_function_bytes import body,normalize
from pump_quote_control_function_match import sections
from pump_diagnostic_audit import audit
sha=lambda p:hashlib.sha256(Path(p).read_bytes()).hexdigest()
read=lambda p:json.loads(gzip.decompress(p.read_bytes()) if p.read_bytes()[:2]==b'\x1f\x8b' else p.read_bytes())
funcs=runpy.run_path(str(ROOT/'research/claude-pump-integration-20261027/r37-layout-33/verify.py'))['elf_functions']

def census(path):
 b=path.read_bytes();bs=sections(b);o=(ROOT/'evidence/original/pump/deployed.so').read_bytes();os=sections(o);by={}
 for st,sz,n in funcs(b):
  raw=body(b,bs,st,sz);nr=normalize(raw,st,bs)[0];by.setdefault((sz,hashlib.sha256(nr).digest()),[]).append((st,hashlib.sha256(raw).digest()))
 rows={}
 for r in csv.DictReader(open(ROOT/'repro/reconstruction-status-2026-10-26/functions.tsv'),delimiter='\t'):
  if r['program']!='pump' or r['variant']!='selected':continue
  st,end=int(r['original_start']),int(r['original_end']);raw=body(o,os,st,end-st);nr=normalize(raw,st,os)[0];ms=by.get((end-st,hashlib.sha256(nr).digest()),[])
  rows[st]=(bool(ms),any(h==hashlib.sha256(raw).digest() for _,h in ms),end-st,{a for a,h in ms})
 counts={'total':len(rows),'raw':sum(x[1] for x in rows.values()),'normalized':sum(x[0] for x in rows.values()),'unmatched':sum(not x[0] for x in rows.values()),'matched_text_bytes':sum(x[2] for x in rows.values() if x[0])}
 return rows,counts

def main():
 manifest=read(P/'MANIFEST.json');files={str(p.relative_to(P)) for p in P.rglob('*') if p.is_file() and '__pycache__' not in p.parts}
 assert files==set(manifest)|{'MANIFEST.json'}
 for n,h in manifest.items():assert not (P/n).is_symlink() and sha(P/n)==h,n
 result=read(P/'RESULT.json');rec=read(P/'build-record.json');base=ROOT/result['base_package']/'source/programs/pump'
 assert rec['returncode']==0 and rec['source_unchanged'] and rec['workspace_layout'] and rec['target']=='sbpf-solana-solana'
 actual={str(p.relative_to(P/'source')):sha(p) for p in sorted((P/'source').rglob('*')) if p.is_file()}
 assert actual==rec['source_sha256']==rec['source_after_sha256']
 assert sha(P/'unstripped.so')==rec['unstripped_sha256']==result['unstripped_sha256']
 assert sha(P/'candidate.so')==rec['candidate_sha256']==result['candidate_sha256']
 assert sha(P/'rebuild.log')==rec['log_sha256']
 for n,h in result['base_source_sha256'].items():assert sha(base/n)==h,n
 expected={str(p.relative_to(base)):p.read_bytes() for p in base.rglob('*') if p.is_file()}
 text=expected.pop('Cargo.toml').decode();a=text.index('[profile.release]');b=text.index('[workspace]');profile=text[a:b].strip()
 expected['Cargo.toml']=(text[:a].rstrip()+'\n').encode();lock=expected.pop('Cargo.lock')
 for n,data in expected.items():
  if n!='src/migrate.rs':assert (P/'source/programs/pump'/n).read_bytes()==data,n
 assert (P/'source/Cargo.lock').read_bytes()==lock
 assert (P/'source/Cargo.toml').read_text()=='[workspace]\nmembers = ["programs/pump"]\nresolver = "2"\n\n'+profile+'\n'
 patch=''.join(difflib.unified_diff((base/'src/migrate.rs').read_text().splitlines(keepends=True),(P/'source/programs/pump/src/migrate.rs').read_text().splitlines(keepends=True),'a/programs/pump/src/migrate.rs','b/programs/pump/src/migrate.rs'))
 assert patch==(P/'source.patch').read_text() and sha(P/'source.patch')==result['source_patch_sha256']
 commands=read(P/'compiler-commands.json');assert len(commands)==2
 assert [c[c.index('--crate-name')+1] for c in commands]==['pump_token_ext','pump_recovered']
 for c in commands:assert '--target' in c and c[c.index('--target')+1]=='sbpf-solana-solana' and '-Zremap-cwd-prefix=' in c
 rows,counts=census(P/'unstripped.so');control,bc=census(P/'control/unstripped.so')
 assert counts==result['counts'] and bc==result['base_native_counts']
 for path,rs,cts in [(P/'inventory.json.gz',rows,counts),(P/'control/inventory.json.gz',control,bc)]:
  inv=read(path);assert inv['counts']==cts
  for w in inv['windows']:
   n,r,l,starts=rs[w['start']];assert (n,r,l)==(bool(w['normalized_matches']),w['raw_match'],w['bytes'])
   assert starts=={x['start'] for x in w['normalized_matches']}
 for index,label in [(0,'normalized'),(1,'raw')]:
  gains=[hex(s) for s in sorted(rows) if rows[s][index] and not control[s][index]];losses=[hex(s) for s in sorted(rows) if not rows[s][index] and control[s][index]]
  assert gains==result[label+'_gains'] and losses==result[label+'_losses']
 assert result['normalized_gains']==['0x3fb70'] and not result['normalized_losses'] and not result['raw_losses']
 stripped=(P/'candidate.so').read_bytes();unstripped=(P/'unstripped.so').read_bytes();ss=sections(stripped);us=sections(unstripped)
 for n in ['.text','.rodata','.data.rel.ro']:
  if n not in ss:continue
  assert ss[n]['addr']==us[n]['addr'] and ss[n]['size']==us[n]['size']
  assert stripped[ss[n]['offset']:ss[n]['offset']+ss[n]['size']]==unstripped[us[n]['offset']:us[n]['offset']+us[n]['size']]
 with tempfile.TemporaryDirectory() as d:
  check=Path(d)/'calls.json';subprocess.run([sys.executable,str(P/'callcheck.py'),str(P/'unstripped.so'),str(check)],check=True,stdout=subprocess.DEVNULL)
  assert read(check)==read(P/'call-checks.json')
 report=read(P/'migration.json.gz');assert report['candidate_sha256']==sha(P/'unstripped.so') and report['original_sha256']==sha(ROOT/'evidence/original/pump/deployed.so')
 assert report['case_count']==len(report['cases'])==228 and not report['mismatches']
 for r in report['cases']:
  assert not r['mismatched_fields']
  for key in ['error','before','after','events','inner','return']:assert r['original'][key]==r['candidate'][key],key
  assert r['original']['signature_verification'] and r['candidate']['signature_verification']
  filt=lambda logs:[l for l in logs if not re.match(r'^Program .* consumed \d+ of \d+ compute units$',l)]
  assert filt(r['original']['logs'])==filt(r['candidate']['logs'])
 au=audit({'migration':report});assert not au['mismatches'] and au['log_bearing_cases']==228
 loader=read(P/'migration-loader.json.gz');assert sum(x['elf_sha256']==sha(P/'unstripped.so') for x in loader['loads'])==228
 assert all(x['elf_prefix_unchanged'] and x['zero_allocation_tail'] and x['program_owner']=='BPFLoaderUpgradeab1e11111111111111111111111' for x in loader['loads'])
 print(json.dumps({'verified':True,'counts':counts,'normalized_gains':result['normalized_gains'],'normalized_losses':[],'raw_losses':[],'outgoing_callees':43,'migration_cases':228,'ordered_log_mismatches_excluding_compute':0,'whole_elf_equal':False},indent=2))
if __name__=='__main__':main()
