from pathlib import Path
import shutil,json,hashlib,subprocess,sys,gzip
P=Path(__file__).resolve().parent;label='layout-native-entrypoint';q=P/label;q.mkdir(exist_ok=True)
src={str(f.relative_to(P/'source')):f.read_bytes()for f in (P/'source').rglob('*')if f.is_file()}
footer='''anchor_lang::solana_program::entrypoint!(process_instruction);
fn process_instruction<'info>(program_id: &anchor_lang::solana_program::pubkey::Pubkey, accounts: &'info [anchor_lang::solana_program::account_info::AccountInfo<'info>], data: &[u8]) -> anchor_lang::solana_program::entrypoint::ProgramResult {
    anchor_framework::entry(program_id, accounts, data)
}'''
s=src['src/lib.rs'].decode();assert s.count(footer)==1;src['src/lib.rs']=s.replace(footer,'').encode();s=src['Cargo.toml'].decode();assert s.count('default = ["no-entrypoint"]')==1;src['Cargo.toml']=s.replace('default = ["no-entrypoint"]','default = []').encode()
H=lambda b:hashlib.sha256(b).hexdigest();inputs={}
for n,raw in src.items():
 p=q/'source'/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(raw);inputs[n]=H(raw)
(q/'source-inputs.json').write_text(json.dumps(inputs,indent=2,sort_keys=True)+'\n')
with (q/'runner.log').open('w')as f:subprocess.run([sys.executable,'-B',str(P/'run_variant.py'),label],stdout=f,stderr=subprocess.STDOUT,check=True)
with (q/'analysis-output.json').open('w')as f:subprocess.run([sys.executable,'-B',str(P/'analyze_variant.py'),label],stdout=f,stderr=subprocess.STDOUT,check=True)
s=json.loads(gzip.decompress((q/'comparison-summary.json.gz').read_bytes()));print(s)
