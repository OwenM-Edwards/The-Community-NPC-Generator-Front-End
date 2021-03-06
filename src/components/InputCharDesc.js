import React, { useState } from 'react';
import styled from "styled-components";
import { submitCharDesc } from "../redux/actions/index";
import {optionsRace, optionsGender} from "../constants/index";
import { connect } from "react-redux";
import { LoadingIcon } from '.';

import Select from 'react-select';
const Wrapper = styled.div`
   width:100%;
   height:100%;
   display:flex;
   flex-direction:row;
   flex-wrap:wrap;
   justify-content:center;
   border-radius:5px;
   align-content:center;
   padding:30px;

   & h2 {
      color:#01a4f6;
   }
   & form {
      display:flex;
      flex-direction:column;
      width:100%;
      height:100%;
      justify-content:center;
   }
   & .input {
      padding:10px;
      width:100%;
      margin: 0 auto;
      /* background-color:red; */
      border-radius:5px;
      margin-bottom:10px;
      outline: none;
      border:0px;
   }

   & button {
      background-color: #FF3E58;
      border:0;
      width:30%;
      height:39px;
      border-radius:5px;
      color:white;
      transition: all 0.2s ease-out;
      cursor: pointer;
      
      &:hover {
         background-color:#FB677B;
      }
   }
   
`


const InputCharDesc = ({ isFetching, submitCharDesc, userID, userEmail}) => {
   const [ selectedGender, setSelectedGender] = useState('random');
   const [ selectedRace, setSelectedRace] = useState('random');
   const [ inputFName, setinputFName] = useState('random');
   const [ inputLName, setinputLName] = useState('random');

   const handleGender = (event) => {
      setSelectedGender(event.value)
   }
   const handleRace = (event) => {
      setSelectedRace(event.value)
   }
   const handleFName = (event) => {
      setinputFName(event.target.value.split('.').join("").trim())
   }
   const handleLName = (event) => {
      setinputLName(event.target.value.split('.').join("").trim())
   }
   const handleSubmit = () => {
      submitCharDesc(
         selectedRace, 
         selectedGender,
         inputFName,
         inputLName,
         userEmail,
         userID,
      )
   }
   if(isFetching){
      return(
         <Wrapper>
            <LoadingIcon/>
         </Wrapper>
      )
   }
   else {
      return(
         <Wrapper >
            <h2>Character Names</h2>
            <form>
               <Select
                  defaultValue={optionsRace[0]}
                  options={optionsRace}
                  onChange={handleRace}
                  isSearchable={false}
               />
               <Select
                  defaultValue={optionsGender[0]}
                  options={optionsGender}
                  onChange={handleGender}
                  isSearchable={false}
               />
               <input
                  className="input"
                  onChange={handleFName}
                  minLength="3"
                  maxLength="20"
                  name="charFName"
                  placeholder="First Name"
               />
               <input
                  className="input"
                  onChange={handleLName}
                  minLength="3"
                  maxLength="20"
                  name="charLName"
                  placeholder="Optional Last Name - Gender neutral"
               />
               <button
                  type={"button"}
                  onClick={()=> handleSubmit()}
               >Submit</button>
            </form>
         </Wrapper>
      )
   }
} 


const mapStateToProps = (state) => ({ 
   isFetching:state.inputCharDesc.isFetching, 
   userID:state.authenticate.authenticated.id, 
   userEmail:state.authenticate.authenticated.email });

export default connect(mapStateToProps, { submitCharDesc })(InputCharDesc);