"""Verify original Pool helper shapes and call ABI on root's exact final artifact."""
from pathlib import Path
import hashlib, importlib.util, json, struct

ROOT = Path(__file__).resolve().parents[3]
CANDIDATE = Path(__file__).resolve().parent/'results/build/candidate.so'
SYMBOLS = CANDIDATE.with_name('unstripped.so')
EXPECTED = '5cd7879af0d9733d1f7d3847be46aa4c5ff214fca2250d1c69d03c49cbc85d1a'
sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
spec = importlib.util.spec_from_file_location('pool_elf', ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool/elf_reader.py')
reader = importlib.util.module_from_spec(spec); spec.loader.exec_module(reader)
assert sha(CANDIDATE) == EXPECTED
original = reader.Elf(ROOT/'evidence/original/pump_amm/deployed.so')
candidate = reader.Elf(CANDIDATE); symbols = reader.Elf(SYMBOLS)
assert candidate.b[candidate.lo:candidate.hi] == symbols.b[symbols.lo:symbols.hi]

def named(fragment):
    rows = [f for f in symbols.funcs if fragment in f['name']]
    assert len(rows) == 1, (fragment, rows)
    return rows[0]

def body(function):
    return candidate.normalized[function['start']:function['start']+function['size']]

rows=[]; functions={}
specs=[('total_accrued_fees',0x6ba68,616,[0x200,0x208]),
       ('available_quote_reserves',0x6bcd0,640,[0x218,0x220]),
       ('market_cap',0x6b780,744,[0x270,0x278]),
       ('total_virtual_quote_reserves',0x6bf50,760,[0x280,0x288])]
for name,address,size,allowed in specs:
    function=named(str(len(name))+name+'17h');functions[name]=function
    assert function['size']==size
    a=original.normalized[address:address+size];b=body(function)
    differences=[off for off in range(0,size,8)if a[off:off+8]!=b[off:off+8]]
    assert differences==allowed,(name,differences)
    assert original.pattern(address,size)==candidate.pattern(function['start'],size)
    values=[]
    for off in differences:
        assert a[off:off+4]==b[off:off+4]
        values.append({'offset':hex(off),'original_immediate':struct.unpack_from('<i',a,off+4)[0],
                       'candidate_immediate':struct.unpack_from('<i',b,off+4)[0]})
    assert values[1]['original_immediate']==35 and values[1]['candidate_immediate']==17
    rows.append({'name':name,'original_start':hex(address),'candidate_start':hex(function['start']),
                 'bytes':size,'all_non_origin_instructions_equal':True,'relocation_pattern_equal':True,
                 'source_origin_differences':values})

available=functions['available_quote_reserves'];total=functions['total_accrued_fees'];virtual=functions['total_virtual_quote_reserves']
assert candidate.b[available['start']:available['start']+8] == bytes.fromhex('bf37000000000000')
assert candidate.calls[available['start']+32]==total['start']
assert candidate.calls[virtual['start']+40]==total['start']
predicate=named('19liquidity_can_boost17h')
assert predicate['size']==224 and body(predicate)==original.normalized[0x6c248:0x6c248+224]
assert candidate.pattern(predicate['start'],224)==original.pattern(0x6c248,224)
assert candidate.calls[predicate['start']+24]==virtual['start']

deposit=named('18pump_amm_recovered7deposit17h')
calls=[s for s in candidate.callsites(deposit['start'],deposit['size'])if s['target']==available['start']]
assert len(calls)==1
site=deposit['start']+calls[0]['offset'];setup=candidate.b[site-64:site]
assert bytes.fromhex('0702000008000000') in setup, 'Pool pointer adjustment to r2 missing'
assert bytes.fromhex('7913680000000000') in setup, 'Quote amount load to r3 missing'
assert bytes.fromhex('7912080100000000') not in setup and bytes.fromhex('7913100100000000') not in setup
report={'candidate':str(CANDIDATE.relative_to(ROOT)),'candidate_sha256':sha(CANDIDATE),
        'symbols_sha256':sha(SYMBOLS),'original_sha256':sha(ROOT/'evidence/original/pump_amm/deployed.so'),
        'reader_sha256':sha(ROOT/'repro/pump_amm/claim-self-transfer-v144/static-tool/elf_reader.py'),
        'helpers':rows,'predicate':{'original':'0x6c248','candidate':hex(predicate['start']),'bytes':224,'normalized_exact':True},
        'deposit':{'candidate':hex(deposit['start']),'bytes':deposit['size'],'available_quote_call_offset':calls[0]['offset'],
                   'pool_reference_in_r2':True,'quote_in_r3':True,'promoted_fee_scalar_loads_absent':True},
        'scope':'Complete helper instruction/relocation comparison plus actual deposit ABI call setup. Source-origin immediates remain different; no helper whole-byte identity claim.'}
print(json.dumps(report,indent=2))
