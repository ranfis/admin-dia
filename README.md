# Proyecto DIA [![Build Status](https://magnum.travis-ci.com/ranfis/admin-dia.svg?token=qwtzsfqnqvCJ89YFHpgz)](https://magnum.travis-ci.com/ranfis/admin-dia)
![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlCwI0dqehYdxrT3qF63PABnvQguLN2_sFBmADaNg0222cpEdX)
######Decanato de  Investigacion de UNIBE

Base de datos iterativa para manejar los proyectos que se relizan en el Decanato de  Investigacion de UNIBE. (publicación, proyectos, congresos).


## Set up server (In Linux)
* Install Git & NodeJs `sudo apt-get -y install git npm`
* Run `sudo apt-get install build-essential`
* `npm install -g grunt-cli bower yo generator-karma generator-angular` for build dependencies.

## Set up server (In Windows)
* Install NodeJs from the [official page](https://nodejs.org/en/download/).
* Install git from the [official page](https://git-scm.com/download/win).
* Run `sudo apt-get install build-essential`
* `npm install -g grunt-cli bower yo generator-karma generator-angular` for build dependencies.

## Installing dependencies
* `npm install -g bower grunt-cli`
* `bower install`

## Build & development

* Run `grunt` for building and `grunt serve` for preview.

## Testing

* Running `grunt test` will run the unit tests with karma.
