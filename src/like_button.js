'use strict';
//not used. Will be used later. I think, this was from the example.
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  checkstate(){
    var set = this.state.liked;
    this.setState({liked:!set});
  }

  render() {
    // if (this.state.liked) {
    //   return 'You liked this.';
    // }

    return (
      <a href="#0" className="button" onClick={() => this.checkstate() }>
        {this.state.liked.toString()}
      </a>
    );
  }
}

//let domContainer = document.querySelector('#shit');
//ReactDOM.render(<LikeButton />, domContainer);
