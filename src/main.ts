import setupRouter from "@yababay67/svelte-hash-router-ts"
import Article from './lib/components/article/Article.svelte'
import setupComponents from './lib/components'

const selector = '#significant > section'
const {props} = setupRouter(selector)

setupComponents()

props.subscribe($props => {
    const {target} = $props
    if(target.id !== 'article') return
    target.innerHTML = ''
    Reflect.construct(Article, [$props])
})

export default null
