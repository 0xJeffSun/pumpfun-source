# Failed controls retained during qualification

The first full-corpus launch was intentionally not reused as final evidence. Sparse checkout omitted `repro/pump/tokenkeg-two-curve-fortyeight/harness/pump_tokenkeg_two_curve_differential.py`; the runner completed and retained 42 other suite receipts, reported the missing immutable fixture path, and exited nonzero before producing a combined report.

After adding that upstream path without modifying it, the entire 44-suite corpus was started again from scratch. The successful run in `runtime/full.json.gz` contains 10,468 pairs and all 44 loader receipts. No partial receipt from the failed launch is included in the accepted corpus.

An earlier build-control attempt using the ordinary user Cargo registry also stopped offline because its dependency set lacked `generic-array`. It was not substituted for the authenticated isolated registry. The published A–E records all use the verified dependency inputs and Linux v1.44 SBPF target-library profile.
