<script type="ts">
    import { delayedAction } from '../util'
    export let url: string
    export let onLoad: CallableFunction = ()=>{}
    export let failure: string = `Не удалось загрузить текстовые данные из <code>${url}</code>.`

    $: progress = 20

    async function loadText() {
        const res = await fetch(url)        
        await delayedAction(200, ()=> progress = 50)
        const txt = await res.text()
        await delayedAction(200, ()=> progress = 80)
        const html = onLoad(txt)
        await delayedAction(200, ()=> progress = 100)
        await delayedAction(200)
        return html
    }
</script>

{#await loadText()}
    <div class="article-loading d-flex justify-content-between align-items-end">
        <div class="progress w-100 me-5">
            <div 
                class="progress-bar progress-bar-striped progress-bar-animated" 
                role="progressbar" aria-label="Animated striped example" 
                aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}
                style={`width: ${progress}%`}>
            </div>
        </div>
    </div>
{:then html} 
    {@html html}
{:catch error}
    <div class="alert alert-danger text-center mt-3" role="alert">
        {@html failure} {error}        
    </div>
{/await}

<style>
    .article-loading {
        height: calc(var(--main-min-height) / 3);
    }
</style>
