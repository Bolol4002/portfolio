---
date: '2025-12-25'
title: 'Valid/Ready Pipeline Stage'
github: 'https://github.com/Bolol4002/valid_ready_pipeline'
external: 'https://github.com/Bolol4002/valid_ready_pipeline'
tech:
  - SystemVerilog
  - cocotb
  - Verilator
---

A single pipeline stage implementing the classic valid/ready flow-control handshake, with bubble-through forwarding so a stage can accept new data in the same cycle it forwards downstream. Back-pressure behaviour verified with a stimulus-driven cocotb testbench.
