"""Static decoding only. Never executes SBF, emulates it, or constructs transactions."""
import hashlib, json, struct
from pathlib import Path
import disasm
P=Path(__file__).resolve().parent

def digest(b): return hashlib.sha256(b).hexdigest()
def derive():
    windows=[]
    for f in sorted((P/'disassembly').glob('*.txt'),key=lambda f:int(f.stem)):
        o=int(f.stem); w=disasm.W[o]; a,z=w['start'],w['end']
        ins=list(disasm.instructions(a,z)); calls=[]; branches=[]
        for pc,raw,t in ins:
            op,reg,off,imm=struct.unpack_from('<BBhi',disasm.B,pc)
            if op==0x85:
                # Relative operand controls local calls, never an annotated name.
                calls.append({'pc':pc,'src':reg>>4,'imm':imm,'target':pc+8+8*imm,
                    'external':disasm.EXTERNAL.get(pc)})
            elif op==0x8d: calls.append({'pc':pc,'indirect_register_operand':imm})
            elif op&7 in (5,6) and op not in (0x95,):
                branches.append({'pc':pc,'target':pc+8+8*off,'opcode':op})
        windows.append({'ordinal':o,'range':[a,z],'sha256':digest(disasm.B[a:z]),
            'calls':calls,'branches':branches,'instruction_count':len(ins)})
    # Data read only at identified constant sites. All half-open file offsets.
    spans=[(752896,752928),(753024,753056),(753088,753120),(753152,753184),
        (753248,753280),(754884,754899),(756958,756975),(757589,757597),
        (758342,758374),(759376,759380)]
    data=[{'range':[a,z],'hex':disasm.B[a:z].hex(),'sha256':digest(disasm.B[a:z])} for a,z in spans]
    # Context error-code sites paired with immediately following account-name attachment.
    errors=[]
    for o in [150,154]:
        w=disasm.W[o]; ins=list(disasm.instructions(w['start'],w['end']))
        for j,(pc,raw,t) in enumerate(ins):
            if t!='call 665312':continue
            code=struct.unpack_from('<i',disasm.B,ins[j-1][0]+4)[0]
            name=None; span=None
            following=ins[j+1:j+12]
            for k,(q,r,s) in enumerate(following):
                if s.startswith('r4 = ') and '(lddw)' in s and k+1<len(following):
                    address=int(s.split()[2]); sztext=following[k+1][2]
                    if sztext.startswith('r5 = '):
                        n=int(sztext.split()[2]); span=[address,address+n]
                        name=disasm.B[address:address+n].decode('utf-8')
                        data.append({'range':span,'hex':disasm.B[address:address+n].hex(),'sha256':digest(disasm.B[address:address+n])})
            errors.append({'window':o,'call_pc':pc,'code':code,'account_name':name,'data_range':span})
    return {'windows':windows,'data_ranges':data,'context_error_sites':errors}
if __name__=='__main__': print(json.dumps(derive(),indent=2))
