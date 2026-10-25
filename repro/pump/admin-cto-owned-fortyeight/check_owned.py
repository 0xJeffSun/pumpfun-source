from pathlib import Path
import sys,json,gzip,struct,importlib.util
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'approved-proposal'));import disasm
sys.path.insert(0,str(P/'static-inputs'));from elf_reader import Elf
from analyze import format_selector
x=disasm.a.Elf((P/'unstripped.so').read_bytes());f=json.load(gzip.open(P/'full-candidate-call-data-ledger.json.gz'));by={z['start']:z for z in f}
sym=lambda needle:next(z for z in f if any(needle in n for n in z['names']))
app=sym('admin_cto7execute');wrap=sym('__global9admin_cto');ae=sym('From$LT$anchor_lang..error..AnchorError');pe=sym('From$LT$solana_program_error..ProgramError');parser=next(z for z in f if any('AdminCto' in n and 'try_accounts' in n for n in z['names']))
ins=lambda p:struct.unpack('<BBhi',x.at(p,8))
assert (app['start'],app['end'])==(441928,467648)
assert ins(441952)==(0x71,0x10,162,0);assert ins(441960)==(0x55,0,22,0)
assert ins(442536)==(0x62,10,-1608,6088);assert ins(442552)==(0x62,10,-1736,103)
assert x.at(1464896,16)==b'src/admin_cto.rs'
assert struct.unpack('<I',x.at(1462936,4))[0]==88
for pc,target in [(442176,1194088),(442320,1221488),(442608,ae['start'])]:
 op,r,o,i=ins(pc);assert op==133 and pc+8+i*8==target
assert ins(ae['start']+16)==(0xb7,1,0,160);assert ins(pe['start']+16)==(0xb7,1,0,128)
e=Elf(P/'candidate.so');debug=sym('PumpError$u20$as$u20$core..fmt..Debug');display=sym('PumpError$u20$as$u20$core..fmt..Display')
name=format_selector(e,debug['start'],88,'debug');msg=format_selector(e,display['start'],88,'display')
assert name['text']=='CtoNotAllowedForMayhemCoin';assert msg['text']=='CTO is not allowed on a mayhem-mode coin'
assert any(c['target']==app['start'] for c in wrap['direct_calls'])
# Preserve full app/wrapper/parser/error conversion and all immediate callees, with complete row metadata.
selected={app['start'],wrap['start'],parser['start'],ae['start'],pe['start'],debug['start'],display['start']}
for s in list(selected):selected.update(c['target'] for c in by[s]['direct_calls'] if c['target'] in by)
D=P/'owned-static';D.mkdir(exist_ok=True)
for s in sorted(selected):(D/f'{s}.asm').write_text(disasm.render(x,s,by[s]['end']))
frames=[{'start':z['start'],'names':z['names'],'out_of_range':[a for a in z['direct_r10_accesses']if a['offset'] < -4096 or a['offset']>=0]} for z in f];assert not any(z['out_of_range']for z in frames)
r={'status':'PASS','app':app,'wrapper':wrap,'parser':parser,'anchor_converter':ae,'program_converter':pe,'selected_full_functions':[by[s] for s in sorted(selected)],'name_selection':name,'message_selection':msg,'truthful_origin':{'filename':'src/admin_cto.rs','line':103,'literal_address':1464896},'guard_flag_offset':162,'numeric_code':6088,'anchor_box_bytes':160,'program_box_bytes':128,'runtime_not_yet_started':True,'limitations':['Historical source filename/line differ truthfully.','Other numeric guards unchanged.','Whole app/program raw identity not established.']}
(D/'acceptance.json').write_text(json.dumps(r,indent=2)+'\n');(P/'stack-observations.json').write_text(json.dumps({'backend_errors':[],'frames':frames},indent=2)+'\n');print(json.dumps({k:v for k,v in r.items()if k not in ['app','wrapper','parser','anchor_converter','program_converter','selected_full_functions','name_selection','message_selection']},indent=2))
