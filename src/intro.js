
//for loading the profile of the user as a website or a tag
class Intro extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            image : this.props.image,
            name : this.props.name,
            sp : this.props.sp,
            website : this.props.website,
            status : this.props.status,
            follower_count : this.props.follower_count,
            following_count : this.props.following_count
        }
    }

    //always update with the current props used, no state needed
    shouldComponentUpdate(nextProps, nextState){
            return true;
      }

    render(){
        
        console.log("spn",this.props.sp);
        return(
            <div>
                <a href="#" className="logo">
                  <img id="ppic" className="themePrimaryShadow" src={this.props.image} alt="logo"/>
              </a>
                              <header>
                                  <h2 id="pname">{this.props.name}</h2>
                                  <blockquote id="sp">{this.props.sp}</blockquote>
                
                <p id="website">{this.props.website}</p>

                <p id="pstatus">{this.props.status}</p>
                <ul id="follow" className="actions">
                    <li><a href='#' className='button'>Followers: {this.props.follower_count}</a></li>
                    <li><a href='#' className='button'>Following: {this.props.following_count}</a></li>
                </ul>
                              </header>
            </div>
            
        );
    }


}