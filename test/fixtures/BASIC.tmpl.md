---
name: AAAAAAAAAAAA
---
# {%= name %} {%= _.badge('fury') %} {%= _.badge('travis') %}

> {%= description %}

## Quickstart
{%= _.doc("docs-quickstart.md") %}

## Example "README" template
{%= _.doc("docs-example.md") %}

## Related Projects
{%= _.include("related-repos-list.md") %}

## Contributing
{%= _.contrib("contributing.md") %}

## Authors
{%= _.contrib("authors.md") %}

## Contributors
{%= _.contributors() %}

## Release History
{%= _.include("release-history.md") %}

## License
{%= copyright %}
{%= license %}

***

{%= _.include("footer.md") %}