
#### Install travis
(need ruby 2.0)  
more information https://github.com/travis-ci/travis.rb#installation  
`gem install travis -v 1.8.2 --no-rdoc --no-ri`  
`travis version`  
should be 1.8.2



#### create a travis config 'travis.yml'
create .travis.yml (not ignored)  
The "addons" sections is need when your app uses bcrypt.  

```
language: node_js
node_js:
  - '4'
services:
  - mongodb
addons:
  apt:
    sources:
      - ubuntu-toolchain-r-test
    packages:
      - gcc-4.8
      - g++-4.8
env:
  - CXX=g++-4.8
sudo: required
before_script: npm install
script:
  - npm run test
  - npm run lint
```
`travis lint`   checks that your travis file is OK

#### Enable travis for this repo
`travis enable`  
"detected repository is xxxx, is this correct yes|no
triggering sync"  

`travis login`  use github login  

`travis open`   like heroku open - if you're logged in to the browser you'll get to this repo

You can add status image to your README.md - will tell if you're passing tests on most recent push
click on "unknown" next to "build" and choose markdown 9:22
copy to your README.md

`git push`  pushing to git should activate a build on travis  
`travis open`  go watch the build  - click on branches to see the build in process
