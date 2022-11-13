<script lang="ts">
    import SvgIcon from '../icons/list-columns-reverse.svelte'
</script>

<a class="link-secondary toc-icon-holder" id="toc-show" type="button" data-bs-toggle="offcanvas" data-bs-target="#toc-offcanvas" aria-controls="toc-offcanvas">
    <SvgIcon />
    <span>Список материалов</span>
</a>

<style>
    .toc-icon-holder {
        margin-left: 1rem;
        line-height: 24px;
        text-decoration: none;
    }

    .toc-icon-holder span {
        border-bottom: 1px solid silver;
    }

    .toc-icon-holder svg {
        height: 100%
    }
</style>
