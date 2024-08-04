---
draft: true
date: 2024-06-07
authors: [tallamjr]
categories:
    - Conferences
tags:
    - compilers
    - edge
---

# 🏔️ **Sunshine, Mountains and Deep Learning Compilers**

A round up of the ETH Zürich Future Computer Laboratory's inaugural
Summer School on modern computer architectures, digital IC design, programming
of heterogeneous systems and open source hardware.

<!-- more -->

## A Primer

Vids: https://www.youtube.com/playlist?list=PL5Q2soXY2Zi-KmtIeKZMbmF-t_r3_o5nw

[Programme](https://ethz.ch/content/dam/ethz/special-interest/itet/efcl-dam/images/SummerSchool/EFCL%20Summer%20School_Program.pdf)

* Energy-Efficient Embedded Systems Laboratory, University of Bologna
    - https://github.com/EEESlab
    - http://www.dei.unibo.it/en/research/research-facilities/Labs/eess-energy-efficient-embedded-systems
    - [CMix-NN: Mixed Low-Precision CNN Library for Memory-Constrained Edge Devices](https://arxiv.org/abs/1905.13082)
    - PAPER: [Memory-Driven Mixed Low Precision Quantization For Enabling Deep Network Inference On Microcontrollers](https://arxiv.org/pdf/1905.13082)

* PULP-NN: Enabling QNN inference on PULP: https://github.com/pulp-platform/pulp-nn

* MATCH: Model-Aware TVM-based Compiler for Heterogeneous hardware
    - Paper:
    - Code: https://github.com/eml-eda/match
* PLiNIO: A User-Friendly Library of Gradient-based Methods for Complexity-aware DNN Optimization
    - Paper: https://arxiv.org/pdf/2307.09488
    - Code: https://github.com/eml-eda/plinio

[PULP](https://github.com/pulp-platform/pulp)

* [Neural Architecture Search: Insights from 1000 Papers](https://arxiv.org/pdf/2301.08727)

* Apache TVM: Tensor Virtual Machine, created by Tianqi Chen
    - https://github.com/apache/tvm
    - https://tvm.apache.org/docs/index.html
    - BARE METAL, microTVM: https://tvm.apache.org/docs/topic/microtvm/index.html
    - Learning to Optimize Tensor Programs: https://arxiv.org/pdf/1805.08166
    - TVMCon 2023: https://youtube.com/playlist?list=PL_4zDggB-DBp81G1tAME9r0_P5IY9D700&si=BFuRsyaATelqDMlu
    - OctoML, TVM company spin-out from creators.

* Tianqi Chen has gone on to create MLC.ai:
    - COURSE:
        - https://mlc.ai/
        - https://mlc.ai/summer22/schedule
        - https://youtube.com/playlist?list=PLFxzvDFotCitb0dOv5SpNdK6t3Uu7tBRo&si=QSQfhV8vau1WXzB0
        - https://github.com/mlc-ai/notebooks/tree/main
    - COMPANY BLOG: https://blog.mlc.ai/
    - https://dlsyscourse.org/slides/23-model-deployment.pdf
    - https://www.youtube.com/watch?v=jYCxVirq4d0
    - https://www.youtube.com/watch?v=es6s6T1bTtI
    - https://www.youtube.com/watch?v=jCBrUisBQ0A
    - https://www.youtube.com/watch?v=HIwsCzdW_pw

* [Proceedings of Machine Learning and Systems 6 (MLSys 2024)](https://proceedings.mlsys.org/paper_files/paper/2024)
    - torch2chip: an end-to-end customizable deep neural network compression and deployment toolkit for prototype hardware accelerator design

* [ML for ML Compilers - Mangpo Phothilimthana | Stanford MLSys #80](https://www.youtube.com/watch?v=VASg2XNgj-4&list=PLSrTvUm384I9PV10koj_cqit9OfbJXEkq&index=80)
* [Foundation Models on Consumer Devices - Tianqi Chen | Stanford MLSys #85](https://www.youtube.com/watch?v=InoNMvjs_vo&list=PLSrTvUm384I9PV10koj_cqit9OfbJXEkq&index=85)
* [Notes on AI Hardware - Benjamin Spector | Stanford MLSys #88](https://www.youtube.com/watch?v=PlraH57ey4k&list=PLSrTvUm384I9PV10koj_cqit9OfbJXEkq&index=88)


* Torcheval: https://github.com/pytorch/torcheval
* PIT - Pruning in Time: https://github.com/eml-eda/plinio/tree/main/plinio/methods/pit

* Hands-on Repo: https://github.com/tallamjr/efcl-school-t3

### Troubleshooting

* `RuntimeError: Input type (torch.FloatTensor) and weight type (torch.cuda.FloatTensor) should be the same`
    - https://stackoverflow.com/a/59013131/4521950
* `How to use a compiled C .so file in rust`
    - https://stackoverflow.com/questions/60236701/how-to-use-a-compiled-c-so-file-in-rust
