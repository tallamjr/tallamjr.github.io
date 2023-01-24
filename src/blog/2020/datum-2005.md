---
template: main.html
description: >
    A datum of news from the Open Source, Data Science and Data Engineering circles. May 2020 edition
search:
  exclude: true
---

# DATUM-2005

__A datum of news from the Open Source, Data Science and Data Engineering circles. May 2020
edition__

<aside class="mdx-author" markdown>
![@tallamjr][@tallamjr avatar]

<span>__Tarek Allam Jr.__· @tallamjr</span>
<span>
:octicons-calendar-24: May 10, 2020 ·
:octicons-clock-24: 15 min read ·
[:octicons-tag-24: 7.2.6+insiders-3.0.0][insiders-3.0.0]
</span>
</aside>

  [@tallamjr avatar]: https://avatars.githubusercontent.com/tallamjr
  [insiders-3.0.0]: ../../insiders/changelog.md#3.0.0

---

1. [KIP-500](#kip500) - The end of Zookeeper dependecy for Kafka
2. [GTC20](#gtc20) - NVIDIA's Global Technology Conference 2020
3. [Spark-3.0](#gtc20) - Apache Spark goes 3.0

## <a name="kip500"></a>KIP-500 -- Coming to life

<center>
<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Kafka will use the Raft protocol on top of Kafkas own native commit log to manage metadata in the coming ZooKeeper-free architecture. <a href="https://t.co/iFQ7xOjE98">https://t.co/iFQ7xOjE98</a></p>&mdash; Apache Kafka (@apachekafka) <a href="https://twitter.com/apachekafka/status/1261786929101565952?ref_src=twsrc%5Etfw">May 16, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</center>

### What is KIP-500?

KIP refers to the Kafka-Improvement-Proposal, much like PEP (Python Enhancement Proposals)
developers can influence the development of Kafka by proposing ideas. KIP-500 is motivated by:

!!! quote

    Currently, Kafka uses ZooKeeper to store its metadata about partitions and brokers, and to elect a
    broker to be the Kafka Controller.  We would like to remove this dependency on ZooKeeper.  This
    will enable us to manage metadata in a more scalable and robust way, enabling support for more
    partitions.  It will also simplify the deployment and configuration of Kafka.

This is neatly visualised by the image below:

<figure markdown>
<figcaption markdown>
<img src="https://cwiki.apache.org/confluence/download/attachments/123898922/a.png?version=1&modificationDate=1564694752000&api=v2" class="alignright">
</figcaption>
</figure>

Zookeeper has served Kafka well for many years, but the drive to develop a self-contained <a
href="#" class="tooltip tooltip-left" title="the minimum number of members of an assembly or society that must be
present at any of its meetings to make the proceedings of that meeting valid.">quorum</a> controller
has been on the cards for some time. Before we go into details of the latests news, let's first
breakdown what this means and explain a few concepts for the uninitiated.

### What is Raft?

RAFT is a consensus protocol that helps maintain state among a set of workers. Zookeeper has their
own implementation of a consensus protocol called Zookeeper Atomic Broadcast Protocol (ZAB).

There has recently been an interesting paper to evaluate the best consensus protocol

## NVIDIA's Global Technology Conference 2020<a name="gtc20"></a>

<center>
<iframe width="560" height="315" src="https://www.youtube.com/embed/tpeGZ7nm0J0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</center>

{{< youtube tpeGZ7nm0J0 >}}

## Apache Spark 3.0 on the Horizon


## References

* [KIP-500: Replace ZooKeeper with a Self-Managed Metadata Quorum](https://cwiki.apache.org/confluence/display/KAFKA/KIP-500%3A+Replace+ZooKeeper+with+a+Self-Managed+Metadata+Quorum)
* [KIP-595: A Raft Protocol for the Metadata Quorum](https://cwiki.apache.org/confluence/display/KAFKA/KIP-595%3A+A+Raft+Protocol+for+the+Metadata+Quorum)
* [Paxos vs Raft: Have we reached consensus on distributed consensus?](https://arxiv.org/pdf/2004.05074.pdf)
* [Zookeeper Atomic Broadcast Protocol (ZAB) and implementation of Zookeeper.](https://www.cloudkarafka.com/blog/2018-07-04-cloudkarafka-zab.html)k
* [Building a Kafka that doesn’t depend on ZooKeeper](https://thehoard.blog/building-a-kafka-that-doesnt-depend-on-zookeeper-2c4701b6e961)k
* [Apache Kafka leaves the Zoo](https://medium.com/@lukasz.antoniak/apache-kafka-leaves-the-zoo-bef529ba82b7)



<!-- {{< figure src="/blog/img/posts/2016-11-12-Matlab-R-Julia-Notebooks/newprojectlist.png" class="alignright">}} -->

<!-- ```python -->
<!-- print(f"Numpy: {np.__version__}") -->
<!-- ``` -->

<!-- Say if I said something here -->

<!-- ```bash -->
<!-- $ echo "Hello World!" -->
<!-- ``` -->

<!-- ```scala -->
<!-- println("hello") -->
<!-- def somefunction(col: String) -->

<!-- val mate = Int 5 -->
<!-- ``` -->



