# home-two

===

This is **home-one**, but made with a server, and it's intent is to use efficiency as much as possible here.

In this file I will explain how to operate this monstrosity of a server, and what everything does here.

---

## Front-end

This is what the client sees, and probably the ony part you care about.

### The public folder

The `/public/` folder is where files that are _static_(meaning they are never changed), go and can be accessed publicly by the `html` files(hence the name `public`).
Ex. A link to something like

```html
<script src="/main.js"></script>
```

will automatically access `/public/main.js`, meaning it's turned into something like

```html
<script src="/public/main.js"></script>
```

### Default Layout

You can add the exact same `html` to every file just by including

```twig
{% extends "default.html" %}
```

to the top of the `html` file to extends the html file.
since this extends `layout.html`, `/views/layout.html` is what will be your default html file to extend to(the things you don't want to repeat).
Be sure to go there and change whatever you need.

### Twig and Swig

You might have noticed that this isn't normal `html`.

```twig
{% extends "default.html" %}
```

If you really want to learn how it works you can go online to the Twig Documentation for client side. Not unless you want to do server side, check the Swig Documentation or look in for the `back-end` below.

### Keep in Mind

Files in root(`/`) cannot be access by the html.
Ex. `/lib/` or `/views/` cannot be directly referenced by the html.

---

## Back-end

This is the what generates the client in real-time. The more complicated part of websites(Any probably the part you don't really care about).

The server file can be found in `/server.js`(obviously). This server runs using _Koa_ and _Swig_.

### Documentation for dependencies used

- Koa <https://devdocs.io/koa/>
- Swig <https://node-swig.github.io/swig-templates/docs/>

---

**_THIS FILE WILL SELF DESTRUCT IN..._**
_Whenever you feel like you understand how it works, and how to operate it on your own...
When you do replace this `README.md` with the one in **home-one**.
**Good Luck~**_
