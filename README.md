### What is Mage for?

Mage is an extension designed to allow developers to quickly
integrate command line tools, node libraries, prototypes, or scripts
into VS Code which can interact with the VS Code API.

![mage_demo](/images/mage_demo.gif)

To use Mage, first define a script, like so:

```javascript
// terminal.spell.js
module.exports = {
  cast: () => {
    const { window } = require("vscode");
    const terminal = window.createTerminal("terminal.spell");
    terminal.show();
    terminal.sendText('echo "Hello World\\!"', true);
    return terminal;
  },
};
```

Then execute the command `> Mage: Invoke` and select the `terminal` spell from the
quick pick menu. This will launch an integrated terminal in VS Code and echo `Hello World!`.

It also works with Webviews:

```javascript
// webview.spell.js
module.exports = {
  cast: () => {
    const { window } = require("vscode");
    const panel = window.createWebviewPanel("Webview", "Hello Computer");
    panel.webview.html = "Hello World!";
    return panel;
  },
};
```

This will open a webview titled "Hello Computer" with the text "Hello World!".,

You can even get user input using the VS Code API:

```javascript
// input.spell.js
module.exports = {
  cast: async () => {
    const { window } = require("vscode");
    const input = await window.showInputBox({
      placeHolder: "Enter a message",
    });
    const terminal = window.createTerminal("input.spell");
    terminal.show();
    terminal.sendText(`echo "${input}"`, true);
    return terminal;
  },
};
```

This will launch an input box and echo the user input to an
integrated terminal.

Mage looks for any file in the workspace that ends in `.spell.js`
to determine what your spells are.

If you use any disposables, make sure to return them
at the end of your `cast` function to avoid leaking
disposables.

Mage learns spells any time you save a `.spell.js` file or
you add a new folder to your new workspace.
