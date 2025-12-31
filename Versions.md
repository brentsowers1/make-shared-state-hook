## 1.3.0 (2025-12-31)
* Updated React peer dependency to allow React 18 and 19
* Removed all usage of CommonJS require - now using ES import and export. This was in the index.js file.
* Added eslint
* Refactored the example appliction:
    * Upgrades React from 17 to the latest (19.2)
    * Uses vite for building, testing, and running a local server instead of react-scripts which has been deprecated
    * Renamed component files from js to jsx

## 1.2.1 (2021-03-06)
* A few documentation updates, and added a full react application example in example_application (not included in the package, only on the github repo)

## 1.2.0 (2021-02-15)
* Updated library to be ES5 compatible, so you can now import it in to projects using Jest and not need to transpile the library

## 1.1.0 (2021-01-28)
* Fixed the setter function to not fire updates if the value being set didn't change
* Documentation update - added some best practices and when not to use this library

## 1.0.1 (2021-01-26)
* Documentation update

## 1.0.0 (2021-01-26)
* Initial release!
