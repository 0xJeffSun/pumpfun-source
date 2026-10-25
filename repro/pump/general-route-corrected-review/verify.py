#!/usr/bin/env python3
"""Static package verifier; standard library only; never runs target code."""
import argparse, hashlib, json, pathlib, struct, subprocess, sys
P = pathlib.Path(__file__).resolve().parent
sha = lambda b: hashlib.sha256(b).hexdigest()
def js(n): return json.loads((P/n).read_text())
def check(ok, message):
    if not ok: raise SystemExit('FAIL: '+message)
def spans(rows):
    out=[]
    for off,b in sorted(rows.items()):
        end=off+len(b)
        if out and off<=out[-1][1]: out[-1][1]=max(end,out[-1][1])
        else: out.append([off,end])
    return out
ap=argparse.ArgumentParser();ap.add_argument('--repo');args=ap.parse_args()
manifest=js('manifest-sha256.json')
files=set()
for p in P.rglob('*'):
    check(not p.is_symlink(),'symlink')
    if p.is_file() and p!=P/'manifest-sha256.json': files.add(p.relative_to(P).as_posix())
check(files==set(manifest),'exact package inventory')
for n,h in manifest.items(): check(sha((P/n).read_bytes())==h,'hash '+n)
for row in js('inputs.json'):
    b=(P/row['copy']).read_bytes()
    check(len(b)==row['whole_bytes'] and sha(b)==row['whole_sha256'],'input identity')
    check(row['consumed_bytes']==[0,len(b)],'full copied input byte range')
    check(row['consumed_lines']==[1,len(b.splitlines())],'copied input line range')
pre='prior/pump_route_preflight/'
rev='prior/pump_route_source_review/'
check((P/'source-hypothesis.rs').read_bytes()==(P/pre/'sources/corrected.rs').read_bytes(),'corrected source identity')
after=(P/'source-hypothesis.rs').read_text().splitlines(True)
check(len(after)==414,'corrected source length')
# Only the 25-line helper insertion and five-line callsite insertion are allowed.
before=''.join(after[:168]+after[193:290]+after[295:])
check(before==(P/rev/'sources/proposed.rs').read_text(),'no unrelated changes')
check(before==(P/pre/'sources/before.rs').read_text(),'before source binding')
source=''.join(after)
helper=''.join(after[168:193])
check('token.owner\n    };\n    require_keys_neq!' in helper,'borrow ends before membership')
check('&authority,quote_mint,selected_token_program);' in helper,'ATA argument identities')
check('if flag & 1 != 0' in ''.join(after[290:295]),'bit zero gate')
order=['admit_vaults(&h)?;', 'preflight_buyback_recipient(&a.global', 'let buy =',
       'let selected =', 'let p_rate =', 'let (base_amount,quote_amount,pf,cf,output)',
       'let quote_before_adapter', 'if buy && native', 'let c = &mut h.bonding_curve;',
       'if last && (buy || !native)', 'let adapter_difference', 'let product =',
       'h.bonding_curve.protocol_fees =', 'h.bonding_curve.creator_fee =',
       'native_buyback(a,', 'if native && !buy && last', 'let event = TradeEvent',
       'route_event(a,&event', 'h.exit(&crate::ID)?;', 'current_mint = if buy',
       'previous = Some', 'amount = output;', 'total_buyback = add',
       'require_keys_eq!(current_mint,a.destination.mint']
pos=[source.index(s) for s in order]
check(pos==sorted(pos),'full route operation ordering')
rows={}
def include(pc,h):
    b=bytes.fromhex(h)
    check(pc not in rows or rows[pc]==b,'overlap bytes')
    rows[pc]=b
for unit in js(pre+'ranges.json')['assemblies']:
    for pc,h in unit['instructions']: include(pc,h)
for unit in js(rev+'ranges.json'): include(unit['offset'],unit['hex'])
check(spans(rows)==js('original-ranges.json')['instruction_byte_ranges'],'exact consumed instruction union')
def branch(pc,target):
    check(pc+8+8*struct.unpack_from('<h',rows[pc],2)[0]==target,'branch '+hex(pc))
def call(pc,target):
    check(rows[pc][:2]==bytes.fromhex('8510'),'relative call encoding')
    check(pc+8+8*struct.unpack_from('<i',rows[pc],4)[0]==target,'call '+hex(pc))
for pc,target in [(0x5c498,0x5c5c8),(0x5c5b8,0x5cc50),(0x5cc58,0x5c1f0),
                  (0x7e880,0x7e890),(0x7e888,0x7eac0),(0x7e900,0x7ecc0),
                  (0x7e9f0,0x7ecf0),(0x7ed90,0x7eff0),(0x7ee58,0x7f000)]:branch(pc,target)
for pc,target in [(0x5c5a8,0x7e490),(0x7e850,0x1a2ca8),(0x7e8e0,0x185ed0),
                  (0x7ed78,0x98438),(0x7ee18,0x1991e0),(0x7ef98,0x1991e0)]:call(pc,target)
for pc,code in [(0x7e718,6010),(0x7eba8,6004),(0x98900,6062),(0x98a88,6057),(0x7eee8,2006)]:
    check(struct.unpack_from('<I',rows[pc],4)[0]==code,'error constant')
check(rows[0x7ed40].hex()=='07010000ffffffff' and rows[0x7ed48].hex()=='7b12000000000000','release before membership')
results=[]
for pkg in [pre,rev]:
    cmd=[sys.executable,'-B',str(P/pkg/'verify.py')]
    if args.repo:cmd+=['--repo',args.repo]
    run=subprocess.run(cmd,capture_output=True,text=True)
    check(run.returncode==0,'predecessor verifier '+pkg+': '+run.stdout+run.stderr)
    results.append(json.loads(run.stdout))
if args.repo:
    origin=js('entrypoint-origin.json')
    b=subprocess.check_output(['git','-C',args.repo,'show',origin['checkpoint']+':'+origin['path']])
    check(sha(b)==origin['whole_sha256'] and len(b)==origin['whole_bytes'],'entrypoint whole source')
    lo,hi=origin['bytes'];check(b[lo:hi]==(P/'entrypoint.rs').read_bytes(),'entrypoint source range')
result=js('result.json')
check(result['handler_increment']==0 and not result['compiled'] and not result['target_executed'],'acceptance boundary')
print(json.dumps({'status':'PASS','files':len(files),'unique_instructions':len(rows),'repository_rebound':bool(args.repo),'target_executed':False,'predecessor_results':results},sort_keys=True))
