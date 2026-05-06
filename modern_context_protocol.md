# MCP

https://platform.claude.com/docs/en/home
https://modelcontextprotocol.io/docs/getting-started/intro

MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems.
Using MCP, AI applications like Claude or ChatGPT can connect to data sources (e.g. local files, databases), tools (e.g. search engines, calculators) and workflows (e.g. specialized prompts)—enabling them to access key information and perform tasks.
Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect electronic devices, MCP provides a standardized way to connect AI applications to external systems.

MCP -> Modern Context Protocol is an open soucre protocol that standardlize how applications provides context to LLMs.


## 🚀 Playwright MCP Server Setup**

1. Create `.vscode/mcp.json` in the workspace
2. This config has two structure

```json
"servers": {} - Contains the list of MCP servers and their configurations
"inputs": [] - Optional placeholders for sensitive information like API keys
```
3. Add the playwright MCP server config
4. Done! 🎉

-----------------
 1. Create a new spec file under called `multi.window.spec.ts` under my functionals folder
 2. And capture the flow as below
 - Navigate to the side `https://the-internet.herokuapp.com/`
 - Click on "multiple windows" link
  - click the "click here" link on that new window 
 - navigate to the newly opened window and assert the header
 - navigate to that next window that is opened
 - Assert the header text
 - Come back to the parent window
 - Add a new key in `package.json` file
 - And run the spec file in headed mode

