#Requires -Version 5.1
<#
.SYNOPSIS
    Compile the LaTeX (.tex) resumes in this folder to PDF, the way Overleaf does.

.DESCRIPTION
    Auto-detects a LaTeX engine and builds every .tex file to a PDF.
    Engines are tried in this order (Unicode-native first, because the resume
    headers contain a bullet "â€¢" that plain pdflatex cannot typeset):

        tectonic  ->  latexmk (-xelatex)  ->  xelatex  ->  lualatex  ->  pdflatex

    Non-Unicode engines are used only as a last resort and a warning is printed.
    If no engine is found, install instructions are shown.

.PARAMETER Path
    Folder to scan for .tex files. Defaults to source/.

.PARAMETER OutDir
    Where the PDFs are written. Defaults to output/.

.PARAMETER Files
    Specific .tex files to build instead of every .tex in -Path.

.PARAMETER KeepAux
    Keep the .aux/.log/.out build artifacts (they are deleted by default on success).

.PARAMETER Open
    Open each built PDF in the default viewer when done.

.EXAMPLE
    ./build.ps1
    Build all resumes from source/ into output/.

.EXAMPLE
    ./build.ps1 -Files Jeevan_Fullstack_Engineer.tex -Open
    Build just the fullstack resume and open it.
#>
[CmdletBinding()]
param(
    [string]   $Path    = (Join-Path $PSScriptRoot 'source'),
    [string]   $OutDir  = (Join-Path $PSScriptRoot 'output'),
    [string[]] $Files,
    [switch]   $KeepAux,
    [switch]   $Open
)

$ErrorActionPreference = 'Stop'

# Engines in order of preference. Unicode-native ones first so the "â€¢" in the
# header typesets correctly (this matches Overleaf's XeLaTeX behaviour).
$engineTable = @(
    @{ Name = 'tectonic'; Unicode = $true  },
    @{ Name = 'xelatex';  Unicode = $true  },   # self-contained, Unicode-native
    @{ Name = 'lualatex'; Unicode = $true  },
    @{ Name = 'latexmk';  Unicode = $true  },   # driven with -xelatex; needs Perl
    @{ Name = 'pdflatex'; Unicode = $false }
)

function Resolve-Engine {
    foreach ($e in $engineTable) {
        $cmd = Get-Command $e.Name -ErrorAction SilentlyContinue
        if ($cmd) {
            return [pscustomobject]@{ Name = $e.Name; Path = $cmd.Source; Unicode = $e.Unicode }
        }
    }
    return $null
}

function Show-InstallHelp {
    Write-Host ""
    Write-Host "No LaTeX engine was found on your PATH." -ForegroundColor Yellow
    Write-Host "Install one, then re-run  ./build.ps1" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Option A - MiKTeX  (one winget command; gives xelatex/pdflatex)"
    Write-Host "      winget install --id MiKTeX.MiKTeX -e"
    Write-Host "      # first compile auto-downloads any missing packages, like Overleaf"
    Write-Host ""
    Write-Host "  Option B - Tectonic  (single self-contained binary, closest to Overleaf)"
    Write-Host "      download: https://github.com/tectonic-typesetting/tectonic/releases"
    Write-Host "      # (not on winget; unzip tectonic.exe somewhere on your PATH)"
    Write-Host ""
}

function Invoke-Build {
    param($Engine, [string]$TexFile, [string]$OutDir)

    switch ($Engine.Name) {
        'tectonic' {
            & $Engine.Path --outdir $OutDir --keep-logs $TexFile
            return ($LASTEXITCODE -eq 0)
        }
        'latexmk' {
            & $Engine.Path -xelatex -interaction=nonstopmode -halt-on-error "-outdir=$OutDir" $TexFile
            return ($LASTEXITCODE -eq 0)
        }
        default {
            # xelatex / lualatex / pdflatex: run twice so layout & refs settle.
            $ok = $true
            for ($i = 1; $i -le 2; $i++) {
                & $Engine.Path -interaction=nonstopmode -halt-on-error "-output-directory=$OutDir" $TexFile | Out-Null
                if ($LASTEXITCODE -ne 0) { $ok = $false }
            }
            return $ok
        }
    }
}

# --- main --------------------------------------------------------------------

$engine = Resolve-Engine
if (-not $engine) { Show-InstallHelp; exit 1 }

Write-Host "Engine: $($engine.Name)  ($($engine.Path))" -ForegroundColor Cyan
if (-not $engine.Unicode) {
    Write-Host "WARNING: $($engine.Name) is not Unicode-native; the 'â€¢' in the header may fail." -ForegroundColor Yellow
    Write-Host "         Install Tectonic or use XeLaTeX for an Overleaf-identical result." -ForegroundColor Yellow
}

if (-not (Test-Path $OutDir)) { New-Item -ItemType Directory -Path $OutDir -Force | Out-Null }

if ($Files) {
    $texFiles = $Files | ForEach-Object { Get-Item -LiteralPath (Join-Path $Path $_) -ErrorAction SilentlyContinue; if (-not $?) { Get-Item -LiteralPath $_ } }
} else {
    $texFiles = Get-ChildItem -LiteralPath $Path -Filter *.tex -File
}

if (-not $texFiles) { Write-Host "No .tex files found in $Path" -ForegroundColor Yellow; exit 1 }

$results = @()
foreach ($tex in $texFiles) {
    Write-Host ""
    Write-Host "Building $($tex.Name) ..." -ForegroundColor White
    $ok  = Invoke-Build -Engine $engine -TexFile $tex.FullName -OutDir $OutDir
    $pdf = Join-Path $OutDir ([IO.Path]::GetFileNameWithoutExtension($tex.Name) + '.pdf')
    $built = ($ok -and (Test-Path $pdf))
    $results += [pscustomobject]@{ File = $tex.Name; Success = $built; PDF = $pdf }

    if ($built) {
        Write-Host "  OK  -> $pdf" -ForegroundColor Green
        if ($Open) { Start-Process $pdf }
    } else {
        $log = Join-Path $OutDir ([IO.Path]::GetFileNameWithoutExtension($tex.Name) + '.log')
        Write-Host "  FAILED. See log: $log" -ForegroundColor Red
    }
}

$anyFail = @($results | Where-Object { -not $_.Success }).Count -gt 0

# Clean build artifacts on full success (keep logs if anything failed).
if (-not $KeepAux -and -not $anyFail) {
    $junk = '*.aux','*.log','*.out','*.fls','*.fdb_latexmk','*.synctex.gz','*.toc'
    Get-ChildItem -Path (Join-Path $OutDir '*') -Include $junk -File -ErrorAction SilentlyContinue |
        Remove-Item -Force -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
$results | Format-Table File, Success, PDF -AutoSize

if ($anyFail) { exit 1 } else { exit 0 }
