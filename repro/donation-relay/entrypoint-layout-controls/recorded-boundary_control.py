from pathlib import Path
import json,hashlib,subprocess,sys,gzip
P=Path(__file__).resolve().parent;label='layout-instruction-boundaries';q=P/label;q.mkdir(exist_ok=True);base=P/'source';src={str(f.relative_to(base)):f.read_bytes()for f in base.rglob('*')if f.is_file()};lib=src['src/lib.rs'].decode()
specs=[('close_donation_epoch_v1','close_donation_epoch','ctx,config_id,epoch'),('swap_then_distribute_v1','distribute::swap_then_distribute','ctx,jupiter_swap_ix_data,shares'),('just_swap_v1','distribute::just_swap','ctx,swap_data'),('distribute_after_just_swapping_v1','distribute::distribute_after_just_swapping','ctx,shares'),('distribute_non_swap_output_mint_v1','distribute::distribute_non_swap_output_mint','ctx,shares')]
for name,module,args in specs:
 start=lib.index('pub fn '+name);brace=lib.index('{',start);depth=1;end=brace+1
 while depth:
  if lib[end]=='{':depth+=1
  elif lib[end]=='}':depth-=1
  end+=1
 fn=lib[start:end];signature=lib[start:brace];body=lib[brace+1:end-1]
 path='src/instructions/v1/relayer_only/'+module.replace('::','/')+'.rs'
 additions='\nuse crate::anchor_framework::{Share,DonationEpochClosedV1Event,DonationEpochProcessedV1Event,DonationEpochJustSwappedV1Event};\nuse crate::tools::checks::check_relayer;\n'+fn.replace('pub fn '+name,'pub fn process',1)+'\n'
 src[path]+=additions.encode()
 replacement='\n            crate::instructions::v1::relayer_only::'+module+'::process('+args+')\n'
 replacement+='\n'*max(0,body.count('\n')-replacement.count('\n'))
 lib=lib[:brace+1]+replacement+lib[end-1:]
src['src/lib.rs']=lib.encode();H=lambda b:hashlib.sha256(b).hexdigest();inputs={}
for n,raw in src.items():
 f=q/'source'/n;f.parent.mkdir(parents=True,exist_ok=True);f.write_bytes(raw);inputs[n]=H(raw)
(q/'source-inputs.json').write_text(json.dumps(inputs,indent=2,sort_keys=True)+'\n')
with (q/'runner.log').open('w')as f:subprocess.run([sys.executable,'-B',str(P/'run_variant.py'),label],stdout=f,stderr=subprocess.STDOUT,check=True)
with (q/'analysis-output.json').open('w')as f:subprocess.run([sys.executable,'-B',str(P/'analyze_variant.py'),label],stdout=f,stderr=subprocess.STDOUT,check=True)
print(json.loads(gzip.decompress((q/'comparison-summary.json.gz').read_bytes())))
