# Mayhem error ABI: two identified withdrawal callers

The non-initializer `withdraw_admin` and `withdraw_quote_admin` wrappers establish a concrete calling-convention difference at **four constructor callsites**, with matching code-102 name/message data. Original callers pass the error code in r1 and forward the constructor's r0/r1 pair directly. Candidate callers pass an output pointer in r1 and the code in r2, load the two output words, and copy them to their own output destination. This is new caller/consumer evidence beyond the previously published constructor return difference. It does **not** identify an optimizer pass or historical compiler, nor demonstrate a changed Anchor error payload representation.

No program source patch is supported or supplied. No builds, new fixtures, runtime/security probes, broadcasts, binary modifications, or compiler/version/flag searches were performed. Initializer, unknown-identity and mixed-entry bodies were not decoded. The initial dispatch attribution is inherited metadata; mixed dispatch code and the post-wrapper mixed-entry consumer remain excluded.

## Frozen inputs and provenance

All parent inputs were read as Git blobs at `517d77db988d8c63b6cf476f0be138c5a4f3128a`. Only the assigned directory was written. `provenance.json` records **full source SHA256, Git blob OID, size, checkpoint, selection range and copied-input SHA256** for every consumed/copied input. `windows.json` gives exact half-open file byte ranges; these ELFs have equal file offset and section-relative virtual address for the selected code/data. Addresses below are file offsets in hexadecimal.

- Original: `a87fa9f866272514e6acb852b668c4a08aeb173d56c883039991d114d1199bdb`.
- Accepted candidate: `9e4e19dfb3b3fefbec13ecfc0d43ffd2ff0bea7b74ac7b2fe14126d23c79c05b`.

The public `results/mayhem_abi` package supplies the constructor and candidate-symbol attribution, known ErrorCode name/Display counterparts, and selected genuine Anchor source. `wave2-results/mayhem_state_roles` independently supplies the previously attributed original withdrawal wrapper windows and wrapper-to-handler edges. Its report and two selected window metadata rows are retained. Original windows are inferred next-known-entry ranges, **not recovered historical symbols**. Current candidate symbol names are evidence about the candidate only.

Only bounded original/candidate windows and relevant source/data are copied. Whole ELFs are hashed during extraction, not placed in this seal. Whole-source identity for excerpts can be independently rebound with `verify.py --repo PATH`; portable verification authenticates internal consistency of the copied slices, not an independently acquired whole ELF.

## Dispatch identity before body inspection

`inputs/dispatch.json` is a projection of the fixed checkpoint's public `evidence/dispatch-map.json`. Its declared basis is a SHA256 instruction-log-name hypothesis. The verifier recomputes each discriminator from `global:<snake_case_name>`; it does not re-decode mixed dispatch instructions.

| Instruction | Discriminator | Inherited dispatch call → wrapper | Independently checked wrapper label data |
|---|---|---|---|
| withdraw_admin | `1e1b87bc899eda6b` | 514568 → 519296 (`0x7ec80`) | [0xadfeb,0xae005): `Instruction: WithdrawAdmin` |
| withdraw_quote_admin | `cc712a30723af859` | 515920 → 519952 (`0x7ef10`) | [0xae005,0xae024): `Instruction: WithdrawQuoteAdmin` |

Original wrapper windows are [0x7ec80,0x7ef10) and [0x7ef10,0x7f1a8). Their literal loads at 0x7eca8 and 0x7ef38 reference the corresponding log data with lengths 26 and 31. The candidate named wrappers are [0x58f98,0x592a0) and [0x58c68,0x58f98), with identical label bytes at 0x950ad and 0x9508e. This supports permitted identity independently of pattern similarity. The inherited state-role proof additionally connects wrapper calls 0x7eed8 → 0xc138 and 0x7f170 → 0xc560; those handler bodies are not needed or decoded here.

## Concrete arguments and return consumers

Both original wrappers preserve incoming r5 as r6 and branch past the error path if it exceeds 7: 0x7ecc8 → 0x7ed58 and 0x7ef58 → 0x7efe8. Candidate wrappers read the corresponding length via the incoming stack-argument pointer at [r6−0xff8], then test `> 7` at 0x58fe8 and 0x58cb8. The accepted source declarations at `programs/mayhem/src/lib.rs:44` and `:60` each take one `amount: u64`. Eight-byte argument availability is consistent with that source; no new all-input deserializer equivalence is claimed. The allocation/drop prelude before code 102 includes an indirect call and remains unclosed.

| Caller | Constructor argument setup / call | Return use |
|---|---|---|
| Original SOL | 0x7ed40: r1=102; **0x7ed48 → 0x9a5e8** | 0x7ed50 jumps straight to exit 0x7ef08; r0/r1 unchanged |
| Original quote | 0x7efd0: r1=102; **0x7efd8 → 0x9a5e8** | 0x7efe0 jumps straight to exit 0x7f1a0; r0/r1 unchanged |
| Candidate SOL | [0x59060,0x59078): r1=r10−0x278, r2=102; **0x59078 → 0x817f0** | 0x59080 loads pointer into r8 from −0x270; 0x59088 loads tag into r6 from −0x278; [0x59280,0x592a0) reloads saved incoming output pointer and stores tag/pointer at +0/+8 |
| Candidate quote | [0x58d30,0x58d48): r1=r10−0x6f8, r2=102; **0x58d48 → 0x817f0** | 0x58d50 loads pointer into r1 from −0x6f0; 0x58d58 loads tag into r2 from −0x6f8; [0x58f78,0x58f98) reloads saved incoming output pointer into r3 and stores tag/pointer at +0/+8 |

`result.json.direct_edges` retains raw eight-byte call encodings and recomputed relative destinations. `analyze.py` asserts exact argument, return-load, branch-target, output-store and exit encodings. No host execution of the SBF instructions occurs.

The full bounded constructors are copied: original [0x9a5e8,0x9a830), candidate [0x817f0,0x81a40). Original saves code r1 into r6 and its u32 stack slot; candidate saves code r2 into r7 and caller output r1 into r6. Original successful allocation return is moved from r0 to r1 at 0x9a730. At [0x9a7a8,0x9a7c8), it stores code at box+0x98, origin tag 2 at box+0x50, sets r0=0 and exits with r1 holding the box. Candidate [0x819b0,0x819d8) performs corresponding code/origin stores, then writes box r0 to out+8 and zero to out+0 before exiting. Allocation size 160/alignment 8 and corresponding payload stores agree in these windows; this inherited observation is supporting context, not presented as the new result.

The candidate wrapper's consumer of the output memory is explicit. The original wrapper forwards the register pair without interpreting it. Any interpretation by its mixed-entry caller remains outside scope.

## Selected code-102 data witnesses

Known name/Display windows are copied with their prior attribution, rather than extending into unknown callees. `result.json.selectors` records every evaluated comparison and branch for the fixed constant 102, literal selection and stopping point. This is a bounded static CFG selection, not a runtime probe. Both names lead to their string-copy call; both Display paths lead to formatting setup. Those callees are not assumed equivalent.

| Data | Original range | Candidate range | Verified bytes/use |
|---|---|---|---|
| Name | [0xae75c,0xae778) | [0x9564b,0x95667) | 28 bytes, `InstructionDidNotDeserialize`; name selector loads pointer and length |
| Message descriptor | [0xb2190,0xb21a0) | [0x99058,0x99068) | 16 bytes; relocated pointer and length 55 |
| Message | [0xaeef3,0xaef2a) | [0x95de2,0x95e19) | `The program could not deserialize the given instruction` |
| Constructor formatter table | [0xb1ea0,0xb1ed0) | [0x98d68,0x98d98) | 48 raw bytes retained as an unclosed indirect formatting dependency |

Original constructor calls name at 0x9a620 → 0x999e8 and Display at 0x9a6a0 → 0x9a830. Candidate calls are 0x81830 → 0x80bf0 and 0x818b0 → 0x81a40. For code 102, original name selector 0x99f60 falls through to pointer load 0x99f68 and length 28 at 0x99f78; candidate counterparts are 0x81168/0x81170/0x81180. Original Display 0x9acd8 selects the descriptor at 0x9ace0; candidate 0x81ee8 selects it at 0x81ef0. The entire branch chains are machine-readable.

Selected relocation records include exact source-file offsets and 16 raw bytes. The message descriptor's type-8 relocation stores its address in the upper u32 of the raw word; the following u64 is 55. The decoder explicitly checks that representation, rather than treating the on-disk u64 as a final runtime address. No loader, relocation patch, vtable execution or recursive formatting equivalence is claimed. Other data used on panic/OOM and prelude paths are not closed by the selected string witnesses.

## Genuine source comparison and what it establishes

Selected `anchor-error-1.0.0.rs` is byte-identical to retained official `lang/src/error.rs`, commit `25be6d502ec6957d34d436bc2a6170040fc64153`, SHA256 `c3f5fa7c0b79429191f6c7942344f592c81344dbdf18d3d2bc4ff932f9b7fd78`. The retained upstream provenance is copied; this run performs no network refresh.

- `error.rs:25–36`: framework ErrorCode has offset 0; the third instruction variant is code 102 with exactly the selected name/message.
- `error.rs:283–287,300–304`: Error has two boxed variants; `From<AnchorError>` uses `Box::new`.
- `error.rs:498–505`: AnchorError fields include name, numeric code, message, optional origin and compared values.
- Selected error code generator lines 58–60 applies `repr(u32)` to **ErrorCode**, not returned Error. Lines 77–89 form AnchorError from `name()`, integer conversion and `to_string()`, with both optional fields None. These statements explain the observed selected code and text; they prescribe neither r0/r1 return nor an output pointer.

The single retained target implementation compared is `inputs/SBF.cpp`, from the public v1.44 LLVM source copy associated by retained provenance with LLVM commit `08aedd64bf3abe4f163407b7bcf680403b84b32d`. Lines 86–105 encode relative calls as `(val−8)/8` and split lddw immediates into low/high words, agreeing with the verifier's call-target computation. This is linker encoding evidence only. It is **not** evidence that Mayhem used v1.44, nor does this source implement Rust aggregate return classification or LLVM return lowering. No alternate target versions were searched or built.

The demonstrated distinction is a local machine call convention, including shifted argument placement and two concrete return consumers. The evidence is compatible with compiler/optimizer lowering of the same source-level boxed variant. It does not distinguish a target ABI rule from internal interprocedural rewriting, or prove complete Rust representation identity across every variant. No representation rewrite or compiler change follows.

## Precisely unclosed obligations

1. Dispatch attribution is inherited public metadata plus wrapper logs, not a fresh proof through the excluded mixed-entry CFG. The post-wrapper mixed-entry consumer is likewise excluded. Full dispatch-to-runtime-error closure is therefore not claimed.
2. Constructor allocation, string-copy implementation, formatting engine/vtable targets, pre-constructor drop path, and panic/OOM paths are not recursively proved. Identical selected literal bytes are not complete formatting/allocator semantics.
3. Historical function names, original dependency graph and exact toolchain remain unknown. Inferred windows must not be promoted to historical symbols.
4. To identify the cause of register-pair versus output-buffer return, the concrete next prerequisite is an authenticated original compiler/target revision **and retained pre/post-optimization IR or assembly tied to this constructor and its two callers**, or authoritative lowering source tied to those artifacts. The retained linker source cannot supply that proof. This prerequisite does not authorize a version search, new build or excluded-body inspection.

Whole-file equality, exhaustive semantics/security and recovery coverage remain unchanged. The supplied 140/150 bounded-handler baseline and remaining five partial/five unrecovered handlers are not advanced by this ABI witness.

## Verification

Run `python3 -B verify.py` from any working directory. It verifies the exact sealed file set and SHA256 hashes, copied input hashes, whole-copy Git blob IDs, four constructor calls, constructor helper edges, exact caller/callee return encodings, four static code-102 selector paths, referenced message bytes/relocations, source equality and discriminator hashes. Optional `--repo /path/to/parent` additionally rebinds every input to fixed Git blobs and validates byte/line slices and JSON projections. No compiler, network, external Python modules or mutable parent work files are required.

`manifest-sha256.json` excludes itself. Verification outcomes are preserved outside the seal in the assigned worker directory, including a run from a copied publication directory. This package is for parent review/integration; it does not modify or promote accepted source.
