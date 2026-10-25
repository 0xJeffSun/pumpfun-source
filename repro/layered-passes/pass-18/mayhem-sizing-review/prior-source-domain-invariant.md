# Source-domain refinement; no build/source change

The reviewed one-line patch and built bytes are unchanged. This note narrows the previously stated strict-guard limitation for the inspected handler; it does not claim full helper or raw-byte equivalence.

On a successful current SellPumpSwap path reaching sizing:

- `effective_quote` has been checked into u64. `vs` is that value widened to u128.
- `vt` is a u64 token amount widened to u128, with `vt != 0` checked before sizing.
- `tokens` is another u64 amount widened to u128.
- Thus `vt + tokens` is positive and fits u128, and `vs * tokens` fits u128. No wrapped arithmetic is used for these bounds.
- If `vs > 0`, then `tokens < vt + tokens`, so `floor(vs * tokens / (vt + tokens)) < vs`. If `vs = 0`, the quotient is zero.
- The configured cap and retained-reserve cap only take minima. Therefore final `output <= vs`, with `output < vs` whenever `vs > 0`. `output > vs` cannot be reached by this current handler after the preceding checks. Equality means `vs = output = 0`.

The complete retained original SellPumpSwap handler supplies corresponding bounded inputs to its published sizing helper:

- At95968 it loads the u64 quote-vault amount. At95984/96032 it obtains low/high words of the signed virtual adjustment, with the carry/sign tests96016/96072 and high-word check96080 rejecting failure before continuing. The surviving low word is r8; this produces a representable nonnegative u64 effective quote. There is no later local assignment to r8 before helper call97792. Callee-saved-register behavior is the normal sBPF calling convention.
- At96272 it loads the u64 base-vault amount, rejects zero at96280, saves it at96352 (frame-1800), and reloads it into r3 at97776.
- At97600 it loads the u64 Mayhem token-vault amount;97736 stores it at the helper's stack argument frame-4096.97784 passes effective quote r8 as r4.97792 calls186552.
- The original sizing helper loads retained-reserve input as u16 and rejects values>=10001 at186576, then forms the positive initial denominator from its u64 base-vault and token-vault inputs. It computes the same widened product/quotient and caps the selected output before its strict guard187176.

Accordingly, under this inspected caller's successful input/arithmetic premises, the original `vs > output` failure occurs at equality/zero, which is the branch targeted by the patch. The raw strict guard and current subtraction-underflow branch remain structurally different; helper calls with arbitrary unconstrained values or other unproven caller paths are not covered. No additional original functions were decoded to make this argument, and no runtime fixture was introduced.
