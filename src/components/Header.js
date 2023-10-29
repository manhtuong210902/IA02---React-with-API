import { Container, Nav, Navbar } from "react-bootstrap";

function Header() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="header">
            <Container>
                <Navbar.Brand className="fw-bold text-primary">PHOTO</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <div className="nav-link">Trang chủ</div>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
