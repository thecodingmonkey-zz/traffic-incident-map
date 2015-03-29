incidents = {
  incident_data: null,

  load: function() {
    $.get('./assets/data.json',
     function(data) {
      incident_data = data.data.map(function(x) {
        var obj = {};
        obj.time = x[3];
        obj.district = districts[x[13] ];
        return obj;
      })
      .filter(function(x) {
//        console.log(x);
        return (x.district !== null);
      });

      console.log('Data loaded.');
      // console.log(incident_data);
    });
  },

  update: function(obj) {
    if (incident_data === null) return [];

    var time = obj.time;
    var history = 86400;

    var data = incident_data.filter(function(x) {
      var delta = obj.time - x.time;
      return (delta > 0 && delta <= history);
    });

    console.log(data.length);

    return data.reduce(function(p, c) {
      console.log(p);
      console.log(c);
      p[c.district] += 1;
      return p;
    }, [0,0,0,0,0,0,0,0,0,0,0,0] );

  }


}