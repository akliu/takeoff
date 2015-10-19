(function(window) {
  'use strict';

  var images = {
    "Gulfstream 450": [
    "https://res.cloudinary.com/dx1lykanb/image/upload/r_8/v1445210901/gulfstream_450/gulfstream_450_1.jpg",
    "https://res.cloudinary.com/dx1lykanb/image/upload/r_8/v1445210901/gulfstream_450/gulfstream_450_2.jpg"
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
            return (<img src={url} className="jet" key={jetImages.indexOf(url)} />);
          }.bind(this))
        );
      }
      return (
        <div>
        {imageTags}
        </div>
      );
    }
  });

}(this));
