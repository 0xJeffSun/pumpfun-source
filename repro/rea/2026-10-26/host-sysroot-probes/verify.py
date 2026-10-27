"""Recheck the immutable probe records; optionally check cached sysroot libraries."""
import argparse,hashlib,json,re,struct
from pathlib import Path
p=Path(__file__).resolve().parent;root=p.parents[3];H=lambda b:hashlib.sha256(b).hexdigest()
a=argparse.ArgumentParser();a.add_argument('--cache',action='store_true');args=a.parse_args()
for name,digest in json.loads((p/'manifest.json').read_text()).items():assert H((p/name).read_bytes())==digest,name
summary=json.loads((p/'summary.json').read_text());original=(root/'evidence/dependencies/donation_relay/deployed.so').read_bytes();assert H(original)==summary['original_sha256']
h=struct.unpack_from('<16sHHIQQQIHHHHHH',original)
sections=[struct.unpack_from('<IIQQQQIIQQ',original,h[6]+i*h[11]) for i in range(h[12])]
def at(address,length):
 s=next(s for s in sections if s[1]!=8 and s[2]&2 and s[3]<=address and address+length<=s[3]+s[5]);i=s[4]+address-s[3];return original[i:i+length]
for record in json.loads((p/'target-typeid-windows.json').read_text()):
 b=at(record['start'],56);assert H(b)==record['raw_sha256'];assert b.hex()==record['raw_hex'];assert b[0]==b[24]==24
 words=[struct.unpack_from('<I',b,i+4)[0]+(struct.unpack_from('<I',b,i+12)[0]<<32) for i in [24,0]]
 assert words==summary['recorded_type_id_u64']
checked=[]
for host in ['linux-aarch64','osx-x86_64','linux-x86_64-v144']:
 d=json.loads((p/(host+'.json')).read_text());assert d['returncode']==0 and d['sysroot_unchanged']
 text=(p/(host+'.ll')).read_text();block=re.search(r'define internal \{ i64, i64 \}[^\n]*type_id[^\n]*\{\n.*?\n\}',text,re.S).group()
 pair=re.search(r'ret \{ i64, i64 \} \{ i64 (-?\d+), i64 (-?\d+) \}',block);words=[int(v)%(1<<64) for v in pair.groups()]
 assert words==d['type_id_u64'] and words!=summary['recorded_type_id_u64'] and not d['matches_original']
 if args.cache:
  sysroot=Path(d['command'][d['command'].index('--sysroot')+1]);libs=sysroot/'lib/rustlib/sbf-solana-solana/lib'
  for name,digest in d['library_sha256'].items():assert H((libs/name).read_bytes())==digest,name
 checked.append(host)
print(json.dumps({'original_type_id_windows_verified':3,'probes_verified':checked,'cached_libraries_checked':args.cache,'matching_probes':0,'whole_byte_identity':False},indent=2))
