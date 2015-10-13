(function() {
  'use strict';

  window.Navbar = React.createClass({

    render: function(){
      return (
        <nav className="top-nav-bar">
          <ul>
            <li>
              <button className="top-nav-bar-button" onClick={ApiUtil.logOut}>
                Log Out
              </button>
            </li>
          </ul>

        </nav>
      );
    }
  });

}());
