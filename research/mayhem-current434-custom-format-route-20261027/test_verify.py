"""Controls alter actual ELF data/operands and check the bounded stop point."""
from pathlib import Path
import importlib.util,os,shutil,struct,tempfile,unittest
from unittest.mock import patch
P=Path(__file__).resolve().parent
def module(n,p):
    s=importlib.util.spec_from_file_location(n,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
reader=module('custom_test_reader',P/'reader.py');verifier=module('custom_test_verifier',P/'verify.py')

class Controls(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.original,cls.candidate=reader.m.proof.inputs();cls.report=reader.inspect();cls.trace=cls.report['traces'][1]
        cls.o,cls.c=reader.m.proof.elves(cls.original,cls.candidate)
    def at(self,address):
        s=next(s for s in self.c.sections if s['type']!=8 and s['address']<=address<s['address']+s['size'])
        return s['offset']+address-s['address']
    def reject(self,image):
        with self.assertRaises(AssertionError):reader.inspect((self.original,bytes(image)))
    def test_saved(self):self.assertEqual(verifier.verify()['new_sites_beyond_unit_route'],3)
    def test_nested_vtable_target(self):
        v=self.report['vtables'][1];b=bytearray(self.candidate);struct.pack_into('<I',b,self.at(v['address'])+28,0);self.reject(b)
    def test_vtable_scalar_prefix(self):
        for off in [0,8,16]:
            with self.subTest(offset=off):
                b=bytearray(self.candidate);b[self.at(self.report['vtables'][1]['address'])+off]^=1;self.reject(b)
    def test_selected_literals(self):
        for e in self.trace['events']:
            if e['callee']=='string_write_str':
                with self.subTest(caller=e['caller'],offset=e['offset']):
                    b=bytearray(self.candidate);b[self.at(e['string_pointer'])]^=1;self.reject(b)
    def test_reference_dereference(self):
        ref=next(x['target']for x in self.trace['events']if x['callee']=='custom_reference_debug')
        b=bytearray(self.candidate);struct.pack_into('<h',b,self.at(ref)+2,8);self.reject(b)
    def test_tuple_call_register(self):
        fn=next(x['target']for x in self.trace['events']if x['callee']=='debug_tuple_field1_finish')
        b=bytearray(self.candidate);struct.pack_into('<i',b,self.at(fn+192)+4,7);self.reject(b)
    def test_payload_stays_opaque(self):
        event=self.trace['events'][-1]
        self.assertEqual(event['payload_target'],(1<<40)+36)
        self.assertTrue(event['payload_value_is_opaque'])
    def test_after_vtable_prefix_positive(self):
        b=bytearray(self.candidate);b[self.at(self.report['vtables'][1]['address'])+32]^=1
        self.assertEqual(reader.inspect((self.original,bytes(b)))['indirect_sites'],5)
    def test_after_custom_name_positive(self):
        name=next(x for x in self.trace['events']if x['caller']=='debug_tuple_field1_finish'and x['offset']==64)
        b=bytearray(self.candidate);b[self.at(name['string_pointer'])+name['length']]^=1
        self.assertEqual(reader.inspect((self.original,bytes(b)))['indirect_sites'],5)
    @unittest.skipUnless(hasattr(os,'mkfifo'),'POSIX FIFO control')
    def test_fifo_rejected(self):
        with tempfile.TemporaryDirectory()as d:
            p=Path(d)/'packet';shutil.copytree(P,p);os.mkfifo(p/'extra.fifo')
            with patch.object(verifier,'P',p),self.assertRaises(AssertionError):verifier.verify()
    def test_bitwise_and_model(self):
        t=reader.m.Trace.__new__(reader.m.Trace);t.reg=[0]*11;t.pc=t.start=0;t.role=t.side='test'
        t.steps=[];t.events=[];t.data_reads=[];t.frames=[];t.image=type('Image',(),{'rel':{}})()
        code=struct.pack('<BBhi',0xb7,0,0,-1)+struct.pack('<BBhi',0x57,0,0,128)+struct.pack('<BBhi',0x8d,0,0,0)
        t.raw=lambda a,n:code[a:a+n];t.call=lambda*args:True;t.run();self.assertEqual(t.reg[0],128)

if __name__=='__main__':unittest.main(verbosity=2)
