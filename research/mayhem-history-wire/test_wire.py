import base64
import copy
import json
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest
import decode
import verify


class WireTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.root = verify.HERE.parents[1]
        cls.files = verify.inputs(cls.root)
        cls.series = json.loads(cls.files[verify.PREFIX+'analysis_timeseries.json'])
        cls.captures = {Path(k).name:json.loads(v) for k,v in cls.files.items() if k.startswith(verify.PREFIX+'tx_')}
        cls.accounts = {Path(k).name:json.loads(v) for k,v in cls.files.items() if k.startswith(verify.PREFIX+'capture_globalparams_')}

    def final_capture(self):
        return copy.deepcopy(self.captures['tx_exec_4JYgYYEZXsvv.json'])

    def final_instructions(self, cap):
        return cap['response']['result']['meta']['innerInstructions'][0]['instructions']

    def test_all_retained_raw_inputs(self):
        actual = verify.recompute(self.files)
        self.assertEqual(actual['update_count'],10)
        self.assertEqual(actual['transaction_count'],13)
        self.assertEqual(actual['mayhem_instruction_count'],32)
        self.assertEqual(actual['history'][6]['some_fields'],['field_10'])
        self.assertEqual(actual['history'][-1]['some_fields'],['field_'+str(i) for i in range(11,16)])

    def test_declared_timeseries_cannot_replace_wire_values(self):
        expected = copy.deepcopy(self.series)
        expected['transactions'][0]['update_events'][0]['fields']['field_0'] += 1
        with self.assertRaisesRegex(ValueError,'time series'):
            decode.derive(self.captures,self.accounts,expected)

    def test_base58_leading_zeros_and_invalid_characters(self):
        self.assertEqual(decode.b58decode('1112'),b'\0\0\0\1')
        self.assertEqual(decode.b58encode(bytes(32)),decode.SYSTEM)
        for value in ('0','O','I','l'):
            with self.subTest(value=value), self.assertRaises(ValueError):
                decode.b58decode(value)

    def test_option_none_and_missing_schema_are_distinct(self):
        n, fields = decode.arguments(bytes(11))
        self.assertEqual(n,11)
        self.assertIsNone(fields['field_10'])
        self.assertEqual(fields['field_11'],'not_in_schema')
        n, fields = decode.arguments(bytes(16))
        self.assertEqual(n,16)
        self.assertIsNone(fields['field_11'])

    def test_unsigned_u64_high_bit_preserved(self):
        args = bytes(10)+b'\1'+(2**64-1).to_bytes(8,'little')
        self.assertEqual(decode.arguments(args)[1]['field_10'],2**64-1)
        event = decode.EVENT+bytes(4)+(1).to_bytes(4,'little')+bytes(sum(decode.WIDTHS[:10]))+(2**64-1).to_bytes(8,'little')
        self.assertEqual(decode.event(event)['fields']['field_10'],2**64-1)

    def test_malformed_options_rejected(self):
        for raw in (bytes(10),bytes(10)+b'\2',bytes(10)+b'\1'+bytes(7),bytes(17)):
            with self.subTest(raw=raw.hex()), self.assertRaises(ValueError):
                decode.arguments(raw)

    def test_event_width_and_version_increment(self):
        raw = decode.b58decode(self.final_instructions(self.final_capture())[1]['data'])[8:]
        for bad in (raw[:-1],raw+b'\0',raw[:12]+(12).to_bytes(4,'little')+raw[16:]):
            with self.subTest(length=len(bad)), self.assertRaises(ValueError):
                decode.event(bad)

    def test_some_argument_must_match_event(self):
        cap = self.final_capture(); instruction = self.final_instructions(cap)[0]
        raw = bytearray(decode.b58decode(instruction['data'])); raw[20] ^= 1
        instruction['data'] = decode.b58encode(raw)
        with self.assertRaisesRegex(ValueError,'Some argument'):
            decode.transaction(cap,'test.json')

    def test_parentage_not_just_event_order(self):
        cap = self.final_capture(); self.final_instructions(cap)[1]['stackHeight'] = 2
        with self.assertRaisesRegex(ValueError,'nested directly'):
            decode.transaction(cap,'test.json')

    def test_wrong_account_program_and_authority_rejected(self):
        for which in ('program','global','authority'):
            cap = self.final_capture(); calls = self.final_instructions(cap)
            if which == 'program': calls[0]['programIdIndex'] = 0
            elif which == 'global': calls[0]['accounts'][1] = 0
            else: calls[1]['accounts'][0] = 0
            with self.subTest(which=which), self.assertRaises(ValueError):
                decode.transaction(cap,'test.json')

    def test_out_of_range_account_index_rejected(self):
        cap = self.final_capture(); self.final_instructions(cap)[0]['accounts'][0] = -1
        with self.assertRaisesRegex(ValueError,'index out of range'):
            decode.transaction(cap,'test.json')

    def test_loaded_account_key_order(self):
        program = decode.PROGRAM; writable = decode.GLOBAL; readonly = decode.EVENT_AUTHORITY
        result = dict(transaction=dict(message=dict(accountKeys=[program],
                      instructions=[dict(programIdIndex=0,accounts=[1,2],data='')])),
                      meta=dict(loadedAddresses=dict(writable=[writable],readonly=[readonly]),innerInstructions=[]))
        keys, rows = decode.invocation_rows(result)
        self.assertEqual(keys,[program,writable,readonly])
        self.assertEqual(rows[0]['accounts'],[writable,readonly])

    def test_missing_or_duplicated_carrier_rejected(self):
        for duplicate in (False,True):
            cap = self.final_capture(); calls = self.final_instructions(cap)
            if duplicate: calls.insert(2,copy.deepcopy(calls[1]))
            else: calls.pop(1)
            with self.subTest(duplicate=duplicate), self.assertRaisesRegex(ValueError,'cardinality'):
                decode.transaction(cap,'test.json')

    def test_log_event_difference_rejected(self):
        cap = self.final_capture(); logs = cap['response']['result']['meta']['logMessages']
        i = next(i for i,line in enumerate(logs) if line.startswith('Program data: '))
        raw = bytearray(base64.b64decode(logs[i][14:])); raw[16] ^= 1
        logs[i] = 'Program data: '+base64.b64encode(raw).decode()
        with self.assertRaisesRegex(ValueError,'Log and carrier'):
            decode.transaction(cap,'test.json')

    def test_truncated_update_log_rejected(self):
        cap = self.final_capture(); cap['response']['result']['meta']['logMessages'].append('Log truncated')
        with self.assertRaisesRegex(ValueError,'truncated logs'):
            decode.transaction(cap,'test.json')

    def test_actual_unrelated_log_truncation_retained(self):
        cap = self.captures['tx_m0_4iJN5WGToRhx.json']
        row, pairs, logs = decode.transaction(cap,'tx_m0_4iJN5WGToRhx.json')
        self.assertFalse(logs['complete'])
        self.assertEqual(pairs,[])
        self.assertEqual(len(row['instructions']),7)

    def test_signature_request_binding(self):
        cap = self.final_capture(); cap['request']['params'][0] = '1'*64
        with self.assertRaisesRegex(ValueError,'Signature binding'):
            decode.transaction(cap,'test.json')

    def test_failed_transaction_rejected(self):
        cap = self.final_capture(); cap['response']['result']['meta']['err'] = {'InstructionError':[0,'InvalidArgument']}
        with self.assertRaisesRegex(ValueError,'Failed transaction'):
            decode.transaction(cap,'test.json')

    def test_current_account_state_and_owner_bindings(self):
        for kind in ('owner','state'):
            accounts = copy.deepcopy(self.accounts); value = accounts['capture_globalparams_current2.json']['response']['result']['value']
            if kind == 'owner': value['owner'] = decode.SYSTEM
            else:
                raw = bytearray(base64.b64decode(value['data'][0])); raw[8] ^= 1
                value['data'][0] = base64.b64encode(raw).decode()
            with self.subTest(kind=kind), self.assertRaises(ValueError):
                decode.derive(self.captures,accounts,self.series)

    def test_none_field_cannot_change_even_if_table_and_logs_agree(self):
        captures = copy.deepcopy(self.captures)
        name = 'tx_m1_4R6xZbvESQSq.json'  # v7 sets only field_10.
        cap = captures[name]; result = cap['response']['result']
        calls = result['meta']['innerInstructions'][0]['instructions']
        carrier = next(c for c in calls if decode.b58decode(c['data']).startswith(decode.CARRIER))
        raw = bytearray(decode.b58decode(carrier['data'])); raw[24] ^= 1  # event field_0
        carrier['data'] = decode.b58encode(raw)
        logs = result['meta']['logMessages']
        i = next(i for i,line in enumerate(logs) if line.startswith('Program data: '))
        logs[i] = 'Program data: '+base64.b64encode(raw[8:]).decode()
        expected = copy.deepcopy(self.series)
        i = next(i for i,row in enumerate(expected['transactions']) if row['capture_file'] == name)
        expected['transactions'][i] = decode.transaction(cap,name)[0]
        with self.assertRaisesRegex(ValueError,'None field changed'):
            decode.derive(captures,self.accounts,expected)

    def test_missing_update_cannot_hide_behind_an_edited_table(self):
        captures = dict(self.captures); name = 'tx_m1_4R6xZbvESQSq.json'; del captures[name]
        expected = copy.deepcopy(self.series)
        expected['transactions'] = [r for r in expected['transactions'] if r['capture_file'] != name]
        with self.assertRaisesRegex(ValueError,'Version chain gap'):
            decode.derive(captures,self.accounts,expected)

    def test_i128_counter_is_not_truncated_to_i64(self):
        cap = copy.deepcopy(self.accounts['capture_globalparams_current.json'])
        value = cap['response']['result']['value']; raw = bytearray(base64.b64decode(value['data'][0]))
        raw[206:222] = (2**100).to_bytes(16,'little',signed=True)
        value['data'][0] = base64.b64encode(raw).decode()
        self.assertEqual(decode.account(cap)['stable_deployed'],2**100)

    def test_missing_account_capture_rejected(self):
        with self.assertRaisesRegex(ValueError,'both retained account'):
            decode.derive(self.captures,{},self.series)

    def test_original_entrypoint_rejects_modified_derived_table(self):
        with tempfile.TemporaryDirectory() as temp:
            evidence = Path(temp)
            for name, raw in self.files.items():
                if name.startswith(verify.PREFIX):
                    (evidence/Path(name).name).write_bytes(raw)
            expected = copy.deepcopy(self.series)
            expected['transactions'][0]['update_events'][0]['fields']['field_0'] += 1
            (evidence/'analysis_timeseries.json').write_text(json.dumps(expected),encoding='utf-8')
            script = self.root/'research/mayhem-globalparams-field-history/verify.py'
            result = subprocess.run([sys.executable,'-I','-B',str(script),'--evidence',str(evidence)],
                                    cwd=temp,capture_output=True,text=True,timeout=60)
            self.assertEqual(result.returncode,1,result.stderr)
            self.assertIn('raw transaction decode: Raw captures do not reproduce',result.stdout)

    def test_relocated_isolated_replay(self):
        with tempfile.TemporaryDirectory() as temp:
            root = Path(temp)/'repo'; packet = root/'research/mayhem-history-wire'
            shutil.copytree(verify.HERE,packet,ignore=shutil.ignore_patterns('__pycache__'))
            for name,raw in self.files.items():
                path = root/name; path.parent.mkdir(parents=True,exist_ok=True); path.write_bytes(raw)
            run = subprocess.run([sys.executable,'-I','-B',str(packet/'verify.py')],cwd=temp,
                                 capture_output=True,text=True,timeout=60)
            self.assertEqual(run.returncode,0,run.stderr)
            self.assertEqual(json.loads(run.stdout)['status'],'PASS')


if __name__ == '__main__':
    unittest.main()
