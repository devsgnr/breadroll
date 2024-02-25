---
title: v0.1.3
description: Changelog, v0.1.3
---

<small>Aug 27th, 2023</small>

---

`Dataframe.use(callback: (dataframe: Array<Record<string, unknown>>) => Dataframe): Dataframe` it provides access to the object ie. it kinda ejects from the base class allowing user to perform their own custom operation on a the current dataframe version, eg. after running `Dataframe.filter`

Added more filters, `greater than or equal to`, `less than or equal to`, `is between`

Tweaked `Dataframe.filter` to take a fourth and optional argument `limit` for range filters like `is between`