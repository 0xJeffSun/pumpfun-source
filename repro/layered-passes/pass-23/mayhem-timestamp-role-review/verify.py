from pathlib import Path
import argparse,json,hashlib,struct
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);a=p.parse_args();w=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for n,h in json.loads((w/'inputs.json').read_text()).items():assert H(a.repo/n)==h,n
b=(a.repo/'evidence/original/mayhem/deployed.so').read_bytes();rows=json.loads((w/'windows.json').read_text());assert len(rows)==6
for r in rows:assert H(w/r['path'])==r['sha256']==hashlib.sha256(b[r['start']:r['end']]).hexdigest()
for pc,target in [(0x7eed8,0xc138),(0xc160,0x2b468),(0x7f170,0xc560),(0xc588,0x2b768)]:assert pc+8+struct.unpack_from('<i',b,pc+4)[0]*8==target
s=(a.repo/'programs/mayhem/src/lib.rs').read_text();x=s.index('    pub fn withdraw_quote_admin');y=s.index('    pub fn extend_account',x);assert(w/'current-withdraw-source.rs').read_text()==s[x:y]
for token in ['reset_middle[1..9]','reset_middle[17..25]','reset_stable_suffix[16..24]','reset_stable_suffix[8..16]','last + interval','now.to_le_bytes()']:assert token in s[x:y]
if(w/'manifest.json').exists():
 m=json.loads((w/'manifest.json').read_text());assert set(m)=={str(f.relative_to(w))for f in w.rglob('*')if f.is_file()and f not in[w/'manifest.json',w/'manifest.sha256']}
 for n,h in m.items():assert H(w/n)==h,n
 assert H(w/'manifest.json')==(w/'manifest.sha256').read_text().strip()
print('PASS: six admitted withdrawal windows and owner-call chain; current timestamp roles bound; historical declaration type remains unresolved.')
