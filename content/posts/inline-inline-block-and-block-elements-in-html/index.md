---
title: Understanding Inline, Inline-Block, and Block Elements in HTML
description: Unlock the secrets of inline, inline-block, and block elements in HTML
date: 2023-07-02
draft: false
slug: /pensieve/understanding-inline-inline-block-and-block-elements-in-html
tags:
  - HTML
  - Web Development
---

When working with HTML, it's crucial to understand the different display properties of elements. Inline, inline-block, and block elements dictate how elements are rendered and interact with other elements on a webpage. In this article, we'll explore these three types of elements and explain their usage in HTML.

In HTML, elements can have different display properties that affect their behavior and layout. Three commonly used display properties are inline, inline-block, and block.

The objective of this article is to clarify the distinctions between inline, inline-block, and block elements and guide beginners in choosing the appropriate display property for their HTML elements.

<details>
  <summary><b>Table of Contents</b></summary>

- [Inline Elements](#inline-elements)
- [Inline-Block Elements](#inline-block-elements)
- [Block Elements](#block-elements)
- [Conclusion](#conclusion)
- [Resources](#resources)
</details>

Before jump to the explanation, I want to let you know that I will use same style for all display property value (inline, inline-block and block) and you'll clearly observe their behavior.

## Inline Elements <a id='inline-elements'></a>

Inline elements are those that do not create line breaks and flow with the surrounding content. Here's an example:

```html
<p>
  The sun gently kissed the ocean's surface, casting a golden glow across the
  <span class="highlight">shimmering</span> waves. Seagulls soared gracefully overhead, their cries
  blending with the distant sound of <span class="highlight">crashing</span> waves. Beachgoers
  strolled along the sandy shore, enjoying the warmth of the sand beneath their feet. It was a
  perfect day for relaxation and coastal bliss.
</p>
```

```css
span.highlight {
  display: inline;
  width: 100px;
  height: 160px;
  padding: 18px;
}
```

In this code snippet, the `<span>` element with the class "highlight" is set to display as inline. The inline display property allows the span to flow with the surrounding text without creating line breaks. It is often used to highlight specific words or phrases within a paragraph. The span has a width and height defined, but these properties do not affect its layout due to the inline display.

> Use inline elements for small pieces of text or elements that need to flow within a line of text.

There are tons of default inline elements in HTML. Here is the list:

```html
<a>         <abbr>      <acronym>   <b>         <bdo>       <big>
<br>        <button>    <cite>      <code>      <dfn>       <em>
<i>         <img>       <input>     <kbd>       <label>     <map>
<object>    <output>    <q>         <samp>      <script>    <select>
<small>     <span>      <strong>    <sub>       <sup>       <textarea>
<time>      <tt>        <var>
```

## Inline-Block Elements <a id='inline-block-elements'></a>

Inline-block elements possess characteristics of both inline and block elements. They flow with surrounding content but can have width, height, and vertical alignment properties. Consider the following example:

```html
<p>
  The sun gently kissed the ocean's surface, casting a golden glow across the
  <span class="highlight">shimmering</span> waves. Seagulls soared gracefully overhead, their cries
  blending with the distant sound of <span class="highlight">crashing</span> waves. Beachgoers
  strolled along the sandy shore, enjoying the warmth of the sand beneath their feet. It was a
  perfect day for relaxation and coastal bliss.
</p>
```

```css
span.highlight {
  display: inline-block;
  width: 100px;
  height: 160px;
  padding: 18px;
}
```

In this code snippet, the `<span>` element with the class "highlight" is set to display as inline-block. The inline-block display property combines the characteristics of inline and block elements. It allows the span to flow with the surrounding content while still respecting the specified width, height, and padding properties. The inline-block span will be displayed as a rectangular block within the paragraph.

> Utilize inline-block elements for elements that require a specific width, height, or vertical alignment while still flowing with surrounding content.

There is no inline-block elements in HTML. The inline-block display property can be applied to any element to make it behave as an inline-block element.

## Block Elements <a id='block-elements'></a>

Block elements are those that create line breaks and occupy the full width of their parent container. Here's an example:

```html
<p>
  The sun gently kissed the ocean's surface, casting a golden glow across the
  <span class="highlight">shimmering</span> waves. Seagulls soared gracefully overhead, their cries
  blending with the distant sound of <span class="highlight">crashing</span> waves. Beachgoers
  strolled along the sandy shore, enjoying the warmth of the sand beneath their feet. It was a
  perfect day for relaxation and coastal bliss.
</p>
```

```css
span.highlight {
  display: block;
  width: 100px;
  height: 160px;
  padding: 18px;
}
```

In this code snippet, the `<span>` element with the class "highlight" is set to display as block. The block display property makes the span behave as a block-level element, creating a line break before and after it. The span occupies the full width available within its parent container and expands vertically to accommodate its content. The block span will appear as a distinct block within the paragraph.

> Employ block elements for larger sections of content or elements that need to create line breaks and occupy the full width of the parent container.

> Block elements should not be nested directly within inline elements. It can lead to incorrect rendering and invalid HTML structure.

There are some default block-level elements in HTML. Here are some examples:

```html
<address>     <article>     <aside>       <blockquote>  <canvas>
<dd>          <div>         <dl>          <dt>          <fieldset>
<figcaption>  <figure>      <footer>      <form>        <h1>-<h6>
<header>      <hr>          <li>          <main>        <nav>
<noscript>    <ol>          <p>           <pre>         <section>
<table>       <tfoot>       <ul>          <video>
```

## Conclusion <a id='conclusion'></a>

Understanding the differences between inline, inline-block, and block elements is essential for proper layout and structure in HTML. By using the appropriate display property, you can control the behavior and appearance of elements on your web page.

## Resources <a id='resources'></a>

- <https://www.digitalocean.com/community/tutorials/css-display-inline-vs-inline-block>
- <https://www.w3schools.com/css/css_inline-block.asp>
- [HTML and CSS: Design and Build Websites by Jon Duckett](https://a.co/d/fHZH58q)
