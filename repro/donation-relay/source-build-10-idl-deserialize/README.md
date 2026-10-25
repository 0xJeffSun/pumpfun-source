# Relay owned3003 header deserialization

One pinned v1.44 compile with the existing v1.52 strip phase passed. Only src/idl.rs and src/exit_error.rs differ from Relay09. Candidate470560bytes SHA2565af54232ebb9e8fef524f6f6984d6dbd4567874bcf4a6e6927501c3bca66e549; symbols651072bytes SHA2560a51158ee4f11aaceb3c6fdb085ec225aa400488dc0c30b8f1b81ea642752917.

The admitted decoder now produces the owned3003 error, preserving I/O construction, owned-error construction, I/O destruction, then account-borrow release. Shared3004 factory semantics remain present. The complete original/candidate function/call/data ledgers and all residual byte intervals are retained:492original/328candidate windows,33raw/122normalized original matches,370unmatched. Whole original identity remains false.

Only the unchanged ordinary12 ran: five donation and seven IDL operations. All passed; saved verification rechecked24submissions,12unique transactions,50encoded signature fields,25unique signatures and24effect sets. No new short-header, source-origin or fixed-authority probe was introduced. Existing finite cases do not cover every malformed-header or allocation/formatter failure.3001/3002, other validation/borrow adapters and indirect-vtable provenance remain explicit gaps.

The original pre-runtime static seal is retained; later packaging only adds evidence and recorded verification. Initial static assembly errors (missing retained window/control copies and stale prior baseline path) are preserved. There was one target build, no source repair/retry, and one unchanged runtime run. Canonical source integration remains checkpoint-based; no current.json or earlier immutable package was edited.

Run python3 -B verify.py for complete static integrity/rederivation. Run the recorded solders Python with ordinary/verify.py --repo /path/to/repository --runtime to verify saved signatures/effects without target execution. The only repository dependency is the immutable original ordinary proposal. No build/runtime caches, keypairs or telemetry are included.
