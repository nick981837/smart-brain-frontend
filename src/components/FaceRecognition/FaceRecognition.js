import React from 'react';
import BorderBox from './BorderBox';
import './FaceRecognition.css';

const FaceRecognition=({imageUrl, box}) =>{
return(
	<div className='center ma'>
	 <div className='absolute mt2'>
	   <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
       {
                    boxAll.map((box, i) => {
                        return (
                            <BorderBox
                                key = {i}
                                top={boxAll[i].topRow}
                                right={boxAll[i].rightCol}
                                bottom={boxAll[i].bottomRow}
                                left={boxAll[i].leftCol}
                            />
                        );
                    })
                }

	 </div>
	</div>
	);
}

export default FaceRecognition;