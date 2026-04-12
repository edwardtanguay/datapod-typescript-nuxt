import * as fs from 'fs';
import * as path from 'path';

function findHighestNumberedFile(dir: string): string | null {
  const files = fs.readdirSync(dir).filter(file => file.startsWith('read-it-') && file.includes('-original-') && file.endsWith('.txt'));
  if (files.length === 0) return null;

  let maxNum = -1;
  let maxFile = '';

  for (const file of files) {
    const match = file.match(/read-it-(\d+)-/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxNum) {
        maxNum = num;
        maxFile = file;
      }
    }
  }

  return maxFile ? path.join(dir, maxFile) : null;
}

function splitIntoSentences(text: string): string[] {
  // Split on ., !, ? followed by space or end
  return text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
}

function groupIntoParagraphs(sentences: string[], groupSize: number): string[] {
  const paragraphs: string[] = [];
  for (let i = 0; i < sentences.length; i += groupSize) {
    const group = sentences.slice(i, i + groupSize);
    paragraphs.push(group.join(' ') + '\n\n');
  }
  return paragraphs;
}

function processFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const start = content.indexOf('[[');
  const end = content.lastIndexOf(']]');
  if (start === -1 || end === -1 || start >= end) {
    console.error('No valid [[ ]] brackets found in the file.');
    return;
  }

  const before = content.substring(0, start + 2);
  const after = content.substring(end);
  const textBetween = content.substring(start + 2, end);

  const sentences = splitIntoSentences(textBetween);
  const paragraphs = groupIntoParagraphs(sentences, 5);
  const newTextBetween = paragraphs.join('');

  const newContent = before + newTextBetween + after;
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`Processed file: ${filePath}`);
}

function main() {
  const dir = path.join(process.cwd(), '..', '..', 'data', 'audio-read-texts');
  const filePath = findHighestNumberedFile(dir);
  if (!filePath) {
    console.error('No matching file found.');
    return;
  }
  processFile(filePath);
}

main();
