---
template: overrides/main.html
search:
  exclude: true
---

<style>
  .md-sidebar--secondary:not([hidden]) {
    visibility: hidden;
  }
</style>

# Latest Posts

Latest blog posts are published here, look out for updates on my
[Twitter :fontawesome-brands-twitter:{ .twitter }](https://twitter.com/tallamjr) or [Medium :fontawesome-brands-medium:{ .medium }](https://medium.com/@t.allam.jr)

<!-- ########################################################################################## -->

## PySpark by Example

__Here are my worked examples from the very useful LinkedIn Learning course: PySpark by Example by
    Jonathan Fernandes : https://www.linkedin.com/learning/apache-pyspark-by-example__

<aside class="mdx-author" markdown>
![@tallamjr][@tallamjr avatar]

<span>__Tarek Allam Jr.__· @tallamjr</span>
<span>
:octicons-calendar-24: May 14, 2020 ·
:octicons-clock-24: 15 min read ·
<!-- [:octicons-tag-24: 7.2.6+insiders-3.0.0][insiders-3.0.0] -->
</span>
</aside>

  [@tallamjr avatar]: https://avatars.githubusercontent.com/tallamjr
  <!-- [insiders-3.0.0]: ../../insiders/changelog.md#3.0.0 -->

---

Over the past 12 months or so I have been learning and playing with Apache Spark. I went through the
brilliant book by Bill Chambers and Matei Zaharia, *Spark: The Definitive Guide*, that covers Spark
in depth and gives plenty of code snippets one can try out in the `spark-shell`. Whilst the book is
indeed very detailed and provides great examples, the datasets that are included for you to get your
hands on are on the order of `Mb`'s (with the exception of the `activity-data` dataset used for the
Streaming examples).

[:octicons-arrow-right-24: Continue reading][PySpark by Example]

  [PySpark by Example]: 2020/pyspark-by-example.md
  <!-- [insiders-3.1.1]: ../insiders/changelog.md#3.1.1 -->

<!-- ########################################################################################## -->

## Calling Compiled Scala Code from Python using PySpark

__Calling compiled Scala code inside the JVM from Python using PySpark__

<aside class="mdx-author" markdown>
![@tallamjr][@tallamjr avatar]

<span>__Tarek Allam Jr.__· @tallamjr</span>
<span>
:octicons-calendar-24: May 27, 2020 ·
:octicons-clock-24: 15 min read ·
<!-- [:octicons-tag-24: 7.2.6+insiders-3.0.0][insiders-3.0.0] -->
</span>
</aside>

  [@tallamjr avatar]: https://avatars.githubusercontent.com/tallamjr
  <!-- [insiders-3.0.0]: ../../insiders/changelog.md#3.0.0 -->

---

There is no doubt that Java and Scala are the de-facto languages for Data Engineering, whilst Python
is certainly the front runner for language of choice with Data Scientists. Spark; a framework for
distributed data analytics is written in Scala but allows for usage in Python, R and Java.
Interoperability between Java and Scala is a no briner since Scala compiles down to Java byte code,
but call Scala from Python is a little more involved, but the process is very simple.

[:octicons-arrow-right-24: Continue reading][Calling Compiled Scala Code from Python using PySpark]

  [Calling Compiled Scala Code from Python using PySpark]: 2020/scala-python-jvm.md
  <!-- [insiders-3.1.1]: ../insiders/changelog.md#3.1.1 -->

<!-- ########################################################################################## -->

## [Mirroring Public Repositories on Github, Privately]

__This post walks through the steps involved if you want to fork a public Github repository,
privately. It will show how to have an open public repository and how to mirror it in a private
repository on Github__

<aside class="mdx-author" markdown>
![@tallamjr][@tallamjr avatar]

<span>__Tarek Allam Jr.__· @tallamjr</span>
<span>
:octicons-calendar-24: February 10, 2020 ·
:octicons-clock-24: 15 min read ·
<!-- [:octicons-tag-24: 7.2.6+insiders-3.0.0][insiders-3.0.0] -->
</span>
</aside>

  [@tallamjr avatar]: https://avatars.githubusercontent.com/tallamjr
  <!-- [insiders-3.0.0]: ../../insiders/changelog.md#3.0.0 -->

---

These steps were inspired from this guide of '[Mirroring a
repository'](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/duplicating-a-repository#mirroring-a-repository) on Github documentation

[:octicons-arrow-right-24: Continue reading][Mirroring Public Repositories on Github, Privately]

  [Mirroring Public Repositories on Github, Privately]: 2020/public-private-repos.md
  <!-- [insiders-3.1.1]: ../insiders/changelog.md#3.1.1 -->

<!-- ########################################################################################## -->

<!-- ## [Excluding content from search] -->

<!-- __The latest Insiders release brings three new simple ways to exclude dedicated -->
<!-- parts of a document from the search index, allowing for more fine-grained -->
<!-- control.__ -->

<!-- <aside class="mdx-author" markdown> -->
<!-- ![@tallamjr][@tallamjr avatar] -->

<!-- <span>__Tarek Allam Jr.__ · @tallamjr</span> -->
<!-- <span> -->
<!-- :octicons-calendar-24: September 26, 2021 · -->
<!-- :octicons-clock-24: 5 min read · -->
<!-- [:octicons-tag-24: 7.3.0+insiders-3.1.1][insiders-3.1.1] -->
<!-- </span> -->
<!-- </aside> -->

<!--   [@tallamjr avatar]: https://avatars.githubusercontent.com/tallamjr -->

<!-- --- -->

<!-- Two weeks ago, Material for MkDocs Insiders shipped a brand new search plugin, -->
<!-- yielding massive improvements in usability, but also in speed and size of the -->
<!-- search index. Interestingly, as discussed in the previous blog article, we only -->
<!-- scratched the surface of what's now possible. This release brings some useful -->
<!-- features that enhance the writing experience, allowing for more fine-grained -->
<!-- control of what pages, sections and blocks of a Markdown file should be indexed -->
<!-- by the built-in search functionality. -->

<!-- [:octicons-arrow-right-24: Continue reading][Excluding content from search] -->

<!--   [Excluding content from search]: 2021/excluding-content-from-search.md -->
<!--   [insiders-3.1.1]: ../insiders/changelog.md#3.1.1 -->

<!-- <!-1- ########################################################################################## -1-> -->

<!-- ## [Search: better, faster, smaller] -->

<!-- __This is the story of how we managed to completely rebuild client-side search, -->
<!-- delivering a significantly better user experience while making it faster and -->
<!-- smaller at the same time.__ -->

<!-- <aside class="mdx-author" markdown> -->
<!-- ![@tallamjr][@tallamjr avatar] -->

<!-- <span>__Tarek Allam Jr.__ · @tallamjr</span> -->
<!-- <span> -->
<!-- :octicons-calendar-24: September 13, 2021 · -->
<!-- :octicons-clock-24: 15 min read · -->
<!-- [:octicons-tag-24: 7.2.6+insiders-3.0.0][insiders-3.0.0] -->
<!-- </span> -->
<!-- </aside> -->

<!-- --- -->

<!-- The search of Material for MkDocs is by far one of its best and most-loved -->
<!-- assets: multilingual, offline-capable, and most importantly: _all client-side_. -->
<!-- It provides a solution to empower the users of your documentation to find what -->
<!-- they're searching for instantly without the headache of managing additional -->
<!-- servers. However, even though several iterations have been made, there's still -->
<!-- some room for improvement, which is why we rebuilt the search plugin and -->
<!-- integration from the ground up. This article shines some light on the internals -->
<!-- of the new search, why it's much more powerful than the previous version, and -->
<!-- what's about to come. -->

<!-- [:octicons-arrow-right-24: Continue reading][Search: better, faster, smaller] -->

<!--   [Search: better, faster, smaller]: 2021/search-better-faster-smaller.md -->
<!--   [insiders-3.0.0]: ../insiders/changelog.md#3.0.0 -->

