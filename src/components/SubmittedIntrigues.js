import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { connect } from "react-redux";

const Wrapper = styled.div`
   width:100%;
   max-height:100%;
   display:flex;
   flex-direction:column;
   padding:20px 20px 20px 20px;
   
   & h3 {
      color:#01a4f6;
      margin:20px 0 10px 5px;
      font-size:1.3rem;
   }
   & div {
      cursor:pointer;
      background-color:#2f3438;
      margin-bottom:3px;
      border-radius:10px;
      padding:10px 10px 10px 30px;
      display:flex;
      justify-content:space-between;
      transition:background-color 0.2s ease-in-out;
      & p {
         width:30%;
         font-size:1rem;
      }
      & .accepted {
         color:green;
      }
      & .pending {
         color:yellow;
      }
      & .failed {
         color:red;
      }
      &:hover {
         background-color:#FB677B;
      }
   }

`
const SubmittedIntrigues = ({handleOpenModalDisplay, submittedIntrigues}) => {
   const [ displayIntrigues, setDisplayIntrigues] = useState([]);

   const buildIntrigueElements = () => {
      let elementList = [];
      submittedIntrigues.forEach(function callback(element, index){
         elementList.push(
            <div 
               data-text={element.intrigue} 
               key={index}
               onClick={()=>handleOpenModalDisplay(element)} 
            >
               <p>Intrigue: {element.intrigue} </p>
               <p className={(element.moderation) ? 'accepted' : (element.moderation === null) ? 'pending' : 'failed' }>Moderation Status: {(element.moderation) ? 'Accepted' : (element.moderation === null) ? 'Pending' : 'Failed' }</p>
            </div>
         )
      })
      setDisplayIntrigues(elementList)
   }

   useEffect(()=>{
      console.log(submittedIntrigues)
      if(submittedIntrigues){
         buildIntrigueElements();
      }
   }, [])
   
   

   return(
      <Wrapper>
         {displayIntrigues}
      </Wrapper>
   )
}

const mapStateToProps = (state) => ({ 
   submittedIntrigues:state.submissions.submittedIntrigues,
});

export default connect(mapStateToProps)(SubmittedIntrigues);