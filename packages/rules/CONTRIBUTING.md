# Contributing

Contribution guidelines and structure definition.

## Writing an article

### Keep the content unique

Make sure the topic is not covered by another article.

Try not to define the generic best practice as a Recommendation Item. This would
simply duplicate the external resource with theoretical info. Instead, ask
yourself if it's not an Impact actually. If so, add it and create a
Recommendation Item with the reference and the example. The Recommendation Item
can also reference the external practical examples.

### Follow the template

Use [article template](templates/article.md) - copy the file and fill in the blocks.

- File must be named after the article title (lowercased, hyphenated)
- Change only the blocks enclosed in `{{ }}`
- Keep the titles, structure and order static (except for the main title of course, which is a template variable).
- Treat the `...` as a placeholder for repeated content (lists).

#### 1. Fill "Title"

Format:

- Use imperative form
- One sentence without any punctuation at the end
- Prefer positive wording where possible ("do" over "don't")

Some possible presets:

- "Do/don't X"
- "Prefer X over Y"
- "Use X"
- "Reduce X"
- "Avoid X"
- "Keep X"

#### 2. Fill the "TLDR"

Format:

- Use imperative form
- One paragraph
- Usually a 1 or 2 sentences long

Content:

- Defines the rule, mostly "what" to do
- Less mention "why" aspect, it's covered by the "Problem" and "Impact" sections
- If necessary, very shortly mention "how" or "when"

#### 3. Fill "Problem"

Explain the problem this rule addresses.

Format:

- Usually a few sentences long

Content:

- Some context if needed
- Why it's an issue
- Why it's important

#### 4. Fill "Good solution"

Format:

- Usually a few sentences long
- Usually has a code example

#### 5. Fill "Bad solution"

Format:

- Same as "Good solution".

Content:

- The example should outline reaching the same goal (having the same result, solving the same problem) as the good solution, but in a bad way

#### 6. Fill "Impact"

Format:

- Only list items
- Usually a few
- Use only [Impact](./src/home/impact/README.md) items with the internal links

Content:

- If the reason is not covered by any Impact, but it is generic, add it as a new Impact item
- Where needed, add a context unique for this impact application (usually a sentence)

#### 7. Exceptions

Format:

- Only list items
- Usually 1 or 2

Content:

- When the rule should or can be broken

#### 8. References

Format:

- Only list items
- Usually a few
- Only links

Content:

- Extenal resources, articles, etc.
- Do not reference other internal articles
- Title links as `Source: Title`, for example `Wikipedia: Cohesion`

## Adding an Impact item

### Follow the template

Use [impact template](templates/impact.md).

Put it under one of the categories under the [impact](./src/home/impact/) folder.

The same templating rules as for articles apply.

## Publishing the changes

Just change any files you need, commit and push the changes.

You can use web IDE or compile and serve docs locally as described below.

Any change to the source will trigger
the [GitHub Workflow](.github/workflows/pages.yml)
to deploy to [GitHub Pages](https://pages.github.com).
