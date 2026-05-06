# 🧩 YML/YAML – Fast Facts

## 📘 Overview

YAML (YAML Ain’t Markup Language) is a **human-readable data format** used to define structured data — especially in **DevOps, CI/CD pipelines, and automation tools** like GitHub Actions, Docker, and Kubernetes.

It’s popular because it’s **simple, readable, and indentation-based** — no curly braces or brackets like JSON.

---

## 🧠 Key Concepts

| Concept                | Description                                           | Example                                                              |
| ---------------------- | ----------------------------------------------------- | -------------------------------------------------------------------- | ----------------- | ------------------------------------ |
| **File Extension**     | YAML files use `.yaml` or `.yml` (both are valid)     | `config.yaml`                                                        |
| **Key–Value Pair**     | Each line has a key followed by a colon               | `name: Playwright`                                                   |
| **Indentation**        | Spaces define hierarchy (⚠️ tabs are **not** allowed) | <br>`test:`<br>&nbsp;&nbsp;`script: run-tests.sh`                    |
| **Lists / Arrays**     | Begin with a dash `-`                                 | <br>`browsers:`<br>&nbsp;&nbsp;`- chrome`<br>&nbsp;&nbsp;`- firefox` |
| **Comments**           | Start with `#`                                        | `# This is a comment`                                                |
| **Multi-line Values**  | Use `                                                 | ` for block text                                                     | <br>`description: | `<br>&nbsp;&nbsp;`This test runs...` |
| **Booleans & Numbers** | No quotes needed for simple values                    | `enabled: true`                                                      |

---

## Useful VS Code Extentions

1. GitHub Actions
2. YAML ❤️ JSON

---
