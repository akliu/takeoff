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
        return (
          <div className="group">
            <Navbar />
            <Sidebar />
            {this.props.children}
          </div>
        );
      }
    });

    var routes = (
      <Route path="/" component={App}>
        <IndexRoute component={Map}/>
        <Route path="reservations/index" component={Reservations}/>
      </Route>
    );


    if(root) {
      React.render(<Router>{routes}</Router>, root);
    }

  });

}());
