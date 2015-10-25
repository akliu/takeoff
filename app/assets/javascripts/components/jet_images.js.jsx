(function(window) {
  'use strict';

  var images = {
    "Gulfstream 450":
    [
    "https://res.cloudinary.com/dx1lykanb/image/upload/v1445210901/gulfstream_450/gulfstream_450_1.jpg",
    "https://res.cloudinary.com/dx1lykanb/image/upload/v1445210901/gulfstream_450/gulfstream_450_2.jpg",
    "https://res.cloudinary.com/dx1lykanb/image/upload/v1445750947/gulfstream_450/gulfstream_450_3.jpg"
    ],

    "Gulfstream 550":
    [
    "https://res.cloudinary.com/dx1lykanb/image/upload/v1445220458/gulfstream_550/gulfstream_550_1.jpg",
    "https://res.cloudinary.com/dx1lykanb/image/upload/v1445220458/gulfstream_550/gulfstream_550_2.jpg",
    "http://res.cloudinary.com/dx1lykanb/image/upload/c_scale,w_1200/v1445751118/gulfstream_550/gulfstream_550_3.jpg"

    ],

    "Gulfstream 650":
    [
    "https://res.cloudinary.com/dx1lykanb/image/upload/v1445220699/gulfstream_650/gulfstream_650_1.jpg",
    "https://res.cloudinary.com/dx1lykanb/image/upload/v1445220699/gulfstream_650/gulfstream_650_2.jpg",
    "https://res.cloudinary.com/dx1lykanb/image/upload/v1445751392/gulfstream_650/gulfstream_650_3.jpg",
    "https://res.cloudinary.com/dx1lykanb/image/upload/v1445751393/gulfstream_650/gulfstream_650_4.jpg"
    ]
  };

  window.JetImages = React.createClass({
    render: function(){
      var jet = this.props.jet;
      var jetImages = images[jet];

      var imageTags;
      if(jetImages) {
        imageTags = (
          jetImages.map(function(url){
            return (
              <div className="jet-images-item" key={jetImages.indexOf(url)}>
                <img src={url} className="img-thumbnail jet" key={jetImages.indexOf(url)} />
              </div>
            );
          }.bind(this))
        );
      }

      return (
        <div className="jet-images">
          {imageTags}
        </div>
      );
    }
  });

}(this));
