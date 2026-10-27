# Compile-time legacy-buy specialization trial

An isolated Linux v1.44 source build replaces the runtime buy-mode boolean with a const generic at the existing ordinary/exact call sites. Dependencies were verified unchanged by the cached build driver. The candidate is 1,269,728 bytes and matches 539/785 normalized original windows (113 raw), with no gains or losses against the current Linux checkpoint. Whole ELF equality remains false.

The trial is **not promoted** and has not been runtime replayed. Separate compiler specializations alone do not recover the original shared trade helpers. `source.patch` records the change; `results` preserves the frozen source, both ELF files, actual build record/log and measurement.
