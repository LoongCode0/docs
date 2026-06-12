@echo off
setlocal
cd /d "%~dp0.."
echo [1/3] Building site...
call pnpm docs:build
if errorlevel 1 (
  echo Build failed, aborting.
  exit /b 1
)
echo [2/3] Committing build output...
git add docs
git diff --cached --quiet && echo Nothing to deploy. && exit /b 0
git commit -m "docs: 更新站点构建产物"
echo [3/3] Pushing to main...
git push origin main
if errorlevel 1 (
  echo Push failed. Local commit was made but NOT pushed. Run "git push origin main" manually.
  exit /b 1
)
echo Deploy complete.
endlocal
