# Y12 Art & Code Microsite

## Folder structure

```
art-code-microsite/
├── index.html
├── data.json
├── style/
|   └── styles.css <- only for landing
│   └── shared.css  <- for styles shared across pages
├── m/
│   └── your-name/
│       ├── index.html
│       └── assets/ 
```

---

## How to contribute

### 1. fork this repo

please fork this repo to your own github account as you would for an open source contribution. if you clone this repo and make a branch you will not be able to push the branch upstream. 

### 2. create your folder

```
m/
  your-name/
    index.html
    assets/
```

you can copy an existing folder (e.g. `members/viola/`) as a starting point

- in your html, remember to include a back link to the main menu : `<a id="backlink" href="../../">← Back to main</a>`
- keep asset sizes reasonable!
- make sure to add an entry for yourself in `data.json` so your page gets linked to from the index

### 3. Submit a PR
