"""Recompute ELF extent, layout, relocation and captured-account facts read-only."""
from pathlib import Path
import gzip,hashlib,importlib.util,json,struct,tempfile
P=Path(__file__).resolve().parent;R=P.parents[2]
H=lambda b:hashlib.sha256(b).hexdigest()
def load():
 s=importlib.util.spec_from_file_location('layout_elf',R/'repro/donation-relay/swap-receipt-coordinate-recovery/analyze.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m

def derive():
 m=load();parent=R/'repro/donation-relay/settlement-artifact-recovery';meta=json.loads((parent/'metadata.json').read_bytes());a=meta['variants']['recovered']['artifacts']
 orig=(R/'evidence/dependencies/donation_relay/deployed.so').read_bytes();cand=gzip.decompress((parent/a['candidate']['path']).read_bytes());sym=gzip.decompress((parent/a['symbols']['path']).read_bytes());assert H(cand)==a['candidate']['sha256'] and H(sym)==a['symbols']['sha256']
 o,c=m.Elf(orig),m.Elf(cand)
 def header(elf):
  h=struct.unpack_from('<16sHHIQQQIHHHHHH',elf.b);programs=[dict(zip(('type','flags','offset','vaddr','paddr','filesz','memsz','align'),struct.unpack_from('<IIQQQQQQ',elf.b,h[5]+i*h[9])))for i in range(h[10])]
  extent=max([h[8],h[5]+h[9]*h[10],h[6]+h[11]*h[12]]+[s['offset']+s['size']for s in elf.sections if s['type']!=8]+[x['offset']+x['filesz']for x in programs])
  return dict(type=h[1],machine=h[2],entry=h[4],flags=h[7],phoff=h[5],shoff=h[6],programs=programs,extent=extent,tail_bytes=len(elf.b)-extent,tail_all_zero=not any(elf.b[extent:]))
 sections=[]
 for name,s in o.by_name.items():
  t=c.by_name[name];sections.append(dict(name=name,original_offset=s['offset'],candidate_offset=t['offset'],original_address=s['address'],candidate_address=t['address'],original_bytes=s['size'],candidate_bytes=t['size'],equal=o.section_bytes(s)==c.section_bytes(t)))
 def rels(elf):
  s=elf.by_name['.rel.dyn'];return [struct.unpack_from('<QQ',elf.b,i)for i in range(s['offset'],s['offset']+s['size'],16)]
 ra,rb=rels(o),rels(c);assert len(ra)==len(rb)
 from collections import Counter
 r=dict(count=len(ra),type_symbol_entries_equal=all(a[1]==b[1]for a,b in zip(ra,rb)),site_delta_counts={str(k):v for k,v in sorted(Counter(b[0]-a[0]for a,b in zip(ra,rb)).items())},types={str(k):v for k,v in sorted(Counter(a[1]&0xffffffff for a in ra).items())})
 with tempfile.TemporaryDirectory()as tmp:
  q=Path(tmp);(q/'original.so').write_bytes(orig);(q/'candidate.so').write_bytes(cand);(q/'unstripped.so').write_bytes(sym);(q/'original-windows.json').write_bytes((R/'repro/donation-relay/swap-receipt-coordinate-recovery/original-windows.json').read_bytes());analysis=m.analyze(q)
 ledger=analysis['match-ledger.json'];cf=analysis['candidate-function-ledger.json'];of=analysis['original-function-ledger.json'];unmatched=[r['ordinal']for r in ledger if not r['normalized_candidate_indices']]
 # These symbols are unambiguous within the generated candidate inventory.
 names={92:'24donate_native_v1_handler17h',93:'41donate_native_pubkey_config_id_v1_handler17h',94:'17donate_v1_handler17h',95:'45donate_pubkey_config_id_with_payer_v1_handler17h'}
 deltas=[]
 for ordinal,frag in names.items():
  found=[f for f in cf if any(frag in n for n in f['names'])];assert len(found)==1;f=found[0];deltas.append(dict(ordinal=ordinal,original_bytes=of[ordinal]['bytes'],candidate_bytes=f['bytes'],delta=f['bytes']-of[ordinal]['bytes']))
 pd=(R/'evidence/dependencies/donation_relay/programdata-account.bin').read_bytes();capture=json.loads((R/'evidence/dependencies/donation_relay/capture.json').read_bytes());assert H(orig)==capture['payload_sha256']and H(pd)==capture['programdata_sha256']and pd[45:]==orig
 return dict(original_sha256=H(orig),candidate_sha256=H(cand),original_header=header(o),candidate_header=header(c),sections=sections,relocations=r,unmatched_ordinals=unmatched,body_size_deltas=deltas,runtime_permutation={str(i):ledger[i]['normalized_candidate_indices']for i in range(194,205)},capture=dict(programdata_bytes=len(pd),payload_bytes=len(orig),header_bytes=45,discriminant=struct.unpack_from('<I',pd)[0],deployment_slot=struct.unpack_from('<Q',pd,4)[0],payload_is_exact_account_suffix=True),whole_file_equal=orig==cand)

def main():
 manifest=json.loads((P/'manifest.json').read_bytes());assert set(manifest)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p.name!='manifest.json'and '__pycache__'not in p.parts}
 for n,h in manifest.items():assert H((P/n).read_bytes())==h
 for n,h in json.loads((P/'parents.json').read_bytes()).items():assert H((R/n).read_bytes())==h
 r=derive();assert r==json.loads((P/'report.json').read_bytes());assert r['unmatched_ordinals']==[92,93,94,95];assert r['original_header']['extent']==818280 and r['candidate_header']['extent']==818392;assert r['original_header']['tail_bytes']==12168 and r['original_header']['tail_all_zero'];assert r['candidate_header']['tail_bytes']==0;assert sum(x['delta']for x in r['body_size_deltas'])==112;assert r['relocations']['type_symbol_entries_equal']and r['relocations']['count']==2327;assert not r['whole_file_equal'];print('PASS: exact 112-byte text surplus, runtime-function permutation, 2327 relocation types/symbols, and 12168-byte captured allocation tail verified; identity remains open')
if __name__=='__main__':main()
