# Relay expression and crate-identity trials

Fifteen source-only trials did not add any complete normalized original-window
match. None was promoted. They cover close-epoch visibility, equality, temporary
borrowing and distribution initialization; eight equivalent mint-policy fee
checks; and the inferred `contracts` crate/program identity.

Close-epoch's baseline body is 4,008 bytes versus the target's 4,000. Alternative
field initialization produced 3,984 and 3,976-byte bodies, without a complete
match. Size alone is not acceptance. Crate-level visibility removed the standalone
close body and lost two existing matches; this was rejected. A first borrowed-epoch
experiment failed Rust type checking; its corrected form compiled but did not
match. Those failed compiler diagnostics remain in its work directory.

The mint-policy baseline differs at three register-selecting instructions. SPL
POD comparisons introduced more control-flow differences. The maximum, mutable
bitwise-OR and reversed-array forms still failed complete equality. Crate/library
renaming also added no matches. These results do not prove that the remaining
functions require another compiler or that no equivalent source can reproduce them.

`results.json` records every successful compiled trial, its complete ELF summary,
input-manifest digest, new/lost matches and disposition. Input maps are copied
here. Complete source snapshots, artifacts, compiler logs and comparison ledgers
remain under each recorded `work/` path. No runtime test claim is made for rejected
candidates. The accepted source stays at the separately verified 477-window
Jupiter checkpoint, with full byte equality still unachieved.
