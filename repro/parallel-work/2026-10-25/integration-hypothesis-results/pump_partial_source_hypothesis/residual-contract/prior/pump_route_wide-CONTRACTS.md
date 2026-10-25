# Pure arithmetic contracts and proof ledger

These are mathematical/source-level specifications, not a source patch or a claim to recovered historical Rust names. All numbers are unsigned. Let W=2^64, M=W-1, H=W^2-1; pair(l,h)=l+Wh. All ranges are original ELF file offsets, end exclusive. Arithmetic instructions wrap at 64 bits unless specified. Pointer validity, distinct output/stack storage and the ordinary SBF call convention are preconditions. r0 is not a result/error discriminator for these compiler-runtime primitives.

## Multiplication, 0x1b55c8..0x1b5728

`mul128(out, a_lo, a_hi, b_lo, b_hi)` writes `((A*B) mod 2^128)` as low at out+0 and high at out+8. No error, saturation or overflow flag is emitted. In particular, when both high inputs are zero this is the exact 64-by-64 product.

Instruction ledger and algebra (b=2^32):

- 0x1b55c8..0x1b5618 saves out/a_hi and separates a_lo=x0+b*x1 and b_lo=y0+b*y1.
- 0x1b5618..0x1b5658 computes p=x0*y0, u=x1*y0, v=x0*y1. Each product fits one word.
- 0x1b5658..0x1b5678 computes t=(u+v) mod W and carry c=[t<v]. Thus u+v=t+cW.
- 0x1b5678..0x1b56b0 computes L=(p+(t<<32)) mod W and carry e=[L<p].
- 0x1b56b0..0x1b5728 stores L, then stores high `(x1*y1 + (t>>32) + c*b + e + a_hi*b_lo + b_hi*a_lo) mod W`. The a_hi*b_hi contribution starts at bit 128 and is discarded. c*b and t>>32 occupy disjoint bits, explaining OR at 0x1b56d0.

## Shift dependencies

0x1b5518..0x1b55c8 and 0x1b5948..0x1b59f0 take `(out, lo, hi, s)` and store the pair for logical right shift and wrapping left shift, respectively, for 0<=s<128. Bit 6 selects the >=64 arm (0x1b5528/0x1b5958); zero is separately handled (0x1b5530/0x1b5960); the remaining arms combine complementary shifts masked to 0..63. No error tag or external data access. Counts outside this range are not assigned Rust shift semantics: the code tests bit 6 and the full zero value, then masks individual machine shifts, so a count of 128 is not simply the zero-count case. All division-core counts below are within range.

## Unsigned division, 0x1b4088..0x1b40d0

For D>0, `div128(out, n_lo,n_hi,d_lo,d_hi)` writes floor(N/D) at out+0/+8, without a tag or narrowing. It delegates to 0x1b40d0..0x1b5518, whose four words are quotient low/high at +0/+8 and remainder low/high at +16/+24. The wrapper allocates 32 bytes, copies only the first two words at 0x1b40a8..0x1b40c8, and discards the remainder. Quotient always fits 128 bits for D>0.

The full core is an unsigned normalized quotient-estimation algorithm, not a signed divide, token operation, or error constructor. Its only calls are the proven multiply and shift helpers. It consumes operands, stack and immediate masks; there are no account reads or external constant-table reads.

### Division instruction ledger and mathematical justification

Let clz(0)=128 for two-word inputs; bN=128-clz(N), bD=128-clz(D).

| Byte range | Effect and invariant |
|---|---|
| 0x1b40d0..0x1b45f0 | Save operands; spread high word bits with OR-shifts 1,2,4,8,16,32. Complement and SWAR-popcount using 0x5555555555555555, 0x3333333333333333, 0x0f0f0f0f0f0f0f0f, 0x0101010101010101. This counts high-word leading zeros. If high=0 repeat on low and add 64. r9=clz(N), r6=clz(D). |
| 0x1b45f0..0x1b4730 | If bN<=bD, unsigned pair comparison returns q=0,r=N when N<D; otherwise q=1,r=N-D with borrow. Equal bit lengths imply N<2D for D>0. If bN>bD and bN<=64, direct word quotient/remainder at 0x1b4650/0x1b4658. |
| 0x1b4730..0x1b4850 | For bN>64 and bD<=32, divide high word by d; bring down the two low-word base-2^32 digits in turn (0x1b4780, 0x1b47b0, 0x1b47f8). Each remainder is <d; each next dividend fits 64 bits. Assemble q_hi, q_lo and r_lo; r_hi=0. |
| 0x1b4850..0x1b4878 | Sole core return stores r_lo, q_lo, r_hi, q_hi in that instruction order. |
| 0x1b4878..0x1b48b0 | With bN>64,bD>32 dispatch on delta=bN-bD. delta<32 selects one estimate; delta>=32 selects iterative reduction. |
| 0x1b48b0..0x1b4a90 | Let s=bN-64, U=N>>s, V=D>>s. s in 1..64; V>=2^32. Estimate qhat=floor(U/V). Compute full 192-bit qhat*D using two exact word products and a carry (0x1b4988/0x1b49c8, 0x1b49d0..0x1b4a18). Compare excess top word first, then high/low against N. |
| 0x1b4a90..0x1b4ad8; 0x1b51a0..0x1b5238 | If qhat*D<=N return qhat,N-qhat*D. Otherwise return qhat-1,N+D-qhat*D. Carries and borrows implement these equations modulo 2^128; the proven final remainder is nonnegative and <D. |
| 0x1b4ad8..0x1b4b80 | Set k=bD-32, v=(D>>k)+1 (top 32 bits plus one, so 2^31<v<=2^32). Initialize accumulated quotient Q=0 and residual R=N. |
| 0x1b4b80..0x1b4c28 | Let t=bit_length(R)-64. Shift R by t, dispatch on t>=k. R here has >64 bits, so t in 1..64. |
| 0x1b4c90..0x1b4dd8; 0x1b4e10..0x1b4e20 | If t>=k, a=floor((R>>t)/v), h=t-k, qpart=a<<h. Add qpart to Q with carry; subtract qpart*D from R with borrow. Multiply and left-shift calls at 0x1b4ce0/0x1b4d20/0x1b4d50 implement this without losing significant bits, by the bound below. |
| 0x1b4dd8..0x1b50a8 | Recompute clz(R), including zero-low fallback; intervening load/subtract at 0x1b4e10..0x1b4e20 completes residual low word. |
| 0x1b50a8..0x1b5120 | Finish accumulated quotient high carry. If residual bit length exceeds divisor's and exceeds 64, loop to 0x1b4b80. If residual<=64 and larger bit length than divisor, finish with word division. Otherwise perform final comparison/subtraction. |
| 0x1b5120..0x1b51a0 | Add floor(R/d) to Q with carry and return R mod d; this arm necessarily has D<=64 bits. |
| 0x1b4c28..0x1b4c90; 0x1b5238..0x1b53c8; 0x1b5490..0x1b5518 | If t<k, normalize R,D by the same t and make one final quotient estimate, multiply, compare, and optionally decrement once. Add estimate to Q with carry and return corrected remainder. |
| 0x1b53c8..0x1b5490 | When bit_length(R)<=bD, compare R with D; add either 0 or 1 to Q and subtract corresponding D, including carry into Q_hi. |

The one-estimate bound: for a common right shift s, write N=U*2^s+n, D=V*2^s+d, with 0<=n,d<2^s. Here U<2^64 and V>=2^32, so qhat=floor(U/V)<2^32<=V. Then `qhat*D-N < qhat*2^s <= D` and `N < (qhat+1)*D + 2^s`, with integer quotient giving `floor(N/D) <= qhat` (since `(qhat+1)*V>U`, the missing gap is at least 2^s>n). Thus qhat is the exact quotient or one too high. This also holds in the t<k final arm, where V=D>>t has >32 bits. That arm's product fits 128 bits: R and D have the same common scale; qhat*D <= U*2^t+qhat*(2^t-1) < 2^128 when t<k and D has at most 96 bits (the iterative path initially requires delta>=32); qhat<2^32 and t<k<=64. More directly, its top normalized dividend U<2^64 and t<=63 there, giving qhat*D<2^127+2^95<2^128. The initial small-delta arm can need 129 bits and explicitly retains the third product word.

The iterative bound: D<v*2^k and R>=(R>>t)*2^t. Hence qpart*D <= a*2^(t-k)*v*2^k <= (R>>t)*2^t <= R, with strict first inequality for a>0. Since R>>t>=2^63 and v<=2^32, a>=2^31: qpart is positive. So R strictly decreases; multiplication and shifted product fit 128 bits; `N = Q*D + R` remains exact. Q cannot overflow because Q<=floor(N/D)<=H. The loop terminates by decreasing nonnegative R; its final estimate, word-division and same-bit-length arms all return 0<=R<D. This proves the quotient/remainder contract over all unsigned 128-bit N and positive D without executing fixtures.

### Zero divisor boundary, no invented error ABI

There is no application error constructor or primitive error tag for D=0. Static paths are:

- N=0: clz values both 128; 0x1b45f0 -> 0x1b4678; pair comparison is equal; 0x1b46f0..0x1b4728 produces quotient=1, remainder=0; 0x1b4850 returns normally. Wrapper returns pair(1,0).
- 0<N<W: clz(D)=128>clz(N)>=64; 0x1b4640 skips div64 because d_lo=0, then 0x1b4658 executes `mod64 r9,r2` with r2=0.
- N>=W: clz(D)=128>clz(N)<64; small-divisor path skips div64 at 0x1b4770, then 0x1b4788 executes `mod64 r0,r6` with r6=0.

This is an exact opcode boundary, not a claim that D=0 returns an Anchor error or has one universal numeric result. The frozen machine/runtime rule for mod64-by-zero and its deployment error representation is not part of these source bytes. No VM was executed. A full all-input operational contract would require that rule; the admitted application calls exclude D=0 before entry.

## Caller arithmetic contracts and precedence

`Err(site, numeric_argument)` below denotes entry to an opaque existing constructor path. It does not promise error-object bytes, constructor success, formatting behavior or serialized Anchor errors.

### Ceil and fees

`ceil128(N,D)` at 0x88908..0x88f90:

1. Compute S=N+D with unsigned carry; if >H enter addition-overflow path 0x88ca0 (6024 at 0x88e28).
2. If S=0 enter subtraction-underflow path 0x88a30 (6024 at 0x88b70). This occurs for N=D=0 after successful addition.
3. If D=0 enter division-zero path 0x88bd8 (6026 at 0x88f28).
4. Return floor((S-1)/D) in `(tag=0, low, high)` at +0/+8/+16. The subtraction borrows from high when low=0 (0x889c0..0x889f0). Division call is at **0x88a00**, not 0x889f8 (that address prepares the output pointer).

This is a checked-intermediate ceil, not a total mathematical ceil: N=H,D=1 fails at step 1 although its mathematical quotient fits. At N=D=0 subtraction failure takes precedence over denominator failure. All callers' opaque constructor/error forwarding remains unchanged.

`fee(amount,rate)` at 0x88f90..0x89258, for u64 inputs:
`p=amount*rate` is exact u128. `p+10000<=H` because `(W-1)^2+10000 < W^2` and D=10000>0. Thus ceil helper's three arithmetic failures are unreachable on this domain. `f=(p+9999)//10000`. If f>=W enter narrowing path 0x89030, numeric 6025 at 0x891c8. Otherwise store `(tag=2,f)` at +0/+8 (0x89240..0x89250). There is no u64 wrapping multiply and no pre-division truncation. The high-limb check is after ceil success (0x89018..0x89030).

### Budget correction

For u64 budget B, requested rates P,C, and already-established effective second rate Ceff (zero or C), 0x806c8..0x80df8 specifies:

```
S = P+Ceff                         # exact integer sum
if S>M: Err(0x80a10, constructor_arg=24)
E = B if S==0 else (B*10000)//(10000+S)
if E==0: Err(0x80a48, code=6041)
f1 = fee(E,P)                      # first failure precedes second
f2 = fee(E,Ceff)
T = min(M, min(M,E+f1)+f2)
if T>B:
    excess = T-B
    if excess>E: Err(0x809d8, constructor_arg=24)
    E = E-excess
    if E==0: Err(0x80cb0, code=6042)
return (tag=0, E, f1, f2, P, C)     # offsets 0,8,16,24,32,40
```

The actual machine subtraction includes a redundant check/saturation for T-B at 0x809a0..0x809d0; under the preceding unsigned T>B branch it cannot underflow. Preserve it in a byte-level ledger, simplify it in this mathematical contract. Fees are NOT recomputed after correction. Rate-sum overflow precedes zero budget. The denominator may be 65 bits: 0x80800..0x80828 preserves its carry. B*10000 is exact and denominator>=10000, so E<=B<=M: ignoring the returned high word at 0x80850 is safe on this domain, not a generic narrowing contract. Moreover f1,f2<=B because E*P<=B*10000 and E*Ceff<=B*10000; their narrowing error is unreachable given this domain and a successful rate sum. A stronger bound follows from `E*(10000+S)<=10000*B`: since each ceil adds less than one, the integer total `E+f1+f2<=B+1`. Therefore any excess after saturation is at most one; with E>0 the correction-underflow branch is unreachable on this domain. Correction either keeps E or subtracts one, and the corrected-zero path requires E=1 and a one-unit excess. When B=M, saturation can absorb the one-unit mathematical excess, so it must not be replaced by an unbounded total. Saturation and correction guards are still part of the observed contract. The inherited route consumes fees, not E; its separate Q=B-f1-f2 rule is preserved as prior evidence, not a newly audited route body.

### Constant-product buy/sell

Only numeric adapters, not sell_v2 or its body, are consumed.

Buy at 0xa0838: u64 Q, base X=curve+0x40, quote Y=curve+0x48. If Q=0, Err(0xa0840,constructor_arg=24). Set T=Q-1. The numeric 0x880b0 helper's high operands are zero under this adapter, so numerator T*X is exact u128 and denominator Y+T is exact at most 65 bits. Numerator-overflow check at 0x88288 and denominator-overflow check at 0x88318 are unreachable for these inputs, but precede denominator-zero at 0x88400. If Y+T=0 (Q=1,Y=0), enter that opaque zero-denominator path (6026); otherwise return `(0, floor(T*X/(Y+T)) low, high)` at +0/+8/+16. The result is <=X<=M, so high is zero on this domain. Zero result remains possible; no minimum-one rule exists here.

Sell numeric adapter 0xa0538: u64 amount A, X=curve+0x40, Y=curve+0x48. Form X+A with carry at 0xa0548..0xa0578. If zero, Err(0xa0628,code=6026), before multiplication. Else return `(0, floor(A*Y/(X+A)) low, high)` at +0/+8/+16. Numerator is exact, denominator at most 65 bits, quotient<=Y<=M. A=0,X>0 succeeds with zero quotient. High zero is a mathematical consequence for this numeric adapter, not permission to remove route checks or infer surrounding transfers.

No fee selector, token extensions, handler reconstruction, surrounding state mutation, or serialized error constructor is closed by these pure contracts.
