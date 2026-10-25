# Shared AMM scalar setters: source prerequisites

The original three 616-byte scalar setters are each shared by **two direct callers**, `create_config` and `update_fee_config`. The historical static creation candidate called its reconstructed methods only from creation; its update handler retained inline compound guards. That old candidate did not reproduce the original sharing graph. The accepted current scalar correction also has no separate creation body or shared scalar methods. These are concrete source-structure gaps, not proof that caller count caused any compiler specialization.

This package provides an attribute-free natural method fragment and the exact required caller graph. **It does not propose an integration patch or build.** Extracting only the current update code into methods would leave one original caller absent and would not establish a closer compiler reconstruction. Adding dead, duplicate or synthetic calls to manipulate optimization is unjustified. The accepted behavioral correction is untouched.

## Bound identity and creation attribution

Inputs bind original AMM `6a7ad34596d83b4c435b32f458a56e718e9f82eb4ad38e4316616d15d24d8ff7`, accepted candidate `a6dbd0dc24e28a9459e50858136a2cfabb59fb8aa8399d58499d047a76ec291f`, its 18 source inputs, and historical static candidate `ff7818d7b6c3a3222e46a99bd9cb3fda6f8bff52d951eaefd40c1e2bba8c3a28`.

Creation identity is established by code, not a nearby source string. The captured IDL discriminator `c9cff3724b6f2fbd` is loaded at `0xdbd28`; branch `0xdbd38` selects `0xdc318`, whose call `0xdc368` enters wrapper `0xe0bf8`. Its call at `0xe1248` enters handler `0x16d88..0x17960` (3,032 bytes). The retained historical symbols identify the corresponding wrapper and public handler, and their complete normalized bodies/relocation shapes match these original ranges. Six existing historical static matches are independently recomputed: wrapper (2,320 bytes), handler (3,032), account context (5,752), initialization helper (5,896), recipient setter (2,336), and event serializer (744). This is static identity evidence, not successful initialization or complete transitive code/data equivalence.

The old source files are exact historical inputs extracted from the sealed source snapshot, with archive/member hashes. Their inline annotations and blank-line placement are retained only as history. None appears in the new fragment.

## Exact direct call graph

| Setter | Original body | Creation call | Update call |
| --- | --- | --- | --- |
| LP fee | `0x61630..0x61898` | `0x16e70` | `0x1d8f0` |
| Protocol fee | `0x61898..0x61b00` | `0x16ed0` | `0x1d958` |
| Recipient dependency | `0x61d68..0x62688` | `0x16f10` | `0x1d9a0` |
| Creator fee | `0x61b00..0x61d68` | `0x16f50` | `0x1d9e8` |

The complete original `.text` direct-call scan finds exactly these two callers for each scalar and recipient routine. No recognized relocated function-pointer reference targets a scalar body. This does not prove that arbitrary dynamically computed indirect calls are impossible. Both identified callers execute LP → protocol → recipients → creator, immediately propagating each error before any later setter.

Creation passes the same mutable configuration address to every setter: `r6 = r9 + 0x78`, then `r2 = r6` at `0x16e60`, `0x16ec0`, `0x16f00`, and `0x16f40`. The first fee arrives in `r3`; the protocol fee is restored from saved `r4`; creator fee is loaded from its stack argument. Captured IDL argument types are `u64`, `u64`, `[Pubkey; 8]`, `u64`, and authority `Pubkey`. These establish field/value roles independently of method names.

On creation, the signer public key is assigned to `admin` before the first setter. After all four succeed, `disable_flags` is cleared at `0x16f78`, creator-authority words are stored at `0x16f90`, `0x16fa0`, `0x16fb0`, and `0x16fc0`, then Clock/event work begins. Each scalar guard rejects unsigned values greater than 1000, reports error 6000 with values `(1000u64, supplied_fee)`, and writes its own field only on success. Destination offsets `0x380`, `0x388`, and `0x390` are **in-memory structure offsets**, not serialized account offsets. The fragment expresses named typed fields instead of assuming a hardcoded layout.

## Natural source spelling and its limits

`source-fragments/scalar_methods.rs` expresses the three proven scalar operations as ordinary `impl GlobalConfig` methods. It includes no inline annotations, fake filename/line attributes, padding, dispatch additions or synthetic callsites. `pub(crate)` is sufficient for the observed cross-module callers; the historical visibility is unknown. Equivalent free functions could have the same ABI, and the stripped original does not uniquely recover the method names or exact macro spelling.

The strongest placement evidence is the 44-byte consumed error-source path `programs/pump-amm/src/state/global_config.rs` and the observed scalar error lines 220/230/243. That supports a state module file containing the operations. It does not recover all surrounding declarations or justify recreating the old line positions. Current main's flat `state.rs` may be reorganized for ordinary source structure only after the complete integration scope is reviewed; no relocation is proposed merely to imitate diagnostics.

The shared recipient method is a real fourth dependency, not a placeholder. Its complete historical reconstructed body matches the original and has the same two original callers. It rejects zero keys (6011), then non-strict adjacent ordering (6012), and stores `[Pubkey; 8]` afterward. The historical source expresses those predicates with iterator `all`/`windows(2)`. This package leaves that exact historical source as evidence; it does not silently substitute it into the accepted current recipient implementation or claim new runtime coverage.

## Concrete missing prerequisites

A genuine shared two-caller source graph requires the missing `create_config` instruction body, its generated account context, the ordinary recipient setter, and event serialization. The required creation account context is retained as static evidence: mutable administrator signer with the captured fixed-address constraint, initialized 949-byte `global_config` PDA paid by that administrator, System program, event authority and event program. The existing source/context and full static body matches make these reviewable prerequisites. They do not supply an authorized administrator signature or successful runtime initialization.

Those dependencies are absent from the accepted current instruction dispatch. Reintroducing them is broader than extracting three scalar methods and must remain explicitly static-only until independently accepted. Existing rejection cases cannot validate creation behavior after the fixed-admin check. This task creates no initializer fixture, requests no key, alters no signed message, and proposes no signer substitution.

Even after all legitimate caller/source prerequisites were restored, the available evidence would not establish original inlining attributes or compiler decisions. The historical 608-byte versus 616-byte specialization negative and the accepted current specialized helper remain valid residuals. The two-call graph is a source fact, not a guaranteed fix for that difference. No compiler/version/flag/path variants or attributes are proposed.

## Verification and disposition

`evidence.json` retains the complete selected original/historical bodies, raw/normalized hashes, exact dispatch and callsites, branch/store facts, bounded source-path bytes and the historical one-caller discrepancy. `verify.py` rechecks copied input hashes and source fragments and reruns the read-only analyzer. It performs no build, VM execution, network operation or main edit. The current 37-handler/17,462-comparison checkpoint remains intact; no count, equality or security-audit claim changes.

Disposition: **bounded source prerequisites recovered; no build-ready patch proposed**. The next meaningful decision is whether to review the complete static-only creation/recipient dependency together with natural shared setters. A setter-only refactor or fabricated duplicate calls would not reconstruct the observed original graph.
