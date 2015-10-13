(function() {
  'use strict';

  window.Navbar = React.createClass({

    render: function(){
      return (
        <nav className="navbar navbar-default">
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
                <li><h3>Takeoff</h3></li>
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
        // <nav className="top-nav-bar">
        //   <ul>
        //     <li>
        //       <button className="top-nav-bar-button" onClick={ApiUtil.logOut}>
        //         Log Out
        //       </button>
        //     </li>
        //   </ul>
        //
        // </nav>
