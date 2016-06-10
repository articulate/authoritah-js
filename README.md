# authoritah-js

Authoritah is a tool for managing [Auth0](https://auth0.com/) rules via declarative configuration.

[![Build Status](https://travis-ci.org/articulate/authoritah-js.svg?branch=master)](https://travis-ci.org/articulate/authoritah-js)

![authoritah](http://data.boomerang.nl/b/boomerang/image/respect-my-authority/s600/southparkvz.jpg)

## Installation

`npm install authoritah-js`

Alternatively, we provide a [Docker container](https://hub.docker.com/r/articulate/authoritah-js/) for this executable which you can use.

The image will attempt to mount whatever volume you supply (`-v`) pointing to `/auth0` as the point from which it will load the `rules.yml` config and rule script definitions. This will typically be the same directory you are running `authoritah` from.

```bash
docker pull articulate/authoritah-js
docker run --rm -ti -v $(pwd):/auth0 articulate/authoritah-js -h
```

## The `-h`

Most docs are self-contained within the cli. Simply run `authoritah -h`

```
  Usage: authoritah [options] <config file>


  Commands:

    config <command> [args...]  Manage Authoritah config variables. Available commands:
    	show
    	set key=value [key=value...]
    	get key [key...]
    	remove key [key...]
    jwt [options]
    dump [options] [filename]
    apply [options] [rule]

  Options:

    -h, --help      output usage information
    -V, --version   output the version number
    -C, --no-color  Disable color output
```

## Contributing

1. Fork it ( https://github.com/articulate/authoritah/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request

## Others

We also built (but are not actively maintaining) a [Crystal](http://crystal-lang.org) version which preceded this project. The code can be found at https://github.com/articulate/authoritah

## Contributors

- [plukevdh](https://github.com/plukevdh) Luke van der Hoeven - creator, maintainer
