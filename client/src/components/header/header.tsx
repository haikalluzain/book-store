import React from 'react'
import {
  Nav,
  Navbar,
  NavbarBrand,
  Collapse,
  DropdownItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap'

import profilephoto from 'src/assets/images/users/1.jpg'

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from 'src/assets/images/logo-icon.png'
import logolighticon from 'src/assets/images/logo-light-icon.png'
import logodarktext from 'src/assets/images/logo-text.png'
import logolighttext from 'src/assets/images/logo-light-text.png'
import { Api } from 'src/config/Api'
import { useUserContext } from 'src/context/UserContext'

const Header = () => {
  const { user } = useUserContext()

  const handleLogout = async () => {
    try {
      const res = await Api().post('auth/logout')

      if (res.status === 200) {
        localStorage.clear()
        document.location.href = '/login'
      }
    } catch (error) {
      console.log(error)
    }
  }

  /*--------------------------------------------------------------------------------*/
  /*To open SIDEBAR-MENU in MOBILE VIEW                                             */
  /*--------------------------------------------------------------------------------*/
  const showMobilemenu = () => {
    document.getElementById('main-wrapper').classList.toggle('show-sidebar')
  }

  return (
    <header className="topbar navbarbg" data-navbarbg="skin5">
      <Navbar className="top-navbar" dark expand="md">
        <div className="navbar-header" id="logobg" data-logobg="skin6">
          {/*--------------------------------------------------------------------------------*/}
          {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
          {/*--------------------------------------------------------------------------------*/}
          <NavbarBrand href="/">
            <b className="logo-icon">
              <img src={logodarkicon} alt="homepage" className="dark-logo" />
              <img src={logolighticon} alt="homepage" className="light-logo" />
            </b>
            <span className="logo-text">
              <img src={logodarktext} alt="homepage" className="dark-logo" />
              <img src={logolighttext} className="light-logo" alt="homepage" />
            </span>
          </NavbarBrand>
          {/*--------------------------------------------------------------------------------*/}
          {/* Mobile View Toggler  [visible only after 768px screen]                         */}
          {/*--------------------------------------------------------------------------------*/}
          <button
            className="btn-link nav-toggler d-block d-md-none"
            onClick={() => showMobilemenu()}
          >
            <i className="ti-menu ti-close" />
          </button>
        </div>
        <Collapse className="navbarbg" navbar data-navbarbg="skin5">
          <Nav className="ml-auto float-right" navbar>
            {/* <NavItem>
              <a
                href="link"
                className="btn btn-danger mr-2"
                style={{ marginTop: "15px" }}
              >
                Upgrade to Pro
              </a>
            </NavItem> */}
            {/*--------------------------------------------------------------------------------*/}
            {/* Start Profile Dropdown                                                         */}
            {/*--------------------------------------------------------------------------------*/}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="pro-pic">
                <img
                  src={profilephoto}
                  alt="user"
                  className="rounded-circle"
                  width="31"
                />
                <span className="ml-2"> {user.name}</span>
              </DropdownToggle>
              <DropdownMenu right className="user-dd">
                <DropdownItem>
                  <i className="ti-user mr-1 ml-1" /> My Account
                </DropdownItem>
                <DropdownItem>
                  <i className="ti-wallet mr-1 ml-1" /> My Balance
                </DropdownItem>
                <DropdownItem>
                  <i className="ti-email mr-1 ml-1" /> Inbox
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <i className="ti-settings mr-1 ml-1" /> Account Settings
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={(e) => {
                    e.preventDefault()
                    handleLogout()
                  }}
                  href="#"
                >
                  <i className="fa fa-power-off mr-1 ml-1" /> Logout
                </DropdownItem>
                <DropdownItem divider />
                <Button color="success" className="btn-rounded ml-3 mb-2 mt-2">
                  View Profile
                </Button>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/*--------------------------------------------------------------------------------*/}
            {/* End Profile Dropdown                                                           */}
            {/*--------------------------------------------------------------------------------*/}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  )
}
export default Header
