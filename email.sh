#!/bin/sh

git filter-branch --env-filter '

# 要修改的邮箱
OLD_EMAIL="xxx@old.com"

# 新的邮箱以及用户名
CORRECT_NAME="your-name"
CORRECT_EMAIL="xxx@old.com"

if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags

git filter-branch -f --index-filter 'git rm --cached --ignore-unmatch Rakefile' HEAD