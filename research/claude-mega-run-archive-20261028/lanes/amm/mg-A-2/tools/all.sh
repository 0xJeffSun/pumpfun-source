#!/bin/bash
# all.sh SO : masked diff summary for all 6 lane windows
T=$(dirname $0); SO=$1
for p in "0x23e40 18pump_amm_recovered25migrate_pool_coin_creator" "0x24fd8 18pump_amm_recovered16set_coin_creator" "0x26da8 18pump_amm_recovered29transfer_creator_fees_to_pump" "0x28dd0 18pump_amm_recovered32transfer_creator_fees_to_pump_v2" "0x2ba60 11create_pool7execute17" "0x2e720 18pump_amm_recovered14extend_account"; do
 set -- $p; python3 -I $T/nd.py $SO $1 $2 | cut -c1-110
done
