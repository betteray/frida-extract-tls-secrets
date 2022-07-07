# frida-extract-tls-secrets

Frida script for dump ssl key log.

### How to compile & load

```sh
$ git clone git://github.com/betteray/frida-extract-tls-secrets.git
$ cd frida-extract-tls-secrets/
$ npm install
$ frida -U -f com.viber.voip --no-pause -l _agent.js
```

### Development workflow

To continuously recompile on change, keep this running in a terminal:

```sh
$ npm run watch
```

And use an editor like Visual Studio Code for code completion and instant
type-checking feedback.
