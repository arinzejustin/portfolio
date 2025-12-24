// TypeScript Script - HTML to PDF Converter
// IMPORTANT: Install full puppeteer, NOT puppeteer-core
// Install: npm install puppeteer

import puppeteer from 'puppeteer-core';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Convert HTML file to PDF using Puppeteer
 * SOLUTION 1: Load HTML as file:// URL (Best for local fonts)
 */
async function htmlToPdfPuppeteer(
  htmlFilePath: string,
  pdfOutputPath: string
): Promise<void> {
  try {
    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files']
    });

    const page = await browser.newPage();

    // METHOD 1: Load HTML file directly (fonts work with relative paths)
    const absolutePath = path.resolve(htmlFilePath);
    await page.goto(`file://${absolutePath}`, {
      waitUntil: 'networkidle0'
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    // Generate PDF
    await page.pdf({
      path: pdfOutputPath,
      format: 'A4',
      margin: {
        top: '0.2in',
        right: '0.2in',
        bottom: '0.2in',
        left: '0.2in'
      },
      printBackground: true,
      preferCSSPageSize: false
    });

    await browser.close();
    console.log(`✅ PDF created successfully: ${pdfOutputPath}`);
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    throw error;
  }
}

/**
 * SOLUTION 2: Convert fonts to base64 and embed in HTML
 */
async function htmlToPdfWithEmbeddedFonts(
  htmlFilePath: string,
  pdfOutputPath: string,
  fontPaths: { regular: string; bold: string }
): Promise<void> {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Read HTML and fonts
    let htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
    const regularFontBase64 = fs.readFileSync(fontPaths.regular).toString('base64');
    const boldFontBase64 = fs.readFileSync(fontPaths.bold).toString('base64');

    // Replace font URLs with base64
    const fontCss = `
      @font-face {
        font-family: "highlight-font";
        src: url(data:font/opentype;charset=utf-8;base64,${regularFontBase64}) format("opentype");
        font-style: normal;
        font-weight: 300 800;
      }
      @font-face {
        font-family: "highlight-font";
        src: url(data:font/opentype;charset=utf-8;base64,${boldFontBase64}) format("opentype");
        font-style: normal;
        font-weight: 600 900;
      }
    `;

    // Inject base64 fonts into HTML
    htmlContent = htmlContent.replace(
      /<style>/,
      `<style>${fontCss}`
    );

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.evaluateHandle('document.fonts.ready');

    await page.pdf({
      path: pdfOutputPath,
      format: 'A4',
      margin: { top: '0.1in', right: '0.1in', bottom: '0.1in', left: '0.1in' },
      printBackground: true
    });

    await browser.close();
    console.log(`✅ PDF created successfully: ${pdfOutputPath}`);
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    throw error;
  }
}

// Usage - SOLUTION 1: Direct file loading (RECOMMENDED)
(async () => {
  const htmlFile = 'shorten-resume.html';  // Your HTML file with fonts in ./fonts/
  const pdfFile = 'shorten-resume.pdf';

  await htmlToPdfPuppeteer(htmlFile, pdfFile);
})();

// Usage - SOLUTION 2: Embedded fonts
/*
(async () => {
  await htmlToPdfWithEmbeddedFonts(
    'resume.html',
    'resume.pdf',
    {
      regular: './fonts/Hartwell-Regular.otf',
      bold: './fonts/Hartwell-Bold.otf'
    }
  );
})();
*/


// ============================================
// Alternative: Using Playwright (TypeScript)
// ============================================
// Install: npm install @playwright/test

/*
import { chromium } from 'playwright';
import * as fs from 'fs';

async function htmlToPdfPlaywright(
  htmlFilePath: string,
  pdfOutputPath: string
): Promise<void> {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Load HTML file
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
    await page.setContent(htmlContent, { waitUntil: 'networkidle' });

    // Generate PDF
    await page.pdf({
      path: pdfOutputPath,
      format: 'A4',
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      printBackground: true
    });

    await browser.close();
    console.log(`✅ PDF created successfully: ${pdfOutputPath}`);
  } catch (error) {
    console.error(`❌ Error: ${error}`);
    throw error;
  }
}

// Usage
(async () => {
  await htmlToPdfPlaywright('resume.html', 'resume.pdf');
})();
*/


// ============================================
// Node.js version (JavaScript - no TypeScript)
// ============================================
// Save as: convert.js
// Run: node convert.js

/*
const puppeteer = require('puppeteer');
const fs = require('fs');

async function htmlToPdf(htmlFilePath, pdfOutputPath) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    await page.pdf({
      path: pdfOutputPath,
      format: 'A4',
      margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' },
      printBackground: true
    });

    await browser.close();
    console.log(`✅ PDF created: ${pdfOutputPath}`);
  } catch (error) {
    console.error(`❌ Error: ${error}`);
  }
}

htmlToPdf('resume.html', 'resume.pdf');
*/


// ============================================
// CLI Tool Version
// ============================================
// Save as: convert-cli.ts
// Usage: ts-node convert-cli.ts input.html output.pdf

/*
import puppeteer from 'puppeteer';
import * as fs from 'fs';

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: ts-node convert-cli.ts <input.html> <output.pdf>');
    process.exit(1);
  }

  const [htmlFile, pdfFile] = args;

  if (!fs.existsSync(htmlFile)) {
    console.error(`❌ File not found: ${htmlFile}`);
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const htmlContent = fs.readFileSync(htmlFile, 'utf-8');
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  await page.pdf({
    path: pdfFile,
    format: 'A4',
    margin: { top: '0.5in', right: '0.5in', bottom: '0.5in', left: '0.5in' },
    printBackground: true
  });

  await browser.close();
  console.log(`✅ Successfully converted ${htmlFile} to ${pdfFile}`);
}

main().catch(console.error);
*/