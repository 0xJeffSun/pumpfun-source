"""Offline static evidence verification; standard library only; no tool execution."""
from pathlib import Path
import argparse,hashlib,json,struct
from inspect_archives import elf
P=Path(__file__).resolve().parent
H=lambda b:hashlib.sha256(b).hexdigest()
def norm(b):
 b=bytearray(b)
 assert len(b)%8==0
 for i in range(0,len(b),8):
  if b[i]==0x85:b[i+4:i+8]=bytes(4)
 return bytes(b)
def main():
 a=argparse.ArgumentParser();a.add_argument('--repository-root',type=Path);args=a.parse_args()
 manifest=json.loads((P/'manifest.json').read_text())
 for name,row in manifest.items():
  b=(P/name).read_bytes();assert len(b)==row['bytes'] and H(b)==row['sha256'],name
 for fn in ['primary-receipts.json','additional-primary-receipts.json']:
  for row in json.loads((P/fn).read_text()):
   n=row['file'];n=n if n.startswith('primary/') else 'primary/'+n;b=(P/n).read_bytes();assert len(b)==row['bytes'] and H(b)==row['sha256']
 archive=json.loads((P/'archive-witnesses.json').read_text());callers=json.loads((P/'caller-witnesses.json').read_text());bodies={}
 for label,rows in archive.items():
  b=(P/(label+'-token2022.o')).read_bytes();assert H(b)==rows['object_sha256'] and len(b)==rows['object_bytes'];ss,syms,rels=elf(b)
  actual=[s for s in syms if 'reserve_for_push' in s['name'] and s['info']&15==2 and s['size']];assert len(actual)==len(rows['functions'])==4
  names=[];bodies[label]={}
  for s,f,c in zip(actual,rows['functions'],callers[label]):
   assert s['name']==f['symbol']==c['symbol'];sec=ss[s['section']];off=sec['offset']+s['value']-sec['addr'];raw=b[off:off+s['size']]
   assert raw.hex()==f['raw'] and H(raw)==f['raw_sha256'];assert off==f['object_file_offset'] and s['size']==f['bytes']==c['size']
   assert [r for r in rels if r['target_section']==s['section'] and s['value']<=r['offset']<s['value']+s['size']]==f['relocations']
   edges=[dict(caller_section=ss[r['target_section']]['name'],offset=r['offset'],reloc_type=r['type']) for r in rels if r['symbol']==s['name']];assert edges==c['callers'];bodies[label][s['name']]=norm(raw);names.append(s['name'])
  assert names==sorted(names),'actual RawVec symbol/section order'
 captures=json.loads((P/'capture-witnesses.json').read_text())
 for label,row in captures.items():
  b=(P/(label+'.so')).read_bytes();assert H(b)==row['sha256'] and len(b)==row['bytes'];ss,syms,rels=elf(b)
  assert [dict(name=s['name'],size=s['size'],type=s['type']) for s in ss]==row['sections'];assert [s['name'] for s in syms if s['name']]==row['dynamic_symbols']
  assert not {'.symtab','.strtab','.rustc'}&{s['name'] for s in ss};assert not any(s['name'].startswith('.debug') for s in ss)
  for literal in [b'RawVec',b'reserve_for_push',b'AccountMeta',b'spl_token_2022',b'metadata=']:assert literal not in b
  for w in row['windows']:
   raw=b[w['file_offset']:w['file_offset']+w['end']-w['start']];assert H(raw)==w['raw_sha256'] and H(norm(raw))==w['call_immediate_mask_sha256']
   for match in w['matches']:
    found=[n for n,x in bodies[match['control']].items() if x==norm(raw)];assert found==match['symbols'] and len(found)==1
    c=next(c for c in callers[match['control']] if c['symbol']==found[0]);needle='pack_pubkey_option' if w['type']=='u8' else 'initialize_multisig';assert any(needle in x['caller_section'] for x in c['callers'])
    assert len(c['callers'])==(27 if w['type']=='u8' else 93)
 if args.repository_root:
  for name,row in json.loads((P/'external-inputs.json').read_text()).items():
   b=(args.repository_root/name).read_bytes();assert H(b)==row['sha256'] and len(b)==row['bytes'],name
 print('PASS: sealed primary sources, 8 object specializations, caller relocations, 4 complete call-immediate-normalized windows, ELF survival inventory'+('; external receipts verified' if args.repository_root else '; external receipts not freshly checked'))
if __name__=='__main__':main()
