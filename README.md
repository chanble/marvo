## Marvo
Serve your local markdown files with zero configuration and CJK support.

## Screenshot
![marvo](https://cloud.githubusercontent.com/assets/6262943/6650928/bc4c1502-ca66-11e4-8c5b-3339411c24a3.png)

## Installation
```bash
npm install -g marvo
```
> Please make sure [Node.js](https://nodejs.org/) is installed.

## Quick Start
```bash
marvo serve
```
Then everything works.

## Documentation

```
  Usage: marvo [options] [command]


  Commands:

    serve [options] [path]  Start a Markdown server in current or specified directory.

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```

## Usage Examples
```bash
marvo serve -p 5566    # Serve at port 5566 (default: 9000)
marvo serve ./docs     # Serve files in ./docs
```
