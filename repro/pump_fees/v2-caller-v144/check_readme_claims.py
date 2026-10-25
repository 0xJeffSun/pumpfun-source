from pathlib import Path
import json,hashlib,sys
W=Path(__file__).resolve().parent;R=W.parents[1];S=R/'work/fees-v2-caller-build/handoff';sys.path.insert(0,str(S/'reference/analysis-method'))
from elf_reader import Elf
from window_tools import extent
O=Elf(S/'reference/analysis-method/inputs/original.so');C=Elf(W/'pump_fees_candidate.so');SY=Elf(W/'symbols.so');H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
proof=json.load(open(S/'reference/caller-static-proof.json'));assert H(C.path)==proof['candidate_sha256']
assert [(proof['windows'][n]['candidate']['size'])for n in ['handler','parser','wrapper']]==[12864,8984,928]
pairs=[p for n in ['parser','wrapper']for p in proof['same_offset_direct_targets'][n]['pairs']];assert len(pairs)==76 and sum(x['comparison']['normalized_equal']and x['comparison']['relocation_pattern_equal']for x in pairs)==74
refs=json.load(open(S/'reference/fresh-data-reference-ledger.json'))['handler']['candidate'];assert len(set(x['target']for x in refs))==19
f=next(x for x in SY.funcs if '30admit_associated_token_account'in x['name']);reached={x['target']for x in C.callsites(f['start'],f['size'])};rows=[]
for a in sorted({q['target']for q in O.callsites(243184,6080)}):
 n=extent(O,a);matches=[]
 for z in SY.funcs:
  b=z['start'];m=z['size']
  if b in reached and n==m and O.normalized[a:a+n]==C.normalized[b:b+m]and O.pattern(a,n)==C.pattern(b,m):matches.append({'start':b,'bytes':m,'name':z['name'],'raw_equal':O.b[a:a+n]==C.b[b:b+m]})
 rows.append({'original':a,'bytes':n,'matches':matches})
assert len(rows)==17 and all(r['matches']for r in rows)
drops=[z for z in SY.funcs if z['size']==776 and O.b[40472:41248]==C.b[z['start']:z['start']+776]];assert drops
out={'candidate_sha256':H(C.path),'symbols_sha256':H(SY.path),'README_sha256':H(R/'programs/pump-fees/README.md'),'donation_handler_bytes':12864,'donation_parser_bytes':8984,'donation_wrapper_bytes':928,'donation_direct_targets':76,'donation_matching_targets':74,'donation_unique_direct_data_objects':19,'social_original_direct_targets':rows,'raw_equal_six_account_drop_matches':drops,'scope':'Fresh main byte checks of current numeric README claims; historical checkpoint-specific claims retain their original scope.'}
(W/'readme-claim-checks.json').write_text(json.dumps(out,indent=2)+'\n');print('README current static counts PASS')
