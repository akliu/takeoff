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
