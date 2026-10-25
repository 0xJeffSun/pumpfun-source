; benchmark generated from python API
(set-info :status unknown)
(declare-fun n () (_ BitVec 64))
(declare-fun remaining () (_ BitVec 64))
(declare-fun total () (_ BitVec 64))
(assert
 (let (($x12 (bvult remaining n)))
(let (($x9 (= n (_ bv0 64))))
(let (($x11 (or $x9 (bvugt n total))))
(let (($x16 (or $x11 (not (bvuge remaining n)))))
(let (($x13 (or $x11 $x12)))
(let (($x17 (and (distinct $x13 $x16) true)))
(or $x17 $x17 (and (not $x16) $x12)))))))))
(check-sat)
