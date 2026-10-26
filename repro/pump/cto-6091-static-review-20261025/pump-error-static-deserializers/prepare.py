"""Prepare saved byte/source witnesses outside checkout; never applies proposal."""
from pathlib import Path
import json,struct,re,difflib,hashlib,argparse
from extract import P
A=argparse.ArgumentParser();A.add_argument('--repo',type=Path,required=True);R=A.parse_args().repo.resolve();Q=R/'repro/layered-passes/pass-24/pump-compared-errors-source-proof';O=(Q/'original.so').read_bytes();rows=json.loads((P/'bounded-ledger.json').read_text());I=lambda pc:struct.unpack_from('<BBhi',O,pc)
versions=[];ranges=[(636576,41,72),(637992,73,73),(639552,74,74),(641272,75,106),(643080,107,115),(645200,116,116),(647544,117,132),(649968,133,157),(652544,158,None)]
for start,lo,hi in ranges:
 f=rows[str(start)];stores=[]
 for pc in range(start,f['end'],8):
  op,reg,off,imm=I(pc)
  if op&7 in[2,3]and reg&15==6:
   width={0:4,8:2,16:1,24:8}[op&24]
   if off<64 and off+width>32:stores.append(dict(pc=pc,raw=O[pc:pc+8].hex(),offset=off,bytes=width,kind='immediate'if op&7==2 else'register',value=imm if op&7==2 else reg>>4))
 parsed=[c['pc']for c in f['direct_calls']if c['target']==64176]
 versions.append(dict(start=start,end=f['end'],payload_min=lo,payload_max=hi,quote='zero'if lo<107 else'payload[75:107]',pubkey_read_calls=parsed,quote_read_call=parsed[1]if lo>=107 else None,output_quote_result_range=[32,64],direct_quote_stores=stores,zero_block_copy_pc=637840 if start==636576 else None))
lib=(R/'programs/pump/src/lib.rs').read_text();part=lib.split('pub struct Global {',1)[1].split('\n}',1)[0];offset=8;fields=[]
for name,typ in re.findall(r'pub\s+(\w+)\s*:\s*([^,\n]+)',part):
 typ=typ.strip();size={'bool':1,'u8':1,'u64':8,'Pubkey':32}.get(typ)
 if size is None:
  m=re.fullmatch(r'\[Pubkey;\s*(\d+)\]',typ);assert m,typ;size=32*int(m.group(1))
 fields.append(dict(name=name,type=typ,account_data_start=offset,bytes=size));offset+=size
 if name=='whitelisted_quote_mints':break
assert fields[-1]==dict(name='whitelisted_quote_mints',type='[Pubkey; 1]',account_data_start=1013,bytes=32)
s=(R/'programs/pump/src/admin_cto.rs').read_text();old='if fee.is_some()&&(a.bonding_curve.quote_mint==Pubkey::default()||a.global.whitelisted_quote_mints.contains(&a.bonding_curve.quote_mint)){return Err(err(6091));}'
new='if fee.is_some()&&(a.bonding_curve.quote_mint==Pubkey::default()||a.bonding_curve.quote_mint==anchor_lang::solana_program::pubkey!("So11111111111111111111111111111111111111112")||a.global.whitelisted_quote_mints.contains(&a.bonding_curve.quote_mint)){return Err(error!(PumpError::CreatorFeeNotConfigurableForQuote));}'
assert s.count(old)==1;t=s.replace(old,new);(P/'proposal.patch').write_text(''.join(difflib.unified_diff(s.splitlines(True),t.splitlines(True),fromfile='a/programs/pump/src/admin_cto.rs',tofile='b/programs/pump/src/admin_cto.rs',n=1)))
proof=dict(scope='One static owning-deserializer and6091 predecessor step; no patch applied',global_field=dict(owner_chain=[78448,38608,1441232,1441960],account_copy=dict(call_pc=39512,destination_add=24,source_result_add=16,bytes=1063),box_comparison_range=[936,968],parser_result_range=[928,960],field='whitelisted_quote_mints[0]',serialized_account_data_range=[1013,1045],declaration_prefix=fields,read_call=1445032,reader=66272,reader_payload_range=[1,33],caller_output_stores=[1446440,1446424,1446952,1446488,1446472,1446456]),bonding_curve=dict(owner_chain=[15208,77896,33568,635208],account_copy=dict(call_pc=34472,destination_add=24,source_result_add=16,bytes=141),boxing_copy=dict(call_pc=15528,bytes=168),box_comparison_range=[40,72],parser_result_range=[32,64],field='quote_mint',serialized_payload_range=[75,107],historical_variants=versions),second_route=dict(eligibility_load_pc=145344,eligibility_frame=-2312,register=4,paths=[[145344,145360,147104,147216,147224,147232,147256,147288],[145344,145360,145368,145456,145464,145472,147232,147256,147288]],no_calls_on_these_spans=True,fee_tag_frame=-2344,branch_target=144720,precedes_later_checks=[147312,147536,147560]),proposed_guard=dict(before=old,after=new,source_before_sha256=hashlib.sha256(s.encode()).hexdigest(),source_after_sha256=hashlib.sha256(t.encode()).hexdigest(),applied=False),limits=['Other6019 secondcomparison role/6092 constructor differences remain unclosed','No full application or runtime behavior equivalence; source origins remain natural','Conditional error reachability includes earlier holder/newcreator/target guards; no guard reordered','No assumption that every historical layout/path is present in retained fixtures'])
(P/'proof.json').write_text(json.dumps(proof,indent=2)+'\n')
refs=[str(x.relative_to(R))for x in[Q/'manifest.json',Q/'original.so',Q/'original-ledger.json.gz',Q/'evidence/original-141840.asm',Q/'evidence/original-1235456.asm',Q/'evidence/original-746872.asm',R/'programs/pump/src/admin_cto.rs',R/'programs/pump/src/lib.rs',R/'programs/pump/src/trade_types.rs']];(P/'input-references.json').write_text(json.dumps({n:dict(bytes=(R/n).stat().st_size,sha256=hashlib.sha256((R/n).read_bytes()).hexdigest())for n in refs},indent=2)+'\n')
print('Prepared Global serialized slot1013..1045, nine BC layouts and one unapplied guard proposal')
