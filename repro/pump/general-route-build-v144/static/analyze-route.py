#!/usr/bin/env python3
"""Read-only complete symbol windows and inferred original windows; no target execution."""
from pathlib import Path
import hashlib,json,struct,sys
sys.dont_write_bytecode=True
from elf_reader import Elf
H=Path(__file__).resolve().parent;R=next(p for p in H.parents if(p/'evidence/original/pump/deployed.so').is_file());sha=lambda b:hashlib.sha256(b).hexdigest()
o=Elf(R/'evidence/original/pump/deployed.so');c=Elf(H/'candidate.so');s=Elf(H/'unstripped.so')
assert c.b[c.lo:c.hi]==s.b[s.lo:s.hi]
ends={p:(o.entries[i+1] if i+1<len(o.entries) else o.hi) for i,p in enumerate(o.entries)}
original_index={}
for a,b in ends.items():original_index.setdefault((b-a,sha(o.normalized[a:b])),[]).append(a)
named={}
for f in s.funcs:named.setdefault((f['start'],f['size']),set()).add(f['name'])
rows=[]
for(a,n),names in sorted(named.items()):
 hit=[q for q in original_index.get((n,sha(c.normalized[a:a+n])),[]) if o.pattern(q,n)==c.pattern(a,n)]
 rows.append(dict(start=a,end=a+n,bytes=n,names=sorted(names),raw_sha256=sha(c.b[a:a+n]),normalized_sha256=sha(c.normalized[a:a+n]),original_normalized_matches=hit,original_raw_matches=[q for q in hit if o.b[q:q+n]==c.b[a:a+n]]))
by_start={x['start']:x for x in rows}
def window(e,a,n):
 calls=[]
 for q in e.callsites(a,n):
  at=a+q['offset'];target=q['target'];known=by_start.get(target) if e is c else None
  end=known['end'] if known else ends.get(target) if e is o else None
  calls.append(dict(**q,instruction_hex=e.b[at:at+8].hex(),signed_operand=struct.unpack_from('<i',e.b,at+4)[0],target_end=end,target_bytes=end-target if end else None,target_raw_sha256=sha(e.b[target:end]) if end else None,target_normalized_sha256=sha(e.normalized[target:end]) if end else None,candidate_symbol_names=known['names'] if known else [],target_original_normalized_matches=known['original_normalized_matches'] if known else [],target_original_raw_matches=known['original_raw_matches'] if known else []))
 relocs=[]
 for p in e.pattern(a,n):
  at=a+p['offset'];d=dict(p,instruction_hex=e.b[at:at+16].hex() if p['type']==8 else e.b[at:at+8].hex())
  if p['type']==8 and e.b[at]==0x18:
   ptr=struct.unpack_from('<I',e.b,at+4)[0]|struct.unpack_from('<I',e.b,at+12)[0]<<32
   d.update(target=ptr,in_file=ptr<len(e.b),preview_bytes=min(64,max(0,len(e.b)-ptr)),preview_hex=e.b[ptr:ptr+64].hex(),consumed_extent='unresolved; bounded preview is not a literal-length or semantic claim')
  relocs.append(d)
 return dict(start=a,end=a+n,bytes=n,raw_sha256=sha(e.b[a:a+n]),normalized_sha256=sha(e.normalized[a:a+n]),raw_hex=e.b[a:a+n].hex(),direct_calls=calls,relocations=relocs,indirect_call_offsets=[q-a for q in range(a,a+n,8) if e.b[q]==0x8d])
selected=[r for r in rows if any(x in name for name in r['names'] for x in ['multi_hop_curve','MultiHopCurve','CurveHop','RouteFeeConfig'])]
# Identity and roles from preserved public original dispatcher/context/route reports, not names guessed from size.
original_roles={0x1295c0:'identified instruction wrapper',0xdb958:'13-account context parser',0xdd700:'five-account hop parser',0x567d8:'identified route loop handler',0x5b3b0:'per-hop operation called from route loop',0x7e490:'bit-0 recipient preflight',0x89ec8:'fee selector',0x5a260:'carried input transfer helper'}
report=dict(scope='All fresh route-related named candidate windows and known admitted original windows. Raw signed internal-call operands, actual relocation records, full target hashes and exact normalized/raw target matches. Inferred original boundaries need not equal historical Rust functions; candidate execute fuses loop and hop source, so no size-based one-to-one correspondence. Data previews do not establish consumed extents or transitive data equality.',original=o.identity(),candidate=c.identity(),symbols=s.identity(),whole_file_equal=o.b==c.b,candidate_all_window_rows=rows,candidate_route_windows=[dict(**r,analysis=window(c,r['start'],r['bytes']))for r in selected],original_admitted_windows=[dict(role=role,analysis=window(o,a,ends[a]-a))for a,role in original_roles.items()],identity_evidence_paths=['repro/parallel-work/2026-10-25/results/pump_route_depth/REPORT.md','repro/parallel-work/2026-10-25/context-closure-results/pump_route_context_closure/REPORT.md','repro/pump/general-route-corrected-review/REPORT.md'])
if '--check' in sys.argv: assert report==json.loads((H/'route-windows.json').read_text()), 'Route evidence changed'
else: (H/'route-windows.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(dict(candidate_named_windows=len(rows),route_named_windows=len(selected),route_complete_normalized_matches=sum(bool(r['original_normalized_matches'])for r in selected),original_windows=[(hex(x['analysis']['start']),x['analysis']['bytes'],x['role'])for x in report['original_admitted_windows']],candidate_route=[dict(start=x['start'],bytes=x['bytes'],name=x['names'][0],matches=x['original_normalized_matches'])for x in selected]),indent=2))
