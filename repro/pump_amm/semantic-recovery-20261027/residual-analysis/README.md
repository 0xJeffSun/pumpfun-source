# Combined AMM residual census

Candidate: `ac96a53eb7fa3f24ca275ceca733b99e4a4ced20460ee41d6979d683042be797`
from `work/amm-semantic-integration-20261027/final`. This is a read-only census;
no source, executable, or compiler cache was changed.

Of 785 original windows, 581 have exact normalized matches and 204 remain:

| Residual class | Windows |
| --- | ---: |
| Body differs only at proved source file length/line stores | 69 |
| Actual call-bound counterpart differs beyond those stores | 39 |
| No counterpart established by exact/source-only parent calls | 96 |

The last class is unresolved, not a claim of 96 additional semantic differences.
Nearest equal-size candidates are retained only as search leads. Their lack of
a matching body does not prove the source mapping or runtime behavior.

## Evidence boundary

`census.py` recognizes a source record only when a relocated pointer is immediately
stored to the stack, then the same straight-line, call-free block stores the
length at offset +8 and the line at +16. The exact pointed ASCII slice must end
in `.rs`. Only these identified length/line immediate bytes are masked; opcodes,
registers, offsets, all other immediates, and relocation patterns remain exact.
All 69 cases pass this rule. This is a body-level source-origin classification;
it does not establish all referenced strings, metadata or callees as identical.

The 39 counterpart mappings come from actual aligned call sites in a parent
whose body is exact or differs only under that strict source-origin rule.
They are stronger than nearest-size/name guesses. A counterpart can legitimately
have multiple compiler instantiations, all of which remain in `census.json`.

## Most concrete next work

1. **Transfer-fee record layout and buy-result construction.** Original
   `calculate_fee` at `0x74648` and its current 696-byte counterpart differ in five
   field-load/store instructions, plus two source-origin stores. Original copies
   words from offsets +8/+16/+24; current code reads +8/+16 and a u16 at +24.
   Original `calculate_buy_result` at `0x50598` is 1808 bytes, current counterpart
   1776. These are concrete layout/code-shape gaps already being investigated by
   the amount-helper worker; changing source coordinates cannot close them.

2. **`BuyResult::total_user_quote` operand order.** Original `0x50ca8` and current
   `0x24e40` are both 600 bytes. Seven prefix differences exchange r2/r3 addition
   and overflow-test roles; the remaining two are source-origin stores. Current
   source uses `self.buyback_fee.checked_add(self.pool_quote_amount_in)`. Reversing
   the natural checked-add expression is a focused source-shape hypothesis, not
   a demonstrated behavior fix. No experiment was run in this census.

3. **Pool decoder fallback branching.** Original checked/unchecked decoders at
   `0x64e20`/`0x650e8` are 712/584 bytes; current counterparts are 696/568. Their
   fixed prefixes agree through the length-dispatch region, where threshold
   tests and fallback calls are arranged differently. This is a structural
   branch-order gap; it is not covered by source-origin masking.

4. **Large business handlers remain structural recovery work.** Actual call-bound
   examples include create/deposit/withdraw, boost setup/execution, legacy sell,
   multihop, creator-fee transfers and accumulator lifecycle handlers. Several
   differ substantially in size. Existing broad runtime evidence is relevant to
   behavior, but cannot substitute for recovering their source organization and
   exact control/data flow. `census.json` gives the precise body pairs and the
   parent-call evidence for each.

The 69 source-origin-only residual bodies are a separate lower-risk recovery
category. Any future source-tree correction must reflect an authentic source
shape; padding, fabricated line coordinates or constant substitution would not
establish provenance.

## Gaps outside the body census

The SBPF target closes the five TypeId body gaps observed in the preceding audit.
It does not close all readonly data identity. For example, the exact normalized
`Pubkey::find_program_address` body still refers to a panic location whose
candidate is `vendor/solana-pubkey/src/lib.rs:802:32`, while the original is
`src/lib.rs:612:32`. The current object is at `0x12ec90`. This difference is
in metadata, so a body-only score cannot see it. Full readonly/indirect-call
closure and authentic create-config success remain independent gates.

Reproduce with:

```sh
work/test-env/bin/python work/amm-final-residual-census-20261027/census.py
```

The script verifies the candidate and symbol SHA256 against the saved final
measurement before classifying. It writes only its own census JSON.
