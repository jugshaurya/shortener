$(() => {
  $('form').submit((event) => {
    // JS Gracefull Fallback 
    event.preventDefault();

    const pair = {
      url : $('#url').val(),
      name: $('#name').val()
    }

    const $result = $('.result')
    $.ajax({
      type: 'POST',
      url: 'api/short',
      data: JSON.stringify(pair),
      dataType: 'json',
      contentType: 'application/json;charset=utf-8',
    })
    .then(res => {
      $result.text(`deployed_url/${res.name}`)
      $result.attr('href', `http://shau.ya/${res.name}`)

    }).catch(err => {
      $result.html(`
        <div class="alert alert-danger" role="alert">
          ${err.responseJSON}
        </div>
      `)
    })
  })  
})
