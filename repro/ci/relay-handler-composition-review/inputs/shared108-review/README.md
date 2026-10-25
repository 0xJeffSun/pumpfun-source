# Relay shared108 interface correction

The distribution study reverses the names of two fields in its K interface paragraph: **K+16 is the source token AccountInfo and K+160 is the distribution authority AccountInfo**. The swap study's caller table has this order correctly. Both unchanged original reports remain retained; the old distribution verifier proves its bytes and does not certify those field labels.

Root independently checked the original caller97 bytes. At95704 it loads context+512, then clones that AccountInfo to frame−224 through call95744→31368. At95840 it loads context+376 and clones to frame−80 through95864→31368. The shared108 call at96112 receives K=frame−240. Therefore these are K+16 and K+160 respectively. The published context mapping identifies context+512 as the source token wrapper and context+376 as distribution. Shared108 copies those positions at119496–119528 and119632–119672 without changing their order.

`review.json` and exact raw slices retain the witness. This corrects interface labels before source integration; it does not prove the complete token CPI, all context fields, or original source identity. The natural distribution fragment does not itself encode these physical offsets, and no source-built relay candidate is accepted.
