function tuneProlog(line, dir){
  const prologEntity = /<prolog.*src="([^"]+)/.exec(line)
  const [_, src] = prologEntity
  return `<prolog-code src="${dir}/${src}"></prolog-code>`
}

function tuneFigure(line, dir){
  const imgEntity = /<img\s+src="([^"]+)"\s+alt="([^"]+)".*\/>/.exec(line)
  const [_, src, caption] = imgEntity
  line = line.replace('<p>', '<figure>')
  line = line.replace(/src=".*"/, `src="${dir}/${src}"`)
  line = line.replace('</p>', `<figcaption>${caption}</figcaption></figure>`)
  return line
}

function parseLine(line, dir){
    line = line.trim()
    const startOfLine = /^<p>.*<(\w+).*/.exec(line)
    if(!startOfLine || startOfLine.length < 2) return line
    const tag = startOfLine[1]
    switch(tag){
      case 'img': return tuneFigure(line, dir)
      case 'prolog': return tuneProlog(line, dir)
      default: return line
    }
    /*const imgEntity = /<img.*alt="([^"]+)".*\/>/.exec(line)
    if(imgEntity && imgEntity[1]){
      const [_, caption] = imgEntity
      line = line.replace('<p>', '<figure>')
      line = line.replace('</p>', `<figcaption>${caption}</figcaption></figure>`)
    }*/
    return line
}

export default function (txt, dir = '') {
    return txt.trim().split('\n')
        .map($=> $.trim())
        .filter($ => !$.startsWith('%'))
        .map(line => parseLine(line, dir))
        .join('\n')
}