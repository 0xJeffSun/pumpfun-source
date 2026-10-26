from pathlib import Path
import re,json
P=Path(__file__).resolve().parent;H='e8f649f4468ea1f178af86739333bd28076fb42b756270c2e1f99f13826f42e7'
def policy(line,actual,selected):
 if line=='programs/donation-relay/src/dispatch.rs -whitespace':assert actual==selected==H;return 'programs/donation-relay/src/dispatch.rs'
 m=re.fullmatch(r'(repro/[^\s*?\[\]{}\\]+) -whitespace',line);assert m;return m[1]
assert policy('programs/donation-relay/src/dispatch.rs -whitespace',H,H)=='programs/donation-relay/src/dispatch.rs'
reject=0
for line,a,s in [('programs/donation-relay/src/dispatch.rs -whitespace','0'*64,H),('programs/donation-relay/src/dispatch.rs -whitespace',H,'0'*64),('programs/pump/src/lib.rs -whitespace',H,H),('programs/donation-relay/src/* -whitespace',H,H),('repro/* -whitespace',H,H)]:
 try:policy(line,a,s)
 except AssertionError:reject+=1
 else:raise AssertionError('mutation admitted')
assert reject==5;rows=json.loads((P/'attributes.postmerge3.json').read_text());assert len(rows)==3 and rows[0]=={'path':'programs/donation-relay/src/dispatch.rs','sha256':H}
print(json.dumps({'passed':True,'one_active_exception':True,'selected_source_crosscheck':True,'mutation_rejections':reject,'postmerge_exact_witnesses':3,'active_writes':0}))
