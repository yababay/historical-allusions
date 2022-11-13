<script lang="ts">
  function filter(e){
    const items = Array.from(document.querySelectorAll('aside ul li a'))
    const { value } = e.target
    items.forEach(item => {
      if(!item.textContent.toLowerCase().includes(value.toLowerCase())) item.parentNode.classList.add('d-none')
      else item.parentNode.classList.remove('d-none')
    })
  }
</script>

<div class="offcanvas-header">
  <form class="d-flex" role="search">
    <input on:keyup={filter} class="form-control me-2" type="search" placeholder="Поиск по заголовкам" aria-label="Search">
  </form>
  <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" id="close-offcanvas"></button>
</div>
