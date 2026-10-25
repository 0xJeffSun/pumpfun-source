from pathlib import Path
import sys,json,gzip,struct,importlib.util
P=Path(__file__).resolve().parent;sys.path.insert(0,str(P/'approved-proposal'));import disasm
sys.path.insert(0,str(P/'static-inputs'));from elf_reader import Elf
from analyze import format_selector
x=disasm.a.Elf((P/'unstripped.so').read_bytes());f=json.load(gzip.open(P/'full-candidate-call-data-ledger.json.gz'));by={z['start']:z for z in f}
sym=lambda needle:next(z for z in f if any(needle in n for n in z['names']))
app=sym('admin_cto7execute');wrap=sym('__global9admin_cto');ae=sym('From$LT$anchor_lang..error..AnchorError');pe=sym('From$LT$solana_program_error..ProgramError');parser=next(z for z in f if any('AdminCto' in n and 'try_accounts' in n for n in z['names']))
ins=lambda p:struct.unpack('<BBhi',x.at(p,8))
# Derive exact new guard operands from fresh symbol body; no source/build variant.
assert app['start']==441928
code_rows=[]
for pc in range(app['start'],app['end'],8):
 if ins(pc)[0]==0x62 and ins(pc)[3]==6083:code_rows.append(pc)
assert len(code_rows)==1;codepc=code_rows[0]
assert ins(441952)==(0x71,0x10,162,0)
# Guard still reads typed holder byte165, and name/Display selector83.
body=disasm.render(x,app['start'],app['end']);assert 'u8[r1+165]'in body
region=[z for z in app['direct_calls'] if codepc-600<=z['pc']<=codepc+120]
assert any(z['target']==ae['start']for z in region)
assert ins(ae['start']+16)==(0xb7,1,0,160);assert ins(pe['start']+16)==(0xb7,1,0,128)
e=Elf(P/'candidate.so');debug=sym('PumpError$u20$as$u20$core..fmt..Debug');display=sym('PumpError$u20$as$u20$core..fmt..Display')
name=format_selector(e,debug['start'],83,'debug');msg=format_selector(e,display['start'],83,'display')
assert name['text']=='HolderRewardCreatorImmutable';assert msg['text']=='The creator of a holder-reward coin cannot be changed'
assert any(c['target']==app['start'] for c in wrap['direct_calls'])
assert ins(441960)==(0x55,0,35,0)
assert ins(442016)==(0x71,0x10,165,0)and ins(442040)==(0x55,5,106,0)
assert int.from_bytes(x.at(1463456,4),'little')==83
assert x.at(1465224,16)==b'src/admin_cto.rs'
assert ins(443816)==(0x62,10,-1736,103)
assert any(z['pc']==1120320 and z['target']==27824 for z in wrap['direct_calls'])
# Preserve full app/wrapper/parser/error conversion and all immediate callees, with complete row metadata.
selected={app['start'],wrap['start'],parser['start'],ae['start'],pe['start'],debug['start'],display['start']}
for s in list(selected):selected.update(c['target'] for c in by[s]['direct_calls'] if c['target'] in by)
D=P/'owned-static';D.mkdir(exist_ok=True)
for s in sorted(selected):(D/f'{s}.asm').write_text(disasm.render(x,s,by[s]['end']))
frames=[{'start':z['start'],'names':z['names'],'out_of_range':[a for a in z['direct_r10_accesses']if a['offset'] < -4096 or a['offset']>=0]} for z in f];assert not any(z['out_of_range']for z in frames)
r={'status':'PASS','app':app,'wrapper':wrap,'parser':parser,'anchor_converter':ae,'program_converter':pe,'selected_full_functions':[by[s] for s in sorted(selected)],'name_selection':name,'message_selection':msg,'truthful_origin':{'filename':'src/admin_cto.rs','line':103},'guard_flag_offset':165,'numeric_code':6083,'code_store':codepc,'anchor_box_bytes':160,'program_box_bytes':128,'runtime_not_yet_started':True,'limitations':['Historical source filename/line differ truthfully.','Other numeric guards unchanged.','Whole app/program raw identity not established.']}
(D/'acceptance.json').write_text(json.dumps(r,indent=2)+'\n');(P/'stack-observations.json').write_text(json.dumps({'backend_errors':[],'frames':frames},indent=2)+'\n');print(json.dumps({k:v for k,v in r.items()if k not in ['app','wrapper','parser','anchor_converter','program_converter','selected_full_functions','name_selection','message_selection']},indent=2))
