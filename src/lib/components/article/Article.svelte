<script lang="ts">
    import { onMount } from 'svelte'

    import tuneMarkdown from '../../tune-markdown.js'
    import Showdown from "./Showdown.svelte";

    export let dir: string
    dir = `articles/${dir}`
    const url = `${dir}/README.md`
    const processor = (txt) => tuneMarkdown(txt, dir)

    onMount(() => {
        const close = document.getElementById("close-offcanvas")
        if(close) close.click()
    })
</script>

<Showdown {url} {processor} />
