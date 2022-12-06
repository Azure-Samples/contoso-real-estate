import Nav from "./nav"

const Layout = ({ children, categories }) => (
  <>
    <Nav categories={categories} />
    {children}
  </>
)

export default Layout
