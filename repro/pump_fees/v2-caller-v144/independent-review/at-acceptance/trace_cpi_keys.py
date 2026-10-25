"""Read-only straight-line symbolic key composition after account admission.

This is not a VM, runtime fixture, or proof of error/ownership equivalence. It
follows key pointers through selected clone/copy regions. Branches (including
unconditional jumps) are recorded, not evaluated; this is not an executable
path proof. Every such edge remains a separate obligation. No target ELF is
modified and no program is run.
"""
from pathlib import Path
import hashlib, json, struct
from disasm import a

P = Path(__file__).resolve().parent
E = a.Elf((P / 'inputs/original.so').read_bytes())
H = lambda b: hashlib.sha256(b).hexdigest()
PTR = lambda base, off=0: ('ptr', base, off)

def ins(pc):
    op, regs, off, imm = struct.unpack('<BBhi', E.at(pc, 8))
    return op, regs & 15, regs >> 4, off, imm

def plus(x, n):
    if isinstance(x, int): return x + n
    if isinstance(x, tuple) and x[0] == 'ptr': return PTR(x[1], x[2] + n)
    return ('add', x, n)

class Trace:
    def __init__(self):
        self.reg = {i: ('unknown-register', i) for i in range(11)}
        self.mem = {}; self.calls = []; self.branches = []; self.writes = []
    def load(self, p): return self.mem.get(p, ('load', p))
    def store(self, p, value, pc=None):
        self.mem[p] = value
        if pc is not None: self.writes.append({'pc':pc, 'address':p, 'value':value})
    def copy(self, dest, source, n, pc):
        assert isinstance(n, int) and 0 <= n <= 672
        values = [self.load(plus(source, k)) for k in range(0, n, 8)]
        for k, v in zip(range(0,n,8), values): self.store(plus(dest,k),v,pc)
    def run(self, start, end, stop_target):
        pc = start
        while pc < end:
            if SKIP_REGION is not None and pc == SKIP_REGION[0]:
                self.branches.append({'from':pc,'to':SKIP_REGION[1],'scope':'exclude complete non-CPI cleanup arm from conditional CPI key trace'})
                pc=SKIP_REGION[1]
            op,d,s,off,imm = ins(pc); step=16 if op==24 else 8
            if op == 24:
                self.reg[d] = struct.unpack_from('<I',E.at(pc,16),4)[0] | struct.unpack_from('<I',E.at(pc,16),12)[0]<<32
            elif op == 0xbf: self.reg[d] = self.reg[s]
            elif op == 0xb7: self.reg[d] = imm
            elif op == 0x07: self.reg[d] = plus(self.reg[d],imm)
            elif op & 7 == 1:
                self.reg[d] = self.load(plus(self.reg[s],off))
            elif op & 7 in (2,3):
                self.store(plus(self.reg[d],off), self.reg[s] if op & 7 == 3 else imm, pc)
            elif op == 0x85:
                rel=E.relocations.get(pc)
                target=pc+8+imm*8
                if rel and rel['type']==10:
                    # These external abort blocks are reached only by the
                    # excluded refcount-overflow edge of this normal trace.
                    assert rel['symbol']=='abort'
                    self.calls.append({'pc':pc,'external':rel['symbol'],'normal_trace_skips_abort_block':True})
                elif target==stop_target:
                    self.calls.append({'pc':pc,'target':target,'arguments':{str(i):self.reg[i] for i in range(1,6)}})
                    return self.reg.copy()
                elif target==63024:
                    # Complete original AccountInfo clone body is retained.
                    # Original writes 43 meaningful bytes, not padding 43..47.
                    for k in (0,8,16,24,32,40,41,42):
                        self.store(plus(self.reg[1],k),self.load(plus(self.reg[2],k)),pc)
                    self.calls.append({'pc':pc,'target':target,'operation':'key-preserving AccountInfo clone; refcount behavior outside this proof'})
                    for i in range(6):self.reg[i]=('clobbered',pc,i)
                elif target==796360:
                    self.copy(self.reg[1],self.reg[2],self.reg[3],pc)
                    self.calls.append({'pc':pc,'target':target,'operation':'memcpy'})
                    for i in range(6):self.reg[i]=('clobbered',pc,i)
                elif target==796464:
                    self.calls.append({'pc':pc,'target':target,'operation':'owner comparison; normal CPI branch assumed'})
                    for i in range(6):self.reg[i]=('clobbered',pc,i)
                else: raise AssertionError(('unmodeled call',pc,target))
            elif op & 7 in (5,6):
                assert op != 0x95, ('unexpected return',pc)
                self.branches.append({'pc':pc,'target':pc+8+off*8,'opcode':op,'scope':'conditional key provenance only'})
            elif op & 7 in (4,7):
                self.reg[d]=('scalar',pc)
            else: raise AssertionError(('unmodeled opcode',pc,op))
            pc+=step
        raise AssertionError(('stop not reached',stop_target))

# Each record is anchored in the original parser's account-name error wrapper,
# successful local preservation and final context store. These offsets are not
# inferred from the candidate Rust declaration order.
FIELDS = [
 ('event_authority',None,502800,None,544,'pointer',518424),
 ('program',502288,502648,-2752,552,'pointer',518440),
 ('authority',502360,502720,-2760,560,'pointer',518456),
 ('global',502432,502888,-2768,568,'box',518472),
 ('mint',503032,503096,-2776,88,'pointer',518080),
 ('sharing_config',503360,503608,-2816,576,'box96',518488),
 ('bonding_curve',503752,503960,-2824,584,'box0',518504),
 ('pump_creator_vault',503824,503888,-2848,256,'inline',518144),
 ('pump_creator_vault_ata',504200,504264,-2888,304,'inline',518192),
 ('system_program',504520,504800,-2912,592,'pointer',518520),
 ('pump_program',504592,504872,-2936,600,'pointer',518536),
 ('pump_event_authority',504664,504728,-2944,352,'inline',518240),
 ('pump_amm_program',505352,505568,-2976,608,'pointer',518552),
 ('amm_event_authority',505424,505496,-2992,400,'inline',518288),
 ('quote_mint',505944,506016,-3016,216,'pointer',518128),
 ('token_program',506272,506600,-3008,616,'pointer',518568),
 ('associated_token_program',506344,506680,-3048,624,'pointer',518584),
 ('coin_creator_vault_authority',506416,506520,-3064,448,'inline',518336),
 ('coin_creator_vault_ata',507024,507128,-3096,496,'inline',518384),
]

def parser_bindings():
    out=[]
    for name,call,diag,spill,offset,kind,store in FIELDS:
        op,d,s,_,_=ins(diag); assert op==24 and d==4
        addr=struct.unpack_from('<I',E.at(diag,16),4)[0]
        op,d,s,_,n=ins(diag+16); assert op==0xb7 and d==5
        assert E.at(addr,n).decode()==name
        op,_,_,_,disp=ins(diag+24); assert op==0x85 and diag+32+disp*8==5512
        op,d,s,off,_=ins(store); assert op==0x7b and d==6 and off==offset
        if spill is not None:
            op,ld,ls,lo,_=ins(store-8);assert op==0x79 and ld==s and ls==10 and lo==spill
            definitions=[]
            for pc in range(502096,store-8,8):
                io,id,is_,iff,im=ins(pc)
                if io==0x7b and id==10 and iff==spill:definitions.append(pc)
            assert len(definitions)==1,(name,definitions)
        else:
            definitions=[502168];assert s==9 and ins(502168)==(0x79,9,8,0,0)
        if call is not None:
            op,_,_,_,disp=ins(call);assert op==0x85
            primitive=call+8+disp*8
        else:primitive=None
        out.append({'name':name,'original_parser':502096,'parse_call':call,'parse_target':primitive,'diagnostic_pc':diag,'diagnostic_bytes_sha256':H(E.at(addr,n)),'successful_preservation_definitions':definitions,'local_spill':spill,'context_key_or_container_offset':offset,'representation':kind,'final_store_pc':store,'scope':'successful-admission field provenance; admission and error equivalence remain separate'})
    return out

def initial():
    t=Trace();t.reg[7]=PTR('context');t.reg[10]=PTR('caller-frame')
    for name,_,_,_,off,kind,_ in FIELDS:
        ai=PTR('account:'+name)
        if kind=='inline': ai=PTR('context',off)
        elif kind in ('box0','box96'):
            box=PTR('container:'+name);t.store(PTR('context',off),box);t.store(plus(box,96 if kind=='box96' else 0),ai)
        else:t.store(PTR('context',off),ai)
        t.store(ai,('key',name))
        for k in (8,16,24,32,40,41,42):t.store(plus(ai,k),('field',name,k))
    return t

def trace_one(program,caller,adapter,generated,expected):
    t=initial()
    args=t.run(caller,218728 if program=='pump' else 217448,adapter)
    caller_receipt={'call':t.calls[-1],'branches':t.branches.copy(),'writes':t.writes.copy()}
    t.reg={i:('unknown-register',i) for i in range(11)}
    for i in range(1,6):t.reg[i]=args[i]
    t.reg[10]=PTR('adapter-frame')
    # Compose the AMM CPI blocks separately from the reserve/owner cleanup arm.
    saved_calls=len(t.calls);saved_branches=len(t.branches);saved_writes=len(t.writes)
    if program=='pump_amm':
        global SKIP_REGION
        SKIP_REGION=(240464,241952)
    else:SKIP_REGION=None
    args=t.run(adapter,243136 if program=='pump_amm' else 237416,generated)
    base=args[2]
    keys=[t.load(plus(base,72+48*i)) for i in range(12)]
    actual=[v[1] if isinstance(v,tuple) and v[0]=='key' else v for v in keys]
    assert actual==expected,(program,actual,expected)
    invocation=t.load(plus(base,24))
    assert invocation==('key','pump_program' if program=='pump' else 'pump_amm_program'),invocation
    assert t.load(plus(base,656))==0,'signer seeds nonempty or unresolved'
    return {'program':program,'caller':caller_receipt,'adapter':{'call':t.calls[-1],'calls':t.calls[saved_calls:],'branches':t.branches[saved_branches:],'writes':t.writes[saved_writes:]},'fixed_key_order':actual,'invocation_program_key':invocation,'signer_seed_length':0,'scope':'straight-line key composition conditional on successful admission and applicable CPI blocks; branches, including unconditional jumps, are not evaluated. No executable was changed.'}

SKIP_REGION=None

def run():
    bindings=parser_bindings()
    pump=['authority','mint','bonding_curve','sharing_config','pump_creator_vault','system_program','pump_event_authority','pump_program','pump_creator_vault_ata','quote_mint','token_program','associated_token_program']
    amm=['authority','quote_mint','token_program','system_program','associated_token_program','sharing_config','coin_creator_vault_authority','coin_creator_vault_ata','pump_creator_vault','pump_creator_vault_ata','amm_event_authority','pump_amm_program']
    traces=[trace_one('pump',217984,236240,548160,pump),trace_one('pump_amm',214248,240088,586976,amm)]
    return {'original_sha256':H(E.b),'parser_bindings':bindings,'traces':traces,'whole_file_identity':False,'runtime_cases':0,'limits':['This is conditional straight-line named-key composition, not an executed path or complete parser, clone, cleanup, CPI or target semantics.','Both conditional and unconditional branch effects remain unevaluated.','Unique parser spills alone do not connect their values to parse returns; the independent parser-links review provides those bounded bridges.','AccountInfo clone abstraction preserves its meaningful fields only; padding bytes 43..47 remain unspecified.','No historical Rust layout or source identity is inferred.','No binary, signer, account, runtime control or transaction was modified.']}

if __name__=='__main__':
    result=run();(P/'cpi-key-provenance.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps({'fields':len(result['parser_bindings']),'chains':[{k:x[k] for k in ['program','fixed_key_order','invocation_program_key','signer_seed_length']}for x in result['traces']]}))
