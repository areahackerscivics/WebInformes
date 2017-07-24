
function distribucion(){
  var $anyo= $('#anyo');
  var $mes= $('#mes');
  var parametro = {
    anyo: $anyo.val(),
    mes: $mes.val()
  };

  $.ajax({
    url : "http://localhost:8080/distribucion",
    type : "GET",
    data: parametro,
    success : function(data) {

      console.log(data);

      elMes = $("#mes option:selected").text();
      titulo = "Temas mencionados en Twitter en " + elMes

      var attributes = [
         {"categoria": "Turismo", "hex": "#BF1E2E"},
         {"categoria": "Industria", "hex": "#EF4136"},
         {"categoria": "Empleo", "hex": "#F25A29"},
         {"categoria": "Seguridad", "hex": "#F8931F"},
         {"categoria": "Hacienda", "hex": "#FCB042"},
         {"categoria": "Salud", "hex": "#F9EE34"},
         {"categoria": "Comercio", "hex": "#F9EE34"},
         {"categoria": "Educación", "hex": "#D8DE24"},
         {"categoria": "Vivienda", "hex": "#8DC641"},
         {"categoria": "Ciencia y tecnología", "hex": "#272262"},
         {"categoria": "Medio ambiente", "hex": "#2B3991"},
         {"categoria": "Economía", "hex": "#29AAE3"},
         {"categoria": "Transporte", "hex": "#01A79D"},
         {"categoria": "Demografía", "hex": "#2BB673"},
         {"categoria": "Deporte", "hex": "#016738"},
         {"categoria": "Energía", "hex": "#009345"},
         {"categoria": "Urbanismo e infraestructuras", "hex": "#3AB54B"},
         {"categoria": "Sector público", "hex": "#672D93"},
         {"categoria": "Legislación y justicia", "hex": "#92278F"},
         {"categoria": "Cultura y ocio", "hex": "#9E1F64"},
         {"categoria": "Sociedad y bienestar", "hex": "#DA1C5C"},
         {"categoria": "Medio Rural", "hex": "#9B8578"}
       ]


      link = "http://localhost:8080/descarga?anyo=" + parametro.anyo + "&mes=" + parametro.mes
      // instantiate d3plus
      $( "#grafico_distribucion" ).empty();
      var grafico = d3plus.viz()
        .container("#grafico_distribucion")  // container DIV to hold the visualization
        .data(data)  // data to use with the visualization
        .type("tree_map")   // visualization type
        .id("categoria")         // key for which our data is unique on
        .size("numTweets")      // sizing of blocks
        .format("es_ES")
        .attrs(attributes)
        .color("hex")
        .title(titulo)
        .title({
          "font": {"weight": "bold"},
          "total": true
        })
        .footer({
          "link": link,
          "value": "Descargar en formato CSV"
        })
        .draw()


    },
    error : function(data) {

      console.log(data);

    }
  });
}



$(document).ready(function(){
  distribucion()

  $('#anyo').on('change', function() {
    distribucion()
  })
  $('#mes').on('change', function() {
    distribucion()
  })
})
