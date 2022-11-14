<script type="ts">
    import Showdown from 'showdown'
    import TextLoader from "./TextLoader.svelte"
    import EditIcon from '../icons/pencil.svelte'
    import SourceIcon from '../icons/link-45deg.svelte'
    import ReloadIcon from '../icons/arrow-clockwise.svelte'
    import PrintIcon from '../icons/printer.svelte'
    import TocIcon from '../icons/list-columns-reverse.svelte'

    export let url: string
    export let processor: CallableFunction = txt => txt

    let articleBody, mediumLink

    const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname)

    const converter = new Showdown.Converter()
    const onLoad = (text: string) => {
        const linkLine = text.split('\n').find(line => line.includes('Ссылка на Medium'))
        if(linkLine){
            mediumLink = /.*\(([^\)]+)\).*/.exec(linkLine)[1]
        }
        const html = converter.makeHtml(text)
        const tuned = processor(html)
        return tuned
    }

    function editArticle(e){
        e.preventDefault()
        const [_, dir] = /.*\/([a-z0-9\-]+)\/.*/.exec(url)
        fetch(`/edit/${dir}`)
            .then(res => res.text())
            .then(txt => {})
    }
    function editToc(e){
        e.preventDefault()
        fetch(`/edit/toc`)
            .then(res => res.text())
            .then(txt => {})
    }

    function reload(){
        articleBody.innerHTML = ''
        Reflect.construct(TextLoader, [{target: articleBody, props: {onLoad, url}}])
    }

    function source(){
        if(mediumLink) window.open(mediumLink, '_blank')
    }
</script>

<article>
    {#if isLocal }
        <div class="text-end mb-3 article-controls">
            <div class="btn-group" role="group" aria-label="Инструменты">
                <button class="btn btn-primary" on:click={editToc} title="Править содержание"><TocIcon /></button>
                <button class="btn btn-primary" on:click={editArticle} title="Править статью"><EditIcon /></button>
                <button class="btn btn-primary" on:click={reload} title="Обновить"><ReloadIcon /></button>
                <button class="btn btn-primary" on:click={source} title="Источник"><SourceIcon /></button>
                <button class="btn btn-primary" on:click={() => window.print()} title="Печать"><PrintIcon /></button>
            </div>
        </div>
    {/if}
    <div bind:this={articleBody}>
    <TextLoader {onLoad} {url} />
    </div>
</article>

<style>
    @media print {
        .article-controls {
            display: none;
        }
    }
</style>