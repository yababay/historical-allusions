import TocLink from './TocLink.svelte'
import TableOfContent from './TableOfContent.svelte'
import TocSearch from './TocSearch.svelte'

const asideElement = document.getElementById("toc-offcanvas")
const tocLinkElement = document.getElementById("toc-show")

export default function(){
    Reflect.construct(TocLink, [{target: tocLinkElement}])
    Reflect.construct(TocSearch, [{target: asideElement}])
    Reflect.construct(TableOfContent, [{target: asideElement}])
}