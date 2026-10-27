# Residual original-function scan

`scan.py` compares equal-size unmatched original windows to complete candidate
symbol bodies. `results.json` ranks instruction differences for investigation;
it does not label near matches as recovered functions. `source-paths.json`
records literal source paths present in the captured original ELF.

Three toggle handlers differ by only source-line and filename-length constants:
original starts `0x1b510`, `0x1b7c0`, `0x1bb00`. These differences alone are not
evidence of a behavioral bug and do not justify fabricated source coordinates.
The 728-byte body at `0xd7048` has the BondingCurve discriminator and the shape
of Anchor's generated AccountDeserialize implementation. It motivated the
separate typed-account decoder trial; the apparent nearest UserVolumeAccumulator
symbol is only a shape comparison, not an account-identity claim.

`compare_referents.py` records first-prefix comparisons as triage only. A different
byte after a shared string prefix can belong to the next pooled literal; unknown
extent prevents treating that as a semantic difference. `compare_literal_slices.py`
tracks constants only within straight-line blocks and checks bounded bytes at
named slice or memcmp consumers with corresponding direct callees. Its 522
observed literal uses match. This is partial data evidence, not a claim that all
relocations, metadata, indirect targets or data tables match.
