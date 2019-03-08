# Blockly for senseBox
Blockly for senseBox is a visual programming editor for the senseBox:edu. It is based on Google's [Blockly](https://developers.google.com/blockly/) and carlosperates [Ardublockly](https://github.com/carlosperate/ardublockly), which has been forked.

## Features
* Generates Arduino code with visual drag-and-drop blocks
* online Compiler for the senseBox MCU
* Useful "code block warnings"
* Works online without Installation and offline on Windows / Linux / Mac OS X (testing purpose only at the moment!)
* 

If you find erros, enhancement or want to request new features submit a new [issue](https://github.com/sensebox/ardublockly-1/issues). 


## Running Online
1. Go to [Blockly for senseBox](https://blockly.sensebox.de/) pick the senseBox MCU.
2. Drag and Drop Blocks to the Workspace, hit compile and copy the .bin to your senseBox MCU

## Documentation
Documentation can be found online in German and English: [Blockly Book](https://sensebox.github.io/books-v2/blockly/)

## Branches

* master: The newest compressed version runs via netlify here
* develop: This the uncompressed development version runs via netlify here
* feat/..: The branch holds a new feature


## Development
If you want to contribute to Blockly for senseBox please follow the development rules:
- fork the develop branch which holds the the umcompressed version
- add your blocks, translations or new features 
- name your new branch with name feat/featurename
- PR from your branch to the develop branch

--> you can view the develop branch [here](https://develop--sensebox-blockly.netlify.com/)

## Credits
This project has been inspired by [BlocklyDuino](https://github.com/BlocklyDuino/BlocklyDuino) and is a fork of [Ardublockly](https://github.com/carlosperate/ardublockly)

Blockly original source is Copyright of Google Inc. [https://developers.google.com/blockly/][1].

For the nice loading Animations:
[Loading.io](https://loading.io/button/)


## License


Based on the work by carlosperate https://github.com/carlosperate/ and his Ardublockly https://github.com/carlosperate/ardublockly

Unless stated otherwise, the source code of this projects is
licensed under the Apache License, Version 2.0 (the "License");
you may not use any of the licensed files within this project
except in compliance with the License.

The full document can be found in the [LICENSE](https://github.com/sensebox/ardublockly-1/blob/master/LICENSE) file.

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
