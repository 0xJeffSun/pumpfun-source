#!/usr/bin/env python3
"""Portable static verification. Does not execute Rust, SBF, or test fixtures."""
import difflib,hashlib,json,pathlib,runpy,struct
P=pathlib.Path(__file__).resolve().parent
sha=lambda b:hashlib.sha256(b).hexdigest()
def check(v,m):
 if not v:raise ValueError(m)
def main():
 manifest=json.loads((P/'manifest.json').read_text())
 check({x.relative_to(P).as_posix() for x in P.rglob('*') if x.is_file()}==set(manifest)|{'manifest.json'},'inventory')
 for f,h in manifest.items():check(sha((P/f).read_bytes())==h,'seal '+f)
 runpy.run_path(str(P/'residual-contract/verify.py'),run_name='__main__')
 for r in json.loads((P/'inputs.json').read_text()):
  if r['whole_input_retained']:
   b=(P/'baseline'/r['path']).read_bytes();check(len(b)==r['size'] and sha(b)==r['sha256'],'whole source')
   check(hashlib.sha1(b'blob '+str(len(b)).encode()+b'\0'+b).hexdigest()==r['git_blob'],'source blob')
   lines=b.splitlines(keepends=True)
   for (lo,hi),(start,end) in zip(r['consumed_lines'],r['consumed_bytes']):check(b[start:end]==b''.join(lines[lo-1:hi]),'source ranges')
  else:
   b=(P/r['excerpt']).read_bytes();check(len(b)==r['consumed_bytes'][1]-r['consumed_bytes'][0],'excerpt length')
 base=(P/'baseline/programs/pump/src/trade.rs').read_text();new=(P/'proposed/programs/pump/src/trade.rs').read_text()
 def split(s):
  a=s.index('pub fn buy(');z=s.index('pub fn buy_exact_quote(',a);return s[:a],s[a:z],s[z:]
 before,body,after=split(base);n_before,n_body,n_after=split(new)
 check(before==n_before and after==n_after,'out of scope source mutation')
 expected=''.join(difflib.unified_diff(base.splitlines(True),new.splitlines(True),fromfile='a/programs/pump/src/trade.rs',tofile='b/programs/pump/src/trade.rs'))
 check(expected==(P/'minimal.diff').read_text(),'diff reconstruction')
 entry=(P/'evidence/lib-100-100.rs').read_text();check('pub fn buy_v3(' in entry and 'trade::buy(ctx,amount,max_sol_cost)' in entry,'source identity')
 # Decode the original wrapper edge independently of disassembler annotations.
 elf=(P/'residual-contract/evidence/original.so').read_bytes();shoff=struct.unpack_from('<Q',elf,40)[0];sz,n=struct.unpack_from('<HH',elf,58)
 def at(pc,k):
  for i in range(n):
   s=struct.unpack_from('<IIQQQQIIQQ',elf,shoff+i*sz)
   if s[1]!=8 and s[3]<=pc and pc+k<=s[3]+s[5]:return elf[s[4]+pc-s[3]:s[4]+pc-s[3]+k]
  raise ValueError('unmapped')
 check(at(0x1b7dd3,18)==b'Instruction: BuyV3','original identity')
 ins=at(0x128930,8);check(ins[:2]==b'\x85\x10' and 0x128938+8*struct.unpack_from('<i',ins,4)[0]==0x147ba0,'original body call')
 # These are structural guards, not semantic execution or proof.
 order=['curve.virtual_token_reserves=sub','curve.real_token_reserves=sub','curve.virtual_quote_reserves=add','curve.real_quote_reserves=add','token_interface::transfer_checked','curve.protocol_fees=add','if let Some(decimals)=quote_decimals','emit!(event.clone())','a.bonding_curve.complete=true','emit!(completion.clone())','emit!(post.clone())']
 positions=[n_body.index(x) for x in order];check(positions==sorted(positions),'normal effect order')
 check(n_body.count('user_output<=max_sol_cost')==1,'single max constraint')
 print(json.dumps({'status':'pass','scope':'whole-input seals, independent BuyV3 identity, exact diff and unchanged surrounding source; no typecheck or semantic acceptance','files':len(manifest)}))
if __name__=='__main__':main()
