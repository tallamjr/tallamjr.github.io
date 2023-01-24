---
template: main.html
description: >
    "# Ah `bufdo`; That'll do"
---

# Release Versioning with git tags

__In this post I walk through the steps of how one can set up a standalone Python
project to have it's version set by git tags alone. I will also walk through how one can achieve
this with a Scala project within the same repository.__

<aside class="mdx-author" markdown>
![@tallamjr][@tallamjr avatar]

<span>__Tarek Allam Jr.__· @tallamjr</span>
<span>
:octicons-calendar-24: November 06, 2017 ·
:octicons-clock-24: 15 min read ·
[:octicons-tag-24: 7.2.6+insiders-3.0.0][insiders-3.0.0]
</span>
</aside>

  [@tallamjr avatar]: https://avatars.githubusercontent.com/tallamjr
  [insiders-3.0.0]: ../../insiders/changelog.md#3.0.0

---

Releasing software, whether it be a MAJOR, MINOR or PATCH update, often requires one to bump
versions in several files. This can cause files/packages to be out of sync if there are a few files that
need updating.

## Why?


```python
from setuptools import setup, find_packages

with open('requirements.txt') as f:
    requirements = f.read().splitlines()

__FALLBACK_VERSION__ = "0.1"

setup(
    name="option3",
    use_scm_version={
        "root": ".",
        "relative_to": __file__,
        "fallback_version": __FALLBACK_VERSION__},
    setup_requires=['setuptools_scm>=3.5.0'],
    packages=find_packages(),
    install_requires=requirements
)

```

{{< figure src="/blog/img/posts/2016-11-12-Matlab-R-Julia-Notebooks/newprojectlist.png" class="alignright">}}

- [Scala and SBT Introduction](#scala)
- [SBT-Native-Packager](#native)
- [Docker](#docker)

```python
print(f"Numpy: {np.__version__}")
```

Say if I said something here

```bash
$ echo "Hello World!"
```

```scala
println("hello")
def somefunction(col: String)

val mate = Int 5
```
# <a name="matlab"></a>MATLAB
