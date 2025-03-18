---
draft: true
date:
  created: 2025-01-01
  updated: 2025-01-02
authors: [tallamjr]
categories:
  - Conferences
  # - Embedded Systems
  # - Life
  # - Opinionated
  # - RSW Engineering
  # - Tooling
  # - tinyML + Edge A.I.
tags:
  - unix
  - vim
---

# 🔥 **OpenCL Revisited: _Mac Go Brrr!_**

A while ago I worked on a method to allow local writing of development logs in markdown, which I
could then upload to Github where my supervisor could take a look. Here are the steps..

<!-- more -->

[git sparse-checkout]: https://git-scm.com/docs/git-sparse-checkout
[GitHub Actions]: ../../publishing-your-site.md#with-github-actions
[git-revision-date-localized]: https://github.com/timvink/mkdocs-git-revision-date-localized-plugin
[git-committers]: https://github.com/ojacques/mkdocs-git-committers-plugin-2
[document contributors]: ../../setup/adding-a-git-repository.md#document-contributors
[dates]: ../../setup/adding-a-git-repository.md#document-dates

## `:bufdo`

<!-- Place images inside folder with same name as post -->
<figure markdown>
    ![](https://imgs.xkcd.com/comics/real_programmers.png){ width=100% }
<figcaption markdown>
    "Real programmers use vim.."
</figcaption>
</figure>

"I'm decorating a new bathroom, do I really need to know how the **plumbing**
works when all I care about is the porcelain sink I want to have in it?" Well,
the answer is no, you don't need to know it, but it should does help so that you
don't xyz.

This blog will cover some of the most commonly used `git` commands that and then
showcase some the internals and inner workings to get a better picture of how
`git` is operating. Hopefully with this understanding you'll be able to engineer
top-notch software with ease and confidence knowing you have the power to do
great things.

```yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0
    sparse-checkout: |
      docs
      includes
```

<!-- [`git sparse-checkout`][git sparse-checkout] always checks out all files -->
<!-- residing in the repository’s root. This means that regardless of the specified -->
<!-- paths or directories for sparse checkout, the files located in the root of the -->
<!-- repository will always be included in the checkout process. -->

```yaml hl_lines="13-18"
name: documentation
on:
  push:
    branches:
      - master
      - main
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          sparse-checkout: |
            docs
            includes
      - uses: actions/setup-python@v4
        with:
          python-version: 3.x
      - run: pip install mkdocs-material
      - run: mkdocs gh-deploy --force
```

## Conclusion

That's all there is! We're super happy with the results and hope that this will
help you to speed up your documentation builds in [GitHub Actions] as well. As
always, feel free to share your thoughts and experiences in the comments below.

Something else.

<figure markdown="span">
    ![Image title](https://imgs.xkcd.com/comics/manuals.png){ width=100% }
  <figcaption>Image caption</figcaption>
</figure>

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

- Apache Arrow
- Databases
- Spark 3.0, Horovod, Plotly
- Embedded Systems
- Rust
- TensorFlow 2.x
- Compression
- Codecs

$\sqrt{3x-1}+(1+x)^2$

![electricity](http://i.giphy.com/Gty2oDYQ1fih2.gif)

| equation                                                                                                                                                                  | description                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| $\nabla \cdot \vec{\mathbf{B}}  = 0$                                                                                                                                      | divergence of $\vec{\mathbf{B}}$ is zero                                               |
| $\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$                                                          | curl of $\vec{\mathbf{E}}$ is proportional to the rate of change of $\vec{\mathbf{B}}$ |
| $\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | _wha?_                                                                                 |

$$
\begin{equation}
  g\left(k\right) = \binom{n}{k} p^k\left(1-p\right)^{n-k}
\end{equation}
$$

$$
\begin{equation}
f(x) = \int_{-\infty}^\infty \hat f(\xi)\,e^{2 \pi i \xi x} \,d\xi
\end{equation}
$$

$$f(x) = \int_{-\infty}^\infty \hat f(\xi)\,e^{2 \pi i \xi x} \,d\xi$$

In equation $\eqref{eq:sampleref}$, we find the value of an
interesting integral:

$$
\begin{equation}
  \int_0^\infty \frac{x^3}{e^x-1}\,dx = \frac{\pi^4}{15}
  \label{eq:sampleref}
\end{equation}
$$

- [Scala and SBT Introduction](#scala)
- [SBT-Native-Packager](#native)
- [Docker](#docker)

```python
print(f"Numpy: {np.__version__}")
```

```bash
$ echo "Hello World!"
```

```scala
println("hello")
def somefunction(col: String)

val mate = Int 5
```

# <a name="matlab"></a>MATLAB

Someone else[^1]

[^1]: Footnote

Someone [@elasticc]

Someone else at [@elasticc]
