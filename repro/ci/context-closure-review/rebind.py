"""Read-only membership checks against the retained public Git checkpoint/originals."""
from pathlib import Path
import hashlib,json,subprocess
H=lambda b:hashlib.sha256(b).hexdigest()
J=lambda p:json.loads(p.read_text())
COMMIT='4d3c19e3c58427f3604caede144b3322fa56d2b5'

def check(repo,packages):
    git_rows={};slices=[];cache={}
    def git(path,blob,digest,commit=COMMIT):
        assert commit==COMMIT and not Path(path).is_absolute() and '..'not in Path(path).parts
        key=(commit,path)
        if key not in cache:
            data=subprocess.check_output(['git','-C',str(repo),'show',commit+':'+path])
            actual_blob=hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()
            cache[key]=(data,actual_blob,H(data))
        data,actual_blob,actual_sha=cache[key]
        assert actual_blob==blob and actual_sha==digest,(path,actual_blob,blob,actual_sha,digest)
        git_rows[path]={'commit':commit,'git_blob':blob,'sha256':digest,'bytes':len(data)}
        return data
    pump=git('evidence/original/pump/deployed.so','85cb0059f2814c86224fdfea778c56df770dd920','7a19affaa2c6187e04a5fe0ea298cee81fa5eb8c24cfcc30d85f615e89f7b02d')
    fees=git('evidence/original/pump_fees/deployed.so','e330cbb6dfbc3351dbaaf594ba6e873d89af5f5e','4f2955d0f6b40cc9ff7daa18ccad7d19119ba1249759f4e7e3bb691beee6b35e')
    assert (repo/'evidence/original/pump/deployed.so').read_bytes()==pump
    assert (repo/'evidence/original/pump_fees/deployed.so').read_bytes()==fees
    def span(name,path,start,end,original,kind):
        z=(packages/name/path).read_bytes();assert z==original[start:end],(name,path,start,end)
        slices.append({'package':name,'path':path,'start':start,'end':end,'sha256':H(z),'kind':kind})
    name='pump_route_context_closure';p=packages/name;w=J(p/'windows.json')
    for r in [w['original'],w['disassembly']]:git(r['source_path'],r['git_blob'],r['sha256'],r['commit'])
    for r in w['windows']:span(name,'bytes/'+r['name']+'.bin',r['start'],r['end'],pump,'original_code')
    for r in J(p/'data-ranges.json'):span(name,'data/'+r['name']+'.bin',r['start'],r['end'],pump,'original_data_or_relocation')
    for r in J(p/'provenance.json'):
        if r.get('commit'):
            data=git(r['source_path'],r['git_blob'],r['sha256'],r['commit'])
            if 'byte_start'in r:span(name,r['path'],r['byte_start'],r['byte_end'],data,'Git_source_excerpt')
            else:assert (p/r['path']).read_bytes()==data
    name='pump_route_native_settlement';p=packages/name;v=J(p/'provenance.json')
    for r in v['objects']:git(r['path'],r['git_blob'],r['sha256'],v['checkpoint'])
    for r in v['windows']:span(name,'evidence/'+r['name']+'.bin',r['start'],r['end'],pump,'original_code')
    for r in J(p/'data.json'):
        z=bytes.fromhex(r['hex']);assert z==pump[r['start']:r['end']]
        slices.append({'package':name,'path':'data.json:'+r['name'],'start':r['start'],'end':r['end'],'sha256':H(z),'kind':'original_inline_data'})
    for r in J(p/'relocations.json'):
        prefix='evidence/reloc_'+format(r['callsite'],'x')
        for suffix,start,size in [('reloc.bin',r['relocation_offset'],16),('symbol.bin',r['symbol_offset'],24),('name.bin',r['name_offset'],len(r['symbol'])+1)]:
            span(name,prefix+'_'+suffix,start,start+size,pump,'original_import_record')
    r=J(p/'source-provenance.json');data=git(r['path'],r['git_blob'],r['sha256'],r['checkpoint']);lines=data.splitlines(keepends=True)
    for x in r['excerpts']:
        start=sum(map(len,lines[:x['line_start']-1]));end=sum(map(len,lines[:x['line_end']]))
        span(name,x['file'],start,end,data,'Git_source_excerpt')
    name='fees_donation_missing_branches';p=packages/name;v=J(p/'provenance.json')
    for r in v['ranges']:span(name,r['file'],r['start'],r['end_exclusive'],fees,'original_code')
    for r in J(p/'inputs/exact-data.json'):
        z=bytes.fromhex(r['hex']);assert z==fees[r['start']:r['end_exclusive']]
        slices.append({'package':name,'path':'inputs/exact-data.json:'+r['label'],'start':r['start'],'end':r['end_exclusive'],'sha256':H(z),'kind':'original_inline_data'})
    for r in v['sources']:
        data=git(r['git_path'],r['git_blob'],r['whole_sha256'],v['source_commit'])
        span(name,r['file'],r['start_byte'],r['end_byte_exclusive'],data,'Git_source_excerpt')
    name='amm_fee_return_contract';p=packages/name
    for r in J(p/'provenance.json'):
        if r.get('commit') and r.get('git_blob'):
            data=git(r['source_path'],r['git_blob'],r['sha256'],r['commit'])
            assert (p/r['path']).read_bytes()==data
    name='pump_nested_context_closure';p=packages/name
    for r in J(p/'provenance.json'):
        if r.get('checkpoint') and r.get('git_blob'):
            data=git(r['source_path'],r['git_blob'],r['sha256'],r['checkpoint'])
            if r.get('output'):
                assert r['extraction']=='lines 1-100 inclusive'
                span(name,r['output'],0,sum(map(len,data.splitlines(keepends=True)[:100])),data,'Git_source_excerpt')
    for r in J(p/'windows.json'):span(name,r['binary'],r['start'],r['end'],pump,'original_code')
    for r in J(p/'constants.json'):span(name,r['path'],r['start'],r['end'],pump,'original_data')
    return {'checkpoint':COMMIT,'git_objects':git_rows,'checked_slices':slices,'current_originals_equal_frozen_Git':True,'prose_is_not_machine_proved':True}
