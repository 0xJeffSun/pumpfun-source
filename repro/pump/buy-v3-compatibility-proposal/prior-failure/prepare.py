from pathlib import Path
import difflib,json
p=Path('publication');s=p/'proposed/programs/pump/src';s.mkdir(parents=True,exist_ok=True)
current=(p/'inputs/current/trade.rs').read_text();old=(p/'review/inputs/accepted/trade.rs').read_text()
# No rewrite of any accepted implementation. The containment source adds only
# the new ordinary function and context relative to its own baseline.
contained=(p/'review/source/trade.rs').read_text()
tail=contained[contained.index('// Dedicated BuyV3 context;'):]
def fun(txt,name):
 a=txt.index('pub fn '+name+'(');b=txt.index('{',a);depth=1;e=b+1
 while depth:
  depth += (txt[e]=='{')-(txt[e]=='}');e+=1
 return txt[a:e]
ordinary=fun(contained,'buy_ordinary_candidate')
assert fun(current,'buy')==fun(old,'buy')
(s/'trade.rs').write_text(current+'\n'+ordinary+'\n\n'+tail+'\ninclude!("buy_v3_dispatch.rs");\n')
lib=(p/'inputs/current/lib.rs').read_text();oldline='pub fn buy_v3(ctx: Context<SellV3>, amount:u64,max_sol_cost:u64,partial_fill:OptionBool)->Result<()>{let _ = partial_fill;trade::buy(ctx,amount,max_sol_cost)}'
newline=oldline.replace('Context<SellV3>','Context<BuyV3Dispatch>').replace('trade::buy(','trade::buy_dispatch(')
assert lib.count(oldline)==1
(s/'lib.rs').write_text(lib.replace(oldline,newline))
for n in ['buy_v3_fee.rs','buy_v3_admission.rs']:(s/n).write_bytes((p/'review/composition/proposed/programs/pump/src'/n).read_bytes())
(s/'buy_v3_dispatch.rs').write_bytes((p/'composite.rs').read_bytes())
patch=''
for f in sorted(s.iterdir()):
 before=(p/'inputs/current'/f.name).read_text() if (p/'inputs/current'/f.name).exists() else ''
 path='programs/pump/src/'+f.name
 patch+=''.join(difflib.unified_diff(before.splitlines(True),f.read_text().splitlines(True),fromfile='a/'+path if before else '/dev/null',tofile='b/'+path))
(p/'integration.patch').write_text(patch)
