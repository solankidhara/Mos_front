import { Navbar } from 'react-bootstrap';
import NavLinks from '../../Layout/NavLinks/NavLinks';
import NavLogo from '../../Layout/NavLogo/NavLogo';

const NavBar = (props) => {
      return (
            <Navbar expand="lg">
                  <div className="container-fluid">
                        <NavLogo />
                        <NavLinks menu={props.menu} />
                  </div>
            </Navbar>
      );
};

export default NavBar;
