#!/usr/bin/env python3

import os
import re
import sys
import requests
from transliterate import translit

from bs4 import BeautifulSoup


def get_output_name(in_name):
    out_fn = translit(in_name, 'ru', reversed=True)
    out_fn = str(out_fn.lower())
    out_fn = re.sub(r'\W', "-", out_fn)
    out_fn = re.sub(r'\-+', "-", out_fn)
    return re.sub(r'-pdf$', ".md", out_fn)


def main():
    url = sys.argv[1]
    html = requests.get(url).text
    soup = BeautifulSoup(html, 'html.parser')
    section = soup.find('section')
    buf = []
    if section:
        h1 = section.find('h1')
        h1_text = h1.get_text()
        if h1:
            buf.append(f'# {h1_text}\n\n')
        paragraphs = section.find_all(['p', 'blockquote', 'img', 'li'])
        for paragraph in paragraphs:
            text = paragraph.get_text()
            if paragraph.name == 'blockquote':
                buf.append(f'\n> {text}\n')
            if paragraph.name == 'li':
                buf.append(f'* {text}\n')
            elif paragraph.name == 'img':
                buf.append(f'\n<figure>\n    <img src={paragraph.attrs.get("src")}>\n    <figcapture></figcapture>\n</figure>\n')
            elif text.startswith('Originally published'):
                continue
            else:
                buf.append(f'\n{text}\n')

        buf.append(f'\n[Ссылка на Medium]({url})\n')

        output_name = get_output_name(h1_text)
        output_dir = f'./public/articles/{output_name}'
        if not os.path.exists(output_dir):
            os.mkdir(output_dir)

        with open(f'{output_dir}/README.md', 'w') as file:
            for line in buf:
                file.write(line)

        with open('./public/articles/README.md', 'a') as file:
            file.write(f'* [{h1_text}](#article?dir={output_name})\n')

if __name__ == '__main__':
    main()

