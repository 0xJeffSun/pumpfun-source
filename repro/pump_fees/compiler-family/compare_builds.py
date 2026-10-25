#!/usr/bin/env python3
"""Independently parse and compare captured Fees ELF with completed scratch builds."""
from pathlib import Path
import hashlib,json,struct
ROOT=Path(__file__).resolve().parent;REPO=next(p for p in ROOT.parents if (p/'evidence/original/pump_fees/deployed.so').is_file())
def elf(path):
 b=path.read_bytes();shoff=struct.unpack_from('<Q',b,40)[0];entsize,count,index=struct.unpack_from('<HHH',b,58);hs=[struct.unpack_from('<IIQQQQIIQQ',b,shoff+i*entsize) for i in range(count)];st=hs[index];names=b[st[4]:st[4]+st[5]];extent=shoff+count*entsize
 sections={names[h[0]:].split(b'\0',1)[0].decode():{'offset':h[4],'bytes':h[5],'flags':h[2],'sha256':hashlib.sha256(b[h[4]:h[4]+h[5]]).hexdigest()} for h in hs}
 return b,{'path':str(path.relative_to(REPO)),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest(),'elf_extent':extent,'elf_extent_sha256':hashlib.sha256(b[:extent]).hexdigest(),'e_machine':struct.unpack_from('<H',b,18)[0],'e_flags':struct.unpack_from('<I',b,48)[0],'sections':sections}
a,reference=elf(REPO/'evidence/original/pump_fees/deployed.so');results={}
for report in sorted(ROOT.glob('v*-build-*/build-comparison.json')):
 p=report.parent/'pump_fees_candidate.so';b,candidate=elf(p);differences=[i for i in range(min(len(a),len(b))) if a[i]!=b[i]]
 checks={'full_byte_equality':a==b,'elf_extent_byte_equality':a[:reference['elf_extent']]==b[:candidate['elf_extent']],'first_difference':differences[0] if differences else None,'different_positions_in_shared_length':len(differences),'length_difference':len(b)-len(a)}
 generated=json.loads(report.read_text())['comparison'];results[report.parent.name]={'candidate':candidate,'independent_comparison':checks,'helper_comparison':generated,'agrees_with_helper':all(checks[k]==generated[k] for k in checks if k in generated)}
 print(report.parent.name,'machine',candidate['e_machine'],'flags',candidate['e_flags'],'bytes',len(b),'sha256',candidate['sha256'],'equal',checks['full_byte_equality'])
(ROOT/'independent-comparisons.json').write_text(json.dumps({'original':reference,'builds':results},indent=2)+'\n')
