"""Adversarial proof controls; mutations never modify retained inputs."""
import base64, copy, gzip, hashlib, json, struct, unittest
import verify, static

class ProofControls(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.document=json.loads(gzip.decompress((verify.P/'runtime/receipts.json.gz').read_bytes()))
        cls.image=gzip.decompress((verify.P/'public/symbols.so.gz').read_bytes())

    def rejects(self, mutate):
        document=copy.deepcopy(self.document)
        pair=next(r for r in document['cases'] if r['family']=='token22' and r['case']['name']=='late_unfunded')
        mutate(pair,document)
        with self.assertRaises((AssertionError,ValueError)):
            verify.verify_runtime(document)

    def test_prior_transfer_not_rolled_back(self):
        def mutate(pair,doc):
            for side in ['original','candidate']:
                row=pair[side]
                tx=verify.Transaction.from_bytes(base64.b64decode(row['transaction_base64']))
                key=str(tx.message.account_keys[tx.message.instructions[-1].accounts[6]])
                account=row['after'][key];raw=bytearray(verify.data(account))
                struct.pack_into('<Q',raw,64,struct.unpack_from('<Q',raw,64)[0]+100003404)
                account['data_base64']=base64.b64encode(raw).decode()
                account['data_sha256']=verify.sha(raw)
        self.rejects(mutate)

    def test_missing_prior_transfer(self):
        self.rejects(lambda pair,doc:[pair[side]['metadata']['inner_instructions'][1].pop(1) for side in ['original','candidate']])

    def test_fabricated_callback_status(self):
        def mutate(pair,doc):
            for side in ['original','candidate']:
                logs=pair[side]['metadata']['logs']
                logs[:]=[line.replace('failed: custom program error: 0x1','failed: custom program error: 0x1778') for line in logs]
        self.rejects(mutate)

    def test_forged_loaded_image(self):
        def mutate(pair,doc):
            for phase in ['before','after']:
                doc['programs'][0][phase][verify.MAY]['sha256']='0'*64
        self.rejects(mutate)

    def test_missing_success_status(self):
        def mutate(pair,doc):
            for side in ['original','candidate']:
                logs=pair[side]['metadata']['logs']
                logs.remove('Program '+verify.TOKEN22+' success')
        self.rejects(mutate)

    def test_wrong_error_store(self):
        image=bytearray(self.image)
        struct.pack_into('<I',image,69080+14816+24+4,6009)
        with self.assertRaises(AssertionError):static.measure(image)

    def test_wrong_vtable_target(self):
        image=bytearray(self.image)
        image[716800+24:716800+32]=image[716800+32:716800+40]
        with self.assertRaises(AssertionError):static.measure(image)

    def test_changed_actual_method(self):
        image=bytearray(self.image)
        image[32248+4]^=1
        with self.assertRaises(AssertionError):static.measure(image)

if __name__=='__main__':unittest.main()
