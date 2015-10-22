(function() {
  'use strict';

  $(function(){
    var root = document.getElementById('content');
    var Route = ReactRouter.Route;
    var Router = ReactRouter.Router;
    var IndexRoute = ReactRouter.IndexRoute;
    window.Link = ReactRouter.Link;
    EventEmitter.defaultMaxListeners = 50;

    var App = React.createClass({
      render: function(){
        var sidebarItems = [];

        if(this.props.location.pathname === "/"){
          sidebarItems = [["Reservations", "reservations/index"],
                          ["Previous Trips", "reservations/past"],
                          ["Register my Jet", "jet/registration"]];
        } else if(this.props.location.pathname === "/reservations/index"){
          sidebarItems = [["Airports Map", "/"],
                          ["Previous Trips", "reservations/past"],
                          ["Register my Jet", "jet/registration"]];
        } else if(this.props.location.pathname === "/reservations/new"){
          sidebarItems = [["Airports Map", "/"],
                          ["Reservations", "reservations/index"],
                          ["Previous Trips", "reservations/past"],
                          ["Register my Jet", "jet/registration"]];
        } else if(this.props.location.pathname === "/reservation/edit"){
          sidebarItems = [["Airports Map", "/"],
                          ["Reservations", "reservations/index"],
                          ["Previous Trips", "reservations/past"],
                          ["Register my Jet", "#"]];
        } else if(this.props.location.pathname === "/reservations/past"){
          sidebarItems = [["Airports Map", "/"],
                          ["Reservations", "reservations/index"],
                          ["Register my Jet", "jet/registration"]];
        } else if(this.props.location.pathname === "/jet/registration"){
          sidebarItems = [["Airports Map", "/"],
                          ["Reservations", "reservations/index"],
                          ["Previous Trips", "reservations/past"]];
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
        <Route path="reservation/edit" component={EditReservation} />
        <Route path="reservations/past" component={PastReservations} />
        <Route path="jet/registration" component={NewJet} />
      </Route>
    );


    if(root) {
      React.render(<Router>{routes}</Router>, root);
    }

  });

}());
