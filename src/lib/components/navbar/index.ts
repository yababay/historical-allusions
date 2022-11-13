import Navbar from './index.svelte'

const target = document.getElementById("navbar-links")
const brandTextElement = document.getElementById("brand-text")

export default function(){
    brandTextElement.textContent = document.title
    Reflect.construct(Navbar, [{target}])
}
