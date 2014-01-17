You may pass an options object as a second parameter.

### custom delimiters
Type: `object`

Default: `{close: '---', open: '---'}`

Open and close delimiters can be a string or an array of strings. If an array of strings is passed for a delimiter then all patterns supplied will be used to check for YAML front matter.

Example:

```js
{
  close: ['---', '~~~'],
  open: ['...', '---']
}
```
Checks for this:

```yaml
---
title: Foo
---
```
this

```yaml
~~~
title: Foo
---
```
this

```yaml
---
title: Foo
...
```
and this

```yaml
~~~
title: Foo
...
```

_Passing multiple delimiters will likely provide unpredictable results, but the option is included for testing purposes._

### read
Type: `boolean`

Default: `true`

Specify whether or not to read a file from the file system. When set to `false` a raw string may be passed to the function. Example:

```js
yfm('---\nTitle: YFM\n---\nContent.', {read: false})
```