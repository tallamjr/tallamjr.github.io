---
draft: true
date:
  created: 2017-11-06
  updated: 2024-01-02
authors: [tallamjr]
categories:
  - RSW Engineering
  - Tooling
  - Databases
tags:
  - data-engineering
---

# 🛢️ **TPC-, _h-i-j-k, lmnop_..**

A while ago I worked on a method to allow local writing of development logs in markdown, which I
could then upload to Github where my supervisor could take a look. Here are the steps..

<!-- more -->

# TPC-H Benchmark Data

From https://www.tpc.org/tpch/

> Over the past few years the industry has seen increases in performance and
> decreases in costs of computer and database systems. The TPC is introducing
> V3.0 of the TPC-H Benchmark to accommodate these trends and maintain the
> relevance of the Price/Performance metric. The primary change in this major
> revision is to adjust the Price/Performance metric by a multiplier of 1,000.

### Getting the Data

Again from their website:

> [!Warning]
>
> The TPC Tools are available free of charge, however all users must agree to the licensing terms and register prior to use.
> Please head over to [this page](https://www.tpc.org/TPC_Documents_Current_Versions/download_programs/tools-download-request5.asp?bm_type=TPC-H&bm_vers=3.0.1&mode=CURRENT-ONLY) to confirm you agree to their agreement

Once that is done, the files located here will be accessible.

Assuming you place the files under version control, after an `init commit`, in
order to run data generation on a mac you can apply [this
commit](https://github.com/electrum/tpch-dbgen/commit/32f1c1b92d1664dba542e927d23d86ffa57aa253)
from https://github.com/electrum/tpch-dbgen with this:

```bash
git remote add upstream https://github.com/electrum/tpch-dbgen.git
git fetch upstream
git cherry-pick 32f1c1b92d1664dba542e927d23d86ffa57aa253
# Then move the makefile into the correct dir
mv makefile ./dbgen/

```

Then create new data according to the scale factor with:

```bash
export SCALE_FACTOR=1
cd dbgen && ./dbgen -s ${SCALE_FACTOR}
```

Change `SCALE_FACTOR` as you see fit. A scale factor of `1 = 1Gb`, so `10 = 10Gb` and so on.

An overview of the entity-relationship (ER) diagram is shown here (found in the specification document)

<img src="er.png" alt="" width="700">

## Tables

```console
ls -lah dbgen/*.tbl

-rw-r--r-- 1 tallam staff  24M Mar 15 19:36 dbgen/customer.tbl
-rw-r--r-- 1 tallam staff 725M Mar 15 19:36 dbgen/lineitem.tbl
-rw-r--r-- 1 tallam staff 2.2K Mar 15 19:36 dbgen/nation.tbl
-rw-r--r-- 1 tallam staff 164M Mar 15 19:36 dbgen/orders.tbl
-rw-r--r-- 1 tallam staff  24M Mar 15 19:36 dbgen/part.tbl
-rw-r--r-- 1 tallam staff 114M Mar 15 19:36 dbgen/partsupp.tbl
-rw-r--r-- 1 tallam staff  389 Mar 15 19:36 dbgen/region.tbl
-rw-r--r-- 1 tallam staff 1.4M Mar 15 19:36 dbgen/supplier.tbl

```

Let's inspect the tables, see `inpspect-tables.py`:

```bash

=== Table: customer ===
Using directory: ./parquet/customer
Schema:
Schema([('c_custkey', Int64),
        ('c_name', String),
        ('c_address', String),
        ('c_nationkey', Int64),
        ('c_phone', String),
        ('c_acctbal', Float64),
        ('c_mktsegment', String),
        ('c_comment', String)])

Head:
shape: (2, 8)
┌───────────┬────────────┬────────────┬────────────┬───────────┬───────────┬───────────┬───────────┐
│ c_custkey ┆ c_name     ┆ c_address  ┆ c_nationke ┆ c_phone   ┆ c_acctbal ┆ c_mktsegm ┆ c_comment │
│ ---       ┆ ---        ┆ ---        ┆ y          ┆ ---       ┆ ---       ┆ ent       ┆ ---       │
│ i64       ┆ str        ┆ str        ┆ ---        ┆ str       ┆ f64       ┆ ---       ┆ str       │
│           ┆            ┆            ┆ i64        ┆           ┆           ┆ str       ┆           │
╞═══════════╪════════════╪════════════╪════════════╪═══════════╪═══════════╪═══════════╪═══════════╡
│ 29        ┆ Customer#0 ┆ sJ5adtfyAk ┆ 0          ┆ 10-773-20 ┆ 7618.27   ┆ FURNITURE ┆ its after │
│           ┆ 00000029   ┆ CK63df2,vF ┆            ┆ 3-7342    ┆           ┆           ┆ the       │
│           ┆            ┆ 25zyQMVYE3 ┆            ┆           ┆           ┆           ┆ carefully │
│           ┆            ┆ …          ┆            ┆           ┆           ┆           ┆ final …   │
│ 48        ┆ Customer#0 ┆ 0UU iPhBup ┆ 0          ┆ 10-508-34 ┆ 3792.5    ┆ BUILDING  ┆ re        │
│           ┆ 00000048   ┆ FvemNB     ┆            ┆ 8-5882    ┆           ┆           ┆ fluffily  │
│           ┆            ┆            ┆            ┆           ┆           ┆           ┆ pending   │
│           ┆            ┆            ┆            ┆           ┆           ┆           ┆ foxes.    │
│           ┆            ┆            ┆            ┆           ┆           ┆           ┆ pen…      │
└───────────┴────────────┴────────────┴────────────┴───────────┴───────────┴───────────┴───────────┘

=== Table: orders ===
Using directory: ./parquet/orders
Schema:
Schema([('o_orderkey', Int64),
        ('o_custkey', Int64),
        ('o_orderstatus', String),
        ('o_totalprice', Float64),
        ('o_orderdate', String),
        ('o_orderpriority', String),
        ('o_clerk', String),
        ('o_shippriority', Int64),
        ('o_comment', String)])

Head:
shape: (2, 9)
┌───────────┬───────────┬───────────┬───────────┬───┬───────────┬───────────┬───────────┬──────────┐
│ o_orderke ┆ o_custkey ┆ o_orderst ┆ o_totalpr ┆ … ┆ o_orderpr ┆ o_clerk   ┆ o_shippri ┆ o_commen │
│ y         ┆ ---       ┆ atus      ┆ ice       ┆   ┆ iority    ┆ ---       ┆ ority     ┆ t        │
│ ---       ┆ i64       ┆ ---       ┆ ---       ┆   ┆ ---       ┆ str       ┆ ---       ┆ ---      │
│ i64       ┆           ┆ str       ┆ f64       ┆   ┆ str       ┆           ┆ i64       ┆ str      │
╞═══════════╪═══════════╪═══════════╪═══════════╪═══╪═══════════╪═══════════╪═══════════╪══════════╡
│ 3         ┆ 123314    ┆ F         ┆ 193846.25 ┆ … ┆ 5-LOW     ┆ Clerk#000 ┆ 0         ┆ sly      │
│           ┆           ┆           ┆           ┆   ┆           ┆ 000955    ┆           ┆ final    │
│           ┆           ┆           ┆           ┆   ┆           ┆           ┆           ┆ accounts │
│           ┆           ┆           ┆           ┆   ┆           ┆           ┆           ┆ boost.   │
│           ┆           ┆           ┆           ┆   ┆           ┆           ┆           ┆ care…    │
│ 5         ┆ 44485     ┆ F         ┆ 144659.2  ┆ … ┆ 5-LOW     ┆ Clerk#000 ┆ 0         ┆ quickly. │
│           ┆           ┆           ┆           ┆   ┆           ┆ 000925    ┆           ┆ bold     │
│           ┆           ┆           ┆           ┆   ┆           ┆           ┆           ┆ deposits │
│           ┆           ┆           ┆           ┆   ┆           ┆           ┆           ┆ sleep s… │
└───────────┴───────────┴───────────┴───────────┴───┴───────────┴───────────┴───────────┴──────────┘

=== Table: lineitem ===
Using directory: ./parquet/lineitem
Schema:
Schema([('l_orderkey', Int64),
        ('l_partkey', Int64),
        ('l_suppkey', Int64),
        ('l_linenumber', Int64),
        ('l_quantity', Int64),
        ('l_extendedprice', Float64),
        ('l_discount', Float64),
        ('l_tax', Float64),
        ('l_returnflag', String),
        ('l_linestatus', String),
        ('l_shipdate', String),
        ('l_commitdate', String),
        ('l_receiptdate', String),
        ('l_shipinstruct', String),
        ('l_shipmode', String),
        ('l_comment', String)])

Head:
shape: (2, 16)
┌───────────┬───────────┬───────────┬───────────┬───┬───────────┬───────────┬───────────┬──────────┐
│ l_orderke ┆ l_partkey ┆ l_suppkey ┆ l_linenum ┆ … ┆ l_receipt ┆ l_shipins ┆ l_shipmod ┆ l_commen │
│ y         ┆ ---       ┆ ---       ┆ ber       ┆   ┆ date      ┆ truct     ┆ e         ┆ t        │
│ ---       ┆ i64       ┆ i64       ┆ ---       ┆   ┆ ---       ┆ ---       ┆ ---       ┆ ---      │
│ i64       ┆           ┆           ┆ i64       ┆   ┆ str       ┆ str       ┆ str       ┆ str      │
╞═══════════╪═══════════╪═══════════╪═══════════╪═══╪═══════════╪═══════════╪═══════════╪══════════╡
│ 3         ┆ 128449    ┆ 3474      ┆ 3         ┆ … ┆ 1994-01-2 ┆ DELIVER   ┆ SHIP      ┆ nal      │
│           ┆           ┆           ┆           ┆   ┆ 3         ┆ IN PERSON ┆           ┆ foxes    │
│           ┆           ┆           ┆           ┆   ┆           ┆           ┆           ┆ wake.    │
│ 3         ┆ 29380     ┆ 1883      ┆ 4         ┆ … ┆ 1994-01-0 ┆ NONE      ┆ TRUCK     ┆ y.       │
│           ┆           ┆           ┆           ┆   ┆ 1         ┆           ┆           ┆ fluffily │
│           ┆           ┆           ┆           ┆   ┆           ┆           ┆           ┆ pending  │
│           ┆           ┆           ┆           ┆   ┆           ┆           ┆           ┆ d        │
└───────────┴───────────┴───────────┴───────────┴───┴───────────┴───────────┴───────────┴──────────┘

=== Table: part ===
Using directory: ./parquet/part
Schema:
Schema([('p_partkey', Int64),
        ('p_name', String),
        ('p_mfgr', String),
        ('p_brand', String),
        ('p_type', String),
        ('p_size', Int64),
        ('p_container', String),
        ('p_retailprice', Float64),
        ('p_comment', String)])

Head:
shape: (2, 9)
┌───────────┬────────────┬────────────┬──────────┬───┬────────┬────────────┬───────────┬───────────┐
│ p_partkey ┆ p_name     ┆ p_mfgr     ┆ p_brand  ┆ … ┆ p_size ┆ p_containe ┆ p_retailp ┆ p_comment │
│ ---       ┆ ---        ┆ ---        ┆ ---      ┆   ┆ ---    ┆ r          ┆ rice      ┆ ---       │
│ i64       ┆ str        ┆ str        ┆ str      ┆   ┆ i64    ┆ ---        ┆ ---       ┆ str       │
│           ┆            ┆            ┆          ┆   ┆        ┆ str        ┆ f64       ┆           │
╞═══════════╪════════════╪════════════╪══════════╪═══╪════════╪════════════╪═══════════╪═══════════╡
│ 1         ┆ goldenrod  ┆ Manufactur ┆ Brand#13 ┆ … ┆ 7      ┆ JUMBO PKG  ┆ 901.0     ┆ ly. slyly │
│           ┆ lavender   ┆ er#1       ┆          ┆   ┆        ┆            ┆           ┆ ironi     │
│           ┆ spring     ┆            ┆          ┆   ┆        ┆            ┆           ┆           │
│           ┆ choc…      ┆            ┆          ┆   ┆        ┆            ┆           ┆           │
│ 2         ┆ blush      ┆ Manufactur ┆ Brand#13 ┆ … ┆ 1      ┆ LG CASE    ┆ 902.0     ┆ lar       │
│           ┆ thistle    ┆ er#1       ┆          ┆   ┆        ┆            ┆           ┆ accounts  │
│           ┆ blue       ┆            ┆          ┆   ┆        ┆            ┆           ┆ amo       │
│           ┆ yellow     ┆            ┆          ┆   ┆        ┆            ┆           ┆           │
│           ┆ sadd…      ┆            ┆          ┆   ┆        ┆            ┆           ┆           │
└───────────┴────────────┴────────────┴──────────┴───┴────────┴────────────┴───────────┴───────────┘

=== Table: partsupp ===
Using file: ./parquet/partsupp.parquet
Schema:
Schema([('ps_partkey', Int64),
        ('ps_suppkey', Int64),
        ('ps_availqty', Int64),
        ('ps_supplycost', Float64),
        ('ps_comment', String)])

Head:
shape: (2, 5)
┌────────────┬────────────┬─────────────┬───────────────┬─────────────────────────────────┐
│ ps_partkey ┆ ps_suppkey ┆ ps_availqty ┆ ps_supplycost ┆ ps_comment                      │
│ ---        ┆ ---        ┆ ---         ┆ ---           ┆ ---                             │
│ i64        ┆ i64        ┆ i64         ┆ f64           ┆ str                             │
╞════════════╪════════════╪═════════════╪═══════════════╪═════════════════════════════════╡
│ 1          ┆ 2          ┆ 3325        ┆ 771.64        ┆ , even theodolites. regular, f… │
│ 1          ┆ 2502       ┆ 8076        ┆ 993.49        ┆ ven ideas. quickly even packag… │
└────────────┴────────────┴─────────────┴───────────────┴─────────────────────────────────┘

=== Table: nation ===
Using directory: ./parquet/nation
Schema:
Schema([('n_nationkey', Int64),
        ('n_name', String),
        ('n_regionkey', Int64),
        ('n_comment', String)])

Head:
shape: (2, 4)
┌─────────────┬──────────┬─────────────┬─────────────────────────────────┐
│ n_nationkey ┆ n_name   ┆ n_regionkey ┆ n_comment                       │
│ ---         ┆ ---      ┆ ---         ┆ ---                             │
│ i64         ┆ str      ┆ i64         ┆ str                             │
╞═════════════╪══════════╪═════════════╪═════════════════════════════════╡
│ 0           ┆ ALGERIA  ┆ 0           ┆  haggle. carefully final depos… │
│ 5           ┆ ETHIOPIA ┆ 0           ┆ ven packages wake quickly. reg… │
└─────────────┴──────────┴─────────────┴─────────────────────────────────┘

=== Table: region ===
Using file: ./parquet/region.parquet
Schema:
Schema([('r_regionkey', Int64), ('r_name', String), ('r_comment', String)])

Head:
shape: (2, 3)
┌─────────────┬─────────┬─────────────────────────────────┐
│ r_regionkey ┆ r_name  ┆ r_comment                       │
│ ---         ┆ ---     ┆ ---                             │
│ i64         ┆ str     ┆ str                             │
╞═════════════╪═════════╪═════════════════════════════════╡
│ 0           ┆ AFRICA  ┆ lar deposits. blithely final p… │
│ 1           ┆ AMERICA ┆ hs use ironic, even requests. … │
└─────────────┴─────────┴─────────────────────────────────┘

=== Table: supplier ===
Using directory: ./parquet/supplier
Schema:
Schema([('s_suppkey', Int64),
        ('s_name', String),
        ('s_address', String),
        ('s_nationkey', Int64),
        ('s_phone', String),
        ('s_acctbal', Float64),
        ('s_comment', String)])

Head:
shape: (2, 7)
┌───────────┬───────────────┬──────────────┬─────────────┬──────────────┬───────────┬──────────────┐
│ s_suppkey ┆ s_name        ┆ s_address    ┆ s_nationkey ┆ s_phone      ┆ s_acctbal ┆ s_comment    │
│ ---       ┆ ---           ┆ ---          ┆ ---         ┆ ---          ┆ ---       ┆ ---          │
│ i64       ┆ str           ┆ str          ┆ i64         ┆ str          ┆ f64       ┆ str          │
╞═══════════╪═══════════════╪══════════════╪═════════════╪══════════════╪═══════════╪══════════════╡
│ 24        ┆ Supplier#0000 ┆ C4nPvLrVmKPP ┆ 0           ┆ 10-620-939-2 ┆ 9170.71   ┆ usly pending │
│           ┆ 00024         ┆ abFCj        ┆             ┆ 254          ┆           ┆ deposits.    │
│           ┆               ┆              ┆             ┆              ┆           ┆ slyly f…     │
│ 28        ┆ Supplier#0000 ┆ GBhvoRh,7YIN ┆ 0           ┆ 10-538-384-8 ┆ -891.99   ┆ ld requests  │
│           ┆ 00028         ┆ V            ┆             ┆ 460          ┆           ┆ across the   │
│           ┆               ┆              ┆             ┆              ┆           ┆ pinto b…     │
└───────────┴───────────────┴──────────────┴─────────────┴──────────────┴───────────┴──────────────┘
```
