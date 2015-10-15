(function() {
  'use strict';

  $(function(){
    var root = document.getElementById('content');
    var Route = ReactRouter.Route;
    var Router = ReactRouter.Router;
    var IndexRoute = ReactRouter.IndexRoute;
    window.Link = ReactRouter.Link;

    var App = React.createClass({
      render: function(){
        var sidebarItems = [];

        if(this.props.location.pathname === "/"){
          sidebarItems = [["Reservations", "reservations/index"],
                          ["Previous Trips", "#"],
                          ["Register my Jet", "#"]];
        } else if(this.props.location.pathname === "/reservations/index"){
          sidebarItems = [["Airports Map", "/"],
                          ["Previous Trips", "#"],
                          ["Register my Jet", "#"]];
        }



        return (
          <div className="group">
            <Navbar  />
            <Sidebar sidebarItems={sidebarItems}/>
            {this.props.children}
          </div>
        );
      }
    });

    var routes = (
      <Route path="/" component={App}>
        <IndexRoute component={Map}/>
        <Route path="reservations/index" component={Reservations}/>
        <Route path="reservations/new" component={NewReservation} />
      </Route>
    );


    if(root) {
      React.render(<Router>{routes}</Router>, root);
    }

  });

}());
