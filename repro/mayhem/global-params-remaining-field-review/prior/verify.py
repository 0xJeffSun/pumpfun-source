#!/usr/bin/env python3
import hashlib,json,pathlib,subprocess,sys
sys.dont_write_bytecode=True
P=pathlib.Path(__file__).resolve().parent
sys.path.insert(0,str(P))
from analyze import analyze

def main():
 m=json.loads((P/'manifest.json').read_text());actual={p.relative_to(P).as_posix() for p in P.rglob('*') if p.is_file() and p!=P/'manifest.json'}
 assert actual==set(m),'file set'
 for n,r in m.items():
  f=P/n;assert not f.is_symlink() and f.resolve().is_relative_to(P);b=f.read_bytes();assert len(b)==r['bytes'] and hashlib.sha256(b).hexdigest()==r['sha256'],n
 j=analyze();assert j==json.loads((P/'residual-ledger.json').read_text())
 assert j['corrected_crosswalk']==json.loads((P/'corrected-crosswalk.json').read_text())
 patch=json.loads((P/'documentation-proposal.json').read_text());old=json.loads((P/'layer01/inputs/repro/mayhem/field-role-crosswalk/crosswalk.json').read_text())
 assert patch[0]['value']==old['mayhem_state_fields'][0]['trade_read_write_references'];old['mayhem_state_fields'][0]['trade_read_write_references']=patch[1]['value'];assert old==j['corrected_crosswalk']
 assert not any(x['owner']=='MayhemState' and x['token']=='field_8' for x in j['source_accesses'])
 ts=[x for x in j['source_accesses'] if x['owner']=='MayhemState' and x['token']=='field_89'];assert len(ts)==12 and sum(x['operation']=='read' for x in ts)==6 and sum(x['operation']=='write' for x in ts)==6
 # Re-run the sealed predecessor: full-file diffs, every retained row, calls,
 # relocation mappings, selected static assertions. No target is executed.
 proc=subprocess.run([sys.executable,'-B',str(P/'layer01/verify.py')],cwd=P,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
 assert proc.returncode==0,(proc.stdout,proc.stderr)
 inherited=json.loads(proc.stdout);assert inherited['status']=='PASS'
 result=json.loads((P/'result.json').read_text());assert result['ledger_sha256']==hashlib.sha256((P/'residual-ledger.json').read_bytes()).hexdigest()
 print(json.dumps(dict(status='PASS',sealed_files=len(m),recomputed=True,corrections=len(j['corrections']),fields=len(j['fields']),source_accesses=len(j['source_accesses']),other_mentions=len(j['other_exact_mentions']),predecessor_static_verifier=inherited,whole_file_equal=False),indent=2,sort_keys=True))
if __name__=='__main__':main()
