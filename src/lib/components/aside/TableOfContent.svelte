<script type="ts">
    import TextLoader from "../TextLoader.svelte"
    import Showdown from 'showdown'

    export let url: string = './articles/README.md'
    export let processor: CallableFunction = html => {
        const items = html.split('\n')
            .filter(line => /^\<li/.test(line))
            .map(line => /.*href="([^"]+)".*>([^<]+)<.*/.exec(line))
            .map(([_, href, text]) => `<li class="nav-item"><a class="nav-link link-dark fw-blod" href="${href}">${text}</a></li>`)
            .reverse()
            .join('\n')
        return `<div class="offcanvas-body"><ul class="section-items nav flex-column pb-1">${items}</ul></div>`
    }

    const converter = new Showdown.Converter()
    const onLoad = (text: string) => {
        const html = converter.makeHtml(text)
        return processor(html)
    }
</script>

<TextLoader {onLoad} {url} />
