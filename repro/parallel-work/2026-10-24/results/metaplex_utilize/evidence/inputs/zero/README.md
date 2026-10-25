# Metaplex zero-use and serialization-order correction

This source-only trial corrects three locations in the eighteen-file patch that produced candidate10. It retains the same public baseline `17e99434af5ead3e989c08f32af33609821d0bc0`. No new executable or runtime result is claimed here.

The prior static mapping incorrectly described zero-use branches as redundant bypasses. Decoding the original signed branch displacements shows that ApproveUseAuthority and Utilize reject zero with NotEnoughUses (86). Candidate10's positive-count guards instead skip that rejection. The corrected predicates explicitly reject zero while retaining all existing bounds, authorization checks and operation ordering. The [independent correction report](STATIC-CORRECTION.md) preserves exact raw instructions, branch destinations and the earlier incorrect claims as historical evidence. Root independently decoded both original zero branches.

The remaining dispatcher difference is in edition conversion: original code reads the account's data length before the serialization borrow, while candidate10 reads it afterward. Moving that existing statement before the writer follows the observed call order; it adds no new state or borrow operations. No successful-state failure or universal semantic-equivalence claim follows from that ordering observation.

The complete patch was independently applied to eighteen pristine public files, with every resulting hash checked. Exactly three files differ from the candidate10 source inputs. Source and read-only diagnostic archives, before/after hashes, raw branch evidence and upstream licensing are retained. Earlier packages remain unchanged. The existing 135 regression cases do not exercise these zero-use guard boundaries; no new runtime probes are included.

Build using workflow input `token_metadata_zero_use_recovered` or `--metaplex-zero-use-recovery`. Compilation, inherited regressions, structural matching and full-file comparison must be reported separately. No executable patching, source padding, compiler flag search or signer bypass was used. Exact historical source and complete binary equality remain unproven.
