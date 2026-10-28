# mg-P-z00b PROGRESS (start = base L29: 988/1035 raw 166)
Work dir: /Users/shawwalters/Documents/Codex/2026-10-24/claude-pump-work/lanes/mg-P-z00b (src/ = L29 copy, var/<variant>, tools/, llx/)
Build+score: tools/bs.sh <var> <slot 1-3> [windows]  (nbuild, baseline L29). IR: tools/nirbuild.py --src var/X --work workir --out var/X.irb
llc loop: tools/xfn.py <mod.ll> <fnre> <out.ll>; tools/lx.py <out.ll> <fnre> <orig> <tag> [old=>new...] [--show N] (0.1 s/try, reproduces build).
Windows: 0x14910 admit_associated_token_account (buy_v2.rs), 0x1ac28 initialize_metadata (create_v2.rs)

## Log
- 03:45 c0 = L29 + z00's al1 buy_v2.rs + im2_p1 create_v2.rs: 988, no losses; 0x14910 0.6897 (6064B), 0x1ac28 0.1460 (7304B). 20 s/build.
- 0x14910 analysis: ABI r1=sret r2=account r3=authority r4=&mint, r5->stack [token_program,mint_info,tpi,allow_create,payer,system_program].
  al1's operand swap `require_keys_eq!(token_program,*account.owner)` is WRONG vs orig (orig with_pubkeys = (owner, token_program),
  memcmp(owner, tp)). k1 = L29 + only `&payer.key(),&authority.key()` in create_associated_token_account_idempotent: 0.6883, instruction
  stream identical modulo RA: orig r6=owner r7=payer (kept in reg until create path), ours r7=owner, payer spilled.
  Reloading owner after the create path (IR e1/e2) is worse (orig reuses owner in r6 across the CPI).
