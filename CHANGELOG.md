# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0]

### Added

- onBlurCurrency now accepts decimal places, if you pass 1,1234, it will emit a object with 
`{ value: '1,1234', float: 1.12, formatted: '1,12', cents: 112 }`

## [1.0.1]

### Added

- onBlurCurrency that emit the same prop of onChangeCurrency

## [1.0.0]

- Only released

## [0.2.4] - 2022-07-19

- Fixed input controller

## [0.2.3] - 2022-07-18

- Added integration tests
- Added Max and Min Value

## [0.2.2] - 2022-07-18

- Added css files
- update readme.md

## [0.2.1] - 2022-07-18

- Export component types

## [0.2.0] - 2022-07-16

- Release version
