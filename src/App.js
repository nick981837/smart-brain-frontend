import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import Particles from 'react-particles-js'

//Set the parameters of background image
const particlesOption = {
                particles: {
                  number:{
                    value: 150,
                    density:{
                    enable:true,
                    value_area: 700
                    }
                  }
                    }
                  }
                
const initialState= {
      input: '',
      imageUrl:'',
      boxAll: [],
      route: 'signin',
      isSignedIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}    

class App extends Component {
  constructor(){
    super();
    this.state= initialState;
        }
//Loading user's data from back-end when in HomePage
  loadUser=(data)=>{
    this.setState({user:{
        id: data.id,
        name: data.name,
        email:data.email,
        entries: data.entries,
        joined: data.joined
    }})
  }

//Caculate all faces location 
calculateFaceLocation = (data)=>{
  const clarifaiFaceAll = data.outputs[0].data.regions;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  const boxArr = clarifaiFaceAll.map(region=>{
  return(
  {
    leftCol:region.region_info.bounding_box.left_col * width,
    topRow: region.region_info.bounding_box.top_row * height,
    rightCol: width - (region.region_info.bounding_box.right_col * width),
    bottomRow: height -(region.region_info.bounding_box.bottom_row * height)
  }
  )
});
  return boxArr;
}

  displayFaceBox =(boxAll)=>{
  this.setState({boxAll:boxAll});
}
  
//Update inputImage from ImageLinkForm
  onInputChange =(event)=>{
    this.setState({input: event.target.value});
  }

  
  onButtonSubmit =()=>{
//Send InputImage to back-end and detect faces by Clarifal Model
   this.setState({imageUrl: this.state.input});
          fetch(' https://damp-sea-30110.herokuapp.com/imageurl', {
            method: 'post', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            input :this.state.input
    })
  })
      .then(response => response.json())
      .then(response=>{
//Update user's entries 
        if (response!="unable to work with API"){
            fetch(' https://damp-sea-30110.herokuapp.com/image', {
            method: 'put', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            id :this.state.user.id
        })
      })

      .then(response => response.json())
      .then(count=>{
        this.setState(Object.assign(this.state.user, {entries:count}))
        })
         .catch(console.log)
        }
//Get detection datas from back-end to display FaceBoxes
      this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }
  
//Changeing Routes
  onRouteChange =(route)=>{
    if (route ==='signin'){
      this.setState(initialState)
    }else if (route==='home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route:route});
  }


  render(){
   const {isSignedIn, imageUrl, route, boxAll} = this.state
  return (
    <div className='App'>
     <Particles className='particles'
     params={particlesOption}/>    

     <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
     {route ==='home'
      ? <div>
         <Logo />
         <Rank name={this.state.user.name} entries={this.state.user.entries} />
         <ImageLinkForm 
         onInputChange={this.onInputChange} 
         onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition boxAll={boxAll} imageUrl = {imageUrl} />
        </div>
     :(
      route ==='signin'?
      <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
)
  }
    </div>
  );
}
}

export default App;
