### Extract front matter

Let's say our page, `foo.html` contains

```html
---
title: YAML Front matter
---
<h1>{{title}}</h1>
```

then running the following in the command line:

```js
console.log(yfm('foo.html'));
```
returns

```json
{
  "context": {
    "title": "YAML Front matter"
  },
  "content": "<h1>{{title}}</h1>",
  "original": "---\ntitle: YAML Front matter\n---\n<h1>{{title}}</h1>"
}
```
and

```js
console.log(yfm('foo.html').context);
```
returns


```json
{"title": "YAML Front matter"}
```

### Check for YAML front matter

```js
var hasYFM = function (src, options) {
  var obj = yfm(src, options).context;
  return _.keys(obj).length > 0;
};
```