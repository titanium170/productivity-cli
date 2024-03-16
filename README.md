# productivity-cli

## About

This is a really basic typescript app that I'm building to model my productive workflow.

The core of the app is a list of "work sets" which contain tasks (todos).

Each work set is intended to map onto a pomodoro timer, so one work set is one 25min set
with a 5min break.

I am also implementing the timer, so that I can have it integrated with one app.

The primary interface is currently CLI-based, since as a developer, I find this to
be the fastest way to interact with my app, no need for frills.

This allows me to model my ideal interaction, which is wherever I am on my PC, I can simply press:
1. `Alt + Space` - which brings up PowerToys `Run`
2. `>pdc <command>` - which opens and runs the command in `cmd`, which opens a batch file which calls my node binary inside WSL

Ideally PowerToys would support running commands directly from WSL, but alas not yet.

## Why?

Just to allow me to play with different technology, learn new concepts and ideally
streamline my workflow in the long run.

This is why many of the decisions are not optimal or even sensible.

## Development

To install dependencies:

```bash
bun install
```

To run, first launch the server:

```bash
bun run server
```

Then to issue commands through the cli:
```bash
bun run start <command>
`````

This project was created using `bun init` in bun v1.0.30. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
