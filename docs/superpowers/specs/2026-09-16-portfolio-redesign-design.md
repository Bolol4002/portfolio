# Portfolio Redesign — Blueprint/PCB Hardware Engineer Design

Date: 2026-09-16
Status: Approved (user)

## Context

The current portfolio (`/docs`) uses a dark terminal/hacker aesthetic with a multipage tabbed
layout, an ASCII particle canvas, and 12 project pages. The user wants a complete redesign into a
**professional hardware engineer/student** portfolio with a **blueprint/PCB** visual identity.

## Goals

- Professional, recruiter-facing look appropriate for a hardware engineer / VLSI student.
- Distinctive blueprint identity (blue-on-navy schematic style), not a generic template.
- Zero build tooling — pure static HTML/CSS/JS, matches current `/docs` static hosting.

## Visual system

- Background: deep ink-navy (`#081426`).
- Blueprint graph-paper grid overlay (fine lines + stronger engineering grid marks).
- Headings: condensed uppercase display face (Oswald/Barlow Condensed) with wide letter-spacing
  (engineering "title block" lettering).
- Body: Inter. Labels/tags/numbers/mono details: JetBrains Mono.
- Accent: cyan `#59d6ff` (live signals/links), amber `#ffb454` (copper trace emphasis/success).
- Signature details:
  - `+` registration marks on card corners.
  - Dashed dimension lines under numbered section headings (`/01` … `/07`).
  - Blueprint **title block** in the hero (like an engineering drawing title block:
    project name, scale, date, prepared-by).
  - Subtle decorative PCB trace SVG in the hero background (light, no heavy animation).

## Page architecture

### Single scroll page (`index.html`)

1. **Hero** — name, "Hardware Engineer · Electronics & VLSI Student", role chips (RTL Design,
   Verification, CPU Microarchitecture), live-status pill, CTAs (Resume, Email, GitHub, LinkedIn),
   title-block motif.
2. **About** — photo (`me.jpg`), short paragraphs (student, VLSI interest, Linux/workflow, goal),
   quick-facts sidebar (Location, Degree, CGPA, Focus).
3. **Metrics strip** — 9.35 CGPA · 16 projects · 14/14 UVM tests · Hackathon winner.
4. **Skills** — 4 panels (Languages, Tools & Platforms, Core Concepts, Domains).
5. **Projects** — filterable grid (all 16, category chips: Processor/CPU, Protocols & Memory,
   Verification, Analog, Tooling). Top projects are feature cards with real images
   (`img/s-core/architecture.png`, `img/accumulator/layout.png`). All link to detail pages.
6. **Education** — timeline: B.Tech ECE (VLSI) @ KL University Hyderabad (9.35), Class XII
   GSPS Thengana (9.3), Class X Kendriya Vidyalaya Adoor (9.5).
7. **Contact** — email/LinkedIn/GitHub cards, location, resume button, availability note.

### Project detail pages (`/docs/projects/`, 16 pages)

Built from the content in `current_projects.md`. Each page: back link, header title block, tech
tags, overview, key features, architecture/flow, verification & results sections. Shared
`style.css` + shared `main.js`.

The 16 projects:

01. configurable_AI_Acceleration — Verilog / FPGA AI accelerator for PicoRV32
02. s-core — SystemVerilog single-cycle RISC-V CPU + cocotb
03. MIPS32 — MIPS32 ISA study notes
04. valid_ready_pipeline — SystemVerilog valid/ready pipeline stage + cocotb
05. UART — Verilog UART baud generator + transmitter
06. FIFO — Verilog FIFO + coverage testbench
07. wishbone_protocol — Verilog Wishbone master/slave
08. apb_memory_model — SystemVerilog APB memory + verification env (SVA + random)
09. accumulator-rtl_to_gds — Verilog RTL→GDS OpenLane flow
10. adaptive_RTL_coding — power-aware adaptive control unit
11. adaptive_RTL_coding_UVM_Verification — UVM verification, 14/14 tests pass
12. Fault_Tolerant_ADC — QSPICE fault-tolerant flash ADC
13. VLSI-python_lab — VLSI PD & automation lab codes (Python + Verilog)
14. vlsi-agent — LLM-powered Verilog verification agent (FastAPI)
15. cpu-performance-analyzer — Python CPI/IPC/stall analyzer
16. python_based_log_parsing — Python CPU-log/opcode profiler

### Removed from current site

Dropped project pages: AgroDrone (kept as one-line achievement in metrics/About), Drowsiness
detection, YOLO, 8-bit ALU, SRAM, standalone Mini RISC-V processor (covered by s-core /
valid_ready_pipeline / AI-accel).

## Interactions & technical

- Sticky top nav with blueprint section links + resume button; collapses to hamburger on mobile.
- Smooth scroll; active-section highlighting on scroll.
- Project category filter chips (pure JS, no dependencies).
- Respect `prefers-reduced-motion`.
- Hover = trace-line accent + registration-mark glow (CSS only).
- Responsive down to 360px.
- Resume button links to `docs/resume.pdf` placeholder (user supplies real PDF).
- No external dependencies beyond Google Fonts (Inter, Oswald/Barlow Condensed, JetBrains Mono).

## Files

- Rewrite: `docs/index.html`, `docs/style.css`, `docs/main.js`
- Rewrite about/skills/education/contact/projects pages → folded into `index.html` sections.
- Add: `docs/resume.pdf` (placeholder).
- Rewrite 16 project pages in `docs/projects/`.
- Old `docs/about.html`, `docs/skills.html`, `docs/education.html`, `docs/contact.html`,
  `docs/projects.html`, old project pages removed since no longer linked.