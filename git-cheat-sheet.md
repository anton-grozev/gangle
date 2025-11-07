# Git Cheat Sheet (кратко)

Този файл съдържа най-често използваните Git команди с кратко описание и пример.

| Команда                         | Описание (бързо)                                                      | Пример                                      |
|---------------------------------|------------------------------------------------------------------------|---------------------------------------------|
| `git init`                      | Създава ново локално репо.                                             | `git init`                                  |
| `git clone <url>`               | Клонира отдалечено репо локално.                                       | `git clone https://github.com/user/repo.git`|
| `git status`                    | Показва промените в работната директория.                              | `git status`                                |
| `git add <file>` / `git add .`  | Добавя файлове в staging (подготовка за commit).                       | `git add index.html` / `git add .`          |
| `git commit -m "msg"`           | Създава commit със съобщение.                                          | `git commit -m "Поправи бутон за логин"`    |
| `git commit --amend`            | Променя последния commit (съобщение/съдържание).                       | `git commit --amend --no-edit`              |
| `git push`                      | Качва локални commit-и към remote (използва upstream).                 | `git push` / `git push origin dev`          |
| `git pull`                      | Изтегля и слива промени от remote (fetch + merge).                     | `git pull` / `git pull origin main`         |
| `git fetch`                     | Само изтегля промени от remote, не слива автоматично.                  | `git fetch origin`                          |
| `git branch`                    | Показва/създава branch-ове.                                            | `git branch` / `git branch feature-x`       |
| `git switch <branch>`           | Смяна на branch (модерна алтернатива на checkout).                    | `git switch dev` / `git switch -c feat`     |
| `git merge <branch>`            | Слива посочения branch в текущия.                                      | `git merge feature-x`                       |
| `git rebase <branch>`           | Пренаписва базата на текущия branch върху друг (използвай внимателно). | `git rebase main`                           |
| `git log`                       | Показва историята на commit-ите.                                       | `git log --oneline --graph --decorate`      |
| `git diff`                      | Показва разликите (unstaged/staged/commits).                           | `git diff` / `git diff HEAD~1..HEAD`        |
| `git rm <file>`                 | Изтрива файл и го добавя като deletion в staging.                      | `git rm src/old.js`                         |
| `git add -u` / `git add -A`     | Засажда модификации и изтривания (`-u`) или всичко (`-A`).             | `git add -u`                                |
| `git restore <file>`            | Възстановява файл от HEAD (ако е изтрит/променен).                     | `git restore README.md`                     |
| `git stash` / `git stash pop`   | Временни промени (stash) за превключване на branch.                    | `git stash` → `git stash pop`               |
| `git reset --hard <commit>`     | Принудително връща state до commit (губи незапазени промени).          | `git reset --hard HEAD~1`                   |
| `git revert <commit>`           | Създава нов commit, който отменя посочения (без да пренаписва история).| `git revert abc1234`                        |
| `git remote -v`                 | Показва remote-ите и техните URL-адреси.                                | `git remote -v`                             |
| `git push --set-upstream origin <branch>` | Настройва upstream (по подразбиране push/pull) за локален branch. | `git push --set-upstream origin dev`        |
| `git branch -d <branch>` / `-D` | Изтрива локален branch (безопасно / принудително).                     | `git branch -d feature-x`                   |

Бързи съвети:
- Ако работиш офлайн: правиш `git add` + `git commit`, после при връзка `git push`.
- Ако си изтрил файл ръчно: използвай `git add -u` или `git rm` и после `git commit`.
- За vizual UI в VS Code инсталирай GitLens и/или Git Graph — спестяват много писане на команди.
- Винаги проверявай `git status` преди основни операции.
