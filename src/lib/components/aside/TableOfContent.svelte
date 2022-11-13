<script type="ts">
    import TextLoader from "../TextLoader.svelte"
    import Showdown from 'showdown'

    const getToc = (header, body) => `
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="toc-offcanvas-label">${header}</h5><button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" id="close-offcanvas"></button>
        </div>
        <div class="offcanvas-body">
            ${body}
        </div>            
    `

    export let url: string = './articles/README.md'
    export let processor: CallableFunction = txt => {
        let [header, body] = txt.split('</h5>')
        header = header.replace('<h5>', '')
        return getToc(header, body)
    }

    const converter = new Showdown.Converter()
    const onLoad = (text: string) => {
        const html = converter.makeHtml(text)
        const tuned = processor(html)
        return tuned
    }
</script>

<TextLoader {onLoad} {url} />
