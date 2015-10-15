(function() {
  'use strict';

  window.Sidebar = React.createClass({

    render: function(){
      return (
        <nav className="navbar sidebar-nav navbar-default">
          <ul className="nav in" >
            {
              this.props.sidebarItems.map(function(sidebarItem){
                return <SideBarItem
                  item={sidebarItem}
                  key={this.props.sidebarItems.indexOf(sidebarItem)} />;
              }.bind(this))
            }
          </ul>
        </nav>
      );
    }
  });


}());
            // <li><Link to="reservations/index">View Reservations</Link></li>
            // <li><a href="#">Previous Trips</a></li>
            // <li><a href="#">Register My Jet</a></li>
