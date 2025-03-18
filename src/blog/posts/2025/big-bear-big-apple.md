---
draft: true
date:
  created: 2017-11-06
  updated: 2024-01-02
authors: [tallamjr]
categories:
  - Conferences
  - Embedded Systems
  - Life
  - Opinionated
  - RSW Engineering
  - Tooling
  - tinyML + Edge A.I.
tags:
  - unix
  - vim
---

# 🍎 **A Big Bear Takes on the Big Apple**

A while ago I worked on a method to allow local writing of development logs in markdown, which I
could then upload to Github where my supervisor could take a look. Here are the steps..

<!-- more -->

> [!Warning]
>
> **This little "oh let me showcase the power of a query optimiser to
> people" somehow accidentally turned into quite an interesting side-project and
> so I am updating this as I go along. Local "big-data" processing has come a
> long way since I first starting look large scale data querying at the start of
> my PhD and it's incredible what can be done just on a laptop these days. As
> such, I plan to turn this into a proper blog post with notes etc, but that
> will come later. In the meantime, bear with me (_whey_, pun intended! 😉) as
> this is very rough around the edges and will be updtated properly another
> time**

## Overview

Not too long ago Data Scientist was dubbed the sexiest job title of the decade
and it seems like from the early 2010s there has been a nice DataFrame library
hit the scene every other year.

While "Data Science" and the now ubiquitous "DataFrame" (think table of data,
maybe the dreaded excel spreadsheet comes to mind) might be in their infancy,
relational database research, i.e. that essentially deals with tabular data, is
very mature.

In 2012 `pandas` shot to fame with a easy Pythonic way to manipulate and handle
tabular data. Database administrators (DBAs) and SQL query writing wizards could no longer gate keep their
secrets of being able to manage databases of data and tables and the power to
manipulate "large" datasets was now available to anyone who a bit of Python. I
am intentionally ignoring all statistics people who use R because well .. I am

The trouble was that these new kids on the block with their shiny data science
tools largely ignored the glorious database research that came before. And can't
you blame them, they just wanted to get on with visualising how many people in
2nd class survived the Titantic incident among other things.

Over the years the bifurcation continued with DataFrame libraries working with
data that could be processed in memory, but what happens when you have some
serious big data or worse yet and super complex join of two tables.

Well, what you would do is naively bring everything into memory and hope that
your large outer-product cross join intermediate computations can also fit in
memory. But _it need-not be this way John!_

Projects like Apache Spark were one of the few libraries that took database
research seriously and put a lot of effort into understanding how best to create
a Query Plan and Query optimiser.

<!-- TODO: A more detailed history lesson will follow but let's get on with the show. -->

To showcase Polars' **lazy execution, query planning, and optimisation** we will
look at the **50GB (compressed[^1]) NYC Taxi dataset (~1.5 billion rows)** and present how to
efficiently query a larger than RAM dataset on a **32GB RAM laptop**.

[^1]: Total uncompressed size: 62.59 GiB, calculated with `data/stats.py`

For this we will:

- **Leverage lazy execution** (`pl.scan_parquet()`) instead of eager loading
  everything into memory.
- **Push down predicates** to filter data **before** loading it into memory
- **Avoid unnecessary computations** through **query optimisations** like column
  projection
- **Use fast aggregations** to summarise large datasets

The code for this demo is all in `src/main.py` and as long as the
`requirements.txt` are installed for `CPU` then all should be fine. We will
compare results with running on GPU which would require one to run
`./install-gpu-deps.sh`

### **1. Count Rows Efficiently (Full Dataset Scan)**

Let's first look at counting rows, all 1.5 _billion_ of them! 👀

- Instead of materialising the dataset in memory, `polars` will _scan_ metadata
  to count rows efficiently.

```python
import polars as pl

# Lazy load the Parquet file (does NOT load into memory)
df = pl.scan_parquet("../data/nyc_yellow_taxi_parquet/*")

# Count total rows without loading the full dataset
row_count = df.select(pl.len()).collect(**collect_args)

print(row_count)
```

```python

shape: (1, 1)
┌────────────┐
│ len        │
│ ---        │
│ u32        │
╞════════════╡
│ 1571671152 │
└────────────┘
```

I've put the schema and a look at the first few rows to get us aquietad to the
data.

```python
Schema([('vendorID', String),
        ('tpepPickupDateTime', Datetime(time_unit='ns', time_zone=None)),
        ('tpepDropoffDateTime', Datetime(time_unit='ns', time_zone=None)),
        ('passengerCount', Int32),
        ('tripDistance', Float64),
        ('puLocationId', String),
        ('doLocationId', String),
        ('startLon', Float64),
        ('startLat', Float64),
        ('endLon', Float64),
        ('endLat', Float64),
        ('rateCodeId', Int32),
        ('storeAndFwdFlag', String),
        ('paymentType', String),
        ('fareAmount', Float64),
        ('extra', Float64),
        ('mtaTax', Float64),
        ('improvementSurcharge', String),
        ('tipAmount', Float64),
        ('tollsAmount', Float64),
        ('totalAmount', Float64)])

shape: (10, 21)
┌──────────┬─────────────────────┬─────────────────────┬────────────────┬───┬──────────────────────┬───────────┬─────────────┬─────────────┐
│ vendorID ┆ tpepPickupDateTime  ┆ tpepDropoffDateTime ┆ passengerCount ┆ … ┆ improvementSurcharge ┆ tipAmount ┆ tollsAmount ┆ totalAmount │
│ ---      ┆ ---                 ┆ ---                 ┆ ---            ┆   ┆ ---                  ┆ ---       ┆ ---         ┆ ---         │
│ str      ┆ datetime[ns]        ┆ datetime[ns]        ┆ i32            ┆   ┆ str                  ┆ f64       ┆ f64         ┆ f64         │
╞══════════╪═════════════════════╪═════════════════════╪════════════════╪═══╪══════════════════════╪═══════════╪═════════════╪═════════════╡
│ 2        ┆ 2002-12-31 23:58:47 ┆ 2003-01-01 00:09:49 ┆ 1              ┆ … ┆ 0.3                  ┆ 0.0       ┆ 0.0         ┆ 9.3         │
│ 2        ┆ 2002-12-31 23:04:50 ┆ 2003-01-01 06:42:58 ┆ 2              ┆ … ┆ 0.3                  ┆ 0.0       ┆ 0.0         ┆ 13.8        │
│ CMT      ┆ 2009-04-30 23:50:17 ┆ 2009-05-01 01:13:28 ┆ 1              ┆ … ┆ null                 ┆ 20.0      ┆ 0.0         ┆ 160.0       │
│ CMT      ┆ 2009-04-30 23:56:20 ┆ 2009-05-01 00:16:47 ┆ 1              ┆ … ┆ null                 ┆ 0.0       ┆ 0.0         ┆ 14.5        │
│ VTS      ┆ 2009-04-30 23:57:00 ┆ 2009-05-01 00:16:00 ┆ 1              ┆ … ┆ null                 ┆ 0.0       ┆ 0.0         ┆ 23.8        │
│ VTS      ┆ 2009-04-30 23:59:00 ┆ 2009-05-01 00:12:00 ┆ 2              ┆ … ┆ null                 ┆ 0.0       ┆ 0.0         ┆ 13.4        │
│ VTS      ┆ 2009-04-30 23:42:00 ┆ 2009-05-01 00:20:00 ┆ 1              ┆ … ┆ null                 ┆ 0.0       ┆ 0.0         ┆ 25.4        │
│ CMT      ┆ 2009-04-30 23:43:07 ┆ 2009-05-01 00:02:41 ┆ 1              ┆ … ┆ null                 ┆ 0.0       ┆ 4.15        ┆ 32.25       │
│ VTS      ┆ 2009-04-30 23:56:00 ┆ 2009-05-01 00:13:00 ┆ 1              ┆ … ┆ null                 ┆ 0.0       ┆ 0.0         ┆ 16.2        │
│ CMT      ┆ 2009-04-30 23:53:00 ┆ 2009-05-01 00:27:11 ┆ 1              ┆ … ┆ null                 ┆ 0.0       ┆ 0.0         ┆ 22.9        │
└──────────┴─────────────────────┴─────────────────────┴────────────────┴───┴──────────────────────┴───────────┴─────────────┴─────────────┘

```

**Why is this fast?**

- **Query Optimisation:** Polars **pushes down the count aggregation** to avoid
  reading the entire dataset.
- **Metadata Scan:** Parquet stores **row counts in metadata**, allowing
  **Polars to retrieve them without a full scan**.

### **2. Find the Most Popular Pickup Locations**

- Using **groupby & aggregation** on the entire dataset but **only returning the top 10 results**.

```python
# Group by pickup location and count occurrences
popular_pickups = (
    df.filter(pl.col("puLocationId").is_not_null())
    .group_by("puLocationId")
    .agg(pl.len().alias("num_trips"))
    .sort("num_trips", descending=True)
    .limit(10)
    .collect(**collect_args)
)

print(popular_pickups)
```

**Why is this efficient?**

- **Predicate Pushdown:** Only computes group counts, **not loading unused columns**.
- **Optimised Aggregation:** Polars uses **multi-threading** for fast counting.

### **3. Compute Daily Total Revenue (But Only for 2016)**

- **Time-based filtering** ensures **only necessary rows are read**.

```python
from datetime import datetime

# Filter for 2016 only and compute daily total fares
daily_revenue = (
    df.filter(
        pl.col("tpepPickupDateTime").is_between(
            datetime(2016, 1, 1), datetime(2016, 12, 31)
        )
    )
    .with_columns(pl.col("tpepPickupDateTime").dt.date().alias("date"))
    .group_by("date")
    .agg(pl.sum("fareAmount").alias("total_fare"))
    .sort("date")
    .collect(**collect_args)
)

print(daily_revenue)
```

**Why does this run well on 32GB RAM?**

- **Lazy Filtering:** The **date filter is pushed down**, meaning **only 2016
  trips are read**.
- **Column Pruning:** Polars **only loads `tpep_pickup_datetime` and
  `fare_amount`**, not the whole dataset.

### **4. Find the Longest Taxi Trips (Optimised Distance Query)**

- **Filtering + Sorting on large dataset**.

```python
# Filter for trips longer than 50 miles, sorted by distance
longest_trips = (
    df.filter(pl.col("tripDistance") > 50)
    .select(["tripDistance", "fareAmount"])
    .sort("tripDistance", descending=True)
    .limit(10)
    .collect(**collect_args)
)

print(longest_trips)
```

**Why does this perform well?**

- **Predicate Pushdown:** Only trips with `trip_distance > 50` are processed.
- **Column Projection:** Only four columns are read instead of all.

With these queries, you can **scan 1.5 billion rows efficiently** and **return
small, meaningful results** while keeping memory usage low! Cool right!?

Before going further let's step back a bit. We talked a lot about query
optimisation and planning but perhaps this is still not appreciated.

Query optimisation and planning often involves doing "predicate pushdown" and
"projection pushdown". If some of you are like me you might be asking what on
earth is the difference -- well an awesome explanation can be found [here](https://stackoverflow.com/questions/58235076/what-is-the-difference-between-predicate-pushdown-and-projection-pushdown)

Which essentially says, re-arrange the query so we touch as little data as
necessary! Let's have a closer look with the next example.

### **5. Query Plans in Detail**

`polars` has one of the best query planners and optimisers in the business and
we can get more of a feel for what is going on if we inspect the query with
`df.explain()`. Here we show a much more complex query that does many different
filtering operations and aggregations.

It leverages `polars`’ lazy evaluation, predicate pushdown, column projection, and
streaming mode. Working with the same dataset as before we will chain several
advanced operations in one go.

```python
# Define a bounding box for NYC (approximate)
min_lat, max_lat = 40.5, 40.9
min_lon, max_lon = -74.25, -73.70

result = (
    df
    # Filter out rows with null puLocationId and restrict to 2016
    # .filter(pl.col("puLocationId").is_not_null())
    .filter(
        pl.col("tpepPickupDateTime").is_between(
            datetime(2010, 1, 1), datetime(2018, 1, 1)
        )
    )
    # Filter trips by the NYC bounding box (based on startLat and startLon)
    .filter(
        (pl.col("startLat") >= min_lat)
        & (pl.col("startLat") <= max_lat)
        & (pl.col("startLon") >= min_lon)
        & (pl.col("startLon") <= max_lon)
    )
    # # Compute trip duration in minutes (convert nanoseconds to minutes)
    .with_columns(
        (
            (pl.col("tpepDropoffDateTime") - pl.col("tpepPickupDateTime")).cast(
                pl.Int64
            )
            / 1e9
            / 60
        ).alias("trip_duration")
    )
    # # Calculate average speed in mph: (tripDistance miles) / (duration in hours)
    .with_columns(
        (pl.col("tripDistance") * 60 / pl.col("trip_duration")).alias("avg_speed")
    )
    # Additional filtering on computed metrics:
    #   - Ensure positive trip duration,
    #   - Keep trips longer than 0.5 miles,
    #   - Fare amount below 150
    .filter((pl.col("trip_duration") > 0) & (pl.col("fareAmount") < 150))
    # Extract the date from the pickup datetime
    .with_columns(pl.col("tpepPickupDateTime").dt.date().alias("date"))
    # # Group by date and paymentType and compute aggregates
    .group_by(["date", "paymentType"])
    .agg(
        [
            pl.len().alias("num_trips"),
            pl.mean("tripDistance").alias("avg_trip_distance"),
            pl.sum("fareAmount").alias("total_fare"),
            pl.mean("trip_duration").alias("avg_duration"),
            pl.mean("avg_speed").alias("avg_speed"),
            pl.mean("tipAmount").alias("avg_tip"),
        ]
    )
    .sort(["date", "paymentType"])
)

```

#### What This Query Demonstrates

- **Predicate Pushdown & Column Projection:** The filters on
  **tpepPickupDateTime**, **startLat**, **startLon**, and **puLocationId** are
  pushed down to the data source. This means Polars only loads the row groups that
  could possibly match these conditions—vital when dealing with billions of rows.

- **Lazy Evaluation & Streaming:** By using `pl.scan_parquet(...,
streaming=True)` and deferring execution until the final `.collect()`, the query
  planner optimises the entire operation, ensuring minimal memory usage even on a
  laptop with 32 GB of RAM.

- **Complex Aggregation & Derived Metrics:** The query computes additional
  columns (trip duration, average speed) and applies further filtering on these
  derived values. Then, grouping by date and payment type demonstrates the power
  of Polars’ parallel aggregations over massive datasets.

I encourage the reader to go over and play with it by removing filters but for
now the main thing is to inspect to two different query plan graphs, the first
being an **un-optimised query plan** and then followed by the **optimised query
plan** version -- do you spot a difference?

**1. Un-optimised**

```bash
NAIVE Q-PLAN:
 SORT BY [col("date"), col("paymentType")]
  AGGREGATE
        [len().alias("num_trips"), col("tripDistance").mean().alias("avg_trip_distance"), col("fareAmount").sum().alias("total_fare"), col("trip_duration").mean().alias("avg_duration"), col("avg_speed").mean().alias("avg_speed"), col("tipAmount").mean().alias("avg_tip")] BY [col("date"), col("paymentType")] FROM
     WITH_COLUMNS:
     [col("tpepPickupDateTime").dt.date().alias("date")]
      FILTER [(col("trip_duration")) > (0.0)] FROM
        FILTER [(col("fareAmount")) < (150.0)] FROM
           WITH_COLUMNS:
           [[([(col("tripDistance")) * (60.0)]) / (col("trip_duration"))].alias("avg_speed")]
             WITH_COLUMNS:
             [[([([(col("tpepDropoffDateTime")) - (col("tpepPickupDateTime"))].strict_cast(Int64).cast(Unknown(Float))) / (dyn float: 1.0000e9)]) / (60.0)].alias("trip_duration")]
              FILTER [(col("startLat")) >= (40.5)] FROM
                FILTER [(col("startLat")) <= (40.9)] FROM
                  FILTER [(col("startLon")) >= (-74.25)] FROM
                    FILTER [(col("startLon")) <= (-73.7)] FROM
                      FILTER col("tpepPickupDateTime").strict_cast(Datetime(Microseconds, None)).is_between([2010-01-01 00:00:00, 2018-01-01 00:00:00]) FROM
                        Parquet SCAN [../data/nyc_yellow_taxi_parquet/part-00000-tid-8898858832658823408-a1de80bd-eed3-4d11-b9d4-fa74bfbd47bc-426339-1.c000.snappy.parquet, ... 2712 other sources]
                        PROJECT */21 COLUMNS
SORT BY [col("date"), col("paymentType")]
  AGGREGATE
        [len().alias("num_trips"), col("tripDistance").mean().alias("avg_trip_distance"), col("fareAmount").sum().alias("total_fare"), col("trip_duration").mean().alias("avg_duration"), col("avg_speed").mean().alias("avg_speed"), col("tipAmount").mean().alias("avg_tip")] BY [col("date"), col("paymentType")] FROM
     WITH_COLUMNS:
     [col("tpepPickupDateTime").dt.date().alias("date")]
      FILTER [(col("trip_duration")) > (0.0)] FROM
        FILTER [(col("fareAmount")) < (150.0)] FROM
           WITH_COLUMNS:
           [[([(col("tripDistance")) * (60.0)]) / (col("trip_duration"))].alias("avg_speed")]
             WITH_COLUMNS:
             [[([([(col("tpepDropoffDateTime")) - (col("tpepPickupDateTime"))].strict_cast(Int64).cast(Unknown(Float))) / (dyn float: 1.0000e9)]) / (60.0)].alias("trip_duration")]
              FILTER [(col("startLat")) >= (40.5)] FROM
                FILTER [(col("startLat")) <= (40.9)] FROM
                  FILTER [(col("startLon")) >= (-74.25)] FROM
                    FILTER [(col("startLon")) <= (-73.7)] FROM
                      FILTER col("tpepPickupDateTime").strict_cast(Datetime(Microseconds, None)).is_between([2010-01-01 00:00:00, 2018-01-01 00:00:00]) FROM
                        Parquet SCAN [../data/nyc_yellow_taxi_parquet/part-00000-tid-8898858832658823408-a1de80bd-eed3-4d11-b9d4-fa74bfbd47bc-426339-1.c000.snappy.parquet, ... 2712 other sources]
                        PROJECT */21 COLUMNS

```

**2. Optimised**

```bash
OPTIMIZED Q-PLAN:
 SORT BY [col("date"), col("paymentType")]
  AGGREGATE
        [len().alias("num_trips"), col("tripDistance").mean().alias("avg_trip_distance"), col("fareAmount").sum().alias("total_fare"), col("trip_duration").mean().alias("avg_duration"), col("avg_speed").mean().alias("avg_speed"), col("tipAmount").mean().alias("avg_tip")] BY [col("date"), col("paymentType")] FROM
     WITH_COLUMNS:
     [[([(col("tripDistance")) * (60.0)]) / (col("trip_duration"))].alias("avg_speed"), col("tpepPickupDateTime").dt.date().alias("date")]
      FILTER [(col("trip_duration")) > (0.0)] FROM
         WITH_COLUMNS:
         [[([([(col("tpepDropoffDateTime")) - (col("tpepPickupDateTime"))].strict_cast(Int64).cast(Unknown(Float))) / (dyn float: 1.0000e9)]) / (60.0)].alias("trip_duration")]
          Parquet SCAN [../data/nyc_yellow_taxi_parquet/part-00000-tid-8898858832658823408-a1de80bd-eed3-4d11-b9d4-fa74bfbd47bc-426339-1.c000.snappy.parquet, ... 2712 other sources]
          PROJECT 8/21 COLUMNS
          SELECTION: [([([([(col("fareAmount")) < (150.0)]) & ([([(col("startLat")) <= (40.9)]) & ([(col("startLat")) >= (40.5)])])]) & ([([(col("startLon")) <= (-73.7)]) & ([(col("startLon")) >= (-74.25)])])]) & (col("tpepPickupDateTime").strict_cast(Datetime(Microseconds, None)).is_between([2010-01-01 00:00:00, 2018-01-01 00:00:00]))]


```

The first to mention is how to even read this -- one starts from the bottom and
works their way up the tree. With that in mind, what's happening? Well, first
difference to notice is the reduction in lines. _Ok great, what does that even
mean?_

Each line represents a computation on an intermediate set of data. This is
particularly apparent with these lines from the unoptimised version:

```diff
...
-  FILTER [(col("startLat")) >= (40.5)] FROM
-    FILTER [(col("startLat")) <= (40.9)] FROM
-      FILTER [(col("startLon")) >= (-74.25)] FROM
-        FILTER [(col("startLon")) <= (-73.7)] FROM
-          FILTER col("tpepPickupDateTime").strict_cast(Datetime(Microseconds, None)).is_between([2010-01-01 00:00:00, 2018-01-01 00:00:00]) FROM
+ SELECTION: [([([([(col("fareAmount")) < (150.0)]) & ([([(col("startLat")) <= (40.9)]) & ([(col("startLat")) >= (40.5)])])]) & ([([(col("startLon")) <= (-73.7)]) & ([(col("startLon")) >= (-74.25)])])]) & (col("tpepPickupDateTime").strict_cast(Datetime(Microseconds, None)).is_between([2010-01-01 00:00:00, 2018-01-01 00:00:00]))]
..
```

This means we are applying a filter, creating a new intermediate set of data and
then moving on to the next bit and so on, very inefficient.

Another big one is this difference:

```diff
-          PROJECT */21 COLUMNS
+          PROJECT 8/21 COLUMNS

```

When you hear `PROJECT` then we are dealing with _columns_, so one is saying
give me **all** columns with the `*` and the other is saying "oh, don't mind
me, I only need 8 out of all 21 columns you have Mr. parquet file". In concrete
terms it means that only 8 columns are read from disk which can be huge,
especially in this case!

When we run the final query in `src/main.py` on a 32 GB M2 Mac it takes about

```console
real    2m8.376s
user    4m11.232s
sys     0m56.340s

```

So, long story short, a query optimiser is key in efficient processing of big
data! `polars` applies several types of optimizations,
including:

- Predicate pushdown: Applies filters as early as possible, often at the scan
  level.
- Projection pushdown: Selects only the necessary columns at the scan level.
- Slice pushdown: Only loads the required slice from the scan level.
- Common subplan elimination: Caches subtrees/file scans used by multiple
  subtrees in the query plan.
- Simplify expressions: Performs various optimizations like constant folding and
  replacing expensive operations with faster alternatives.
- Join ordering: Estimates which branches of joins should be executed first to
  reduce memory pressure.
- Type coercion: Coerces types for successful operations and minimal memory
  usage.
- Cardinality estimation: Estimates cardinality to determine the optimal
  group-by strategy.

Some optimizations run once, while others run multiple times until a fixed point
is reached. For example, predicate pushdown runs once, while simplify
expressions runs until a fixed point is reached.

## Here Come the Hotstepper: `cuDF`

Yeah Ok, that's cool and all but doesn't that all go about the window when I
have a beefy GPU sitting here?

Well, the go-to DataFrame library at the moment for running queries is `cuDF`
developed by the RAPIDS team at NVIDIA[^2].

The main issue with `cuDF` even though it is indeed _blazingly_ fast and allows
for massive parallelism, it **does not** have an inbuilt optimiser or query
planner. So this means to run queries require the **full** dataset to be brought
into VRAM.

Now with what we saw above, that just seems silly not to have one right?

[^2]: We are only really considering NVIDIA chips, for reasons. Good reasons.

`cuDF` is primarily designed for eager execution—much like `pandas`, but on the
GPU, so it doesn't include a built‑in lazy query planning engine like `polars`
does. Instead, `cuDF`’s optimisations come from highly optimised GPU kernels and
vectorised operations that execute immediately.

That said, when reading data (for example, from `parquet` files), some predicate
pushdown may be performed by the underlying file reader (often via Apache
Arrow), which can reduce the amount of data loaded into memory. But beyond that,
`cuDF` processes queries eagerly without a separate query planning phase.

_But I want to use my super cool gold box (NVIDIA DGX)!_

For workflows that benefit from lazy evaluation and query planning, you might
consider combining Polars’ lazy API with a conversion step to cuDF (or using
Dask‑cuDF for distributed GPU processing). This way we can filter and reduce
data first using Polars, and then hand the smaller dataset off to `cuDF` for
GPU‑accelerated computations.

With recent updates to `polars` that is now possible with
`lf.collect(engine="gpu")`. This really gives up best of both worlds where we
can leverage `polars` query planning and optimisations and also the
computational brute force of a GPU. By clever construction of our query we
minimise data movement and also the amount that has to sit on the GPU at all.

It's worth noting that `collect()` offers several parameters to control the execution:

- You can enable streaming mode with `streaming=True` to process the query in
  batches for larger-than-memory data.
- You can select the engine (CPU or GPU) with the `engine` parameter.
- You can run the query in the background with `background=True` to get a handle
  to the query.

For example:

```python
result = lf.collect(streaming=True, engine="cpu")
```

Remember that the GPU engine and streaming mode are considered unstable features

But, running on an **NVIDIA 4090 with 24GB VRAM GPU** we can still run all
queires and crucially we run `src/main.py` in... _drum roll please_ 🥁

![](./.assets/session.gif)

```console
real    1m7.322s
user    5m16.966s
sys     1m18.575s
```

A whole 2x faster! 🚀 Remember running on _1.5 Billion_ rows of data.. well kinda
if we ignore all the stuff we said above about lazy loading and query
optimising, but you get the picture.

> [!NOTE]
>
> _**Disclaimer**_ Now, I have a confession to make. For the final large query,
> this was actaully run using rhe streaming API, i.e `result.collect(streaming=True)`.
> Why you might ask, well, when using just the GPU engine the intermediate RAM
> usage went through the roof and ultimately the jobs were killed. There are some
> SO posts that might be related but I essentially think this is down to the VRAM
> limits and the current state of the GPU engine does not support streaming:

```python
# https://github.com/pola-rs/polars/blob/69612d46f3335d4c54033f27ecd8fa4be6fa40c2/py-polars/polars/lazyframe/frame.py#L2015
        if (streaming or background or new_streaming) and is_gpu:
            issue_warning(
                "GPU engine does not support streaming or background collection, "
                "disabling GPU engine.",
```

So, with that in mind, for the last query I leveraged the streaming API but we
shouldn't look past the _huge_ speed up offered by the GPU. What this could mean
in practise is for large queries, if you have many cores available, you could be
just better off resolving on the CPU and using the streaming API.

> [!NOTE]
>
> Further tests would be needed to see if there is an argument for distributed
> system, i.e. [Spark](https://github.com/apache/spark), [Daft](https://github.com/Eventual-Inc/Daft), [Ballista](https://github.com/apache/datafusion-ballista) etc if the overhead set up and data movement
> is manageable.[^3]

[^3]: Double side-note. Ballista and Daft are written in Rust 🦀 and are columnar first engines, unlike Spark written in Scala using the JVM and is a row-first engine, _eww_.

### Pure `cuDF`

For completeness I used ChatGPT to rewrite the `polars` queires in `src/main.py`
to be "pure" `cuDF` which can be found in `src/cudf.py`. Running that file on
the GPU box we get:

<!-- TODO: Address error below -->

```console

/home/tarek/big-bear-demo/.venv/lib/python3.10/site-packages/cudf/utils/_ptxcompiler.py:64: UserWarning: Error getting driver and runtime versions:

stdout:

stderr:

Traceback (most recent call last):
  File "<string>", line 7, in <module>
  File "/home/tarek/big-bear-demo/.venv/lib/python3.10/site-packages/numba_cuda/numba/cuda/cudadrv/runtime.py", line 111, in get_version
    self.cudaRuntimeGetVersion(ctypes.byref(rtver))
  File "/home/tarek/big-bear-demo/.venv/lib/python3.10/site-packages/numba_cuda/numba/cuda/cudadrv/runtime.py", line 65, in __getattr__
    self._initialize()
  File "/home/tarek/big-bear-demo/.venv/lib/python3.10/site-packages/numba_cuda/numba/cuda/cudadrv/runtime.py", line 51, in _initialize
    self.lib = open_cudalib('cudart')
  File "/home/tarek/big-bear-demo/.venv/lib/python3.10/site-packages/numba_cuda/numba/cuda/cudadrv/libs.py", line 84, in open_cudalib
    return ctypes.CDLL(path)
  File "/home/tarek/.local/share/uv/python/cpython-3.10.15-linux-x86_64-gnu/lib/python3.10/ctypes/__init__.py", line 374, in __init__
    self._handle = _dlopen(self._name, mode)
OSError: libcudart.so: cannot open shared object file: No such file or directory


Not patching Numba
  warnings.warn(msg, UserWarning)
Traceback (most recent call last):
  File "/home/tarek/big-bear-demo/src/pure-cudf.py", line 5, in <module>
    import cudf
  File "/home/tarek/big-bear-demo/.venv/lib/python3.10/site-packages/cudf/__init__.py", line 20, in <module>
    validate_setup()
  File "/home/tarek/big-bear-demo/.venv/lib/python3.10/site-packages/cudf/utils/gpu_utils.py", line 96, in validate_setup
    cuda_runtime_version = runtimeGetVersion()
  File "/home/tarek/big-bear-demo/.venv/lib/python3.10/site-packages/rmm/_cuda/gpu.py", line 86, in runtimeGetVersion
    status, version = runtime.getLocalRuntimeVersion()
  File "cuda/bindings/runtime.pyx", line 31996, in cuda.bindings.runtime.getLocalRuntimeVersion
  File "cuda/bindings/cyruntime.pyx", line 1225, in cuda.bindings.cyruntime.getLocalRuntimeVersion
  File "cuda/bindings/_lib/cyruntime/cyruntime.pyx", line 4005, in cuda.bindings._lib.cyruntime.cyruntime._getLocalRuntimeVersion
RuntimeError: Failed to dlopen libcudart.so.12
```

> [!IMPORTANT]
>
> Perhaps best to ignore the above for now...
> While I was expecting an error, it's not what I was after. The above needs to be
> addressed.

What I was expecting is that we get an OOM error. This is to be expected since
we are doing no optimisations in terms of the query plan and therefore eagerly
loading data into VRAM.

## Let's Get _GeoSpatial_

```bash
brew install h3
```

## **Key Takeaways**

| Query Type                 | Polars Optimisation Used         |
| -------------------------- | -------------------------------- |
| **Count total rows**       | Metadata scan, no full load      |
| **Top pickup locations**   | GroupBy pushdown, column pruning |
| **Daily revenue for 2016** | Date filtering pushdown          |
| **Find longest trips**     | Filter + sort optimisation       |

When using just GPU, i.e. `collect(engine="gpu")` we are not taking full
advantage of another piece of the `polars` magic which is the streaming API.

Although the GPU engine is super fast, because it does not allow for out-of-core
operations, i.e. larger than RAM and thus data is not chunked, you will see an
explosion of the RAM usage is only using the GPU. Whereas for the streaming API,
RAM usage remains fairly constant throughout.

A nice overview of the state of play can be found here: https://docs.pola.rs/user-guide/gpu-support/

## Troubleshooting

```bash
polars.exceptions.ComputeError: RuntimeError: Unable to open file: Too many open files
```

This error usually indicates that your operating system is running out of
available file descriptors because too many files are open simultaneously. This
is not surprising considering we have:

```console
ls data/nyc_yellow_taxi_parquet/* | wc
   2713    2713  364095
```

So, here are some steps you can take:

1. **Increase the File Descriptor Limit:** On Unix-based systems, you can check
   your current limit with the command `ulimit -n`. If it’s too low, you can
   increase it (for example, to 4096) by running `ulimit -n 4096` in your shell or
   by updating your system configuration (e.g. editing
   `/etc/security/limits.conf`). In Python, you might also adjust it
   programmatically using the `resource` module:

   ```python
   import resource

   soft, hard = resource.getrlimit(resource.RLIMIT_NOFILE)
   resource.setrlimit(resource.RLIMIT_NOFILE, (4096, hard))
   ```

2. **Optimise File Handling:** If you’re reading many small Parquet files with
   Polars, consider merging them into fewer files before processing. This
   reduces the number of files that need to be opened concurrently.

3. **Review Lazy Loading and Query Patterns:** Since Polars uses lazy
   evaluation, ensure that your query operations are structured in a way that
   doesn’t require opening all files at once. If possible, trigger operations in
   batches or use streaming modes if available.

```bash
NVIDIA GPU detected, using cuDF for GPU acceleration.
Traceback (most recent call last):
  File "/home/tarek/big-bear-demo/src/cudf.py", line 3, in <module>
    import cudf
  File "/home/tarek/big-bear-demo/src/cudf.py", line 29, in <module>
    dfs = [cudf.read_parquet(f) for f in files]
  File "/home/tarek/big-bear-demo/src/cudf.py", line 29, in <listcomp>
    dfs = [cudf.read_parquet(f) for f in files]
AttributeError: partially initialized module 'cudf' has no attribute 'read_parquet' (most likely due to a circular import)
```

The error indicates that Python is trying to import your file as the cuDF
module. In your case, your file is named exactly "cudf.py", which causes a
circular import because when you write `import cudf`, Python imports your file
(or a partially initialised version of it) instead of the actual NVIDIA RAPIDS
cuDF package.

To fix this issue, simply rename your file to something else (e.g.,
`cudf_example.py` or any other name that doesn't clash with the module name).
Then remove any cached files like `cudf.pyc` or the `__pycache__` folder.

Once you've done this, your import should work as expected, and you'll be able
to access `cudf.read_parquet` and other cuDF functions.

Remember, file naming is important in Python to avoid such circular
dependencies.
