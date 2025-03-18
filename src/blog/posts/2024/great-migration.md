---
draft: true
date:
  created: 2024-09-10
  # updated: 2024-08-27
authors: [tallamjr]
categories:
  - Opinionated
tags:
  - git
  - vim
---

# 💻 **The Great Migration: `vim` --> `nvim`**

After many years fighting the urge to move from pure `vim` to the modern
alternative of `neovim`, I've _finally_ taken the plunge. Here's my walkthough
of getting set up and putting together a minimal IDE for Rust development.

<figure markdown="span">
    ![](https://imgs.xkcd.com/comics/real_programmers.png){ width=100% }
  <figcaption>Real programmers</figcaption>
</figure>

<!-- more -->

https://rsdlt.github.io/posts/rust-nvim-ide-guide-walkthrough-development-debug/

## 🤔 **Why `(neo)vim`?**

Almost 10 years to the day I am seriously (after several failed attempts) making
the move to `neovim` from my first CLI love, `vim`. I started using `vim` not
because I wanted to be hardcore, although that is of course a consequence for
anyone who ends up using `vim`, but because I actually was unable to edit text
with anything else.

_The year is 2014_ and I had just started my masters course in Computer Science
at UCL. For this course I was using a 2010 Mac Book Pro that somehow survived my
final year of undergrad as well as being thrown around South America for a year
when I took it with me travelling. Suffice to say it was beaten up and our of
its depth when it came to running code assignments of our first semester course
in programming.

Frustratingly UCL insisted on torturing those who were new to
programming to solve all coursework using Java, and to make matters worse, we
were encouraged to use the Eclipse IDE. I won't go on about my Java or Eclipse
woes (I'm sure you have plenty of your own) but I will say that due to the beast
of an application Eclipse was, my sad laptop just couldn't hack it -- or would
essentially sound like a small drone is about to take off at the back of the
lecture hall. While I had exposure to Java and similar bloated IDEs back in 2008
for undergrad, I hadn't appreciated the compute power and memory a large IDE
uses until I was running it on my own machine.

Some of my classmates saw the embarrassment when every time I would try to edit a
file my laptop would either crash or freeze and asked if I had ever heard of
`vim`, a command line editor.

Much of my software development for my undergrad was at the command line so I
was surprised I hadn't come across this before.
And for the first time with this super lightweight editor, I could edit text with ease and not worry
about locking up my laptop.

A friend then gave me an introductory master class in _vim-motions_ and other
_vim-fu_ I was hooked! After a "right-of-passage" experience of not being able
to exit `vim` after setting my default `$GIT_EDITOR=vim` I was well on my way to
becoming a "real-programmer"

There are a multitude of reasons why I stayed with `vim`, in addition to being
the only thing I could use without setting fire to my keyboard, but I'll leave
that to the evangelists on the internet to spread the word about the power of using
`vim`. A great book for anyone who is just starting out is ["Practical Vim, 2e:
Edit Text at the Speed of Thought"](https://amzn.to/3ZD1ENE)

<figure markdown="span">
    ![](https://preview.redd.it/perhaps-impractical-without-a-computer-but-who-cares-i-had-v0-btleo5hqtuab1.jpg?width=1080&crop=smart&auto=webp&s=d8d2af2849e0dccd5953db8b7207f6f2b1265ff2){ width=50% }
  <figcaption>Disclaimer: Photo taken from random person on Reddit</figcaption>
</figure>

If the reader is so inclined expand the details tab here for a chronological
guide from the first text editor on UNIX `ed` to what we have today.

<!-- prettier-ignore-start -->
???+ note "📠 In the Beginning there was `ed`.."
    Here’s a chronological overview of command-line text editors, including some of the most significant in the history of computing:

    **1. ed (1969)**
      - **Developer:** Ken Thompson
      - **Platform:** Unix
      - **Overview:** The first text editor for Unix, **ed** was designed for minimalism and operated entirely in command mode. Users would provide commands like `d` (delete), `a` (append), and `s` (substitute). It set the foundation for later Unix editors.
      - **Legacy:** Often considered the grandfather of Unix text editors, **ed** is still available on most Unix-like systems. It's known for being powerful but not user-friendly.

    ** 2. ex (1976)**
      - **Developer:** Bill Joy
      - **Platform:** Unix
      - **Overview:** Derived from **ed**, **ex** introduced a visual editing mode called **vi**. It featured a more interactive, screen-based interface, while still allowing users to drop back into **ex**’s line-editing mode.
      - **Legacy:** **ex** is embedded in **vi** and **Vim** as their line-mode editor.

    ** 3. vi (1976)**
      - **Developer:** Bill Joy
      - **Platform:** Unix
      - **Overview:** Initially an extension of **ex**, **vi** became a widely used screen-based editor that allowed users to see and interact with the text more efficiently than in line editors like **ed**. It introduced modes: command mode, insert mode, and visual mode.
      - **Legacy:** **vi** became the standard editor on Unix systems and has influenced the design of many editors that followed. It is still available on many systems today in some form.

    ** 4. emacs (1976)**
      - **Developer:** Richard Stallman and Guy Steele
      - **Platform:** Unix (and later many others)
      - **Overview:** **Emacs** is highly extensible, allowing users to program their own features using Lisp. It offers a more feature-rich and extensive environment compared to **vi**, providing capabilities beyond text editing (e.g., file management, email, etc.).
      - **Legacy:** Emacs remains one of the most powerful and customizable editors, often used by those who prefer a full-fledged environment for development and text processing.

    ** 5. sed (1977)**
      - **Developer:** Lee E. McMahon
      - **Platform:** Unix
      - **Overview:** **sed** (stream editor) is a non-interactive command-line editor designed for parsing and transforming text in a stream or file. It works by applying patterns and substitutions to text as it’s processed line by line.
      - **Legacy:** **sed** is still widely used in shell scripts and data processing, particularly for making quick changes to text files or streams.

    ** 6. nano (1999)**
      - **Developer:** Chris Allegretta
      - **Platform:** Unix-like systems
      - **Overview:** Created as a free replacement for the Pico text editor, **nano** is a simple, user-friendly terminal-based editor. It provides basic functionality like search, replace, and syntax highlighting while being more approachable than **vi** or **emacs**.
      - **Legacy:** **nano** is often the go-to editor for beginners and is installed by default on many Unix systems.

    **7. Vim (1991)**
      - **Developer:** Bram Moolenaar
      - **Platform:** Unix, Linux, Windows, macOS, and others
      - **Overview:** **Vim** (Vi IMproved) is a more feature-rich version of **vi**. It includes support for multiple levels of undo, syntax highlighting, split screens, and plugins. Like **vi**, it maintains the modal editing system.
      - **Legacy:** **Vim** has a large, dedicated user base and remains one of the most popular command-line editors, especially in programming environments.

    **8. Neovim (2014)**
      - **Developer:** Neovim community (forked from Vim)
      - **Platform:** Unix, Linux, Windows, macOS, and others
      - **Overview:** **Neovim** is a refactor and modernized fork of **Vim**, focusing on better extensibility, performance improvements, and a more consistent user interface. It includes improvements to asynchronous job control, Lua scripting support, and a more modular core.
      - **Legacy:** **Neovim** is widely used among developers seeking a modern, extensible command-line editor. It continues to gain traction due to its plugin ecosystem and active development.

    ** 9. Helix (2021)**
      - **Developer:** Helix community
      - **Platform:** Unix-like systems, Windows
      - **Overview:** **Helix** is a modal editor inspired by **Vim** but written in Rust, emphasizing correctness, performance, and modern programming language support with tree-sitter and LSP built-in. It follows the modal editing philosophy but improves upon navigation and structural editing.
      - **Legacy:** Though relatively new, **Helix** is gaining popularity, particularly among those looking for a modern, fast, and minimalistic alternative to Vim/Neovim.

    **10. Kakoune (2013)**
      - **Developer:** Maxime Coste
      - **Platform:** Unix-like systems
      - **Overview:** **Kakoune** is a modal text editor that takes inspiration from **Vim** but with some key differences. The selections in **Kakoune** are first-class objects, and commands apply to selections rather than the cursor. It focuses on being more efficient and providing immediate feedback.
      - **Legacy:** **Kakoune** is appreciated by those who want the power of modal editing but find **Vim**'s approach to selections and commands less intuitive.

    **Other Noteworthy Mentions:**
    - **Sam (1987):** Developed by Rob Pike, it was another influential Unix editor with a graphical user interface.
    - **Micro (2016):** A modern and intuitive terminal-based text editor, focusing on simplicity and ease of use, often seen as a more advanced alternative to **nano**.

    These editors demonstrate the evolution of text editing from simple line editors like **ed** to sophisticated, highly extensible environments like **Neovim**. Each iteration brought new features or philosophies that have shaped how modern developers work with code in the terminal.

<!-- prettier-ignore-end -->

## 💪 **OK, Ok, I'm really doing it this time!**

<!-- https://www.youtube.com/watch?v=6pAG3BHurdM -->
<!-- https://www.josean.com/posts/how-to-setup-neovim-2024 -->
<!-- https://docs.astronvim.com/reference/default_plugins/ -->

<!-- NOTE: Vim motions -->

<!-- https://www.youtube.com/playlist?list=PLm323Lc7iSW_wuxqmKx_xxNtJC_hJbQ7R -->
<!-- https://www.youtube.com/watch?v=-ybCiHPWKNA&pp=ygUWcHJpbWUgdmltIG1vdGlvbnMgbm9vYg%3D%3D -->

## 🔌 **Essential Plugins**

## 🔮 **The Next 10 Years...**

<!-- NOTE: EOF -->
