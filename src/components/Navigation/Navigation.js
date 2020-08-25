import React from 'react'

const Navigation=({onRouteChange, isSignedIn})=>{
	//If in Home Page, display only 'Sign Out' Navigation
	if (isSignedIn){
	return(
	  <nav style={{display:'flex', justifyContent:'flex-end'}}>
	  <p onClick={()=>onRouteChange('signin')} className='f1 link dim black underline pa3 pointer'>Sign Out</p>
	  </nav>
	);
	//If in Signin or Register Page, display 'Signin' and 'Reigster' Navigation
	}else{
	return(
          <nav style={{display:'flex', justifyContent:'flex-end'}}>
	  <p onClick={()=>onRouteChange('signin')} className='f1 link dim black underline pa3 pointer'>Sign In</p>
	  <p onClick={()=>onRouteChange('register')} className='f1 link dim black underline pa3 pointer'>Register</p>
	  </nav>
	)
	}
}

export default Navigation;
