<script type="ts">
    import Showdown from 'showdown'
    import TextLoader from "./TextLoader.svelte"
    import EditIcon from './icons/pencil.svelte'
    import SourceIcon from './icons/link-45deg.svelte'
    import ReloadIcon from './icons/arrow-clockwise.svelte'

    export let url: string
    export let processor: CallableFunction = txt => txt

    let articleBody, mediumLink

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

    function edit(e){
        e.preventDefault()
        const [_, dir] = /.*\/([a-z0-9\-]+)\/.*/.exec(url)
        fetch(`/edit/${dir}`)
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
    {#if ['localhost', '127.0.0.1'].includes(window.location.hostname) }
        <div class="text-end mb-3">
            <div class="btn-group" role="group" aria-label="Редактирование">
                <button class="btn btn-primary" on:click={edit}><EditIcon /> Править</button>
                <button class="btn btn-primary" on:click={reload}><ReloadIcon /> Обновить</button>
                <button class="btn btn-primary" on:click={source}><SourceIcon /> Источник</button>
            </div>
        </div>
    {/if}
    <div bind:this={articleBody}>
    <TextLoader {onLoad} {url} />
    </div>
</article>
