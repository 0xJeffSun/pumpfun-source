# Captured program-name experiment

The captured AMM IDL names the program `pump_amm`. This controlled source trial
uses that program module and library name, with package `pump-amm`, in place of
the reconstruction suffix. The two contexts referencing Anchor's generated
program type were updated consistently.

The first attempt omitted those two type references and failed with E0412; its
exact source and build log remain under `results/failed-*`. The repaired build
is successful and retained with its 31 source inputs and symbols. It gives the
same 538 normalized / 116 raw matches, with no gained or lost windows. Both raw
and normalized whole-text sections differ; equality of counts is not equality
of instructions. No runtime acceptance was run and the change is not promoted.

`comparison.json` and the complete measurement retain the result. The IDL name
is evidence for an interface name, not proof of the original Cargo package or
crate identity. This trial does not establish historical build provenance.
