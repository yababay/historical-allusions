import TocLink from './TocLink.svelte'
import TableOfContent from './TableOfContent.svelte'

const asideElement = document.getElementById("toc-offcanvas")
const tocLinkElement = document.getElementById("toc-show")

export default function(){
    Reflect.construct(TocLink, [{target: tocLinkElement}])
    Reflect.construct(TableOfContent, [{target: asideElement}])
}