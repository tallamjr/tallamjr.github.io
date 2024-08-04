---
draft: true
date:
  created: 2024-06-17
  #  updated: 2024-01-02
authors: [tallamjr]
categories:
    - Opinionated
    - RSW Engineering
    - Tooling
tags:
    - git
---

# **🐘 Learn you some `git` for great-good and profit**

An opinionated view on `git` flow for effective research engineering.

  [git sparse-checkout]: https://git-scm.com/docs/git-sparse-checkout
  [GitHub Actions]: ../../publishing-your-site.md#with-github-actions
  [git-revision-date-localized]: https://github.com/timvink/mkdocs-git-revision-date-localized-plugin
  [git-committers]: https://github.com/ojacques/mkdocs-git-committers-plugin-2
  [document contributors]: ../../setup/adding-a-git-repository.md#document-contributors
  [dates]: ../../setup/adding-a-git-repository.md#document-dates

<!-- more -->

<figure markdown="span">
    ![Image title](https://imgs.xkcd.com/comics/manuals.png){ width=100% }
  <figcaption>Image caption</figcaption>
</figure>

As with any other engineering discipline, research software engineering
demands that the end result be robust and well-tested. It should also be
maintainable with reproducible outputs/outcomes. The engineering standards that
should be in place should allow for any other engineer to be able to assess any
damage or build upon it's successes with ease. In contrast to the sciences,
there will be many ways to string a cat and as such there will be many opinions on
how things should be done. This is a personal point of view from nearly 10 years
of writing research software of how the mastery of a "simple" tool like `git`
can level up research teams and make for effective research engineering.

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
