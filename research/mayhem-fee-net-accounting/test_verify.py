"""Mutate newly checked fee/accounting properties without touching evidence."""
import base64,copy,gzip,json,struct,unittest
import verify

class FeeProofControls(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.saved=json.loads(gzip.decompress((verify.P/'runtime/receipts.json.gz').read_bytes()))

    def reject(self,name,mutate):
        document=copy.deepcopy(self.saved)
        pair=next(p for p in document['cases']if p['profile']['name']==name)
        mutate(pair,document)
        with self.assertRaises(AssertionError):verify.check(document)

    @staticmethod
    def edit(row,index,offset,value,size=8,signed=False):
        tx=verify.Transaction.from_bytes(base64.b64decode(row['transaction_base64']))
        key=str(tx.message.account_keys[tx.message.instructions[-1].accounts[index]])
        account=row['after'][key];raw=bytearray(verify.data(account))
        raw[offset:offset+size]=value.to_bytes(size,'little',signed=signed)
        account['data_base64']=base64.b64encode(raw).decode();account['data_sha256']=verify.sha(raw)

    def test_gross_position_instead_of_net(self):
        self.reject('one_percent',lambda pair,doc:[self.edit(pair[side],2,72,-100003404,16,True)for side in ['original','candidate']])

    def test_floor_instead_of_ceiling(self):
        def mutate(pair,doc):
            for side in ['original','candidate']:
                self.edit(pair[side],6,64,1000000000+100003404-10000)
                self.edit(pair[side],6,170,17+10000)
                self.edit(pair[side],2,72,-(100003404-10000),16,True)
        self.reject('round_one_bps',mutate)

    def test_ignored_cap(self):
        def mutate(pair,doc):
            for side in ['original','candidate']:
                self.edit(pair[side],6,64,1000000000)
                self.edit(pair[side],6,170,17+100003404)
                self.edit(pair[side],2,72,0,16,True)
        self.reject('full_capped_seven',mutate)

    def test_existing_withheld_reset(self):
        self.reject('zero_extension',lambda pair,doc:[self.edit(pair[side],17,170,0)for side in ['original','candidate']])

    def test_withheld_leaks_after_overflow(self):
        self.reject('minimum_net_positive',lambda pair,doc:[self.edit(pair[side],6,170,18)for side in ['original','candidate']])

    def test_same_code_different_failure_stage(self):
        def mutate(pair,doc):
            for side in ['original','candidate']:
                logs=pair[side]['metadata']['logs']
                logs[:]=[line.replace('Error Code: TooMuchSolRequired.','Error Code: MathOverflow.') for line in logs]
        self.reject('quote_one_bps',mutate)

    def test_forged_program_binding(self):
        def mutate(pair,doc):
            for phase in ['before','after']:
                doc['programs'][0][phase][verify.MAY]['sha256']='0'*64
        self.reject('plain',mutate)

if __name__=='__main__':unittest.main()
