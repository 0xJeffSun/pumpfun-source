"""Fresh complete admitted mode/helper and current buy bodies; no target execution."""
from pathlib import Path
import importlib.util,json,struct,hashlib,sys
P=Path(__file__).resolve().parent
s=importlib.util.spec_from_file_location('d',P/'fee-basis-static/disasm.py');d=importlib.util.module_from_spec(s);s.loader.exec_module(d)
def generate():
 o=d.a.Elf((P/'static-inputs/original.so').read_bytes());c=d.a.Elf((P/'unstripped.so').read_bytes());b=d.a.Elf((P/'static-inputs/symbols.so').read_bytes())
 def body(e,key):
  f=next(f for f in e.symbols if f['type']==2 and key in f['name']);return e.function(f['start'],f['size'],[f['name']])
 current=body(c,'trade3buy17');before=body(b,'trade3buy17');exact=body(c,'trade15buy_exact_quote17');oldexact=body(b,'trade15buy_exact_quote17');mode=o.function(516272,992,[]);caller=o.function(1342408,168,[])
 # The complete candidate has two quote-branch paths. Both inspect complete
 # before either can reach a cashback branch; retain the actual encoded CFG.
 expected={573144:(0x71,0x81,161,0),573168:(0x15,1,1,0),573184:(0x71,0x81,163,0),573416:(0x15,1,90,0),574144:(0x71,0x81,163,0),573816:(0x62,10,-752,6005),574040:(0x62,10,-752,6094)}
 for pc,v in expected.items():assert struct.unpack('<BBhi',c.at(pc,8))==v,(pc,v)
 assert c.at(exact['start'],exact['bytes'])==b.at(oldexact['start'],oldexact['bytes'])
 result={'original_mode':mode,'admitted_original_buy_caller':caller,'before_buy':before,'current_buy':current,'exact_quote_body_raw_unchanged':True,'current_exact_quote':exact,'candidate_sha256':hashlib.sha256((P/'candidate.so').read_bytes()).hexdigest(),'before_candidate_sha256':hashlib.sha256((P/'static-inputs/candidate.so').read_bytes()).hexdigest(),'candidate_buy_different_offsets':[i for i,(x,y)in enumerate(zip(c.at(current['start'],current['bytes']),b.at(before['start'],before['bytes'])))if x!=y],'raw_original_mode_equal':o.at(mode['start'],mode['bytes'])==c.at(current['start'],current['bytes'])}
 oldraw=(P/'static-inputs/candidate.so').read_bytes();newraw=(P/'candidate.so').read_bytes()
 changes=[{'offset':i,'before':x,'after':y}for i,(x,y)in enumerate(zip(oldraw,newraw))if x!=y]
 assert len(oldraw)==len(newraw) and len(changes)==9 and all(current['start']<=x['offset']<current['end']for x in changes)
 delta={'same_length':True,'differences':changes,'scope':'Complete raw file comparison to accepted2b7 baseline; no original identity claim.'}
 out={'mode-order-static-review.json':result,'baseline-byte-differences.json':delta}
 for name,e,row in [('original-mode',o,mode),('admitted-buy-caller',o,caller),('before-buy',b,before),('current-buy',c,current),('current-exact-quote',c,exact)]:out['mode-order-static/'+name+'.asm']=d.render(e,row['start'],row['end'])
 return out
if __name__=='__main__':
 check='--check'in sys.argv
 for n,v in generate().items():
  text=v if isinstance(v,str)else json.dumps(v,sort_keys=True,indent=2)+'\n';p=P/n
  if check:assert p.read_text()==text,n
  else:p.parent.mkdir(exist_ok=True);p.write_text(text)
 print('PASS complete mode/buy bodies and exact-quote nonchange')
