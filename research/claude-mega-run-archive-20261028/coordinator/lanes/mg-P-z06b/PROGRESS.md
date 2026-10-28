# mg-P-z06b progress
Start 2026-10-28 ~03:00 PDT. Base L24 (982/1035, raw 166; unstripped sha256 4c5c562de88c96fd7c23bd2c05b85632f370d603e4852cc79a29cba89d2ffd2f).
Work dir: W/lanes/mg-P-z06b (src = L24 copy + my edits; var/ variants; res/ results; tools/ copied from mg-P-z06).
Windows: 0x6cd78 (8544 B, sweep), 0x72810 (7832 B, sweep), 0x6fef8 (9176 B, set_reserved_fee_recipients, prior .793 srfC),
0x75308 (5920 B, claim_token_incentives, prior .612 clh20 / IR .668).

## Log
- 03:00 setup: copied L24 -> src.
- 03:10 IDENTIFICATION (callers in original): 0x72810 = sweep handler (called by both __global sweep_protocol_fee 0x129bb0 and
  sweep_creator_fee 0x12a048; sites sweep_fees.rs:123 NotAuthorized(6000) + :145 ConstraintSeeds(2006)).
  0x6cd78 is NOT a sweep handler: it is a sell.rs helper (sites sell.rs 23 MissingCashbackAccounts, 33/81/85
  InvalidCashbackAccumulator, 102 Overflow x2, 107/114 InvalidBondingCurveV2) called ONLY by the legacy sell handler
  0x152888 (lib.rs sell). It creates/fills the user_volume_accumulator remaining account (find_program_address
  "user_volume_accumulator", data_is_empty -> Rent -> system transfer/allocate/assign invoke_signed, try_borrow_mut_data,
  transfer_native 0x969f0, Account::try_from_unchecked, exit_with_expected_owner) and checks "bonding-curve-v2".
  The candidate has no such helper (legacy sell in lib.rs:1039-1044 does a crude inline version).
  0x6fef8 called by __global set_reserved_fee_recipients; 0x75308 by __global claim_token_incentives.
- ORIGINAL SWEEP BEHAVIOUR (decoded): prepare_bonding_curve(&curve,&system_program,&payer)?;
  123: require_keys_neq!(recipient.key(), Pubkey::default(), PumpError::NotAuthorized);
  creator: find_program_address(["creator-vault", curve.creator]) ; 145: require_keys_eq!(recipient, pda, ErrorCode::ConstraintSeeds);
           amount = take(curve.creator_fee)   (field zeroed BEFORE the zero check)
  protocol: validate_fee_recipient(&recipient,&global,&curve)?; amount = take(curve.protocol_fees)
  amount==0 -> msg!("Nothing to sweep for fee bucket {}", creator as u8) [u8 Display] ; return Ok
  native = quote_mint==default; native&&creator -> INLINE rent top-up (Rent::get, minimum_balance(0), recipient.lamports()<min ->
  legacy_buy::native_payments::transfer(system_program, payer, recipient, min)) [ensure_rent_exempt NOT called];
  !native -> mint/token_program keys + quote_mint & token_program clones kept across both admits;
  admit(assoc_quote_bc, &curve.to_account_info() [temp], ..false..), admit(assoc_quote_recipient, recipient, ..true..);
  ONE call transfer_to_owned(native, base_mint.as_ref(), &curve, recipient.to_account_info(), amount, &quote_token_program,
  quote_mint.decimals, quote_mint.as_ref(), src/dst Options (None when native), bumps.bonding_curve)?;
  event {Clock first, mint, curve, quote_mint, recipient, amount, bucket}; emit!(event); emit_cpi!(event) (no clone).
  The L24 candidate lacks: the 123 check, the msg, zero-before-transfer ordering, transfer_to_owned (uses sub/add_lamports and
  transfer_quote_tokens), inline rent.
- 03:15-04:10 sweep source search (multiplex: variant modules sweep_feeK.rs, same path length => identical Source sites;
  tools gen/swvar.py + tools/mxcmp.sh; llc on IR reproduces the build exactly): best v2 = 0.5926 (7392 B vs 7832):
  per-path checks OK, but the original has the native memcmp DUPLICATED per bucket (creator path: own memcmp -> rent) and
  the protocol-native path has its OWN recipient clone, tail-merged into the single transfer_to_owned call block.
  Tried: labeled-block per-arm checks (=v2), per-arm native (v13 .517), two call sites (v18 .557, not merged),
  full per-arm duplication (v22/23 9968/11744 B, not merged), !native-first (v6 .580), native&&creator (v12 .5929).
  JT dup cost of the memcmp block = load+memset+memcmp+icmp = 8 > 6 => JT cannot be the duplicator; open question.
