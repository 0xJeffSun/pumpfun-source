from pathlib import Path
import sys,json,gzip,struct
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'approved-proposal'));import disasm
sys.path.insert(0,str(P/'static-inputs'));from elf_reader import Elf
from analyze import format_selector
x=disasm.a.Elf((P/'unstripped.so').read_bytes());rows=json.load(gzip.open(P/'full-candidate-call-data-ledger.json.gz'));sym=lambda s:next(r for r in rows if any(s in n for n in r['names']));by={r['start']:r for r in rows};app=sym('admin_cto7execute');wrapper=sym('__global9admin_cto');ae=sym('From$LT$anchor_lang..error..AnchorError');pe=sym('From$LT$solana_program_error..ProgramError');debug=sym('PumpError$u20$as$u20$core..fmt..Debug');display=sym('PumpError$u20$as$u20$core..fmt..Display');e=Elf(P/'candidate.so');ins=lambda p:struct.unpack('<BBhi',x.at(p,8));D=P/'batch-static';D.mkdir(exist_ok=True)
sel={app['start'],wrapper['start'],ae['start'],pe['start'],debug['start'],display['start']}
for a in list(sel):sel.update(c['target']for c in by[a]['direct_calls']if c['target']in by)
for a in sel:(D/f'{a}.asm').write_text(disasm.render(x,a,by[a]['end']))
checks=[]
for code,line in [(6084,104),(6090,106),(6089,106),(6077,110),(6078,111),(6088,103),(6083,103),(6080,109)]:
 pcs=[p for p in range(app['start'],app['end'],8)if ins(p)[0]==0x62 and ins(p)[3]==code];assert len(pcs)==1,(code,pcs);pc=pcs[0]
 # Source aggregate uses the proven AnchorError field layout; inspect all nearby stores.
 around=[(p,ins(p))for p in range(pc-80,pc+120,8)];assert any(v[0]==0x62 and v[3]==line for p,v in around),(code,line)
 assert any(v[0]==0x72 and v[3]==2 for p,v in around),code
 assert any(v[0]==0x7a and v[3]==0 for p,v in around),code
 calls=[c for c in app['direct_calls']if pc<c['pc']<=pc+160];assert any(c['target']==ae['start']for c in calls),(code,calls)
 checks.append({'code':code,'store':pc,'source_line':line,'name':format_selector(e,debug['start'],code-6000,'debug'),'message':format_selector(e,display['start'],code-6000,'display'),'conversion_calls':calls})
assert ins(ae['start']+16)==(0xb7,1,0,160)and ins(pe['start']+16)==(0xb7,1,0,128)
assert any(c['target']==app['start']for c in wrapper['direct_calls'])and any(c['target']==27824 for c in wrapper['direct_calls'])
frames=[{'start':r['start'],'outside':[v for v in r['direct_r10_accesses']if v['offset'] < -4096 or v['offset']>=0]}for r in rows];assert not any(f['outside']for f in frames)
out={'status':'PASS','app':app,'wrapper':wrapper,'checks':checks,'anchor_converter':ae,'generic_converter':pe,'selected_full_functions':[by[a]for a in sorted(sel)],'source':'Truthful src/admin_cto.rs, actual source lines; original coordinates remain different.','runtime_executions':0};(D/'acceptance.json').write_text(json.dumps(out,indent=2)+'\n');(P/'stack-observations.json').write_text(json.dumps(frames,indent=2)+'\n');print(json.dumps({'status':'PASS','codes':[r['code']for r in checks],'application':[app['start'],app['end']],'wrapper':[wrapper['start'],wrapper['end']]}))
