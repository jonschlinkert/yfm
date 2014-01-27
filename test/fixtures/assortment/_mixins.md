---
tooltip:
  content: 'This is a tooltip!!'
username: foo
---
## Custom mixins
{%= _.customMixin("Custom mixin") %}
{%= _.customProp() %}
{%= _.concat("jumbo", "shrimp") %}
{%= _.lowercase("UPPERCASE") %}

***

## Username
{%= username %}
{%= _.username() %}

***

## License
{%= license %}
{%= _.license() %}
{%= _.license("Licensed under the ") %}


***

## Copyright
{%= copyright %}
{%= _.copyright('2013') %}

***

## Homepage
1. {%= homepage ? (" | " + homepage) : "" %}
2. {%= homepage ? (" * " + homepage + "\n") : "" %}
3. {%= homepage ? (" * @docs " + homepage + "\n") : "" %}
4. {%= homepage %}
4. {%= _.homepage() %}

***

## pkg
{%= _.pkg('contributors') %}

***

## contributors
{%= _.contributors() %}

***

## Partials
{%= _.partial('tooltip', tooltip) %}
{%= _.partial('tooltip', blahblah) %}
{%= _.partial('quetz') %}
{%= _.partial('profound') %}
## /end partials

***

