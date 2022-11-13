import { derived, writable, type Writable, type Readable } from 'svelte/store'

let significantSections: Element[]
let significantIds: string[]
let lastURL: string

interface Propsable {
  target: Element
  props: object
}

interface HashAndPropsable {
  hash: Writable<string>
  props: Readable<Propsable>
}

export default function (selector = 'main > section', intro = 'intro', hider = 'd-none'): HashAndPropsable {
  const hash = writable('')
  const props = derived(hash, $hash => {
    try{
      let id = idFromHash($hash, intro)
      const [_, query] = [...$hash.split('?'), '']
      const target = findSection(id)
      const props = Object.fromEntries(new URLSearchParams(query).entries())
      return {target, props}
    }
    catch(e){
      return {target: findSection(intro), props: {}}
    }
  })
  significantSections = Array.from(document.querySelectorAll(selector))
  significantIds = significantSections.map(el => el.getAttribute('id'))
  window.addEventListener('hashchange', function (event) {
    Object.defineProperty(event, 'oldURL', {
      enumerable: true,
      configurable: true,
      value: lastURL,
    });
    Object.defineProperty(event, 'newURL', {
      enumerable: true,
      configurable: true,
      value: document.URL,
    });
    lastURL = document.URL
    hash.set(window.location.hash)
  })
  hash.subscribe($hash => {
    try {
      const id = idFromHash($hash, intro)
      significantSections.forEach(el => el.classList.add(hider))    
      const section = significantSections.find(el => el.getAttribute('id') === id)
      if(section) section.classList.remove(hider)
    }
    catch(e){
      window.location.hash = `#${intro}`
    }
  })
  hash.set(window.location.hash)
  return {hash, props}
}

function findSection(id: string): Element{
  return significantSections.find(el => el.getAttribute('id') === id)
}

function idFromHash(hash, intro){
  let id = hash.trim()
  if(!id){
    const wlh = window.location.hash
    return wlh ? wlh.substring(1) : intro
  }
  else {
    const from = 1
    let to = id.indexOf('?')
    to = to > -1 ? to : id.length
    return id.substring(from, to)
  }
}