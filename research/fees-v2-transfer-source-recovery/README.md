# Fees V2 transfer adapter recovered from Rust

The complete 3,096-byte V2 transfer-to-Pump adapter at original address 240088
now matches under the unchanged normalization. All **thirteen actual direct
callees** and its sole relocated **32-byte System program ID** match. This
raises the composed Fees source from 569 to **570/585 normalized original
functions**, with **143 raw local matches**, **168 equal Location observations**
and **15 unmatched functions**. No previous normalized/raw match, positive
callee observation or Location match is lost. Whole-ELF and whole-capture
identity remain false.

## Reconstruction evidence

The original caller passes the final argument by loading its account-struct
field. The compiled `UpdateFeeSharesV2` layout places `authority` at that
offset; it is the payer reference, not the program. The adapter copies the ten
other owned accounts, clones the payer and prepares the CPI program separately.
Its program argument is an owned
`AccountInfo`, as in the already recovered legacy adapter.

The source changes only `sharing_update.rs`: the V2 payer parameter becomes
`&AccountInfo`, the caller passes `authority.as_ref()`, and the CPI account
initializer clones the payer before the program. That initialization order
reproduces the original complete instruction and cleanup layout. This is a
sufficient ordinary Rust reconstruction, not proof of historical spelling.
No assembly, synthetic Source object, output-byte patch or extra matching mask
is introduced.

The preceding source already used individual owned fixed-account parameters,
an `Account<BondingCurve>` reference, and direct return of the CPI result. The
legacy and both generated CPI bodies stay matched. Prior experimental
program-last/program-borrowed variants remain excluded; the account-field
layout resolves their incorrect argument attribution.

## Builds, validation and limits

Two separate native root builds reproduce stripped SHA-256
`fb5d4251dfe349660fa6b69a2f355045efbf46b334560064f4c7473021130bd8`
and unstripped SHA-256
`e7fd8857df7afbee8f12ef1c1f5a15c0478631b77295d75c9bcc64f75f3b0e44`.
They use the parent's Linux platform-tools v1.44, existing dependency cache,
locked/offline mode, math mappings and v1.52 stripper. They are not fresh
all-dependency builds. The 43 source inputs, commands, logs and candidate
artifacts are retained. Absolute build paths identify the observed environment;
rebuilding elsewhere requires equivalent SDK, registry and mount paths.

Fresh execution passes the 17,331-case/18-suite regression, 119 native payout
boundary cases, eight quote-owner cases and 24 preprocessing boundary cases.
Each suite retains its own observation limits. These finite signed synthetic
cases do not prove exhaustive behavior, mainnet reachability or whole-program
identity. Original artifacts and canonical selected checkpoints are unchanged.

```sh
python3 -B research/fees-v2-transfer-source-recovery/verify.py
python3 -B research/fees-v2-transfer-source-recovery/test_scope.py
```

Verification authenticates the preceding union, recomputes complete function,
callee and data comparisons, and checks saved runtime evidence without executing
contracts. Negative controls reject unsealed claims, substitution of the parent
candidate and an omitted runtime case.
