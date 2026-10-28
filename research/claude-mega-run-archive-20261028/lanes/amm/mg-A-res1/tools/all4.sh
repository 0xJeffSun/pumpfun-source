#!/bin/bash
# all4.sh SO : plain + all-masked diff summary for the 4 lane windows
T=$(dirname $0); SO=$1
for p in "0x23e40 18pump_amm_recovered25migrate_pool_coin_creator" "0x24fd8 18pump_amm_recovered16set_coin_creator" "0x2ba60 11create_pool7execute17" "0x50f00 estimate_buy_quote"; do
 set -- $p; echo "$(python3 -I $T/nd.py $SO $1 $2 | cut -c1-100) | all $(MS=1 MR=1 MJ=1 python3 -I $T/nd.py $SO $1 $2 | sed 's/.*diff \([0-9]*\) mset \([0-9]*\).*/\1 m\2/')"
done
