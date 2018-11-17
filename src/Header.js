//react element used for a header. So it is common all around.
class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(
            <div>
                <header id="header">
        <h1><a href="index.html">Comedy Open Mic</a></h1>
        <nav className="links">
            <ul>
                <li><a href="#">Team</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Witness</a></li>

                <li><a href="#" className="icon style2 fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon style2 fa-facebook"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon style2 fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="#" className="icon style2 fa-500px"><span className="label">500px</span></a></li>
            <li><a href="#" className="icon style2 fa-envelope-o"><span className="label">Email</span></a></li>
            </ul>
        </nav>

        {/* <!-- <ul className="icons">
            <li><a href="#" className="icon style2 fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon style2 fa-facebook"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon style2 fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="#" className="icon style2 fa-500px"><span className="label">500px</span></a></li>
            <li><a href="#" className="icon style2 fa-envelope-o"><span className="label">Email</span></a></li>
        </ul> --> */}

        <nav className="main">
            <ul>
                <li className="search">
                    <a className="fa-search" href="#search">Search</a>
                    <form id="search" method="get" action="#">
                        <input type="text" name="query" placeholder="Search" />
                    </form>
                </li>
                <li className="menu">
                    <a className="fa-bars" href="#menu">Menu</a>
                </li>
            </ul>
        </nav>
        
    </header>
    
    



    <section id="menu">

        {/* <!-- Search --> */}
        <section>
            <form className="search" method="get" action="#">
                <input type="text" name="query" placeholder="Search" />
            </form>
        </section>

        {/* <!-- Links --> */}
        <section>
            <ul className="links">
                <li>
                    <a href="#">
                        <h3>Team</h3>
                        <p>All for one. One for all.</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <h3>About</h3>
                        <p>What is comedy open mic?</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <h3>Witness</h3>
                        <p>For the blockchain. Not snitches.</p>
                    </a>
                </li>
                {/* <li>
                    <a href="#">
                        <h3>Etiam sed consequat</h3>
                        <p>Porta lectus amet ultricies</p>
                    </a>
                </li> */}
                <li><a href="#" className="icon style2 fa-twitter"><h3><span className="label">Twitter</span></h3></a></li>
            <li><a href="#" className="icon style2 fa-facebook"><h3><span className="label">Facebook</span></h3></a></li>
            <li><a href="#" className="icon style2 fa-instagram"><h3><span className="label">Instagram</span></h3></a></li>
            <li><a href="#" className="icon style2 fa-500px"><h3><span className="label">500px</span></h3></a></li>
            <li><a href="#" className="icon style2 fa-envelope-o"><h3><span className="label">Email</span></h3></a></li>
            </ul>
        </section>

        {/* <!-- Actions --> */}
        <section>
            <ul className="actions vertical">
                <li><a href="#" className="button big fit">Log In</a></li>
            </ul>
        </section>

    </section>
                
            </div>
        );
    }
}

//let domContainer =;
ReactDOM.render(<Header />,  document.querySelector('#headercomeshere'));