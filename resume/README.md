# Resume files

These are development resources kept in the portfolio repository. They sit outside `src/` and `public/` and are not included in the Astro website build.

- `source/`: editable LaTeX resumes.
- `output/`: generated PDFs.
- `build.ps1`: Windows build script.
- `build.sh`: Bash build script.

Build from this folder with `./build.ps1` or `./build.sh`. A LaTeX engine is required.

The website serves only `../public/resume.pdf`. After updating the general resume, copy `output/Jeevan_Fullstack_Engineer.pdf` to that path to refresh the website download.