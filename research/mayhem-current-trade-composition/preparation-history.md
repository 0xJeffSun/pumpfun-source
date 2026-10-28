# Source-reader preparation

The first private Source scanner used a fixed 39-byte prefix read, shorter than
the complete wanted literal, and reported no records. Its actual empty result
is retained in `source-records-preparation.json`; it is not a passing result.
The reader now uses the exact literal length and requires one bounded record
for each of the four original and four composed caller bodies. The corrected
reader checks filename/length/line only; unrelated fields remain outside scope.
Neither binary nor comparator was changed.
