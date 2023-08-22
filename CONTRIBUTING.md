# Contributing to Contoso Real Estate

This project welcomes contributions and suggestions. Most contributions require you to agree to a Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us the rights to use your contribution. For details, visit our [CLA](#signing-the-cla).

As a contributor, here are the guidelines we would like you to follow:

- [Signing the CLA](#signing-the-cla)
- [Code of Conduct](#code-of-conduct)
- [Found a Bug?](#found-a-bug)
- [Missing a Feature?](#missing-a-feature)
- [Submission Guidelines](#submission-guidelines)
  - [Submitting an Issue](#submitting-an-issue)
  - [Build the project from source](#build-the-project-from-source)
  - [Submitting a Pull Request (PR)](#submitting-a-pull-request-pr)
  - [Reviewing a Pull Request](#reviewing-a-pull-request)
    - [Addressing review feedback](#addressing-review-feedback)
      - [Updating the commit message](#updating-the-commit-message)
    - [After your pull request is merged](#after-your-pull-request-is-merged)
- [Coding Rules](#coding-rules)
- [Commit Message Guidelines](#commit-message-guidelines)
  - [Commit Message Format](#commit-message-format)
    - [Commit Message Header](#commit-message-header)
      - [Type](#type)
      - [Scope](#scope)
      - [Summary](#summary)
    - [Commit Message Body](#commit-message-body)
    - [Commit Message Footer](#commit-message-footer)
  - [Revert commits](#revert-commits)

## Signing the CLA

When you submit a pull request, a CLA bot will automatically determine whether you need to provide a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions provided by the bot. You will only need to do this once across all repos using our CLA.

Please sign our Contributor License Agreement (CLA) before sending pull requests. For any code changes to be accepted, the CLA must be signed. It's a quick process!

If you have more than one GitHub accounts, or multiple email addresses associated with a single GitHub account, you must sign the CLA using the primary email address of the GitHub account used to author Git commits and send pull requests.

The following documents can help you sort out issues with GitHub accounts and multiple email addresses:

- https://help.github.com/articles/setting-your-commit-email-address-in-git/
- https://stackoverflow.com/questions/37245303/what-does-usera-committed-with-userb-13-days-ago-on-github-mean
- https://help.github.com/articles/about-commit-email-addresses/
- https://help.github.com/articles/blocking-command-line-pushes-that-expose-your-personal-email-address/

## Code of Conduct

You can read about the Contoso Real Estate project code of conduct [here][coc-contoso-real-estate].

This project is also governed by the [Microsoft Open Source Code of Conduct](#signing-the-cla). For more information see the [Code of Conduct FAQ][coc-faq] or contact [opencode@microsoft.com][coc-email] with any additional questions or comments.

## Found a Bug?

If you find a bug in the source code or a mistake or a typo in the documentation, you can help us by [submitting an issue][github-issues] to our [GitHub Repository][github]. Even better, you can [submit a Pull Request][github-pull-request] with a fix.

## Missing a Feature?

You can _request_ a new feature by [submitting an issue][github-issues] to our GitHub Repository.
If you would like to _implement_ a new feature, please consider the size of the change in order to determine the right steps to proceed:

- For a **Major Feature**, first open an issue and outline your proposal so that it can be discussed.
  This process allows us to better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.

  **Note**: Adding a new topic to the documentation, or significantly re-writing a topic, counts as a major feature.

- **Small Features** can be crafted and directly [submitted as a Pull Request][github-pull-request].

## Submission Guidelines

### Submitting an Issue

Before you submit an issue, please search the issue tracker. An issue for your problem might already exist and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug, we need to reproduce and confirm it.
In order to reproduce bugs, we require that you provide a minimal reproduction.
Having a minimal reproducible scenario gives us a wealth of important information without going back and forth to you with additional questions.

A minimal reproduction allows us to quickly confirm a bug (or point out a coding problem) as well as confirm that we are fixing the right problem.

We require a minimal reproduction to save maintainers' time and ultimately be able to fix more bugs.
Often, developers find coding problems themselves while preparing a minimal reproduction.
We understand that sometimes it might be hard to extract essential bits of code from a larger codebase but we really need to isolate the problem before we can fix it.

Unfortunately, we are not able to investigate / fix bugs without a minimal reproduction, so if we don't hear back from you, we are going to close an issue that doesn't have enough info to be reproduced.

You can file new issues by selecting from our [new issue templates][github-issues] and filling out the issue template.

### Build the project from source

If you are contributing bug fixes or new features to this project, you will need to clone the repository in your local machine and build the project from source, then run both unit tests and e2e tests before submitting your PR.

Follow our instructions [here][dev-doc] to build the project from source.

### Submitting a Pull Request (PR)

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub][github-pull-request] for an open or closed PR that relates to your submission.
   You don't want to duplicate existing efforts.

2. Be sure that an issue describes the problem you're fixing, or documents the design for the feature you'd like to add.
   Discussing the design upfront helps to ensure that we're ready to accept your work.

3. Please sign our [Contributor License Agreement (CLA)][cla] before sending PRs.
   We cannot accept code without a signed CLA.
   Make sure you author all contributed Git commits with email address associated with your CLA signature.

4. [Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) repo.

5. In your forked repository, make your changes in a new git branch:

```shell
git checkout -b my-fix-branch main
```

6. Create your patch, **including appropriate test cases**.

7. Follow our [Coding Rules](#coding-rules).
8. If your changes require rebuilding the project, follow our [Build Instructions](#build-the-project-from-source).

9. Run the full test suite, as described in the [developer documentation][dev-doc], and ensure that all tests pass.

10. Commit your changes using a descriptive commit message that follows our [commit message conventions](#commit-message-guidelines). Adherence to these conventions is necessary because release notes are automatically generated from these messages.

```shell
git commit --all
```

Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

1. Push your branch to GitHub:

```shell
git push origin my-fix-branch
```

12. In GitHub, send a pull request to `contoso-real-estate:main`.

### Reviewing a Pull Request

The development team reserves the right not to accept pull requests from community members who haven't been good citizens of the community. Such behavior includes not following the [our code of conduct](#code-of-conduct).

#### Addressing review feedback

If we ask for changes via code reviews then:

1. Make the required updates to the code.

2. Re-run the test suites to ensure tests are still passing.

3. Create a fixup commit and push to your GitHub repository (this will update your Pull Request):

```shell
git commit --all --fixup HEAD
git push
```

That's it! Thank you for your contribution!

##### Updating the commit message

A reviewer might often suggest changes to a commit message (for example, to add more context for a change or adhere to our [commit message guidelines](#commit-message-guidelines)). In order to update the commit message of the last commit on your branch:

1. Check out your branch:

```shell
git checkout my-fix-branch
```

2. Amend the last commit and modify the commit message:

```shell
git commit --amend
```

3. Push to your GitHub repository:

```shell
git push --force-with-lease
```

> NOTE:<br />
> If you need to update the commit message of an earlier commit, you can use `git rebase` in interactive mode.
> See the [git docs](https://git-scm.com/docs/git-rebase#_interactive_mode) for more details.

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes from the main (upstream) repository:

- Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

```shell
git push origin --delete my-fix-branch
```

- Check out the main branch:

```shell
git checkout main -f
```

- Delete the local branch:

```shell
git branch -D my-fix-branch
```

- Update your main with the latest upstream version:

```shell
git pull --ff upstream main
```

## Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes **must be tested** by one or more specs (unit-tests).
- All public API methods **must be documented**.

## Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to **more
readable messages** that are easy to follow when looking through the **project history**. But also,
we use the git commit messages to **generate the Contoso Real Estate project change log**.

### Commit Message Format

We have very precise rules over how our Git commit messages must be formatted.
This format leads to **easier to read commit history**.

Each commit message consists of a **header**, a **body**, and a **footer**.

```
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The `header` is mandatory and must conform to the [Commit Message Header](#commit-message-header)

The `body` is mandatory for all commits except for those of type "docs".
When the body is present it must be at least 20 characters long and must conform to the [Commit Message Body](#commit-message-body) format.

The `footer` is optional. The [Commit Message Footer](#commit-message-footer) format describes what the footer is used for and the structure it must have.

#### Commit Message Header

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │
  │       └─⫸ Commit Scope: |portal|blog|api|testing|docs
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

The `<type>` and `<summary>` fields are mandatory, the `(<scope>)` field is optional.

##### Type

Must be one of the following:

- `build`
- `ci`
- `docs`
- `feat`
- `fix`
- `perf`
- `refactor`
- `test`

##### Scope

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages).

The following is the list of supported scopes:

- **portal**: the Portal application written in Angular
- **api**: the serverless API written in Node.js
- **blog**: the Blob application written in Next.js
- **cms**: the CMS application using Strapi
- **stripe**: the Stripe API using Node.js and Fastly
- **testing**: the Playwright e2e testing

##### Summary

Use the summary field to provide a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

#### Commit Message Body

Just as in the summary, use the imperative, present tense: "fix" **not "fixed" nor "fixes".**

Explain the motivation for the change in the commit message body. This commit message should explain _why_ you are making the change.
You can include a comparison of the previous behavior with the new behavior in order to illustrate the impact of the change.

#### Commit Message Footer

The footer can contain information about breaking changes and deprecations and is also the place to reference GitHub issues, ADO tickets, and other PRs that this commit closes or is related to.

For example:

```
BREAKING CHANGE: <breaking change summary>
<BLANK LINE>
<breaking change description + migration instructions>
<BLANK LINE>
<BLANK LINE>
Fixes #<issue number>
```

or

```
DEPRECATED: <what is deprecated>
<BLANK LINE>
<deprecation description + recommended update path>
<BLANK LINE>
<BLANK LINE>
Closes #<pr number>
```

Breaking Change section should start with the phrase "BREAKING CHANGE: " followed by a summary of the breaking change, a blank line, and a detailed description of the breaking change that also includes migration instructions.

Similarly, a Deprecation section should start with "DEPRECATED: " followed by a short description of what is deprecated, a blank line, and a detailed description of the deprecation that also mentions the recommended update path.

### Revert commits

If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit.

The content of the commit message body should contain:

- information about the SHA of the commit being reverted in the following format: `This reverts commit <SHA>`,
- a clear description of the reason for reverting the commit message.

[cla]: https://cla.opensource.microsoft.com
[coc]: https://opensource.microsoft.com/codeofconduct/
[coc-faq]: https://opensource.microsoft.com/codeofconduct/faq/
[coc-email]: mailto:opencode@microsoft.com
[coc-swa-cli]: https://github.com/Azure-Samples/contoso-real-estate/blob/main/CODE_OF_CONDUCT.md
[github]: https://github.com/Azure-Samples/contoso-real-estate
[github-issues]: https://github.com/Azure-Samples/contoso-real-estate/issues/new/choose
[github-pull-request]: https://github.com/Azure-Samples/contoso-real-estate/pulls
[dev-doc]: https://github.com/Azure-Samples/contoso-real-estate/blob/main/docs/DEVELOPER.md
