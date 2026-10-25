# Root review and prebuild correction

The original proposal at seal `e64000b668e365683e33ebb0975c832e12105682ad812967d99bf5756f14ab75` is retained unchanged in its original directory. Root read the complete source delta, report, allocation and caller evidence. The generated-exit owned-error change also covers existing whitelist serialization, interface-borrow and close-error producers; the original evidence supports that shared scope. Other framework/body/IDL adapters remain outside this change.

The uncompiled proposal invoked `Debug::fmt` without importing `std::fmt::Debug`. This revision adds that missing trait import, exactly as the retained Anchor source does. No error behavior, allocation, declaration, dependency, compiler setting or historical coordinate changes. This is a prebuild source correction, not a compiler retry. The original proposal's static verifier passed despite this issue; it does not establish Rust type correctness.

The original report's references to `verification-tests.json` were premature: the worker stopped at the account usage limit before retaining those tests. This corrected package will record root's actual copy checks separately. No such original worker test is claimed completed. A single isolated build and unchanged twelve-case ordinary corpus are the next gates; no original whole-file identity or exhaustive behavior is claimed.
