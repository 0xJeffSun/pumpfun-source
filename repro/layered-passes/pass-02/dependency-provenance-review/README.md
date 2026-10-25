# ATA and Metaplex provenance review

[Complete report](readable/REPORT.md). Neither original recipe is recovered; ATA still differs at307 positions and Metaplex at1,509 positions in its retained allocation image. No new build or program change is justified by this review.

The original sealed worker publication accidentally includes Python bytecode caches. Its exact files and original seal are preserved in `original-publication.tar.gz`; the readable view omits only those cache files. No loose bytecode cache is published. `verify.py` validates both views and runs the original static verifier from a temporary extraction with a separate cache prefix and bytecode writing disabled. The archive is evidence, not an import path.
