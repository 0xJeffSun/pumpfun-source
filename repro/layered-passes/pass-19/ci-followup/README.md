# Pass19 hosted CI binding follow-up

Hosted pass18 run 40183972572 completed with 11 of 12 jobs successful. Pump4 completed its 2,299 comparisons, then the existing extra 16-case nested replay stopped before candidate execution: its frozen expected source map referred to a prior build. This was a manifest-binding failure, not an observed program mismatch.

The CI preparer verifies the six sealed historical harness files, copies them into work/, and derives only the copied expected source map from the successful current main build record. Runtime code, cases and assertions remain byte-for-byte unchanged. Original and candidate source/build/artifact bindings are checked before replay. Historical artifacts are unchanged.

The repaired pass19 invocation repeated the same 16 ordinary nested cases against candidate `5d35884b…`: 16 comparisons, 64 verified signatures, no mismatches. These are repeated coverage, not 16 new unique cases. The frozen harness retains its historical `new_unique_cases` field; this wrapper corrects its interpretation for this replay.

`verify.py --repo .` checks the package, frozen source and artifact bindings and verifies saved transactions without target execution. Later CI results must be checked separately; local success does not establish hosted acceptance.
