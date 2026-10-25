#!/usr/bin/env python3
"""Integrity and bounded lexical coverage checks only; no target execution."""
import sys
sys.dont_write_bytecode = True
import argparse, hashlib, json, pathlib, re, subprocess
from rust_inventory import funcs, mask
ROOT = pathlib.Path(__file__).resolve().parent
REV = 'aa98fb45f3f756d008ccb9940bcfd9a6e986ef77'
PRIOR = 'inputs/repro/pump/final-error-metadata-fortyeight/'
PRIOR_SEAL = 'b8906c998c01a0dee9e8eb2f6bfbcc3c903e97d8753b22dbb316cc8dc0cc787e'

def demand(condition, text):
    if not condition: raise ValueError(text)

def sha(data): return hashlib.sha256(data).hexdigest()
def read(name): return (ROOT / name).read_bytes()
def js(name): return json.loads(read(name))
def safe(name):
    p = pathlib.PurePosixPath(name)
    return bool(name) and not p.is_absolute() and '..' not in p.parts and str(p) == name

def context_inventory(src):
    m = mask(src); result = []
    for hit in re.finditer(r'#\[derive\(Accounts\)\]\s*pub\s+struct\s+(\w+)',m):
        start = hit.start(); o = m.find('{',hit.end()); b = o+1; depth = 1
        while depth:
            demand(b < len(m), 'unclosed context')
            depth += (m[b]=='{')-(m[b]=='}'); b += 1
        result.append((hit[1], src.count('\n',0,start)+1, src.count('\n',0,b-1)+1, start, b, sha(src[start:b].encode())))
    return result

def main():
    ap=argparse.ArgumentParser(description=__doc__); ap.add_argument('--repo',type=pathlib.Path); args=ap.parse_args()
    paths=[]
    for p in ROOT.rglob('*'):
        demand(not p.is_symlink(),'symlink forbidden: '+str(p))
        if p.is_file(): paths.append(p.relative_to(ROOT).as_posix())
    allow=js('allowlist.json')
    demand(allow==sorted(set(allow)) and all(safe(n) for n in allow),'invalid allowlist')
    demand(sorted(paths)==allow,'package file set differs from allowlist')
    seal=read('manifest.sha256').decode().strip()
    demand(seal==sha(read('manifest.json'))+'  manifest.json','manifest seal mismatch')
    manifest=js('manifest.json')
    demand(set(manifest)==set(allow)-{'manifest.json','manifest.sha256'},'manifest membership')
    for name, record in manifest.items():
        data=read(name)
        demand(record=={'bytes':len(data),'sha256':sha(data)},'payload mismatch: '+name)
    inputs=js('input-manifest.json')
    demand(len(inputs)==54 and len({x['path'] for x in inputs})==54,'input set/count')
    # Only precisely enumerated public paths can be requested from Git.
    demand(sorted(x['path'] for x in inputs)==EXPECTED_INPUTS,'unexpected input path')
    funcs_actual=[]; contexts_actual=[]; srcs={}
    for item in inputs:
        path=item['path']; name=item['snapshot']; data=read(name); src=data.decode(); srcs[path]=src
        demand(name=='inputs/'+path and item['revision']==REV,'source mapping/revision')
        demand(sha(data)==item['snapshot_sha256'],'snapshot hash: '+path)
        spans=item['excluded_line_spans']; lines=src.splitlines(keepends=True)
        if spans:
            expected=[[1,99]] if path=='programs/pump/src/sell_v2.rs' else [[80,80]] if path=='programs/pump/src/lib.rs' else None
            demand(spans==expected,'unexpected redaction scope')
            for a,b in spans:
                demand(all(line.rstrip('\n')=='// EXCLUDED OPAQUE' for line in lines[a-1:b]),'opaque contents leaked')
        else:
            demand(len(data)==item['bytes'] and sha(data)==item['sha256'],'full input hash')
            blob=hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
            demand(blob==item['git_blob'],'Git blob content mismatch')
        if args.repo:
            original=subprocess.check_output(['git','-C',str(args.repo),'show',REV+':'+path],stderr=subprocess.PIPE)
            demand(len(original)==item['bytes'] and sha(original)==item['sha256'],'frozen original mismatch: '+path)
            demand(hashlib.sha1(b'blob '+str(len(original)).encode()+b'\0'+original).hexdigest()==item['git_blob'],'original Git blob mismatch')
            ol=original.decode().splitlines(keepends=True)
            for a,b in spans:
                for i in range(a-1,b):ol[i]='// EXCLUDED OPAQUE\n' if ol[i].endswith('\n') else '// EXCLUDED OPAQUE'
            demand(''.join(ol).encode()==data,'redacted snapshot differs from frozen Git: '+path)
        if path.endswith('.rs'):
            for f in funcs(src):
                funcs_actual.append((path,f['name'],f['start'],f['end'],f['a'],f['b'],sha(src[f['a']:f['b']].encode())))
            contexts_actual += [(path,)+x for x in context_inventory(src)]
    rows=js('functions.json'); admitted=[x for x in rows if x['status']=='manually-inspected-bounded-static']; excluded=[x for x in rows if x['status']=='excluded-metadata-only']
    demand(len(rows)==215 and len(admitted)==209 and len(excluded)==6,'function counts/status')
    expected=[(x['path'],x['name'],x['start'],x['end'],x['snapshot_start_char'],x['snapshot_end_char'],x['span_sha256']) for x in admitted]
    demand(sorted(funcs_actual)==sorted(expected),'function coverage or span mismatch')
    demand(len({x['id'] for x in rows})==215,'duplicate function id')
    demand(all(x.get('review_note') and x.get('closure') and x.get('file_review')==x['path'] for x in admitted),'missing function disposition')
    expected_opaque=[('programs/pump/src/lib.rs','sell_v2',80,80),('programs/pump/src/sell_v2.rs','add',49,49),('programs/pump/src/sell_v2.rs','sub',50,50),('programs/pump/src/sell_v2.rs','narrow',51,51),('programs/pump/src/sell_v2.rs','execute',52,97),('programs/pump/src/sell_v2.rs','check_token',99,99)]
    demand(sorted((x['path'],x['name'],x['start'],x['end']) for x in excluded)==sorted(expected_opaque),'opaque metadata mismatch')
    demand(all('span_sha256' not in x and 'review_note' not in x for x in excluded),'excluded analysis present')
    contexts=js('contexts.json')
    demand(len(contexts)==38,'context count')
    demand(sorted(contexts_actual)==sorted((x['path'],x['name'],x['start'],x['end'],x['start_char'],x['end_char'],x['sha256']) for x in contexts),'context coverage mismatch')
    fc=js('file-coverage.json'); program_inputs=[x for x in inputs if x['path'].startswith('programs/pump/')]
    demand(len(fc)==39 and {x['path'] for x in fc}=={x['path'] for x in program_inputs},'file coverage membership')
    for f in fc:
        rr=[x for x in rows if x['path']==f['path']]
        demand(f['functions']==len(rr) and f['included']==sum(x['status'].startswith('manually') for x in rr) and f['excluded']==sum(x['status'].startswith('excluded') for x in rr),'per-file function tally')
        demand(f['lines']==len(srcs[f['path']].splitlines()),'line count')
        demand(set(f['review'])=={'authority','accounts','cpi','arithmetic','serialization','ordering','limits'} and all(f['review'].values()),'missing review dimension')
    own=js('ownedmap.json')
    demand(own['revision']==REV and own['main_changes']==[],'ownership scope')
    demand(own['outputs']==[dict(path=n,owner='pass04_audit_pump',kind='frozen-public-input-snapshot' if n.startswith('inputs/') else 'review-deliverable',main_write=False) for n in allow],'owned output map')
    demand(own['inputs']==[dict(path=x['path'],access='read-only frozen public input',sha256=x['sha256'],snapshot=x['snapshot'],redacted=bool(x['excluded_line_spans'])) for x in inputs],'ownedmap input bindings')
    ident=js(PRIOR+'main-scratch-identity.json'); cp=js('checkpoint-applicability.json')
    bindings=[dict(path=x['path'],current_sha256=x['sha256'],checkpoint_sha256=ident['main_source_sha256'][x['path']],equal=x['sha256']==ident['main_source_sha256'][x['path']]) for x in inputs if x['path'] in ident['main_source_sha256']]
    demand(len(bindings)==37 and all(x['equal'] for x in bindings) and cp['bindings']==bindings,'checkpoint applicability')
    demand(sha(read(PRIOR+'manifest.json'))==PRIOR_SEAL,'prior seal changed')
    demand(read(PRIOR+'manifest.sha256').decode().strip()==PRIOR_SEAL+'  manifest.json','prior recorded seal')
    pm=js(PRIOR+'manifest.json')
    for name in ['README.md','main-scratch-identity.json','source-sha256.json','documentation-sha256.json']:
        data=read(PRIOR+name)
        demand(pm[name]['sha256']==sha(data) and pm[name]['bytes']==len(data),'prior membership: '+name)
    for item in js('cpi-sites.json'):
        demand(srcs[item['path']].splitlines()[item['line']-1]==item['source'],'CPI source-line mismatch')
    # A bounded integer fact, not a program execution or complete arithmetic proof.
    demand(((1<<64)-1)**2+9999 < 1<<128,'u64 fee product bound')
    print(json.dumps({'ok':True,'revision':REV,'files':len(allow),'inputs':len(inputs),'functions_inspected':209,'functions_opaque':6,'contexts_inspected':38,'source_map_equal':37,'frozen_git_rebound':bool(args.repo),'limits':'integrity and lexical coverage, not original-equivalence or security proof'},sort_keys=True))

# Generated once from the explicit reviewed input allowlist; no path discovery in --repo mode.
EXPECTED_INPUTS = ['README.md', 'audit/AUDIT.md', 'audit/pump/BONDING_CURVE_SERIALIZATION_RECOVERY.md', 'audit/pump/HOLDER_NESTED_RECOVERY.md', 'audit/pump/MULTI_HOP_CURVE_RECOVERY.md', 'audit/pump/QUOTE_CONTROL_RECOVERY.md', 'docs/COMPLETION.md', 'programs/pump/Cargo.lock', 'programs/pump/Cargo.toml', 'programs/pump/README.md', 'programs/pump/recovered/README.md', 'programs/pump/recovered/constant_product.rs', 'programs/pump/recovered/constant_product_host.rs', 'programs/pump/recovered/sell_accounting.rs', 'programs/pump/recovered/sell_accounting_host.rs', 'programs/pump/src/admin_cto.rs', 'programs/pump/src/buy_v2.rs', 'programs/pump/src/cashback.rs', 'programs/pump/src/collect_v2.rs', 'programs/pump/src/create.rs', 'programs/pump/src/create_v2.rs', 'programs/pump/src/creator_migration.rs', 'programs/pump/src/distribution.rs', 'programs/pump/src/extend.rs', 'programs/pump/src/global_init.rs', 'programs/pump/src/holder_distribution.rs', 'programs/pump/src/idl_authority.rs', 'programs/pump/src/legacy_buy.rs', 'programs/pump/src/legacy_sell.rs', 'programs/pump/src/lib.rs', 'programs/pump/src/migrate.rs', 'programs/pump/src/migrate_v2.rs', 'programs/pump/src/minimum.rs', 'programs/pump/src/multi_hop_curve.rs', 'programs/pump/src/nested_create.rs', 'programs/pump/src/quote_control/initialize_quote_control.rs', 'programs/pump/src/quote_control/mod.rs', 'programs/pump/src/quote_control/state.rs', 'programs/pump/src/quote_control/update_quote_control_mints.rs', 'programs/pump/src/sell_v2.rs', 'programs/pump/src/set_creator.rs', 'programs/pump/src/set_params.rs', 'programs/pump/src/sweep.rs', 'programs/pump/src/trade.rs', 'programs/pump/src/trade_types.rs', 'programs/pump/src/volume_sync.rs', 'repro/pump/final-error-metadata-fortyeight/README.md', 'repro/pump/final-error-metadata-fortyeight/documentation-sha256.json', 'repro/pump/final-error-metadata-fortyeight/main-scratch-identity.json', 'repro/pump/final-error-metadata-fortyeight/manifest.json', 'repro/pump/final-error-metadata-fortyeight/manifest.sha256', 'repro/pump/final-error-metadata-fortyeight/source-sha256.json', 'repro/pump/nested-ancestry-fortyeight/README.md', 'repro/pump/wide-runtime-attribution/README.md']
if __name__=='__main__':
    try: main()
    except Exception as error:
        print('VERIFY FAILED: '+str(error),file=sys.stderr)
        sys.exit(1)
