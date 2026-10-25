from pathlib import Path
import argparse,json,hashlib,struct
p=argparse.ArgumentParser();p.add_argument('--repo',type=Path,required=True);a=p.parse_args();w=Path(__file__).resolve().parent;H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
for n,h in json.loads((w/'inputs.json').read_text()).items():assert H(a.repo/n)==h,n
q=a.repo/'repro/donation-relay/source-build-11-idl-discriminator';assert H(q/'candidate.so')=='34c54b8e1e625a46fd446bb8e6fa7c7f17afcb1fd7d2ef3719a16f630c98ce91';b=(q/'original.so').read_bytes();allrows=json.loads((q/'original-windows.json').read_text())
for r in json.loads((w/'original-rows.json').read_text()):
 assert r==next(x for x in allrows if x['ordinal']==r['ordinal']);assert hashlib.sha256(b[r['start']:r['end']]).hexdigest()==r['sha256']
for pc,value in [(610224,3002),(610240,36),(610248,29),(610568,10),(610576,10),(610584,1)]:assert struct.unpack_from('<i',b,pc+4)[0]==value
for pc,t in [(609944,662256),(610088,665904),(610296,652392),(21048,609848)]:assert pc+8+struct.unpack_from('<i',b,pc+4)[0]*8==t
assert b[758374:758403]==b'programs/contracts/src/lib.rs'
for n in ['idl.rs','exit_error.rs']:assert(w/('current-'+n)).read_bytes()==(q/'source/src'/n).read_bytes()
assert 'let mut e = code(3002); e.account = Some("IdlAccount");'in(w/'current-idl.rs').read_text()
if(w/'manifest.json').exists():
 m=json.loads((w/'manifest.json').read_text());assert set(m)=={str(f.relative_to(w))for f in w.rglob('*')if f.is_file()and f not in[w/'manifest.json',w/'manifest.sha256']}
 for n,h in m.items():assert H(w/n)==h,n
 assert H(w/'manifest.json')==(w/'manifest.sha256').read_text().strip()
print('PASS: admitted full IDL3002 branch/caller and current adapter bound; coherent ownership replacement remains unproved; no patch/build/runtime.')
