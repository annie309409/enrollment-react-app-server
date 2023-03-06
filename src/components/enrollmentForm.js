import React from 'react';
import '../App.css';
import {useState} from "react";
import {MdEdit,MdDelete} from 'react-icons/md';

const EnrollmentForm = (props)=>{

    // 폼에 입력한 내용(이름/성/이메일)을 기억하기 위해 state형 변수선언
    // onChange이벤트 발생 시 입력한 이름, 성,이메일은 firstName, lastName, email변수에 저장
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");

    // state형 변수에 저장된 이름, 성을 환영메세지와함께 조합
    const [welcome,setWelcome]=useState("welcome");
    let [msgCol,setmsgCol] = useState("message");

    //등록, 수정버튼 정의
    const [btnValue,setBtnValue] = useState('등록하기');
    const [studKey,setStudKey] = useState(0);

    const handleEdit=(key,prg)=>{
        //수정 할 학생정보 폼에 표시
        handleFormInput(firstName,lastName,email);

        //참가 프로그램 radio버튼에 표시
        props.setReSelectProgram(prg);
        console.log(prg);
       setStudKey(key);
       setBtnValue('수정하기');

    }

    //폼에 입력된 데이터 제거, 버튼의 글자바꿈
    const HandleCancel=(e)=>{
        handleFormInput('','','');
        e.preventDefault();
        setBtnValue('등록하기');
    }



    const HandleSubmit = (e) => {
        e.preventDefault();
        // state형 변수에 저장된 이름, 성을 환영메세지와함께 조합
        setWelcome(`Welcome ! ${firstName} ${lastName} we send an email to ${email}`);

        // 참여가능 인원수 감소 (parameter로 함수도 받아올 수 있음)\
        if(props.currentSeat-1<0){
            props.setUpdateSeats(0);
            setmsgCol('warn');
            setWelcome('There are no seats anymore!');
        } else{
            props.setUpdateSeats(props.currentSeat-1);
            //등록완료된 학생정보에 사용할 key생성
            const rndKey = Math.floor(1000+Math.random()*9000);

            // 학생정보 등록시 rndKey를
            // 학생정보 수정시 studKey를 사용하도록 함
            const key = btnValue === '등록하기' ? rndKey : studKey;

            //생성한 key와 등록완료된 학생정보를 props에 저장
            let stud = {
                key:key, fname:firstName, lname:lastName, program:props.chosenProgram, email:email,
                edit:<MdEdit className="actionIcon" onClick={()=>{handleEdit(key,props.chosenProgram)}}/>,
                //삭제 아이콘 클릭 시 삭제 대상학생 정보의 키를 넘김
                delete:<MdDelete className="actionIcon"
                onClick={()=>{props.handleItemSelection('delete',key)}}/>
            };
            props.setStuDetails(stud);
        }
    };
    const handleInputChage = (setInput, e) => {
        setInput(e.target.value);
    };

    const handleFormInput=(fname,lanme,email)=>{
        setFirstName(fname);
        setLastName(lanme);
        setEmail(email);
    };

    return(
        <div>
            <div>
                <form className="enrolForm" onSubmit={HandleSubmit}>
                    <ul className="ulEnrol">
                        <li>
                            <label htmlFor="FirstName"></label>
                            <input type="text" id="FirstName" name="firstName" className="inputFields" placeholder="first name"  value={firstName} onChange={e=>handleInputChage(setFirstName,e)}/>
                        </li>
                        <li>
                            <label htmlFor="LastName"></label>
                            <input type="text" id="LastName" name="lastName" className="inputFields" placeholder="last name"  value={lastName} onChange={e=>handleInputChage(setLastName,e)}/>
                        </li>
                        <li>
                            <label htmlFor="Email"></label>
                            <input type="email" id="Email" name="email" className="inputFields" placeholder="email addr"  value={email} onChange={e=>handleInputChage(setEmail,e)}/>
                        </li>
                        <li id="center-btn">
                            <button type="submit" id="btnEnrol" name="enrol" onClick={(btnValue==='등록하기')?HandleSubmit:false}>{btnValue}</button>
                            <button type="submit" id="btnCancel" name="cancel" onClick={(e)=>{HandleCancel(e)}}>취소하기</button>
                        </li>
                        <li>
                            <label id="studentMsg" className={msgCol}>{welcome}</label>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    );
}

export default  EnrollmentForm;