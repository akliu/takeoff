(function() {
  'use strict';

  window.Navbar = React.createClass({

    render: function(){
      return (
        <nav className="navbar navbar-default navbar-top">
          <div className="container-fluid">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed"
                      data-toggle="collapse"
                      data-target="#collapse-menu"
                      aria-expanded="false">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>

            <div className="collapse navbar-collapse" id="collapse-menu">
              <ul className="nav navbar-nav pull-left">
                <li><h2>Takeoff</h2></li>
              </ul>
              <ul className="nav navbar-nav pull-right">
                <li><a href="#" onClick={ApiUtil.logOut}>Sign Out</a></li>
              </ul>
            </div>

          </div>
        </nav>

      );
    }
  });

}());
