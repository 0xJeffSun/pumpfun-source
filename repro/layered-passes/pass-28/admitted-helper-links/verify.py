"""Saved metadata only: two previously admitted helpers and eleven fixed branch links."""
from pathlib import Path
import argparse,json,hashlib,gzip,struct
P=Path(__file__).resolve().parent
H=lambda p:hashlib.sha256(p.read_bytes()).hexdigest()
def verify(seal):
 assert H(P/'manifest.json')==seal==(P/'manifest.sha256').read_text().split()[0]
 m=json.loads((P/'manifest.json').read_bytes());assert set(m)=={str(p.relative_to(P))for p in P.rglob('*')if p.is_file()and p not in[P/'manifest.json',P/'manifest.sha256']}
 for n,r in m.items():assert not(P/n).is_symlink()and(P/n).stat().st_size==r['bytes']and H(P/n)==r['sha256']
 assert H(P/'complete-inventory.json.gz')=='46249213c288a768a25d496d10ed46f665edc39b18ae3a375b4b01941d08c394';assert H(P/'caller-review.manifest.json')=='bbdffa80e596b0e62835c47c9eed360b037b6a8c545cbb2eb5851f31a4e0a2ef';parent=json.loads((P/'caller-review.manifest.json').read_bytes());assert parent['derive.stdout']['sha256']==H(P/'caller-structure.json')=='315b56803ded86114827146386b758ad279a42ebaa0fd8b44ca2551bb7c286b3'
 inv=json.loads(gzip.decompress((P/'complete-inventory.json.gz').read_bytes()));saved=json.loads((P/'selected-admitted-rows.json').read_bytes());rows=[]
 for id in ['O0201','O0359']:
  x=next(x for x in inv['original_rows']if x['id']==id);assert x['category']!='explicitly stopped'and x['body_analysis']is not None;rows.append({k:x[k]for k in ['id','start','end','raw_sha256','category','scope','body_analysis','fresh_normalized_matches']})
 assert rows==saved;a,b=rows;assert(a['start'],a['end'])==(538096,538104);assert a['body_analysis']['exits']==[{'pc':538096,'offset':0,'raw_hex':'9500000000000000'}];assert a['raw_sha256']==hashlib.sha256(bytes.fromhex('9500000000000000')).hexdigest();assert all(not a['body_analysis'][k]for k in ['direct','indirect','external','unrecognized_calls','data_references','branches'])
 branch=b['body_analysis']['branches'];assert len(branch)==1 and branch[0]['pc']==669768 and branch[0]['target']==669792;assert struct.unpack('<BBhi',bytes.fromhex(branch[0]['raw_hex']))==(0x55,1,2,0);call=next(c for c in b['body_analysis']['direct']if c['pc']==669792);assert call['target']==669800 and struct.unpack('<BBhi',bytes.fromhex(call['raw_hex']))==(0x85,0x10,0,0)
 result=json.loads((P/'link-result.json').read_bytes());caller=json.loads((P/'caller-structure.json').read_bytes());assert caller['source_collection_seal']=='251cf7b5661e8620821a0c27cf2235e302ed42cb4df89a9aecc2362d6977c09a';calls=caller['external_call_constant_argument_rows'];assert len(calls)==11 and all(c['r1_constant']==1 for c in calls)
 links=[{'caller_pc':c['call_pc'],'callee':669768,'entry_r1':1,'predicate':'r1 != 0','taken_branch_pc':669768,'taken_target':669792,'following_call_target':669800,'following_call_body_followed':False,'noreturn_proved':False}for c in calls];assert result['eleven_fixed_r1_links']==links
 expected=[{k:x[k]for k in ['id','start','end','raw_sha256','category','scope']}for x in inv['original_rows']if x['start']<=669800<x['end']];assert expected==result['next_target_metadata_only'];assert result['inventory_sha256']==H(P/'complete-inventory.json.gz')and result['caller_structure_sha256']==H(P/'caller-structure.json');assert all(result[k]==0 for k in ['new_original_body_bytes','new_candidate_body_bytes','new_data_bytes','compiler_VM_fixture_runs'])and result['active_ledger_update']is False
 return {'passed':True,'admitted_rows_reused':2,'fixed_argument_links':11,'next_body_followed':False,'new_body_data_or_target_execution':0,'active_ledger_updated':False}
if __name__=='__main__':
 a=argparse.ArgumentParser();a.add_argument('--expected-seal',required=True);x=a.parse_args();print(json.dumps(verify(x.expected_seal)))
