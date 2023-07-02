---
title: Difference between Function and Method in JavaScript
description: Discover the key differences between functions and methods in JavaScript
date: 2023-07-01
draft: false
slug: /pensieve/difference-between-function-and-method-in-javascript
tags:
  - JavaScript
  - Programming
---

When working with JavaScript, it's crucial to grasp the distinction between functions and methods. While they might seem similar at first, they serve different purposes and have specific use cases. In this article, we'll explore the key differences between functions and methods in JavaScript, accompanied by beginner-friendly examples.

The objective of this article is to provide a clear understanding of how functions and methods differ and when to use each.

<details>
  <summary><b>Table of Contents</b></summary>

- [Functions](#functions)
- [Methods](#methods)
- [Conclusion](#conclusion)
- [Resources](#resources)
</details>

## Functions <a id='functions'></a>

In JavaScript, functions are reusable blocks of code designed to perform a specific task. They are independent entities and can be invoked from various parts of your code. Here's an example:

```javascript
function calculateArea(length, width) {
  return length * width;
}

const rectangleArea = calculateArea(5, 3);
console.log(rectangleArea); // Output: 15
```

In the above code, `calculateArea` function takes `length` and `width` as parameters and returns the calculated area. The function is invoked outside of any specific object, making it a standalone function.

## Methods <a id='methods'></a>

Methods, on the other hand, are functions that are associated with objects. They are defined within the object's scope and can access the object's properties. Let's consider the following example:

```javascript
const rectangle = {
  length: 5,
  width: 3,
  calculateArea: function () {
    return this.length * this.width;
  },
};

const rectangleArea = rectangle.calculateArea();
console.log(rectangleArea); // Output: 15
```

In this code snippet, `calculateArea` is a method defined within the `rectangle` object. It utilizes the `length` and `width` properties of the object using the `this` keyword.

> Use functions when you want to create reusable blocks of code that can be invoked from anywhere.
> Utilize methods when you want to define behavior specific to an object, accessing its properties and other methods.

## Conclusion <a id='conclusion'></a>

In conclusion, understanding the difference between functions and methods is essential in JavaScript. Functions are standalone blocks of code, while methods are functions associated with objects. By knowing when to use each, you can write more efficient and organized code.

## Resources <a id='resources'></a>

- <https://developer.mozilla.org/en-US/docs/Web/JavaScript>
- <https://eloquentjavascript.net/>

If you found this article helpful, feel free to share it with fellow developers and subscribe to our blog for more informative content.
