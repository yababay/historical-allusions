<script lang="ts">
    export let title: string, href: string
</script>

<a class="icon-holder text-light" {href}>
    <slot name="svg" />
    <span>{title}</span>
</a>

<style>
    .icon-holder {
        text-decoration: none;
    }

    .icon-holder span {
        border-bottom: 1px solid white;
    }

    .icon-holder svg {
        height: 100%
    }
</style>
