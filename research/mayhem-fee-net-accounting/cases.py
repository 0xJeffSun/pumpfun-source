"""Synthetic, initialized Token-2022 extensions; no captured file is changed."""
import struct

MAXIMUM = (1 << 64)-1

def profiles():
    return [
        dict(name='plain',base=None,quote=None,position=0),
        dict(name='zero_extension',base=[0,MAXIMUM],quote=None,position=0),
        dict(name='round_one_bps',base=[1,MAXIMUM],quote=None,position=0),
        dict(name='one_percent',base=[100,MAXIMUM],quote=None,position=0),
        dict(name='full_capped_seven',base=[10000,7],quote=None,position=0),
        dict(name='full_fee',base=[10000,MAXIMUM],quote=None,position=0),
        dict(name='quote_one_bps',base=None,quote=[1,MAXIMUM],position=0),
        dict(name='both_fees',base=[100,MAXIMUM],quote=[1,MAXIMUM],position=0),
        dict(name='minimum_net_positive',base=[100,MAXIMUM],quote=None,position=-(1<<127)),
        dict(name='minimum_net_zero',base=[10000,MAXIMUM],quote=None,position=-(1<<127)),
    ]

def fixture_case(profile):
    def extension(offset,raw):
        return dict(bytes=[[offset+i,v] for i,v in enumerate(raw)],length=offset+len(raw))
    mutations={}
    for kind,mint,accounts in [('base',3,[6,17]),('quote',4,[7,14,16,19,25,31])]:
        config=profile[kind]
        if config is None:
            continue
        bps,maximum=config
        # Mint AccountType=1, TransferFeeConfig(type1,len108), immutable authorities,
        # zero mint-withheld balance, identical older/newer active-at-epoch-zero fees.
        tail=bytes(83)+bytes([1])+struct.pack('<HH',1,108)+bytes(72)+struct.pack('<QQH',0,maximum,bps)*2
        mutations[str(mint)]=extension(82,tail)
        for index in accounts:
            # AccountType=2, TransferFeeAmount(type2,len8), pre-existing withheld.
            mutations[str(index)]=extension(165,bytes([2])+struct.pack('<HHQ',2,8,11+index))
    return dict(name=profile['name'],token_quote=True,quote_token22=True,
                state_tokens=profile['position'],mutations=mutations)
