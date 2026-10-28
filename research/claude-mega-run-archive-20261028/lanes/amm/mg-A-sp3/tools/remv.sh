#!/bin/bash
# remv.sh VARIANT.rs [FILE_REL] : install variant (default srf file), run inline remarks, print srf decisions; restores the file
L=/Users/shawwalters/amm100-run/lanes/mg-A-sp3; REL=${2:-instructions/admin/set_reserved_fee_recipients.rs}
F=$L/src/programs/pump-amm/src/$REL; V=$(cd $(dirname $1) && pwd)/$(basename $1)
cp "$F" "$F.bak"; cp "$V" "$F"
OUT=$L/ir/rem-$(basename $1 .rs).txt
$L/tools/remarks.sh $OUT >/dev/null 2>&1 || { echo "BUILD FAIL $(basename $1)"; grep -E "^error" -A8 $OUT | head -20; mv "$F.bak" "$F"; exit 1; }
mv "$F.bak" "$F"
echo "== $(basename $1)"
grep -E "into '_ZN[^']*set_reserved_fee_recipients[^']*(handler|_recipients)17h" $OUT | grep -E "with_account_name|fmt6format|9serialize|4data|Error\\\$GT\\\$4from|is_exempt|try_data_len" | sed -E "s/17h[0-9a-f]{16}E//g; s/note: <unknown file>:0:0 inline //; s/'_ZN[^']*set_reserved_fee_recipients[^']*'/SRF/; s/_ZN5alloc3fmt6format/format/; s/_ZN11anchor_lang5error5Error17with_account_name/w_a_n/; s/_ZN92_.LT.pump_amm_recovered..state..ReservedFeeRecipientsEvent.u20.as.u20.anchor_lang..Event.GT.4data/Event::data/; s/_ZN69_.LT..u5b.T.u3b..u20.N.u5d..u20.as.u20.borsh..ser..BorshSerialize.GT.9serialize/[T;N]::ser/" | sed -E "s/because too costly to inline//" | cut -c1-120
