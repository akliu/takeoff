(function() {
  'use strict';

  window.Sidebar = React.createClass({
    mixins: [ReactRouter.History],


    render: function(){
      return (
        <nav className="navbar sidebar-nav navbar-default">
          <ul className="nav in" >
            <li><Link to="reservations/index">View Reservations</Link></li>
            <li><a href="#">Previous Trips</a></li>
            <li><a href="#">Register My Jet</a></li>
          </ul>
        </nav>

      );
    }
  });


}());
