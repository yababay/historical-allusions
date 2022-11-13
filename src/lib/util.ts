export async function delayedAction (delay: number, func: CallableFunction = () => {}){
    return new Promise((yep) => setTimeout(() => yep(func()), delay))
}

