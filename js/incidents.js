incidents = {
  incident_data: null,

  load: function() {

    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: './assets/data.json', //'https://data.honolulu.gov/api/views/ix32-iw26/rows.json?accessType=DOWNLOAD',
      cache: false,
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.responseText);
        alert(thrownError);
      },
      xhr: function () {
        var xhr = new window.XMLHttpRequest();
          //Download progress
          xhr.addEventListener("progress", function (evt) {
//              console.log(evt.lengthComputable); // false
//              console.log(evt);
              if (evt.lengthComputable) {
                $('#dateText').html('' + evt.loaded + ' of ' + evt.total);
              }
              else {
                $('#dateText').html('' + Math.round(evt.loaded/10485.76)/100 + ' MB loaded');
              }
            }, false);
          return xhr;
        },
        beforeSend: function () {
          $('#loading').show();
        },
        complete: function () {
          $("#loading").hide();
        },
        success: function(data) {
          incident_data = data.data.map(function(x) {
            var obj = {};
            obj.time = x[3];
            obj.district = districts[x[13] ];
            return obj;
          })
          .filter(function(x) {
            return (x.district !== null);
          });

          console.log('Data loaded.');
          updateSliders();
          $('.slider').prop('disabled', false);

          $('#date').attr('max',
            incident_data.reduce(function(p,c) {
              return (p > c.time) ? p : c.time;
            }, 0)

            );

          $('#date').attr('min',
            incident_data.reduce(function(p,c) {
              return (p < c.time) ? p : c.time;
            }, 999999999999999)

            );
        }
      });

},

update: function(obj) {
  if (incident_data === null) return [];

  var time = obj.time;
    var history = obj.window*60; //86400;

    // console.log(history);

    var data = incident_data.filter(function(x) {
      var delta = obj.time - x.time;
      return (delta > 0 && delta <= history);
    });

//    console.log(data.length);

return data.reduce(function(p, c) {
      // console.log(p);
      // console.log(c);
      p[c.district] += 1;
      return p;
    }, [0,0,0,0,0,0,0,0,0,0,0,0] );

}


}
