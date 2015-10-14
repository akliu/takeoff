(function() {
  'use strict';

  window.Sidebar = React.createClass({

    render: function(){
      return (
        <nav className="navbar sidebar-nav navbar-default">
          <ul className="nav in">
            <li><a href="#">View Reservations</a></li>
            <li><a href="#">Previous Trips</a></li>
            <li><a href="#">Register My Jet</a></li>
          </ul>
        </nav>

      );
    }
  });


}());
