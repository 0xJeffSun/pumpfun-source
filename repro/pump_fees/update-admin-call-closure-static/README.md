# Fees update-admin static call and data closure

This publishes the immutable [44-file diagnostic report](sealed/REPORT.md) for the current Fees candidate, SHA-256 `a9c4ea9e47356a91bf9bd97318746a7c207b873e32485d7786853f048d7d4afa`. It adds no builds, program changes, runtime comparisons or initializer work.

A four-edge direct-call closure from the accepted update-admin dispatcher visits 59 function pairs. Fifty-eight complete normalized bodies and relocation patterns match; 16 bodies are raw-byte identical. One reached FeeConfig account-decoding wrapper remains unmatched: candidate 30000 / 1,144 bytes versus original 36072 / 1,248 bytes. The original caller strips the discriminator before its field decoder; the candidate delegates that slicing to its unchecked decoder. This observation alone establishes no runtime mismatch or justified replacement.

The report preserves 175 raw signed call edges and 245 relocated references, including four code pointers. Sixteen direct pointer/length argument spans and the separately bounded program-id/seed checks match. Five reference sites reach four distinct differing source-location record pairs. There remain 133 unresolved data extents, seven bodies at the depth boundary, 11 external syscall sites and eight indirect-call sites. Matching direct code does not prove complete transitive data or runtime equivalence.

All original diagnostic files and their manifest remain byte-for-byte unchanged under `sealed/`, with a complete archive in `sealed-source-report.tar.gz`. The sealed manifest SHA-256 is `7a26472979b224873680a7ab5612a916e7bbe56d2262f42abcb0de32ca23b64f`. Work-directory paths inside the sealed report describe the original analysis. This publication's verifier resolves the repository independently of its working directory and verifies both package layers, current bound inputs, raw call operands, bounded data and saved disassembly. It executes no program instructions:

```sh
PYTHONDONTWRITEBYTECODE=1 python3 repro/pump_fees/update-admin-call-closure-static/verify.py
```

The original analysis scripts are retained as historical analysis inputs. Do not run them inside this immutable publication; restore the archived work directory if repeating the diagnostic. Exact historical source, complete transitive closure and full-original executable identity remain unresolved.
