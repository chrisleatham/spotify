Parse.initialize("2Ze04a8hbmAYIoLImJMl6l3QhxP6axHYaYjTUtEA", "OmawkGC5PjQW8aqmrnQqXATFeT2B8JgUnE7GJOt2");

var Artist = Parse.Object.extend('Artist');


$('form').submit(function() {


  var artist = new Artist();

 
  
  $(this).find('input').each(function(){
    artist.set($(this).attr('id'), $(this).val());
    $(this).val('');
  })

  artist.save(null, {
    success:getData
  })
  return false
})



var getData = function() {
  

  var query = new Parse.Query(Music)

  query.find({
    success:function(results) {
      buildList(results)
    } 
  })
}

var buildList = function(data) {
  $('ol').empty()

  data.forEach(function(d){
    addItem(d);
  })
}

var addItem = function(item) {
  
  var artist = item.get('artist')

  var li = $('<li>' + artist + '</li>')
  
  $('ol').append(li)
  
}

getData()