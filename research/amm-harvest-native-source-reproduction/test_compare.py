"""Pure finite graph tests, without ELF, compiler or runtime inputs."""
import unittest
from compare import matching,call_closed,recovered


class GraphTests(unittest.TestCase):
    def test_duplicate_capacity_is_not_membership(self):
        self.assertEqual(matching({1:{8},2:{8}}),1)

    def test_augmenting_path_finds_capacity(self):
        self.assertEqual(matching({1:{8,9},2:{8}}),2)

    def test_extra_unused_candidate_does_not_inflate(self):
        self.assertEqual(matching({1:{8,9}}),1)

    def test_call_graph_prunes_wrong_duplicate(self):
        r={1:{8,9},2:{10}}
        a={1:{16:2},2:{}};b={8:{16:11},9:{16:10},10:{},11:{}}
        self.assertEqual(call_closed(r,a,b),{1:{9},2:{10}})

    def test_transitive_missing_target_propagates(self):
        r={1:{8},2:{9}}
        a={1:{0:2},2:{8:3}};b={8:{0:9},9:{8:10}}
        self.assertEqual(call_closed(r,a,b),{})

    def test_actual_call_offset_must_match(self):
        self.assertEqual(call_closed({1:{8},2:{9}},{1:{8:2},2:{}},{8:{16:9},9:{}}),{2:{9}})

    def test_unresolved_indirect_edges_are_not_invented(self):
        # This algorithm only has direct-call maps. An empty map is not an
        # assertion that a real function has no indirect/dynamic obligations.
        self.assertEqual(call_closed({1:{8}},{1:{}},{8:{}}),{1:{8}})

    def test_matching_order_does_not_change_cardinality(self):
        a={1:{8,9},2:{8},3:{9,10}}
        self.assertEqual(matching(a),matching(dict(reversed(list(a.items())))))


class UsedBodyTests(unittest.TestCase):
    def fixtures(self):
        o={'index':{1:{'address':1,'signature':'body','bytes':16},2:{'signature':'callee'}},
           'calls':{1:{8:2}},'data':{1:{}}}
        c={'index':{8:{'address':8,'signature':'body','bytes':16},9:{'signature':'callee'},10:{'signature':'wrong'}},
           'groups':{'body':[{'address':8,'signature':'body','bytes':16}]},
           'calls':{7:{0:8},8:{8:9},9:{},10:{}},'data':{8:{}}}
        return o,c

    def test_actual_used_complete_callee(self):
        o,c=self.fixtures()
        self.assertEqual(recovered(o,c,1)['actual_complete_callee_shapes'],1)

    def test_redirected_callee_rejected(self):
        o,c=self.fixtures();c['calls'][8][8]=10
        with self.assertRaises(AssertionError):recovered(o,c,1)

    def test_changed_call_offset_rejected(self):
        o,c=self.fixtures();c['calls'][8]={0:9}
        with self.assertRaises(AssertionError):recovered(o,c,1)

    def test_unexpected_data_operand_rejected(self):
        o,c=self.fixtures();c['data'][8]={0:20}
        with self.assertRaises(AssertionError):recovered(o,c,1)

    def test_dead_unused_body_rejected(self):
        o,c=self.fixtures();c['calls'][7]={}
        with self.assertRaises(AssertionError):recovered(o,c,1)

    def test_explicit_wrong_duplicate_rejected(self):
        o,c=self.fixtures()
        with self.assertRaises(AssertionError):recovered(o,c,1,10)


if __name__=='__main__':unittest.main()
