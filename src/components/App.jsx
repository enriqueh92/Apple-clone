class App extends React.Component {
  constructor(props) {
    super(props),
    this.state = {
      videos: exampleVideoData,
      video: undefined
    };
  }
  
  handleTitleClick (video) {
    // console.log(thisstate)
    this.setState({video: video});
  }
  
  handleSearchResults(data) {
    this.setState({videos: data});
  }
  
  handleSearchClick (input) {
    var context = this;
    $.ajax({
      data: {
        key: 'AIzaSyD34WatGCnMXnIf0g5LNHxwTFhXOUSuLRs',
        q: input,
        part: 'snippet'
      },
      url: 'https://www.googleapis.com/youtube/v3/search',
      maxResults: '5',
      type: 'GET',
      dataType: 'json',
      success: function(data) {   
        console.log('successful get request');
        context.handleSearchResults(data.items);
      },
      error: function(data) {
        console.log('There was an error');
      }
    });
  }
  render () {
  
    return (  
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search handleSearchClick={this.handleSearchClick.bind(this)}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={(this.state.video !== undefined) ? this.state.video : this.state.videos[0]}/>
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videos} handleTitleClick={this.handleTitleClick.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }

} 


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
