# fz-P-cfee1-r1-02 (base L31, 990 -> 992/1035, raw 166, 0 losses) -- cumulative over -01

1. 0x298b0 collect_v2::collect_creator_fee (4152 B): see fz-P-cfee1-r1-01 README (early `let creator_vault` passed to a transfer
   helper with by-value `impl ToAccountInfo` params; `match owner!=FEES{false=>err!,true=>{..}}`; `&Program<System>` param).
2. 0x2bf18 distribution::v2::get_token_distribution_amounts (6664 B), src/creator/distribute_creator_fee_v2.rs, within-line edits:
   - line 168: `source_amount.checked_mul(u64::from(share.share_bps)).and_then(|a|a.checked_div(10000)).ok_or_else(||error!(PumpError::Overflow))?`
     (was `...ok_or_else(..)?/10000`). The Overflow error block now sits where the original has it in IR order, which
     fixes the cold-block order (orig 152,163,168,unwrap,149,173) and the loop-top rotation of the push/grow_one block.
     Same semantics: checked_div by the constant 10000 never fails, Overflow only on the multiply.
   - line 101: `require!(recipient.key()==share.address,..)` (was share.address==recipient.key()): memcmp operand order
     (orig passes the stack copy of the key in r1).
Evidence: clang -O3 on rustc's pre-opt bitcode (-Csave-temps) reproduces this loop fn exactly (llc on post-opt IR does not);
multiplex sweeps in lane gen/g11.py (t33, t60). Both windows byte-identical (normalized) in the nbuild score.
