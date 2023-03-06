import React,{useEffect} from 'react';
import '../EnrolList.css';
import {DetailsList} from '@fluentui/react/lib/DetailsList';

// 컬럼 정의시 사용했던 fieldName 사용
//이름 , 성, 과정, 이메일
// 현재컬럼 앞 뒤로 수정/삭제버튼 추가
const colums = [
    {key: 'edit', name:'수정', fieldName: "edit", maxWidth: 50, resizableColumns:false},
    {
    key:'fname', name:'Firstname', fieldName:'fname', maxWidth:20, resizableColumns:false
    },
    {
        key:'lname', name:'Lastname', fieldName:'lname', maxWidth:90, resizableColumns:false
    },
    {
        key:'program', name:'과정종류', fieldName:'program', maxWidth:90, resizableColumns:false
    },
    {
        key:'email', name:'eamil', fieldName:'eamil', maxWidth:150, resizableColumns:false
    },
    {key: 'delete', name:'삭제', fieldName: "delete", maxWidth: 50, resizableColumns:false}
    ];

let items =[];
//
// for (let i=1; i<=5 ; ++i){
//     let data = {key:i, fname:'fname', lname:'lname', program:'program', email:'eamil'+i };
//     items.push(data);
// }


const EnrolList = (props) => {
    //과정 등록학생 데이터가 추가될때마다 UI를 재 랜더링 하기위해
    // useEffect 리액트 훅 사용
    // useEffect: 컴포넌트
    // props 객체에 값이 존재할때 마다 detailList에 렌더링해서 화면에 표시
    useEffect(()=>{

        //삭제 기능 수행
        //아래의 주석은 스트릭트를 없애줌
        //eslint-disable-next-line no-restricted-globals
        if(props.action === 'delete' && confirm('정말로 지울꺼에요 ? 😥')){
            //삭제 대상 아이템을 키로 가져옴
            const deleteItem = items.filter(
                (item) => item.key === props.selItemKey
            )[0];

            //삭제대상 아이템을 제외하고 다시 items 객체 생성
            items= items.filter(f=>f!==deleteItem);

            //참가가능 인원수 복구
            props.restore(deleteItem.program);
        }else{
            // confirm에서 취소를 클릭한 경우 액션 초기화
            props.setAction('');
        }


        //?? (confirm에서 취소하기 누르고 등록시 발생이슈 추가)



        //등록하기와 수정하기를 구분하는 조건 추가
        //새로 등록된 데이터를 리스트에 추가
        const curItemKey =  props.stuDetails.key;
        if(curItemKey) {
            //전달받은 키와 리스트에서 (수정하려는) 키와 일치하는 항목의 인덱스를 찾음
            const i = items.findIndex((item)=> item.key === curItemKey);
            if(i>-1){
                //키와 일치하는 항목이 리스트에 존재한다면, 수정하기로 간주하여 수정작업 수행
                items = items.map(e=>e.key === curItemKey ? props.stuDetails : e);

            }else{
                //키와 일치하는 항목이 리스트에 존재하지 않으면, 등록하기로 간주하여 등록작업 수행
                items= [...items,props.stuDetails];
            }

            props.setStuDetails({});

        }
    })
    return (
            <div className="enrolList">
                <DetailsList items={items} colums={colums} />
            </div>
    )
}


export default  EnrolList;