(function() {
  'use strict';

  window.SideBarItem = React.createClass({
    render: function(){
      return (
        <li><Link to={this.props.item[1]}>{this.props.item[0]}</Link></li>
      );
    }
  });

}());
