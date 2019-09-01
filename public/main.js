$(() => {
  console.log('sjfgk')
  // JS Gracefull Fallback 
  $('form').submit((event) => {
    event.preventDefault();
    const url = $('#url').val()
    const name = $('#name').val()

    const pair = {
      url,
      name
    }

    $.ajax({
      type: 'POST',
      url: 'api/short',
      data: JSON.stringify(pair),
      dataType: 'json',
      contentType: 'application/json;charset=utf-8',
    })
    .then(res => {
      $('.result').text(`http://shau.ya/${res.name}`)
      $('.result').attr( 'href', `http://shau.ya/${res.name}`)

    }).catch(err => {
      $('.result').html(`
        <div class="alert alert-danger" role="alert">
          ${err.responseJSON}
        </div>
      `)
    })
  })  

})
