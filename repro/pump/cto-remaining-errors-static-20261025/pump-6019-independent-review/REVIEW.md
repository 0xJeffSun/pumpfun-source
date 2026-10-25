# Independent static review of CTO6019

**PASS for the bounded, unapplied source proposal.** Reviewed peer seal `e22c4568aa73e1e7b173f2d39d3168a400107f5ab1e02504a17c4f7785ba3b46`. Its unchanged verifier passes; the independent verifier rechecks the original raw instruction encodings and key role/branch/constructor links. No new candidate, compiler, runtime, network or excluded-lane work was performed.

The complete retained instruction wrapper, account parser, application and eight associated helper windows are hash-bound to the original ELF/ledger. These are retained inferred function bounds, not original recovered symbols. The account role is supported on the successful path: parser751776 loads the current AccountInfo address;751784 saves frame-3984;770016/770024 transfers it to output+144. The missing-account path also uses frame-3984 for error transport, but has the independently named14-byte `sharing_config` label and a distinct error path. That temporary reuse is not treated as a successful account address. The parser's later767240/767248 dereference and named seed-check path corroborate the same slot/key role.

Wrapper1236568 receives parser output at frame-528. Copy source-512→destination-920 for386 bytes preserves aggregate offsets16 onward, while the first two words are copied separately into aggregate-936. Therefore slot+144 survives unchanged: it lies within copied bytes[16,402). Context+8 points at that aggregate. Application141880 loads it, preserves/reloads it, reads+144 at143192 and dereferences the AccountInfo's first pointer at143200. Four complete words form the second comparison operand at frame[-1136,-1104). It is the sharing-config account key, not account data, owner, creator or an error-frame pointer.

Actual holder-PDA derivation uses `holder-rewards`14 bytes plus the complete32-byte key from aggregate+16, the Pump program ID, and full helper1736376 with the retained `sol_try_find_program_address` external relocation. Its actual result supplies all32 bytes at[-1304,-1272), rather than a guessed literal key. Nonholder/Some flow is separately identified; a blanket holder-target rejection is unsupported and is not proposed.

On that path, new creator bytes form target[-1208,-1176). Three32-byte comparisons are ordered: zero target→6030 at145112/145136; target versus holder PDA→6019 at145184/145208; then target versus sharing-config key→the same6019 at145256/145280. Thus the selected source's existing guard omitted a first equality branch as well as using a numeric error constructor.

The literal selector is enum ordinal19. The actual Name/Display decision trees select `InvalidCreator` and22-byte `Invalid creator pubkey`; overlapping name writes and the Display descriptor are independently decoded. Original construction records Source line312 and38-byte `programs/pump/src/creator/admin_cto.rs`, compared-valuesNone. Calls within146536..146736 are only Name, Display and the owning Anchor converter. That converter allocates160 bytes aligned8 and returns owned AnchorError tag0; there is no pubkeys or account-name decoration in this constructor region. The owned result goes to the common return. The wrapper's retained cleanup is not a proof of the destructor's transitive behavior.

The exact proposal is justified as written:

```rust
if !holder && (target==holder_key || target==a.sharing_config.key()) {
    return Err(error!(PumpError::InvalidCreator));
}
```

It preserves zero6030 precedence, holder scope and the ordered two-equality short circuit; it attaches no compared pubkeys and fabricates no source path/line. It is still **unapplied**, with proposed single-patch source SHA256 `b3e6c31ea67acac80171bf8dd90977c5da8e5f8155e5ce70d6fb9eae4df3cb24`. A later coordinated6091+6019 batch must bind its combined exact delta and emitted code separately; this review does not approve unseen batch output or6092 changes.

Limits: current macro diagnostics will remain naturally different from original312/38-byte path. No emitted candidate identity, runtime changed-branch coverage, original source text, allocator/OOM/panic/destructor/complete predecessor closure, whole-handler/security/ABI equivalence or recovery percentage is claimed. The peer verifier deliberately requires the original referenced source and prior packets unchanged; replay after applying the proposal requires the original frozen before-state, not bypassing or rewriting that gate.

```sh
python3 -B verify.py --repo /absolute/original-before-state-repository --packet /absolute/pump-6019-static-recovery
```
