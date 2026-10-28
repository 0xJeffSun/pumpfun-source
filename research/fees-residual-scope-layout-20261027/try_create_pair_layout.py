from pathlib import Path
import subprocess,tarfile
W=Path('/workspace/fees-recovery');S=W/'source-create'
with tarfile.open(W/'create583-stdlib-copy-canonical-source/source.tar.gz') as a:a.extractall(S,filter='data')
p=S/'programs/pump-fees/src/instructions/fee_sharing/create_donation_fee_pda.rs';base=p.read_text();old='let creator_result:Result<(Pubkey,Pubkey)>=try {';end='let (creator, quote_mint) = creator_result?;';assert base.count(old)==base.count(end)==1
variants={}
for align in [1,8]:
 value=base.replace(old,'#[repr(align('+str(align)+'))] struct CreatorPair(Pubkey,Pubkey); let creator_result:Result<CreatorPair>=try {').replace('(curve.creator, quote)','CreatorPair(curve.creator, quote)').replace('(pool.coin_creator, pool.quote_mint)','CreatorPair(pool.coin_creator, pool.quote_mint)').replace(end,'let CreatorPair(creator, quote_mint) = creator_result?;')
 variants['aligned-'+str(align)]=value
variants['third-u64']=base.replace(old,'let creator_result:Result<(Pubkey,Pubkey,u64)>=try {').replace('(curve.creator, quote)','(curve.creator, quote, 0u64)').replace('(pool.coin_creator, pool.quote_mint)','(pool.coin_creator, pool.quote_mint, 0u64)').replace(end,'let (creator, quote_mint, _) = creator_result?;')
try:
 for label,source in variants.items():
  name='create583-pair-'+label;p.write_text(source);proc=subprocess.run(['python3',str(W/'build_create_opts.py'),name,'--remap-path-prefix=programs/pump-fees/src/recovered_string.rs=/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs','--remap-path-prefix=/workspace/fees-recovery/source-create/programs/pump-fees/src/recovered_string.rs=/home/runner/work/platform-tools/platform-tools/out/rust/library/alloc/src/string.rs'],capture_output=True);print(name,proc.returncode,proc.stdout.decode(),proc.stderr.decode(),flush=True)
  dest=W/name
  with tarfile.open(dest/'source.tar.gz','w:gz') as a:
   for x in sorted(S.rglob('*')):
    if x.is_file():a.add(x,arcname=x.relative_to(S))
  if proc.returncode==0:subprocess.run(['python3',str(W/'measure_create.py'),str(dest/'symbols.so'),str(dest/'measure.json')],check=True)
finally:p.write_text(base)
