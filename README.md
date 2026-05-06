# Allure Reporter Setup for Playwright

## Installation & Basic Setup

### Step 1: Check and Install Allure Command Line Tool 

```sh
allure --version
```

If you encounter an error like `zsh: command not found: allure`, install the global command line tool:

```sh
npm install -g allure-commandline
```


### Step 1: Install Allure Playwright Package

Install the allure reporter as a development dependency:

```sh
npm install -D allure-playwright
```

---

### Step 2: Configure Reporter in Playwright Config

Update the `reporter` section in your `playwright.config.ts` file:

```ts
reporter: [
  ['html'],                    // Default Playwright HTML reporter
  ['allure-playwright'],       // Allure reporter
],
```

---
Run a test and you will see a folder `allure-results` in the project root

### Step 3: Generate and View Reports

After running your tests, generate the Allure report:

```sh
allure serve
```



## Advanced Configuration

### Enhanced Reporter Setup

For more detailed reporting, you can configure additional options:

```ts
reporter: [
  [
    'html',
    {
      open: 'never', // Don't auto-open HTML report
    },
  ],
  [
    'allure-playwright',
    {
      detail: true,
      suiteTitle: true,
      environmentInfo: {
        name: 'TEST',
        Release: 'Release 1.1',
        node_version: process.version
      },
    },
  ],
],
```

---

### Reference 
- [Allure Advance Config] (https://allurereport.org/docs/playwright/)

--- 

### Allure report document
//https://allurereport.org/docs/


# Read Data From CSV File

### Pseudocode
1. Create a `.csv` file with test data
2. Read the file with native `fs` module
3. Parse the csv data -> Array of data (install csv-parse)
4. Console out the data
5. Done ! 🎉


```ts
import fs from "fs"
import path from "path"
import { parse } from "csv-parse/sync"

/**
1. Create a `.csv` file with test data
2. Read the file with native `fs` module
3. Parse the csv data -> Array of data
4. Console out the data
5. Done ! 🎉
*/

// Read the file
const csvFilePath = path.resolve(`${process.cwd()}/data/functional/make-aptmnt-test-data.csv`)
const fileContent = fs.readFileSync(csvFilePath, {encoding: "utf-8"})
console.log(fileContent);
console.log(typeof fileContent);

// Parse the csv data
const csvDataArr = parse(fileContent, {
  columns: true,
  skip_empty_lines: true,
  trim: true
})

// Console out the data
console.log(csvDataArr);

```

**Reference**
1. Nodejs Doco: https://nodejs.org/docs/latest/api/fs.html#synchronous-api 
---
============================================