---
draft: true
date: 2024-06-17
authors: [tallamjr]
categories:
  - Build
  - Performance
  - Engineering
---

# 🐘 Learn you some `git` for great-good and profit.

__An opinionated view on `git` flow for effective research engineering.__

As with any other engineering discipline, research software engineering
demands that the end result be robust and well-tested. It should also be
maintainable with reproducible outputs/outcomes. The engineering standards that
should be in place should allow for any other engineer to be able to assess any
damage or build upon it's successes with ease. In contrast to the sciences,
there will be many ways to string a cat and as such there will be many opinions on
how things should be done. This is a personal point of view from nearly 10 years
of writing research software of how the mastery of a "simple" tool like `git`
can level up research teams and make for effective research engineering.

<!-- more -->


Developing an efficient approach to build documentation in CI workflows is
essential, especially when working in large repositories with thousands of
commits, like ours. Of course, we want to build documentation quickly and
efficiently, ensuring fast and productive workflows. When using both the
wonderful [`git-committers`][git-committers] and [`git-revision-date-localized`]
[git-revision-date-localized] plugins to display [document contributors] and
[dates] at the bottom of each page, we are required to set `fetch-depth: 0`,
which resulted in checkout times of 20 to 30 seconds on our repository. By
leveraging [`git sparse-checkout`][git sparse-checkout] within [GitHub Actions],
check out time was brought down to 2 seconds.

  [git sparse-checkout]: https://git-scm.com/docs/git-sparse-checkout
  [GitHub Actions]: ../../publishing-your-site.md#with-github-actions
  [git-revision-date-localized]: https://github.com/timvink/mkdocs-git-revision-date-localized-plugin
  [git-committers]: https://github.com/ojacques/mkdocs-git-committers-plugin-2
  [document contributors]: ../../setup/adding-a-git-repository.md#document-contributors
  [dates]: ../../setup/adding-a-git-repository.md#document-dates


"I'm decorating a new bathroom, do I really need to know how the **plumbing**
works when all I care about is the porcelain sink I want to have in it?" Well,
the answer is no, you don't need to know it, but it should does help so that you
don't xyz.

This blog will cover some of the most commonly used `git` commands that and then
showcase some the internals and inner workings to get a better picture of how
`git` is operating. Hopefully with this understanding you'll be able to engineer
top-notch software with ease and confidence knowing you have the power to do
great things.

## 🙂 The Everyday Commands

### `git add`
### `git commit`
### `git ss`
### `git co`
### `git revert`
### `git clone`
### `git push`
### `git pull`
### `git log`

## 🤓 The Now-and-again Commands

git reset
git stash
git remote
git diff/vimdiff -- notebooks.
git bisect

## 🙃 The Playing with Fire Commands

### `git rebase`

## Configuration

gitignore
Github actions, gitlab pipelines and Pages
pre-commit and hooks

[`git sparse-checkout`][git sparse-checkout] allows you to check out only a
subset of the files in a repository, making it incredibly useful for large
repositories where a full checkout takes long and includes many files that are
not relevant when building documentation.

## CI/CD

### GitHub Actions & GitLab Pipelines

### Pages

### Git-Flow

To enable [`git sparse-checkout`][git sparse-checkout] within [GitHub Actions]
and ensure that you are only building the documentation that you need, add the
following lines to your workflow file:

``` yaml
- uses: actions/checkout@v4
  with:
    fetch-depth: 0
    sparse-checkout: |
      docs
      includes
```

[`git sparse-checkout`][git sparse-checkout] always checks out all files
residing in the repository’s root. This means that regardless of the specified
paths or directories for sparse checkout, the files located in the root of the
repository will always be included in the checkout process.

Thus, you only need to specify the directories that are necessary for building
documentation. In our case, we only need the `docs` and `includes` folders,
but if you need additional directories, you can just add them to the end of the
list. A complete example workflow for [GitHub Actions]:

``` yaml hl_lines="13-18"
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

* Apache Arrow
* Databases
* Spark 3.0, Horovod, Plotly
* Embedded Systems
* Rust
* TensorFlow 2.x
* Compression
* Codecs

$\sqrt{3x-1}+(1+x)^2$


![electricity](http://i.giphy.com/Gty2oDYQ1fih2.gif)

equation | description
----------|------------
$\nabla \cdot \vec{\mathbf{B}}  = 0$ | divergence of $\vec{\mathbf{B}}$ is zero
$\nabla \times \vec{\mathbf{E}}\, +\, \frac1c\, \frac{\partial\vec{\mathbf{B}}}{\partial t}  = \vec{\mathbf{0}}$ |  curl of $\vec{\mathbf{E}}$ is proportional to the rate of change of $\vec{\mathbf{B}}$
$\nabla \times \vec{\mathbf{B}} -\, \frac1c\, \frac{\partial\vec{\mathbf{E}}}{\partial t} = \frac{4\pi}{c}\vec{\mathbf{j}}    \nabla \cdot \vec{\mathbf{E}} = 4 \pi \rho$ | _wha?_

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

Someone [@elasticc]

Someone else at [@elasticc]
